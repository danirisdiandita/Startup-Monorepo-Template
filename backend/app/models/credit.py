from sqlmodel import Field, SQLModel
from sqlalchemy import Index
from sqlalchemy.sql import schema, sqltypes 
from datetime import datetime 
from decimal import Decimal 



class Credit(SQLModel, table=True): 
    __tablename__ = "credits"
    id: int | None = Field(default=None, primary_key=True)
    user_id: int | None = Field(default=None, foreign_key="users.id")
    amount: Decimal = Field(default=0, decimal_places=3)
    reason: str | None = Field(default=None)
    created_at: datetime | None = Field(default=datetime.now())
    updated_at: datetime | None = Field(default=datetime.now())
    expires_at: datetime | None = Field(default=datetime.now())
