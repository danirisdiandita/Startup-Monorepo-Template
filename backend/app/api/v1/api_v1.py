from fastapi import APIRouter
from app.api.v1.endpoints import item

api_router = APIRouter()
api_router.include_router(item.router, prefix="/items", tags=["items"])
