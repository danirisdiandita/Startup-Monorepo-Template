from pydantic_settings import BaseSettings
from datetime import timedelta
class Settings(BaseSettings):
    SQLALCHEMY_DATABASE_URI: str
    JWT_SECRET_KEY: str
    JWT_ALGORITHM: str
    JWT_ACCESS_TOKEN_EXPIRE_IN_MINUTES: int = 24 * 60
    JWT_REFRESH_TOKEN_EXPIRE_IN_DAYS: int = 30
    JWT_VERIFICATION_TOKEN_EXPIRE_IN_HOURS: int = 12
    SMTP_HOST: str
    SMTP_PORT: int
    SMTP_EMAIL: str
    SMTP_PASSWORD: str
    REDIS_URL: str 

    class Config:
        env_file = ".env"

settings = Settings()



class Constants:
    def __init__(self) -> None:
        self.token_type_access_token = 'access_token'
        self.token_type_verification_token = 'verification_token'
        self.token_type_refresh_token = 'refresh_token'
        self.token_type_forgot_password = 'forgot_password'
        self.token_type_invitation_link = 'invitation'
        self.access_token_expires = timedelta(minutes=settings.JWT_ACCESS_TOKEN_EXPIRE_IN_MINUTES)
        self.refresh_token_expires = timedelta(days=settings.JWT_REFRESH_TOKEN_EXPIRE_IN_DAYS)
        self.verification_token_expires = timedelta(days=settings.JWT_VERIFICATION_TOKEN_EXPIRE_IN_HOURS)
        self.forgot_password_token_expires = timedelta(hours=12)
        self.google_oauth2_token_info_url = 'https://www.googleapis.com/oauth2/v1/tokeninfo'
        
        
constants = Constants()
