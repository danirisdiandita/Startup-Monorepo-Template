from sqlmodel import Field, SQLModel
from sqlalchemy import Index
from sqlalchemy.sql import schema, sqltypes 
from datetime import datetime 
from decimal import Decimal 

class Feature(SQLModel, table=True): 
    __tablename__ = "features"
    id: int | None = Field(default=None, primary_key=True)
    name: str | None = Field(default=None)
    description: str | None = Field(default=None)
    created_at: datetime | None = Field(default=datetime.now())
    category: str | None = Field(default=None)
    