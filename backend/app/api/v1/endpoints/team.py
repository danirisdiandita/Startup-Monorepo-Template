from fastapi import APIRouter, Body, Depends
from fastapi.responses import JSONResponse
from app.crud.user import UserService
from app.models.user import User
from typing import Annotated, Union
from app.schemas.email import Email, InvitationEmail
from app.schemas.sample import Sample1, Sample2
from app.schemas.team import TeamNameReplacer
from app.utils.password_utils import PasswordUtils, get_current_active_user
from app.crud.team import TeamService
from app.core.config import constants

router = APIRouter()

team_service = TeamService()
password_utils = PasswordUtils()
user_service = UserService()


@router.get("/default-team-members")
def get_default_team_members(
    current_user: Annotated[User, Depends(get_current_active_user)]
):
    output = team_service.get_default_team_member_of_a_user(current_user)
    return JSONResponse(status_code=200, content=output)


@router.put("/change-team-name")
def change_team_name(
    current_user: Annotated[User, Depends(get_current_active_user)],
    team_name_replacer: TeamNameReplacer,
):
    results = team_service.change_default_team_name(current_user, team_name_replacer)
    return results


@router.post("/gitu")
def gitu(sample_input1: Sample2):

    return {"sample_input1": sample_input1.dict(), "sample_input2": {}}


@router.post("/invitation-link")
def generate_invitation_link(
    current_user: Annotated[
        User,
        Depends(get_current_active_user),
    ],
    email: Email,
):

    invitation_token = password_utils.create_access_token(
        data={
            "sub": email.recipient,
            "sender_email": current_user.email,
            "recipient_email": email.recipient,
            "token_type": constants.token_type_invitation_link,
        }
    )

    return JSONResponse(status_code=200, content={"link": invitation_token})


@router.post("/send-team-email-invitation")
def send_team_email_invitation(
    current_user: Annotated[User, Depends(get_current_active_user)],
    email: InvitationEmail,
):

    # get payload user email

    # check if email is registered or not

    recipient_data = user_service.get_one_user_by_email(User(email=email.recipient))

    if len(recipient_data) < 1:
        # register
        print("register")
    else:
        print("login")

        # sign in

    # if registered then send email with redirection url using /sign-in?<some additional params>

    # if not registered then send email with redirection url using /sign-up?<some additional params>

    return {"email": "sent"}
