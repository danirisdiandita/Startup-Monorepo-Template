from pydantic import BaseModel

from app.schemas.email import Email

class TeamNameReplacer(BaseModel): 
    new_name: str 
    
