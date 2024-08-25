from re import sub

from fastapi import HTTPException, status
from app.db.base import engine

from sqlmodel import Session, select, update
from app.models.user import User
from app.models.team import Team
from app.models.user_team import Access, Role, UserTeam
from app.schemas.team import TeamNameReplacer
from app.utils.password_utils import PasswordUtils
from app.core.config import constants

password_utils = PasswordUtils()


class TeamService:
    def __init__(self) -> None:
        pass

    def create_new_team(self, team: Team):
        with Session(engine) as session:
            session.add(team)
            session.commit()
            session.refresh(team)
            return team
        
    def get_one_user_team(self, user_team: UserTeam): 
        with Session(engine) as session:
            statement = select(UserTeam).where(UserTeam.user_email == user_team.user_email).where(UserTeam.team_id == user_team.team_id)
            docs = session.exec(statement)
            output = []
            for doc_ in docs: 
                output.append(doc_.dict())
            return output 
        
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
                    UserTeam.user_email,
                    User.first_name,
                    User.last_name,
                    UserTeam.team_id,
                    Team.name,
                    UserTeam.role,
                    UserTeam.access,
                    UserTeam.verified,
                )
                .join(User, User.id == UserTeam.user_id, isouter=True)
                .join(Team, UserTeam.team_id == Team.id)
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
                            "email": doc_.user_email,
                            "first_name": doc_.first_name,
                            "last_name": doc_.last_name,
                            "team_id": doc_.team_id,
                            "team_name": doc_.name,
                            "role": doc_.role,
                            "access": doc_.access,
                            "verified": doc_.verified,
                        }
                    )
            return output

    def change_default_team_name(self, user: User, replacer: TeamNameReplacer):
        with Session(engine) as session:
            subquery_team_id = (
                select(UserTeam.team_id)
                .where(
                    UserTeam.user_id == user.id,
                    UserTeam.role == "admin",
                    UserTeam.access == "admin",
                )
                .subquery()
            )

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

    def update_to_verified_of_user(self, sender_user: User, recipient_user: User):
        with Session(engine) as session:
            sender_user_id = select(User.id).where(User.email == sender_user.email)

            subquery_team_id = (
                select(UserTeam.team_id)
                .where(
                    UserTeam.user_id == sender_user_id,
                    UserTeam.role == "admin",
                    UserTeam.access == "admin",
                )
                .subquery()
            )
            
            subquery_recipient_user_id = (
                select(User.id).where(User.email == recipient_user.email)
            )

            statement = (
                select(UserTeam)
                .where(UserTeam.team_id == subquery_team_id)
                .where(UserTeam.user_email == recipient_user.email)
            )
            results = session.exec(statement)
            user_team_s = results.one()
            user_team_s.verified = True
            user_team_s.user_id = subquery_recipient_user_id 

            session.add(user_team_s)
            session.commit()
            session.refresh(user_team_s)

            # print("Updated user_team_s", user_team_s)
            return user_team_s 

            # insert_stmt = UserTeam(
            #     user_id=recipient_user.id,
            #     team_id=subquery_team_id,
            #     role=Role.member,
            #     access=Access.view,
            #     verified=True
            # )

            # session.add(insert_stmt)
            # session.commit()
            # session.refresh(insert_stmt)
            # return insert_stmt

    def validate_and_insert_user_team_s(self, current_user, invite_link: str):

        # current_user.email
        # invite_link

        invitation_info = password_utils.decode_token(
            token=invite_link, token_type=constants.token_type_invitation_link
        )

        # print("invitation_info", invitation_info)

        # {'sub': 'sirlcern3@gmail.com',
        #  'email': 'sirlcern3@gmail.com',
        #  'sender_email': 'norma.risdiandita@gmail.com',
        #  'recipient_email': 'sirlcern3@gmail.com',
        #  'token_type': 'invitation'}
        #
        if invitation_info.get("recipient_email") != current_user.email:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="User and Invitation Link Mismatch",
            )

        # validate the user_id and user_email

        result = self.update_to_verified_of_user(
            User(email=invitation_info.get("sender_email")), current_user
        )
        return result
    
    def get_team_in_which_user_is_member(self, user: User):
        with Session(engine) as session:
            statement = select(UserTeam).where(UserTeam.user_email == user.email)
            docs = session.exec(statement)
            output = []
            for doc_ in docs:
                output.append(doc_.dict())
            return output