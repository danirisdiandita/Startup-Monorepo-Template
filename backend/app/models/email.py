from pydantic import BaseModel

class Email(BaseModel): 
    subject: str 
    recipient: str 
    sender: str 
    body: str 
