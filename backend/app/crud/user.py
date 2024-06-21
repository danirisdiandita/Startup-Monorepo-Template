from sqlmodel import Session, select 
from app.db.base import engine 
from sqlalchemy.sql import text

from app.models.user import User


def get_one_user_by_email(user: User):
    with Session(engine) as session: 
        statement = select(User).where(User.email == user.email)
        results = session.exec(statement)
        return results 

def insert_user_during_registration(user: User):
    with Session(engine) as session: 
        session.add(user)
        session.commit()
        session.refresh(user)
        return user 
