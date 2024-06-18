from fastapi import FastAPI
from app.api.v1.api_v1 import api_router

app = FastAPI()

app.include_router(api_router, prefix="/api/v1")

@app.get("/")
def read_root():
    return {"message": "Welcome to the FastAPI project!"}
