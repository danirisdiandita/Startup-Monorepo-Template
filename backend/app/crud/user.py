from sqlmodel import Session, select 
from app.db.base import engine 
from sqlalchemy.sql import text

from app.models.user import User


# def get_one_user_by_email(email: str, db: Session):
#     #  db: Session = Depends(get_db)


#     # create initialisation that email should be indexed to avoid "evil query"
#     query = f"""
#     select 
#         users.email,
#         users.password,
#         users.first_name,
#         users.last_name
#     from users where email = '{email}'
#     """
#     docs = db.execute(text(query))
#     output = [] 
#     for doc_ in docs:
#         output.append(doc_)
#     return output 

def insert_user_during_registration(user: User):
    with Session(engine) as session: 
        session.add(user)
        session.commit()
        session.refresh(user)
        return user 
