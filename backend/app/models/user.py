from sqlmodel import Field, SQLModel
from sqlalchemy import Index
from sqlalchemy.sql import schema, sqltypes 


class User(SQLModel, table=True): 
    __tablename__ = "users"
    id: int | None = Field(default=None, primary_key=True)
    email: str = Field(index=False, unique=True)
    password: str = Field(index=False, nullable=True)
    first_name: str | None = Field(default=None)
    last_name: str | None = Field(default=None)
    verified: bool = Field(default=False)


Index('ix_users_email', User.email, postgresql_using='hash')
