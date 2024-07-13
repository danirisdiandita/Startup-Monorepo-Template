from pydantic import BaseModel

class EmailVerification(BaseModel): 
    subject: str 
    recipient: str 
    sender: str 
    body: str 
