from sqlmodel import Session, select 
from app.db.base import engine 
from sqlalchemy.sql import text
from app.models.user import User
import smtplib
from email.message import EmailMessage
from app.core.config import settings 
import ssl 


def get_one_user_by_email(user: User):
    with Session(engine) as session: 
        statement = select(User).where(User.email == user.email)
        docs = session.exec(statement)
        output = []
        for  doc_ in docs:
            output.append(doc_.dict())
        return output 

def insert_user_during_registration(user: User):
    with Session(engine) as session: 
        session.add(user)
        session.commit()
        session.refresh(user)
        return user 
    

def send_email_verification(body, subject, from_email, to_email):
    msg = EmailMessage() 
    msg['Subject'] = subject 
    msg['From'] = from_email
    msg['To'] = to_email
    msg.set_content(body)
    context = ssl.create_default_context()
    with smtplib.SMTP(settings.SMTP_HOST, settings.SMTP_PORT) as smtp:
        smtp.ehlo()
        smtp.starttls()
        smtp.ehlo
        smtp.login(settings.SMTP_EMAIL, settings.SMTP_PASSWORD)
        smtp.send_message(msg)



