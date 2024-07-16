from pydantic import BaseModel


class ResetPassword(BaseModel): 
    password: str 