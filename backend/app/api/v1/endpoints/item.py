from fastapi import APIRouter, Depends
from typing import List
from sqlalchemy.orm import Session
from app import crud, schemas, models
# from app.db import get_db

router = APIRouter()

# @router.get("/", response_model=List[schemas.Item])
# def read_items(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
#     items = crud.get_items(db, skip=skip, limit=limit)
#     return items
# @router.get("/raw", response_model=List[schemas.Item])
# def read_items(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
#     items = crud.get_items_with_raw_query(db, skip=skip, limit=limit)
#     return items
