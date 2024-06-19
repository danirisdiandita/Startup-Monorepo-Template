from pydantic import BaseModel
from typing import Optional

class User(BaseModel):
    email: str 
    password: str 
    first_name: Optional[str] = None
    last_name: Optional[str] = None 
    verified: Optional[bool] = False 


