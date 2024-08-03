from pydantic import BaseModel

class TeamNameReplacer(BaseModel): 
    new_name: str 