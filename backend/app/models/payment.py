from sqlmodel import Field, SQLModel
from sqlalchemy import Index
from sqlalchemy.sql import schema, sqltypes 
from datetime import datetime 
from decimal import Decimal 

class Payment(SQLModel, table=True): 
    __tablename__ = "payments"
    id: int | None = Field(default=None, primary_key=True)
    user_id: int | None = Field(default=None, foreign_key="users.id")
    subscription_id: int | None = Field(default=None, foreign_key='subscriptions.id')
    amount: Decimal = Field(default=0, decimal_places=3)
    currency: str | None = Field(default=None)
    payment_method: str | None = Field(default=None)
    payment_date: datetime | None = Field(default=datetime.now())
    status: str | None = Field(default=None)
