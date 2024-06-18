from fastapi import Depends
from sqlalchemy.orm import Session
from app.models.item import Item
from sqlalchemy.sql import text
from app.db import get_db 

def get_one_user_by_email(email: str, db: Session):
    #  db: Session = Depends(get_db)


    # create initialisation that email should be indexed to avoid "evil query"
    query = f"""
    select 
        users.email,
        users.hashed_password,
        users.first_name,
        users.last_name
    from users where email = '{email}'
    """
    docs = db.execute(text(query))
    output = [] 
    for doc_ in docs:
        output.append(doc_)
    return output 