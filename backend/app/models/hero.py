# One line of FastAPI imports here later 👈
from sqlmodel import Field, Session, SQLModel, create_engine, select
from app.core.config import settings 

class Hero(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    name: str = Field(index=True)
    secret_name: str
    age: int | None = Field(default=None, index=True)


# sqlite_url = settings.SQLALCHEMY_DATABASE_URI

# # connect_args = {"check_same_thread": False}
# engine = create_engine(sqlite_url, echo=True)


# def create_db_and_tables():
#     SQLModel.metadata.create_all(engine)

# Code below omitted 👇