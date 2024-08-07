from re import sub
from app.db.base import engine

from sqlmodel import Session, select, update
from app.models.user import User
from app.models.team import Team
from app.models.user_team import UserTeam
from app.schemas.team import TeamNameReplacer


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
            main_query = (
                select(
                    UserTeam.id,
                    UserTeam.user_id,
                    User.email,
                    User.first_name,
                    User.last_name,
                    UserTeam.team_id,
                    Team.name, 
                    UserTeam.role,
                    UserTeam.access,
                )
                .join(User, User.id == UserTeam.user_id).join(Team, UserTeam.team_id == Team.id)
                .where(UserTeam.team_id == subquery_team_id)
            )

            # output = []
            docs = session.exec(main_query).all()
            output = []
            if len(docs) > 0:
                for doc_ in docs:
                    output.append(
                        {
                            "id": doc_.id,
                            "user_id": doc_.user_id,
                            "email": doc_.email, 
                            "first_name": doc_.first_name, 
                            "last_name": doc_.last_name, 
                            "team_id": doc_.team_id,
                            "team_name": doc_.name, 
                            "role": doc_.role,
                            "access": doc_.access,
                            
                        }
                    )
            return output
    def change_default_team_name(self, user: User, replacer: TeamNameReplacer): 
        with Session(engine) as session:
            subquery_team_id = select(UserTeam.team_id).where(
                UserTeam.user_id == user.id,
                UserTeam.role == "admin",
                UserTeam.access == "admin",
            ).subquery() 

            # Update query
            update_stmt = (
                update(Team)
                .where(Team.id == subquery_team_id)
                .values(name=replacer.new_name)
            )
            # Execute the update
            session.exec(update_stmt)
            session.commit()
            

            team_statement = select(Team).where(Team.id == subquery_team_id)

            result = session.exec(team_statement)
            return result.one() 


            