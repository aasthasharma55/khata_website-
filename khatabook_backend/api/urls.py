from django.urls import path
from .views import UserRegistrationView, UserLoginView, UserProfileView, SendPasswordResetEmailView, UserPasswordResetView, CustomerListCreateView, CustomerDetailView, TransactionListCreateView, TransactionDetailView,YouTubeSearchView


urlpatterns = [
    path('register/', UserRegistrationView.as_view(), name='register'),
    path('login/', UserLoginView.as_view(), name='login'),
    path('profile/', UserProfileView.as_view(), name='profile'),
    path('reset-email-password/', SendPasswordResetEmailView.as_view(), name='reset-email-password'),
    path('reset-password/<uid>/<token>/', UserPasswordResetView.as_view(), name='reset-password'),

    path('customers/', CustomerListCreateView.as_view(), name='customers'),
    path('customers/<int:pk>/', CustomerDetailView.as_view(), name='customer-detail'),
    path("customers/<int:customer_id>/transactions/", TransactionListCreateView.as_view(), name="transactions"),
    path("customers/transactions/<int:pk>/", TransactionDetailView.as_view(), name="transaction-detail"),


    path("youtube-search/", YouTubeSearchView.as_view(), name="youtube-search"),

]
