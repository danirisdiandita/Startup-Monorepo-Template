from fastapi import APIRouter, Body, Depends
from fastapi.responses import JSONResponse
from app.models.user import User
from typing import Annotated, Union
from app.schemas.email import Email
from app.schemas.sample import Sample1, Sample2
from app.schemas.team import TeamNameReplacer
from app.utils.password_utils import get_current_active_user
from app.crud.team import TeamService

router = APIRouter()

team_service = TeamService()


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


@router.get("/invitation-link")
def generate_invitation_link(
    current_user: Annotated[User, Depends(get_current_active_user)]
):
    
    return {"url": "https://google.com"}


@router.post("/send-team-email-invitation")
def send_team_email_invitation(
    current_user: Annotated[User, Depends(get_current_active_user)], email: Email
):
    print("current_user", current_user)

    # get payload user email

    # check if email is registered or not

    # if registered then send email with redirection url using /sign-in?<some additional params>

    # if not registered then send email with redirection url using /sign-up?<some additional params>

    return {"email": "sent"}
