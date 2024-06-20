from fastapi import FastAPI, Request
from sqlmodel import Session, select 
# from app.api.v1.api_v1 import api_router
from fastapi.responses import JSONResponse
from app.models.hero import Hero
from app.models.user import User 
from app.db.base import create_db_and_tables, engine 
from fastapi_jwt_auth import AuthJWT
from fastapi_jwt_auth.exceptions import AuthJWTException

app = FastAPI()

# app.include_router(api_router, prefix="/api/v1")


@app.on_event("startup")
def on_startup(): 
    create_db_and_tables() 

@app.get("/")
def read_root():
    return {"message": "Welcome to the FastAPI project!"}

@app.exception_handler(AuthJWTException)
def authjwt_exception_handler(request: Request, exc: AuthJWTException):
    return JSONResponse(
        status_code=exc.status_code,
        content={"detail": exc.message}
    )


@app.post("/heroes/")
def create_hero(hero: Hero): 
    with Session(engine) as session: 
        session.add(hero)
        session.commit() 
        session.refresh(hero)
        return hero 
    
@app.get("/heroes/")
def read_heroes():
    with Session(engine) as session:
        heroes = session.exec(select(Hero)).all()
        return heroes
