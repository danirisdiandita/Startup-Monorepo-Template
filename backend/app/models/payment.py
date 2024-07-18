from sqlmodel import Field, SQLModel
from sqlalchemy import Index
from sqlalchemy.sql import schema, sqltypes 
from datetime import datetime 

class Payment(SQLModel, table=True): 
    __tablename__ = "payments"
    id: int | None = Field(default=None, primary_key=True)
    user_id: int | None = Field(default=None, foreign_key="users.id")
    subscription_id: int | None = Field(default=None, foreign_key='subscriptions.id')
    
