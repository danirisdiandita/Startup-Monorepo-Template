from app.models.plan import Plan
from app.models.feature import Feature
from app.models.plan_feature import PlanFeature
from fastapi import APIRouter 



router = APIRouter()


@router.get("/plans_and_features")
def get_plans_and_features():
    return {"message": "Hello World"}