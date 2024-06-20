from fastapi import APIRouter, FastAPI, HTTPException, Depends, Request
from fastapi.responses import JSONResponse
from fastapi_jwt_auth import AuthJWT
from fastapi_jwt_auth.exceptions import AuthJWTException
from pydantic import BaseModel
from app.core.config import settings 
from sqlalchemy.orm import Session 
import datetime 
from typing import Optional
from app.schemas.user import User 
from app.crud.user import get_one_user_by_email, insert_user_during_registration
from app.db.base import get_db 

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
def register(user: User, db: Session = Depends(get_db)): 
    # check user within database or not 
    user_array = get_one_user_by_email(user.email, db)

    if len(user_array) > 0:
        # throw error if the user is already registered 
        raise HTTPException(status_code=409, detail="Email already registered")
    # hash the password 


    
    # insert new user 

    # insert_user_during_registration(user.email, )







    
    
    





    return {}

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
