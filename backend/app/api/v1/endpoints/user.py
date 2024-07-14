from fastapi import APIRouter, FastAPI, HTTPException, Depends, Request, Response
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from app.core.config import settings
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
import datetime
from typing import Optional, Annotated
from app.schemas.email import EmailVerification
from app.models.user import User
from app.schemas.token import RefreshToken
from app.crud.user import UserService
from app.utils.password_utils import get_current_active_user, password_utils
from app.schemas.google_sign import GoogleSignIn
from ....schemas.token import Token
from datetime import timedelta
from ....core.config import settings, constants
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
        raise HTTPException(status_code=401, detail="Email not registered. Please sign up")


    password_verified = password_utils.verify_password(form_data.password, user_data[0].get('password', ''))
    if password_verified == False:
        raise HTTPException(status_code=401, detail="Incorrect Password")

    # check user email verification
    if user_data[0].get('verified') == False:
        raise HTTPException(status_code=401, detail="Email is not verified")

    access_token = password_utils.create_access_token(
        data={"sub": form_data.username, "email": form_data.username, 'token_type': constants.token_type_access_token}, expires_delta=constants.access_token_expires
    )

    refresh_token = password_utils.create_access_token(
        data={"sub": form_data.username , "email": form_data.username, 'token_type': constants.token_type_refresh_token}, expires_delta=constants.refresh_token_expires
    )

    response.set_cookie(key="refresh_token_cookie",value=refresh_token, expires=constants.refresh_token_expires)
    return Token(access_token=access_token, refresh_token=refresh_token, token_type="bearer")

@router.post("/google-login")
def login_with_google(google_sign_in: GoogleSignIn):
    user_email = google_sign_in.email
    user_data = user_service.get_one_user_by_email(User(email=user_email))

    # extract the google auth key results and verify
    is_accepted, verification_message = password_utils.verify_google_access_token(google_sign_in.access_token)

    if is_accepted:
        if len(user_data) > 0:
            # check if email is verified (actually when google signed in, we do not need to verify)
            if (user_data[0].get("verified") == False):
                raise HTTPException(status_code=401, detail="Email is not verified")
            access_token = password_utils.create_access_token(
                data={"sub": google_sign_in.email, "email": google_sign_in.email, "token_type": constants.token_type_access_token}
                , expires_delta=constants.access_token_expires
            )

            refresh_token = password_utils.create_access_token(
                data={"sub": google_sign_in.email, "email": google_sign_in.email, "token_type": constants.token_type_refresh_token},
                expires_delta=constants.refresh_token_expires
            )

            return JSONResponse(status_code=200, content= {"access_token": access_token, "refresh_token": refresh_token})
        else:
            # register to database if the user doesn't exists
            try:

                new_user = User(email=google_sign_in.email, first_name=google_sign_in.first_name,
                                last_name=google_sign_in.last_name, verified=True) # for google sign in process, we don't need to verify the email
                registered_user_data_model = user_service.insert_user_during_registration(new_user)
                registered_user = registered_user_data_model.model_dump()

                access_token = password_utils.create_access_token(
                    data={"sub": google_sign_in.email, "email": google_sign_in.email,
                        "token_type": constants.token_type_access_token}
                    , expires_delta=constants.access_token_expires
                )

                refresh_token = password_utils.create_access_token(
                    data={"sub": google_sign_in.email, "email": google_sign_in.email, "token_type": constants.token_type_refresh_token},
                    expires_delta=constants.refresh_token_expires
                )

                return JSONResponse(status_code=200, content={"access_token": access_token, "refresh_token": refresh_token})

            except Exception as e:
                raise HTTPException(status_code=500, detail="Unknown Error, Please Try Again or Contact Us")

            return JSONResponse(status_code=200, content=registered_user)
    else:
        raise HTTPException(status_code=401, content=verification_message)



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
            verification_token = password_utils.create_access_token({'sub': registered_user.get('email'),'email': registered_user.get('email'), 'token_type': constants.token_type_verification_token}, expires_delta=timedelta(hours=12))
            registered_user["verification_token"] = verification_token
        except Exception as e:
            raise Exception(status_code=500, detail="Unknown Error while generating verification token")

    except Exception as e:
        raise HTTPException(status_code=500, detail='Unknown Error, Please Try Again or Contact Us')

    del registered_user['password']

    return JSONResponse(status_code=200, content=registered_user)



@router.get("/me", response_model=User)
async def get_me(current_user: Annotated[User, Depends(get_current_active_user)],):
    return User(id=1, email='norma.risdiandita@gmail.com', password='gitugiut', first_name='normadani',
                        last_name='risdiandita', verified=False)

@router.post('/refresh')
def refresh(token: RefreshToken):
    """
    The jwt_refresh_token_required() function insures a valid refresh
    token is present in the request before running any code below that function.
    we can use the get_jwt_subject() function to get the subject of the refresh
    token, and use the create_access_token() function again to make a new access token
    """
    refresh_token = token.refresh_token

    payload = password_utils.decode_token(refresh_token, token_type=constants.token_type_refresh_token)

    # check if the email within payload exists

    access_token = password_utils.create_access_token(
        data={'sub': payload.get('email'), 'email': payload.get('email'), 'token_type': constants.token_type_access_token}, expires_delta=constants.access_token_expires
    )

    refresh_token_updated = password_utils.create_access_token(
        data={'sub': payload.get('email'), 'email': payload.get('email'), 'token_type': constants.token_type_refresh_token}, expires_delta=constants.refresh_token_expires
    )

    return {'access_token': access_token, 'refresh_token': refresh_token_updated}


@router.get("/verify/{verification_token}")
def verify_email(verification_token: str):
    verification_payload = password_utils.decode_token(verification_token, token_type=constants.token_type_verification_token)
    user_ = user_service.verify_user_by_email(verification_payload.get("email"))


@router.post("/send-email-verification")
def verify(emailVerification: EmailVerification):
    user_service.send_email_verification(body=emailVerification.body, subject=emailVerification.subject,
                            from_email=emailVerification.sender, to_email=emailVerification.recipient)

    return {'user': 'gitu'}

@router.post("/send-forgot-password-email")
def send_forgot_password_email(email: str):
    return {'forgot password': 'sent'}
