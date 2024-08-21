from fastapi import APIRouter, FastAPI, HTTPException, Depends, Query, Request, Response
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from app.core.config import settings
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
import datetime
from typing import Optional, Annotated
from app.crud.team import TeamService
from app.models.team import Team
from app.models.user_team import Access, Role, UserTeam
from app.schemas.change_password import ChangePassword
from app.schemas.email import Email, EmailOnly
from app.models.user import RegisterUser, User
from app.schemas.password import ResetPassword
from app.schemas.token import RefreshToken
from app.crud.user import UserService
from app.utils.password_utils import get_current_active_user, password_utils
from app.schemas.google_sign import GoogleSignIn
from ....schemas.token import Token
from datetime import timedelta
from ....core.config import settings, constants
from ....utils.password_utils import PasswordUtils
from app.schemas.firstname_lastname import FirstNameLastName
import json
from app.crud.cache import ServerCacheService


router = APIRouter()
password_utils = PasswordUtils()

user_service = UserService()
team_service = TeamService()
server_cache = ServerCacheService()


@router.post("/login")
def login(
    form_data: Annotated[OAuth2PasswordRequestForm, Depends()], response: Response
) -> Token:
    user_data = user_service.get_one_user_by_email(
        User(email=form_data.username, password=form_data.password)
    )
    # verify email and password

    if len(user_data) < 1:
        raise HTTPException(
            status_code=401, detail="Email not registered. Please sign up"
        )

    password_verified = password_utils.verify_password(
        form_data.password, user_data[0].get("password", "")
    )
    if password_verified == False:
        raise HTTPException(status_code=401, detail="Incorrect Password")

    # check user email verification
    if user_data[0].get("verified") == False:
        raise HTTPException(status_code=401, detail="Email is not verified")

    now = datetime.datetime.now()

    access_token = password_utils.create_access_token(
        data={
            "sub": form_data.username,
            "email": form_data.username,
            "token_type": constants.token_type_access_token,
        },
        expires_delta=constants.access_token_expires,
    )

    refresh_token = password_utils.create_access_token(
        data={
            "sub": form_data.username,
            "email": form_data.username,
            "token_type": constants.token_type_refresh_token,
        },
        expires_delta=constants.refresh_token_expires,
    )

    # cache refresh token for avoiding using it more than once

    server_cache.save_token(
        token_type=constants.token_type_refresh_token, token=refresh_token
    )

    return Token(
        access_token=access_token,
        refresh_token=refresh_token,
        first_name=user_data[0].get("first_name"),
        last_name=user_data[0].get("last_name"),
        token_type="bearer",
        access_token_expire=int((now + constants.access_token_expires).timestamp()),
        refresh_token_expire=int((now + constants.refresh_token_expires).timestamp()),
    )


@router.post("/google-login")
def login_with_google(google_sign_in: GoogleSignIn):
    user_email = google_sign_in.email
    user_data = user_service.get_one_user_by_email(User(email=user_email))

    # extract the google auth key results and verify
    is_accepted, verification_message = password_utils.verify_google_access_token(
        google_sign_in.access_token
    )

    if is_accepted:
        if len(user_data) > 0:
            # check if email is verified (actually when google signed in, we do not need to verify)
            if user_data[0].get("verified") == False:
                raise HTTPException(status_code=401, detail="Email is not verified")
            access_token = password_utils.create_access_token(
                data={
                    "sub": google_sign_in.email,
                    "email": google_sign_in.email,
                    "token_type": constants.token_type_access_token,
                },
                expires_delta=constants.access_token_expires,
            )

            refresh_token = password_utils.create_access_token(
                data={
                    "sub": google_sign_in.email,
                    "email": google_sign_in.email,
                    "token_type": constants.token_type_refresh_token,
                },
                expires_delta=constants.refresh_token_expires,
            )

            server_cache.save_token(
                token_type=constants.token_type_refresh_token, token=refresh_token
            )

            # return JSONResponse(
            #     status_code=200,
            #     content={"access_token": access_token,
            #              "refresh_token": refresh_token},
            # )
            
            now = datetime.datetime.now() 
            
            return Token(
                access_token=access_token,
                refresh_token=refresh_token,
                first_name=user_data[0].get("first_name"),
                last_name=user_data[0].get("last_name"),
                token_type="bearer",
                access_token_expire=int(
                    (now + constants.access_token_expires).timestamp()
                ),
                refresh_token_expire=int(
                    (now + constants.refresh_token_expires).timestamp()
                ),
            )
        else:
            # register to database if the user doesn't exists
            try:

                new_user = User(
                    email=google_sign_in.email,
                    first_name=google_sign_in.first_name,
                    last_name=google_sign_in.last_name,
                    verified=True,
                )  # for google sign in process, we don't need to verify the email
                registered_user_data_model = (
                    user_service.insert_user_during_registration(new_user)
                )
                registered_user = registered_user_data_model.model_dump()

                now = datetime.datetime.now()

                access_token = password_utils.create_access_token(
                    data={
                        "sub": google_sign_in.email,
                        "email": google_sign_in.email,
                        "token_type": constants.token_type_access_token,
                    },
                    expires_delta=constants.access_token_expires,
                )

                refresh_token = password_utils.create_access_token(
                    data={
                        "sub": google_sign_in.email,
                        "email": google_sign_in.email,
                        "token_type": constants.token_type_refresh_token,
                    },
                    expires_delta=constants.refresh_token_expires,
                )

                server_cache.save_token(
                    token_type=constants.token_type_refresh_token, token=refresh_token
                )

                # return JSONResponse(
                #     status_code=200,
                #     content={
                #         "access_token": access_token,
                #         "refresh_token": refresh_token,
                #         "access_token_expire": int(
                #             (now + constants.access_token_expires).timestamp()
                #         ),
                #         "refresh_token_expire": int(
                #             (now + constants.refresh_token_expires).timestamp()
                #         ),
                #     },
                # )

                return Token(
                    access_token=access_token,
                    refresh_token=refresh_token,
                    access_token_expire=int(
                        (now + constants.access_token_expires).timestamp()
                    ),
                    refresh_token_expire=int(
                        (now + constants.refresh_token_expires).timestamp()
                    ),
                    first_name=google_sign_in.first_name,
                    last_name=google_sign_in.last_name,
                    token_type="bearer",
                )

            except Exception as e:
                raise HTTPException(
                    status_code=500,
                    detail="Unknown Error, Please Try Again or Contact Us",
                )

    else:
        raise HTTPException(status_code=401, content=verification_message)


