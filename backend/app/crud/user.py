from sqlmodel import Session, select 
from app.db.base import engine 
from app.models.user import User
import smtplib
from email.message import EmailMessage
from app.core.config import settings 
import ssl 
from datetime import datetime 

class UserService:
    def __init__(self) -> None:
        pass


    def get_one_user_by_email(self, user: User):
        with Session(engine) as session: 
            statement = select(User).where(User.email == user.email)
            docs = session.exec(statement)
            output = []
            for  doc_ in docs:
                output.append(doc_.dict())
            return output 

    def insert_user_during_registration(self, user: User):
        with Session(engine) as session: 
            session.add(user)
            session.commit()
            session.refresh(user)
            return user 
        
    def verify_user_by_email(self, email: str):
        user_ = None 
        with Session(engine) as session: 
            statement = select(User).where(User.email == email)
            results = session.exec(statement)
            user_ = results.one() 
            user_.verified = True 
            session.add(user_)
            session.commit() 
            session.refresh(user_)
        return user_ 
        

    def send_email(self, body, subject, from_email, to_email):
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
    def update_new_password_for_user(self, new_hashed_password: str, email: str): 
        with Session(engine) as session: 
            statement = select(User).where(User.email == email)
            results = session.exec(statement)
            user_ = results.one() 
            user_.password = new_hashed_password 
            session.add(user_)
            session.commit() 
            session.refresh(user_)
        return user_
    def update_firstname_lastname(self, new_firstname, new_lastname, email):
        with Session(engine) as session: 
            statement = select(User).where(User.email == email)
            results = session.exec(statement)
            user_ = results.one() 
            user_.first_name = new_firstname
            user_.last_name = new_lastname
            user_.updated_at = datetime.now() 
            session.add(user_)
            session.commit() 
            session.refresh(user_)
        return User(first_name=user_.first_name, last_name=user_.last_name) 



