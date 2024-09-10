from fastapi import APIRouter
from app.api.v1.endpoints import user, team, plan 

api_router = APIRouter()
api_router.include_router(user.router, prefix="/users", tags=["users"])
api_router.include_router(team.router, prefix="/teams", tags=["teams"])
api_router.include_router(plan.router, prefix="/plans", tags=["plans"])
