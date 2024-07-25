from typing import Optional
from pydantic import BaseModel
class FirstNameLastName(BaseModel):
    first_name: str 
    last_name: str 
