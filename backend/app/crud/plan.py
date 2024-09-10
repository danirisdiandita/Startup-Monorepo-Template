from sqlmodel import Session, select
from app.db.base import engine
from app.models.plan import Plan
from app.models.feature import Feature
from app.models.plan_feature import PlanFeature

class PlanService: 
    def __init__(self) -> None:
        pass 

    def get_plans_and_features(self): 
        with Session(engine) as session: 
            return session.exec(select(Plan, Feature, PlanFeature)).all()