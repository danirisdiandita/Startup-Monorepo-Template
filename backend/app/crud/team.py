from app.db.base import engine

from sqlmodel import Session, select
from app.models.user import User
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

    def get_default_team_member_of_a_user(self, user: User):
        with Session(engine) as session:
            subquery_team_id = select(UserTeam.team_id).where(
                UserTeam.user_id == user.id,
                UserTeam.role == "admin",
                UserTeam.access == "admin",
            )
            main_query = select(
                UserTeam.id,
                UserTeam.user_id,
                UserTeam.team_id,
                UserTeam.role,
                UserTeam.access,
            ).where(UserTeam.team_id == subquery_team_id)
            
            # output = []
            docs = session.exec(main_query).all()
            print(docs[0]._mapping)
            return docs[0]._mapping 
