from pydantic import BaseModel
from typing import Optional 

class Token(BaseModel):
    access_token: str
    refresh_token: Optional[str] = None 
    token_type: str

class TokenData(BaseModel):
    username: str | None = None

class RefreshToken(BaseModel): 
    refresh_token: str 