# from sqlalchemy.orm import Session
# from app.models.item import Item
# from sqlalchemy.sql import text

# def get_items(db: Session, skip: int = 0, limit: int = 10):
#     result = db.query(Item).offset(skip).limit(limit).all()
#     return result 

# def get_items_with_raw_query(db: Session, skip: int=0, limit: int=10):
#     docs = db.execute(text(f"select items.id, items.name, items.description from items offset {skip} limit {limit}"))
#     output = []
#     for doc_ in docs:
#         output.append(doc_)
#     return output 
