from pydantic import BaseModel
from typing import Union


class User(BaseModel):
    username: str
    email: Union[str, None] = None
    full_name: Union[str, None] = None
    disabled: Union[bool, None] = None

class UserInDB(User):
    hashed_password: str

class NewUser(BaseModel): 
    email: str 
    password: str 
    first_name: str 
    last_name: str 