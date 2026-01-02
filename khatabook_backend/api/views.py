import os
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from django.contrib.auth import authenticate
from .renderers import UserRenderer
from .models import Customer, Transaction
from .serializers import (
    UserRegistrationSerializer, UserLoginSerializer, UserProfileSerializer,
    SendPasswordResetEmailSerializer, UserPasswordResetSerializer,
    CustomerSerializer, TransactionSerializer
)
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
import requests


# Generate Token Manually
def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)
    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }


class UserRegistrationView(APIView):
    renderer_classes = [UserRenderer]

    def post(self, request, format=None):
        serializer = UserRegistrationSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):   
            user = serializer.save()
            token = get_tokens_for_user(user)
            return Response({'token': token, 'msg': 'Registration Success'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserLoginView(APIView):
    renderer_classes = [UserRenderer]

    def post(self, request, format=None):
        serializer = UserLoginSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            email = serializer.validated_data['email']
            password = serializer.validated_data['password']
            authenticated_user = authenticate(email=email, password=password)
            if authenticated_user is not None:
                token = get_tokens_for_user(authenticated_user)
                return Response({'token': token, 'msg': 'Login Success'}, status=status.HTTP_200_OK)
            else:
                return Response({'errors': {'non_field_errors': ['Email and Password is not Valid']}}, status=status.HTTP_404_NOT_FOUND)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserProfileView(APIView):
    renderer_classes = [UserRenderer]
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    def get(self, request, format=None):
        user = request.user
        serializer = UserProfileSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)


class SendPasswordResetEmailView(APIView):
    renderer_classes = [UserRenderer]

    def post(self, request, format=None):
        serializer = SendPasswordResetEmailSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            return Response({'msg': 'Password Reset Link Send. Please Check your Email.'}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserPasswordResetView(APIView):
    renderer_classes = [UserRenderer]

    def post(self, request, uid, token, format=None):
        serializer = UserPasswordResetSerializer(data=request.data, context={'uid': uid, 'token': token})
        if serializer.is_valid(raise_exception=True):
            return Response({'msg': 'Password Reset Successfully.'}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class CustomerListCreateView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    def get(self, request):
        search_query = request.GET.get("search", "")
        customers = Customer.objects.filter(user=request.user)

        if search_query:
            customers = customers.filter(name__icontains=search_query) 

        serializer = CustomerSerializer(customers, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = CustomerSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CustomerDetailView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    def get_object(self, pk, user):
        try:
            return Customer.objects.get(pk=pk, user=user)
        except Customer.DoesNotExist:
            return None

    def get(self, request, pk):
        customer = self.get_object(pk, request.user)
        if not customer:
            return Response({"error": "Customer not found"}, status=status.HTTP_404_NOT_FOUND)
        serializer = CustomerSerializer(customer)
        return Response(serializer.data)

    def put(self, request, pk):
        """
        Update customer details: name, phone, email.
        """
        customer = self.get_object(pk, request.user)
        if not customer:
            return Response({"error": "Customer not found"}, status=status.HTTP_404_NOT_FOUND)

        serializer = CustomerSerializer(customer, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()  # user is already linked
            return Response({"msg": "Customer updated successfully", "customer": serializer.data}, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        customer = self.get_object(pk, request.user)
        if not customer:
            return Response({"error": "Customer not found"}, status=status.HTTP_404_NOT_FOUND)
        customer.delete()
        return Response({"msg": "Customer deleted"}, status=status.HTTP_204_NO_CONTENT)



class TransactionDetailView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    def get_object(self, pk, user):
        try:
            return Transaction.objects.get(pk=pk, customer__user=user)
        except Transaction.DoesNotExist:
            return None

    def put(self, request, pk):
        transaction = self.get_object(pk, request.user)
        if not transaction:
            return Response({"error": "Transaction not found"}, status=status.HTTP_404_NOT_FOUND)

        serializer = TransactionSerializer(transaction, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()  # update transaction
            return Response(serializer.data, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        transaction = self.get_object(pk, request.user)
        if not transaction:
            return Response({"error": "Transaction not found"}, status=status.HTTP_404_NOT_FOUND)

        transaction.delete()
        return Response({"msg": "Transaction deleted"}, status=status.HTTP_204_NO_CONTENT)

# -------------------------
# Transactions
# -------------------------
class TransactionListCreateView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    def get(self, request, customer_id):
        transactions = Transaction.objects.filter(customer__id=customer_id, customer__user=request.user)
        serializer = TransactionSerializer(transactions, many=True)
        return Response(serializer.data)

    def post(self, request, customer_id):
        try:
            customer = Customer.objects.get(id=customer_id, user=request.user)
        except Customer.DoesNotExist:
            return Response({"error": "Customer not found"}, status=status.HTTP_404_NOT_FOUND)

        serializer = TransactionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(customer=customer)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


YOUTUBE_API_KEY = os.getenv("YOUTUBE_API_KEY")

class YouTubeSearchView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]
    """
    Search YouTube for finance-related videos using YouTube Data API v3.
    Only returns videos related to finance (excludes songs/music/shorts).
    """

    FINANCE_KEYWORDS = [
        "finance", "investment", "stocks", "bank", "loan", "credit",
        "debit", "accounting", "tax", "budget", "financial"
    ]

    EXCLUDE_KEYWORDS = [
        "song", "music", "remix", "lyrics", "album",
        "trailer", "dj", "beats", "cover", "rap", "dance"
    ]

    def post(self, request):
        query = request.data.get("query")
        if not query:
            return Response({"error": "Query is required"}, status=status.HTTP_400_BAD_REQUEST)
        
        api_key = os.getenv("YOUTUBE_API_KEY")
        if not api_key:
            return Response({"error": "Missing YOUTUBE_API_KEY"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        search_url = "https://www.googleapis.com/youtube/v3/search"
        params = {
            "part": "snippet",
            "q": query,
            "key": api_key,
            "maxResults": 10,
            "type": "video",
            "order": "relevance",
        }
        
        try:
            response = requests.get(search_url, params=params)
            response.raise_for_status()
            data = response.json()
            
            videos = []
            video_ids = [item["id"]["videoId"] for item in data.get("items", [])]

            if video_ids:
                details_url = "https://www.googleapis.com/youtube/v3/videos"
                details_params = {
                    "part": "contentDetails",
                    "id": ",".join(video_ids),
                    "key": api_key,
                }
                details_res = requests.get(details_url, params=details_params).json()
                details_map = {
                    item["id"]: item["contentDetails"]["duration"]
                    for item in details_res.get("items", [])
                }
            
            for item in data.get("items", []):
                video_id = item["id"]["videoId"]
                title = item["snippet"]["title"].lower()
                description = item["snippet"]["description"].lower()

                if not any(keyword in title or keyword in description for keyword in self.FINANCE_KEYWORDS):
                    continue

                if any(bad in title or bad in description for bad in self.EXCLUDE_KEYWORDS):
                    continue

                if "shorts" in title or "shorts" in description:
                    continue
                duration = details_map.get(video_id, "")

                if duration.startswith("PT") and ("M" not in duration and "H" not in duration):
                    continue

                videos.append({
                    "title": item["snippet"]["title"],
                    "description": item["snippet"]["description"],
                    "url": f"https://www.youtube.com/watch?v={video_id}",
                    "thumbnail": item["snippet"]["thumbnails"]["medium"]["url"]
                })
            
            if not videos:
                return Response({"message": "No finance-related videos found for this query."}, status=status.HTTP_200_OK)
            
            return Response({"videos": videos}, status=status.HTTP_200_OK)
        
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
