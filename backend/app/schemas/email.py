from typing import Optional
from pydantic import BaseModel


class Email(BaseModel):
    subject: Optional[str] = ""
    recipient: str
    sender: str
    body: Optional[str] = ""


class EmailOnly(BaseModel):
    email: str


class InvitationEmail(Email):
    link: str