@router.post("/register")
def register(register_user: RegisterUser):

    user = User(
        email=register_user.email,
        password=register_user.password,
        first_name=register_user.first_name,
        last_name=register_user.last_name,
        verified=register_user.verified,
        created_at=register_user.created_at,
        updated_at=register_user.updated_at,
    )

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
            verification_token = password_utils.create_access_token(
                {
                    "sub": registered_user.get("email"),
                    "email": registered_user.get("email"),
                    "token_type": constants.token_type_verification_token,
                },
                expires_delta=timedelta(hours=12),
            )
            registered_user["verification_token"] = verification_token

            server_cache.save_user_key_token(
                token_type=constants.token_type_verification_token,
                token=verification_token,
                email=registered_user.get("email"),
            )
        except Exception as e:
            raise Exception(
                status_code=500,
                detail="Unknown Error while generating verification token",
            )

        user_id = registered_user_data_model.id
        default_team_name = registered_user_data_model.email

        new_team = team_service.create_new_team(
            Team(
                user_id=user_id,
                name=default_team_name,
                description=f"Default Team of {default_team_name}",
            )
        )
        new_team_user_relation = UserTeam(
            user_id=user_id,
            team_id=new_team.id,
            user_email=registered_user_data_model.email,
            role=Role.admin,
            access=Access.admin,
            verified=True,
        )
        team_service.create_new_team_user_relation(new_team_user_relation)

        # if user.invite_link:
        #     team_service.validate_and_insert_user_team_s()

    except Exception as e:
        print(e)
        raise HTTPException(
            status_code=500, detail="Unknown Error, Please Try Again or Contact Us"
        )

    del registered_user["password"]
    del registered_user["created_at"]
    del registered_user["updated_at"]

    return JSONResponse(status_code=200, content=registered_user)


@router.get("/me", response_model=User)
async def get_me(
    current_user: Annotated[User, Depends(get_current_active_user)],
):
    return current_user
    # return User(id=1, email='norma.risdiandita@gmail.com', password='gitugiut', first_name='normadani',
    #                     last_name='risdiandita', verified=False)


@router.post("/refresh")
def refresh(token: RefreshToken):
    """
    The jwt_refresh_token_required() function insures a valid refresh
    token is present in the request before running any code below that function.
    we can use the get_jwt_subject() function to get the subject of the refresh
    token, and use the create_access_token() function again to make a new access token
    """
    refresh_token = token.refresh_token

    is_token_exists = server_cache.is_token_exists(
        token_type=constants.token_type_refresh_token, token=refresh_token
    )

    if is_token_exists == False:
        raise HTTPException(
            status_code=401, detail="Unathorized, refresh token has been rotated"
        )

    payload = password_utils.decode_token(
        refresh_token, token_type=constants.token_type_refresh_token
    )

    # check if the email within payload exists

    # read database to get user information

    user_data = user_service.get_one_user_by_email(User(email=payload.get("email")))

    if len(user_data) == 0:
        raise HTTPException(status_code=401, detail="User not found")

    # delete previous refresh token from cache

    server_cache.delete_token(
        token_type=constants.token_type_refresh_token, token=refresh_token
    )

    now = datetime.datetime.now()

    access_token = password_utils.create_access_token(
        data={
            "sub": payload.get("email"),
            "email": payload.get("email"),
            "token_type": constants.token_type_access_token,
        },
        expires_delta=constants.access_token_expires,
    )

    refresh_token_updated = password_utils.create_access_token(
        data={
            "sub": payload.get("email"),
            "email": payload.get("email"),
            "token_type": constants.token_type_refresh_token,
        },
        expires_delta=constants.refresh_token_expires,
    )

    server_cache.save_token(
        token_type=constants.token_type_refresh_token, token=refresh_token_updated
    )

    return JSONResponse(
        status_code=200,
        content={
            "access_token": access_token,
            "refresh_token": refresh_token_updated,
            "first_name": user_data[0].get("first_name"),
            "last_name": user_data[0].get("last_name"),
            "access_token_expire": int(
                (now + constants.access_token_expires).timestamp()
            ),
            "refresh_token_expire": int(
                (now + constants.refresh_token_expires).timestamp()
            ),
        },
    )


