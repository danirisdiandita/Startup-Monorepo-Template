from sqlmodel import Field, SQLModel

class Team(SQLModel, table=True): 
    __tablename__ = "teams"
    id: int | None = Field(default=None, primary_key=True)
    name: str | None = Field(default=None)
    description: str | None = Field(default=None)