from sqlmodel import Field, SQLModel, Enum
import enum 

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
    team_id: int | None = Field(default=None, foreign_key="teams.id")
    role: Role 
    access: Access  