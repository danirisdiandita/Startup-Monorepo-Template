from sqlmodel import Field, SQLModel
from sqlalchemy import Index
from sqlalchemy.sql import schema, sqltypes 
from datetime import datetime 
from decimal import Decimal 

class Plan(SQLModel, table=True): 
    __tablename__ = "plans"
    id: int | None = Field(default=None, primary_key=True)
    name: str | None = Field(default=None)
    description: str | None = Field(default=None)
    price: Decimal = Field(default=0, decimal_places=3)
    billing_cycle: str | None = Field(default=None)
    created_at: datetime | None = Field(default=datetime.now())