from ninja import NinjaAPI
from django.views.decorators.csrf import csrf_exempt
from .schema import LoginSchema, TokenSchema, SignUpSchema
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.models import User
api = NinjaAPI()

@api.get("/hello")
async def hello(request):
    return {"message": "Hello"}

@csrf_exempt
@api.post("/login", response=TokenSchema)
def login(request, payload: LoginSchema):
    user = authenticate(username=payload.username, password=payload.password)
    if not user:
        return api.create_response(request, {"error": "Invalid credentials"}, status=401)
    refresh = RefreshToken.for_user(user)
    return {
        "access": str(refresh.access_token),
        "refresh": str(refresh)
    }

@csrf_exempt
@api.post("/signup")
def signup(request, payload: SignUpSchema):
    if User.objects.filter(username=payload.username).exists():
        return api.create_response(request, {"error": "Username already exists"}, status=400)
    if User.objects.filter(email=payload.email).exists():
        return api.create_response(request, {"error": "Email already exists"}, status=400)
    if payload.password1 != payload.password2:
        return api.create_response(request, {"error": "Passwords do not match"}, status=400)
    user = User.objects.create_user(
        username=payload.username,
        email=payload.email,
        password=payload.password1
    )
    user.save()
    return {"message": "User registered successfully"}


    

