import os 

class Config: 
    def __init__(self): 
        self.sql_alchemy_base_url = os.getenv("SQLALCHEMY_DATABASE_URI")
        # jwt credentials
        self.jwt_secret_key = os.getenv("JWT_SECRET_KEY")
        self.jwt_algorithm = os.getenv("JWT_ALGORITHM")
        self.jwt_access_token_expire_in_minutes = os.getenv("JWT_ACCESS_TOKEN_EXPIRE_IN_MINUTES")


config = Config() 