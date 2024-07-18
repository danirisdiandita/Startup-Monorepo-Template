from fastapi import FastAPI, Request
from sqlmodel import Session, select 
from app.api.v1.api_v1 import api_router
from fastapi.responses import JSONResponse
from app.models.user import User 
from app.db.base import create_db_and_tables, engine 


app = FastAPI()

app.include_router(api_router, prefix="/api/v1")


# @app.on_event("startup")
# def on_startup(): 
#     create_db_and_tables() 

@app.get("/")
def read_root():
    return {"message": "Welcome to the FastAPI project!"}
