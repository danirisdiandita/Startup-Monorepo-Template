
from app.db.base import engine 

from sqlmodel import Session, select 

from app.models.team import Team
from app.models.user_team import UserTeam 


class TeamService: 
    def __init__(self) -> None:
        pass

    def create_new_team(self, team: Team): 
        with Session(engine) as session: 
            session.add(team)
            session.commit() 
            session.refresh(team)
            return team 
        
    def create_new_team_user_relation(self, user_team: UserTeam): 
        with Session(engine) as session: 
            session.add(user_team)
            session.commit() 
            session.refresh(user_team)
            return user_team 


    
        
        

    