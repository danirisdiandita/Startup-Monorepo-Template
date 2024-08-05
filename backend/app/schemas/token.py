from pydantic import BaseModel
from typing import Optional 

class Token(BaseModel):
    access_token: str
    refresh_token: Optional[str] = None 
    token_type: Optional[str] = None 
    first_name: Optional[str] = None 
    last_name: Optional[str] = None
    access_token_expire: Optional[int] 
    refresh_token_expire: Optional[int] 

class TokenData(BaseModel):
    username: str | None = None

class RefreshToken(BaseModel): 
    refresh_token: str 