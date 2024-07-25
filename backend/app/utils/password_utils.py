from typing import Annotated
from fastapi import Depends,  HTTPException, status
from passlib.context import CryptContext
from datetime import datetime, timezone, timedelta
import jwt
from jwt.exceptions import InvalidTokenError
from app.core.config import settings, constants
from app.schemas.token import TokenData
from app.models.user import User
from fastapi.security import OAuth2PasswordBearer
import requests
from app.crud.user import UserService


user_service = UserService() 

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/v1/users/login")

async def get_current_user(token: Annotated[str, Depends(oauth2_scheme)]):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )

    user = None 
    try:
        payload = jwt.decode(token, settings.JWT_SECRET_KEY, algorithms=[settings.JWT_ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
        user = user_service.get_one_user_by_email(User(email=username))
        if len(user) == 0:
            raise credentials_exception 
        else: 
            user = User(email=user[0].get("email"), 
                        first_name=user[0].get("first_name", 'guest'), 
                        last_name=user[0].get("last_name", 'guest'), 
                        verified=user[0].get("verified", False))
    except InvalidTokenError:
        raise credentials_exception

    
    if user is None:
        raise credentials_exception
    return user

async def get_current_active_user(
            current_user: Annotated[User, Depends(get_current_user)]
    ):

        """
        if user verified then return something, else error
        """
        return current_user

class PasswordUtils:
    def __init__(self):
        self.pwd_context = CryptContext(schemes=["bcrypt"], deprecated='auto')
    def get_password_hash(self, password):
        return self.pwd_context.hash(password)
    def verify_password(self, plain_password, hashed_password):
        return self.pwd_context.verify(plain_password, hashed_password)
    def create_access_token(self, data: dict, expires_delta: timedelta | None = None):
        to_encode = data.copy()
        if expires_delta:
            expire = datetime.now(timezone.utc) + expires_delta
        else:
            expire = datetime.now(timezone.utc) + timedelta(minutes=settings.JWT_ACCESS_TOKEN_EXPIRE_IN_MINUTES)
        to_encode.update({"exp": expire})
        encoded_jwt = jwt.encode(to_encode, settings.JWT_SECRET_KEY, algorithm=settings.JWT_ALGORITHM)

        return encoded_jwt

    def decode_token(self, token: str, token_type: str):
        invalid_token = HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid Token",
                headers={"WWW-Authenticate": "Bearer"},
            )

        user_not_found_error = HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="User Not found",
                headers={"WWW-Authenticate": "Bearer"},
            )

        try:
            payload = jwt.decode(token, settings.JWT_SECRET_KEY, algorithms=[settings.JWT_ALGORITHM])
            invalid_token_type = HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid token type",
                headers={"WWW-Authenticate": "Bearer"},
            )
            if payload.get("token_type") != token_type:
                raise invalid_token_type

            user_email = payload.get("email")
            if user_email == None:
                raise user_not_found_error
            return payload
        except Exception as e:
            print(e)
            raise invalid_token
    def verify_google_access_token(self, access_token: str):
        try:
            url = constants.google_oauth2_token_info_url
            params = {'access_token': access_token}
            response = requests.get(url, params=params)
            if response.status_code == 200:
                token_info = response.json()
                if 'error' in token_info:
                    return False, token_info['error']
                return True, token_info
            else:
                return False, response.json()
        except Exception as e:
            return False, str(e)



password_utils = PasswordUtils()
