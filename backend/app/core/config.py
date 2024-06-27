from pydantic import BaseSettings

class Settings(BaseSettings):
    SQLALCHEMY_DATABASE_URI: str
    JWT_SECRET_KEY: str 
    JWT_ALGORITHM: str 
    JWT_ACCESS_TOKEN_EXPIRE_IN_MINUTES: int 
    SMTP_HOST: str
    SMTP_PORT: int 
    SMTP_EMAIL: str 
    SMTP_PASSWORD: str 

    class Config:
        env_file = ".env"

settings = Settings()
