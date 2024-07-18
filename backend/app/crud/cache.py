from app.core.config import constants, settings 
import redis 

class Cache: 
    def __init__(self) -> None:
        self.redis_client = redis.from_url(settings.REDIS_URL)

        def expires_time(self, token_type): 
            if token_type == constants.token_type_refresh_token:
                return settings.JWT_REFRESH_TOKEN_EXPIRE_IN_DAYS * 24 * 60 * 60 
            elif token_type == constants.token_type_forgot_password: 
                return 12 * 60 * 60 
            elif token_type == constants.token_type_verification_token:
                return settings.JWT_VERIFICATION_TOKEN_EXPIRE_IN_HOURS

        def save_token(self, token_type: str, token: str): 
            try: 
                self.redis_client.setex(token, self.expires_time(token_type), 'true')
            except Exception as e: 
                print(f'error inserting redis token with type {token_type}')
        def is_token_exists(self, token_type: str, token: str)
            try: 
                output = self.redis_client.getex()