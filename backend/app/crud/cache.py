from app.core.config import constants, settings 
import redis 

class ServerCacheService: 
    def __init__(self) -> None:
        self.redis_client = redis.from_url(settings.REDIS_URL,
                                           health_check_interval=10,
                                           socket_connect_timeout=5,
                                           retry_on_timeout=True,
                                           socket_keepalive=True, 
                                           )

    def expires_time(self, token_type): 
        if token_type == constants.token_type_refresh_token:
            return settings.JWT_REFRESH_TOKEN_EXPIRE_IN_DAYS * 24 * 60 * 60 
        elif token_type == constants.token_type_forgot_password: 
            return 12 * 60 * 60 
        elif token_type == constants.token_type_verification_token:
            return settings.JWT_VERIFICATION_TOKEN_EXPIRE_IN_HOURS * 60 * 60 

    def save_token(self, token_type: str, token: str): 
        try: 
            self.redis_client.setex(f"{token_type}:{token}", self.expires_time(token_type), 'true')
        except Exception as e: 
            print(f'error inserting redis token with type {token_type}', e)

    def is_token_exists(self, token_type: str, token: str):
        try: 
            output = self.redis_client.get(f"{token_type}:{token}")
            if output: 
                return True 
            else: 
                return False 
        except: 
            return False 
    def delete_token(self, token_type: str, token: str): 
        try: 
            self.redis_client.delete(f"{token_type}:{token}")
            return True 
        except: 
            return False 
    def save_user_key_token(self, token_type: str, token: str, email: str): 
        try: 
            self.redis_client.setex(f"{email}:{token_type}", self.expires_time(token_type), token)
        except Exception as e: 
            print(f'error inserting redis user token with type {token_type}', e)
    def delete_user_key_token(self, token_type: str, email):
        try: 
            self.redis_client.delete(f"{email}:{token_type}")
        except Exception as e: 
            print(f'error when deleting redis user token {token_type}', e)

    def get_existing_user_token(self, token_type: str, email: str): 
        try: 
            token = self.redis_client.get(f'{email}:{token_type}')
            if token: 
                return token.decode('utf-8')

        except Exception as e: 
            print('Error getting user key status', e)
