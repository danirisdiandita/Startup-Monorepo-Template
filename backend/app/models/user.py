from sqlmodel import Field, SQLModel
from sqlalchemy import Index
from sqlalchemy.sql import schema, sqltypes 
from datetime import datetime 


class UserBase(SQLModel): 
    email: str = Field(index=False, unique=True)
    password: str = Field(index=False, nullable=True)
    first_name: str | None = Field(default=None)
    last_name: str | None = Field(default=None)
    verified: bool = Field(default=False)
    created_at: datetime | None = Field(default=datetime.now())
    updated_at: datetime | None = Field(default=datetime.now())

class User(UserBase, table=True): 
    __tablename__ = "users"
    id: int | None = Field(default=None, primary_key=True)
    
class RegisterUser(UserBase):
    invite_link: str  | None = Field(default=None)
    

Index('ix_users_email', User.email, postgresql_using='hash')
