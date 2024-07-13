from typing import Optional
from pydantic import BaseModel
class GoogleSignIn(BaseModel): 
    email: str 
    first_name: Optional[str] = None 
    last_name: Optional[str] = None 
