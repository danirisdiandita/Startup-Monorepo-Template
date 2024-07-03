from fastapi import APIRouter, FastAPI, HTTPException, Depends, Request
from fastapi.responses import JSONResponse
from fastapi_jwt_auth import AuthJWT
from fastapi_jwt_auth.exceptions import AuthJWTException
from pydantic import BaseModel
from app.core.config import settings 
import datetime 
from typing import Optional
from app.models.email import EmailVerification
from app.models.user import User 
from app.crud.user import get_one_user_by_email, insert_user_during_registration, send_email_verification #  get_one_user_by_email
from app.utils.password_utils import password_utils 

router = APIRouter() 



class Settings(BaseModel):
    authjwt_secret_key: str = settings.JWT_SECRET_KEY

@AuthJWT.load_config
def get_config():
    return Settings()

@router.post('/login')
def login(user: User, Authorize: AuthJWT = Depends()):
    if user.email != "test" or user.password != "test":
        raise HTTPException(status_code=401,detail="Bad username or password")

    # Use create_access_token() and create_refresh_token() to create our
    # access and refresh tokens
    access_token = Authorize.create_access_token(subject=user.email, expires_time=datetime.timedelta(days=1))
    refresh_token = Authorize.create_refresh_token(subject=user.email, expires_time=datetime.timedelta(days=7))
    return {"access_token": access_token, "refresh_token": refresh_token}

@router.post("/register")
def register(user: User): 
    # check user within database or not 
    user_array = get_one_user_by_email(user)

    if len(user_array) > 0:
        raise HTTPException(status_code=409, detail="Email already registered")

    # insert new user 
    registered_user = {} 
    
    
    # encrypt password 
    user.password = password_utils.get_password_hash(user.password)

    try: 
        registered_user_data_model = insert_user_during_registration(user)
        registered_user = registered_user_data_model.dict() 
    except Exception as e: 
        raise HTTPException(status_code=409, detail='Email already registered')

    return JSONResponse(status_code=200, content=registered_user) 

@router.post('/refresh')
def refresh(Authorize: AuthJWT = Depends()):
    """
    The jwt_refresh_token_required() function insures a valid refresh
    token is present in the request before running any code below that function.
    we can use the get_jwt_subject() function to get the subject of the refresh
    token, and use the create_access_token() function again to make a new access token
    """
    Authorize.jwt_refresh_token_required()

    current_user = Authorize.get_jwt_subject()
    new_access_token = Authorize.create_access_token(subject=current_user, expires_time=datetime.timedelta(days=1))
    new_refresh_token = Authorize.create_refresh_token(subject=current_user, expires_time=datetime.timedelta(days=7))
    return {"access_token": new_access_token, "refresh_token": new_refresh_token}

@router.get('/protected')
def protected(Authorize: AuthJWT = Depends()):
    Authorize.jwt_required()

    current_user = Authorize.get_jwt_subject()
    return {"user": current_user}


@router.post("/verify")
def verify(emailVerification: EmailVerification): # ,  Authorize: AuthJWT = Depends()
    # Authorize.jwt_required()
    # current_user = Authorize.get_jwt_subject()
    send_email_verification(body=emailVerification.body, subject=emailVerification.subject, 
                            from_email=emailVerification.sender, to_email=emailVerification.recipient) 
    # return {"user": current_user}
    return {'user': 'gitu'}
    