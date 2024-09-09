from sqlmodel import Field, SQLModel
from sqlalchemy import Index
from sqlalchemy.sql import schema, sqltypes 
from datetime import datetime 
from decimal import Decimal 

class PlanFeature(SQLModel, table=True): 
    __tablename__ = "plan_feature_s"
    id: int | None = Field(default=None, primary_key=True)
    plan_id: int | None = Field(default=None, foreign_key="plans.id")
    feature_id: int | None = Field(default=None, foreign_key="features.id")
    created_at: datetime | None = Field(default=None)
    updated_at: datetime | None = Field(default=None) 
    is_feature_plan_active: bool = Field(default=False)
    description: str | None = Field(default=None) 