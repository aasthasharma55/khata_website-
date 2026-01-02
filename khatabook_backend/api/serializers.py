from rest_framework import serializers
from .models import User, Customer, Transaction
from xml.dom import ValidationErr
from django.utils.encoding import smart_str, force_bytes, DjangoUnicodeDecodeError
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from .utils import Util

class UserRegistrationSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(style={'input_type': 'password'}, write_only=True)
    class Meta:
        model = User
        fields = ['name', 'email', 'password', 'password2']
        extra_kwargs = {'password': {'write_only': True}}

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError("Passwords do not match")
        return attrs
    
    def create(self, validated_data):
        return User.objects.create_user(**validated_data)
    
class UserLoginSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(max_length=255)
    password = serializers.CharField(style={'input_type': 'password'}, write_only=True)
    class Meta:
        model = User
        fields = ['email', 'password']
    
class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'name', 'email']
    
class SendPasswordResetEmailSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(max_length=255)
    class Meta:
        model = User
        fields = ['email']
        
    def validate(self, attrs):
        email = attrs.get('email')
        if User.objects.filter(email = email).exists():
            user=User.objects.get(email = email)
            uid = urlsafe_base64_encode(force_bytes(user.id))
            print("Encoded Id : ",uid)
            token = PasswordResetTokenGenerator().make_token(user)
            print("Token : ", token)
            link = 'http://localhost:3000/api/user/reset/'+uid+'/'+token
            print('Link : ',link)
            body = 'Click Following Link to Reset Your Password '+link
            #Send Email
            data = {
                'subject' : 'Reset Your Password',
                'body' : body,
                'to_email' : user.email
            }
            Util.send_email(data)
            return attrs
        else:
            raise ValidationErr('You are not Registered User')
        
class UserPasswordResetSerializer(serializers.ModelSerializer):
    password = serializers.CharField(style={'input_type': 'password'}, write_only=True)
    password2 = serializers.CharField(style={'input_type': 'password'}, write_only=True)
    class Meta:
        model = User
        fields = ['password', 'password2']

    def validate(self, attrs):
       try:
            uid = self.context.get('uid')
            token = self.context.get('token')
            if attrs['password'] != attrs['password2']:
                raise serializers.ValidationError("Passwords do not match")
            id = smart_str(urlsafe_base64_decode(uid))
            user = User.objects.get(id = id)
            
            if not PasswordResetTokenGenerator().check_token(user, token):
                raise ValidationErr("Token is not Valid or Expired")
            user.set_password(attrs['password'])
            user.save()
            return attrs
       except DjangoUnicodeDecodeError as identifier:
           PasswordResetTokenGenerator().check_token(user, token)
           raise ValidationErr("Token is not Valid or Expired")

class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = ["id", "amount", "type", "description", "created_at"]


class CustomerSerializer(serializers.ModelSerializer):
    balance = serializers.SerializerMethodField()
    transactions = TransactionSerializer(many=True, read_only=True)

    class Meta:
        model = Customer
        fields = ["id", "name", "phone", "email", "balance", "transactions", "created_at"]

    def get_balance(self, obj):
        return obj.balance
    
