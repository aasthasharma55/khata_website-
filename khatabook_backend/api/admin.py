from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import User, Customer, Transaction


class UserModelAdmin(BaseUserAdmin):
    list_display = ("id", "email", "name", "is_admin", "is_active", "created_at")
    list_filter = ("is_admin", "is_active")
    fieldsets = (
        ("User Credentials", {"fields": ("email", "password")}),
        ("Personal Info", {"fields": ("name",)}),
        ("Permissions", {"fields": ("is_admin", "is_active")}),
        ("Important Dates", {"fields": ("last_login", "created_at", "updated_at")}),
    )
    add_fieldsets = (
        (None, {
            "classes": ("wide",),
            "fields": ("email", "name", "password1", "password2"),
        }),
    )
    search_fields = ("email", "name")
    ordering = ("id",)
    filter_horizontal = ()


class CustomerAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "phone", "email", "user", "created_at", "balance")
    search_fields = ("name", "phone", "email")
    list_filter = ("created_at", "user")
    ordering = ("-created_at",)


class TransactionAdmin(admin.ModelAdmin):
    list_display = ("id", "customer", "type", "amount", "description", "created_at")
    list_filter = ("type", "created_at")
    search_fields = ("customer__name", "description")
    ordering = ("-created_at",)


admin.site.register(User, UserModelAdmin)
admin.site.register(Customer, CustomerAdmin)
admin.site.register(Transaction, TransactionAdmin)
