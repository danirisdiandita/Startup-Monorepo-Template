from fastapi import APIRouter, FastAPI, HTTPException, Depends, Request, Response
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from app.core.config import settings 
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
import datetime 
from typing import Optional, Annotated
from app.models.email import EmailVerification
from app.models.user import User 
from app.crud.user import UserService
from app.utils.password_utils import get_current_active_user, password_utils 
from ....models.token import Token 
from datetime import timedelta 
from ....core.config import settings
from ....utils.password_utils import PasswordUtils  
import json 


router = APIRouter() 
password_utils = PasswordUtils() 

user_service = UserService() 

@router.post('/login')
def login(form_data: Annotated[OAuth2PasswordRequestForm, Depends()],response: Response) -> Token:
    user_data = user_service.get_one_user_by_email(User(email=form_data.username, password=form_data.password))
    # verify email and password 

    if len(user_data) < 1: 
        raise HTTPException(status_code="Email is not Registered")
    


    password_verified = password_utils.verify_password(form_data.password, user_data[0].get('password', ''))
    if password_verified == False: 
        raise HTTPException(status_code=401, detail="Incorrect Password")
    
    # check user email verification 
    if user_data[0].get('verified') == False: 
        raise HTTPException(status_code=401, detail="Email is not verified")

    access_token_expires = timedelta(minutes=settings.JWT_ACCESS_TOKEN_EXPIRE_IN_MINUTES)
    access_token = password_utils.create_access_token(
        data={"sub": form_data.username}, expires_delta=access_token_expires
    )

    refresh_token_expires = timedelta(days=30)


    refresh_token = password_utils.create_access_token(
        data={"sub": form_data.username}, expires_delta=refresh_token_expires
    )

    response.set_cookie(key="refresh_token_cookie",value=refresh_token, expires=refresh_token_expires)
    return Token(access_token=access_token, refresh_token=refresh_token, token_type="bearer")

@router.post("/register")
def register(user: User): 
    # check user within database or not 
    user_array = user_service.get_one_user_by_email(user)

    if len(user_array) > 0:
        raise HTTPException(status_code=409, detail="Email already registered")

    # insert new user 
    registered_user = {} 
    
    
    # encrypt password 
    user.password = password_utils.get_password_hash(user.password)

    try: 
        registered_user_data_model = user_service.insert_user_during_registration(user)
        registered_user = registered_user_data_model.model_dump()

        # create verification token 
        try: 
            # 12 hours jwt token 
            verification_token = password_utils.create_access_token({'email': registered_user.get('email'), 'token_type': 'verification'}, expires_delta=timedelta(hours=12))
            registered_user["verification_token"] = verification_token 
        except Exception as e: 
            raise Exception(status_code=500, detail="Unknown Error while generating verification token")

    except Exception as e: 
        raise HTTPException(status_code=500, detail='Unknown Error, Please Try Again or Contact Us')
    
    del registered_user['password']

    return JSONResponse(status_code=200, content=registered_user) 



@router.get("/me", response_model=User)
async def get_me(current_user: Annotated[User, Depends(get_current_active_user)],): 
    print('current_user', current_user)
    return User(id=1, email='norma.risdiandita@gmail.com', password='gitugiut', first_name='normadani', 
                        last_name='risdiandita', verified=False)

@router.post('/refresh')
def refresh():
    """
    The jwt_refresh_token_required() function insures a valid refresh
    token is present in the request before running any code below that function.
    we can use the get_jwt_subject() function to get the subject of the refresh
    token, and use the create_access_token() function again to make a new access token
    """
    return {'access_token': '', 'refresh_token': ''}
    # Authorize.jwt_refresh_token_required()

    # current_user = Authorize.get_jwt_subject()
    # new_access_token = Authorize.create_access_token(subject=current_user, expires_time=datetime.timedelta(days=1))
    # new_refresh_token = Authorize.create_refresh_token(subject=current_user, expires_time=datetime.timedelta(days=7))
    # return {"access_token": new_access_token, "refresh_token": new_refresh_token}

@router.get("/verify/{verification_token}")
def verify_email(verification_token: str): 

    verification_payload = password_utils.decode_verification_token(verification_token)
    print('verification_payload.get("email")', verification_payload.get("email"))
    user_ = user_service.verify_user_by_email(verification_payload.get("email"))
    print('user_', user_)
    return {"user": "gitu"}


@router.post("/send-email-verification")
def verify(emailVerification: EmailVerification):
    user_service.send_email_verification(body=emailVerification.body, subject=emailVerification.subject, 
                            from_email=emailVerification.sender, to_email=emailVerification.recipient) 
    
    return {'user': 'gitu'}
    