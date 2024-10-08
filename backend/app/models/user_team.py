from sqlalchemy import Boolean, Column, String
from sqlmodel import Field, SQLModel, Enum
import enum
from sqlalchemy.sql import expression

class Access(str, enum.Enum):
    admin = "admin"
    view = "view"
    edit = "edit"
    create = "create"
    delete = "delete"
    approve = "approve"
    review = "review"


class Role(str, enum.Enum):
    admin = "admin"
    member = "member"


class UserTeam(SQLModel, table=True):
    __tablename__ = "user_team_s"
    id: int | None = Field(default=None, primary_key=True)
    user_id: int | None = Field(default=None, foreign_key="users.id", index=True)
    user_email: str | None = Field(default=None)
    team_id: int | None = Field(default=None, foreign_key="teams.id")
    role: Role
    access: Access
    verified: bool = Field(sa_column=Column(Boolean, server_default=expression.false()))