@router.get("/verify")
def verify_email(verification_token: str = Query(...), invite_link: str = Query(None)):
    # check if the verification is the latest verification token

    verification_payload = password_utils.decode_token(
        verification_token, token_type=constants.token_type_verification_token
    )

    server_cache_verification_token = server_cache.get_existing_user_token(
        token_type=constants.token_type_verification_token,
        email=verification_payload.get("email"),
    )

    if verification_token != server_cache_verification_token:
        raise HTTPException(
            status_code=401,
            detail="Your verification link is not the latest verification link, please use the recent verification link",
        )

    user_ = user_service.verify_user_by_email(verification_payload.get("email"))

    if user_:
        server_cache.delete_user_key_token(
            token_type=constants.token_type_verification_token,
            email=verification_payload.get("email"),
        )

    # if contains the invitation link then validate True the user_team_s data
    if invite_link:
        team_service.validate_and_insert_user_team_s(user_, invite_link)
    return JSONResponse(status_code=200, content={"verified": True})


@router.post("/send-email-verification")
def verify(emailVerification: Email):
    user_service.send_email(
        body=emailVerification.body,
        subject=emailVerification.subject,
        from_email=emailVerification.sender,
        to_email=emailVerification.recipient,
    )

    return {"user": "gitu"}


@router.post("/autogenerate-new-verification-token")
def autogenerate_new_verification_token(email: EmailOnly):
    verification_token = password_utils.create_access_token(
        {
            "sub": email.email,
            "email": email.email,
            "token_type": constants.token_type_verification_token,
        },
        expires_delta=timedelta(hours=12),
    )
    email.email

    # needs to disable previous verification token / automatically replaced

    server_cache.save_user_key_token(
        token_type=constants.token_type_verification_token,
        token=verification_token,
        email=email.email,
    )

    return JSONResponse(
        status_code=200, content={"verification_token": verification_token}
    )


@router.post("/send-forgot-password-email")
def send_forgot_password_email(email: Email):
    user_service.send_email(
        body=email.body,
        subject=email.subject,
        from_email=email.sender,
        to_email=email.recipient,
    )

    return {"forgot password": "sent"}


@router.post("/forgot-password-token")
def get_forgot_password_token(email: EmailOnly):
    user_data = user_service.get_one_user_by_email(User(email=email.email))
    if len(user_data) == 0:
        raise HTTPException(status_code=401, detail=f"Email {email.email} not found")
    try:
        forgot_password_token = password_utils.create_access_token(
            data={
                "sub": email.email,
                "email": email.email,
                "token_type": constants.token_type_forgot_password,
            },
            expires_delta=constants.forgot_password_token_expires,
        )

        return JSONResponse(status_code=200, content={"token": forgot_password_token})
    except Exception as e:
        raise HTTPException(status_code=500, detail="Something went wrong")


@router.post("/reset-password")
def reset_password(
    current_user: Annotated[User, Depends(get_current_active_user)],
    new_password: ResetPassword,
):
    try:
        # encrypt the password
        new_hashed_password = password_utils.get_password_hash(new_password.password)

        # update the new password
        user_service.update_new_password_for_user(
            new_hashed_password, current_user.email
        )

        return JSONResponse(
            status_code=200,
            content={
                "detail": f"password for user with email {current_user.email} has been updated"
            },
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail="Error Updating Password")


@router.put("/change-firstname-lastname")
def change_firstname_lastname(
    current_user: Annotated[User, Depends(get_current_active_user)],
    firstname_lastname: FirstNameLastName,
):
    userupdateddata = user_service.update_firstname_lastname(
        new_firstname=firstname_lastname.first_name,
        new_lastname=firstname_lastname.last_name,
        email=current_user.email,
    )
    return userupdateddata


@router.put("/change-password")
def change_password(
    current_user: Annotated[User, Depends(get_current_active_user)],
    change_password: ChangePassword,
):
    user_data = user_service.get_one_user_by_email(User(email=current_user.email))
    if len(user_data) < 1:
        raise HTTPException(status_code=401, detail="User Not Found")

    password_verified = password_utils.verify_password(
        change_password.current_password, user_data[0].get("password", "")
    )

    if password_verified == False:
        raise HTTPException(status_code=401, detail="Incorrect Current Password")

    if user_data[0].get("verified") == False:
        raise HTTPException(status_code=401, detail="Email is not verified")

    new_hashed_password = password_utils.get_password_hash(change_password.new_password)

    user_service.update_new_password_for_user(new_hashed_password, current_user.email)

    return JSONResponse(
        status_code=200,
        content={
            "detail": f"password for user with email {current_user.email} has been updated"
        },
    )
