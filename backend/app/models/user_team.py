from sqlmodel import Field, SQLModel, Enum


class Access()

class UserTeam(SQLModel, table=True): 
    __tablename__ = "user_team_s"
    id: int | None = Field(default=None, primary_key=True)
    user_id: int | None = Field(default=None, foreign_key="users.id")
    team_id: int | None = Field(default=None, foreign_key="teams.id")
    role: 
    access: 