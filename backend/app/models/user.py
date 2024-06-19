from sqlalchemy import Column, Integer, String, Boolean
from app.db import Base

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(255), nullable=False, unique=True, index=True)
    password = Column(String(255), nullable=False)
    first_name = Column(String(255))
    last_name = Column(String(255))
    verified = Column(Boolean, default=False)



