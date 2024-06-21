from sqlmodel import Session, select 
from app.db.base import engine 
from sqlalchemy.sql import text

from app.models.user import User


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
