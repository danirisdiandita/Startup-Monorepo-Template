from fastapi import APIRouter, Body, Depends
from fastapi.responses import JSONResponse
from app.crud.user import UserService
from app.models.user import User
from typing import Annotated, Union
from app.models.user_team import Access, Role, UserTeam
from app.schemas.email import Email
from app.schemas.sample import Sample1, Sample2
from app.schemas.team import TeamEmailInvitationEmail, TeamNameReplacer, TeamValidation
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
    email: TeamEmailInvitationEmail,
):

    invitation_token = password_utils.create_access_token(
        data={
            "sub": email.recipient,
            "email": email.recipient, 
            "sender_email": current_user.email,
            "recipient_email": email.recipient,
            "token_type": constants.token_type_invitation_link,
        }
    )

    # check if recipient within database or not

    recipient_data = user_service.get_one_user_by_email(User(email=email.recipient))
    
    # create a user_id to team relation to the database 
    

    is_user_registered = False

    if len(recipient_data) > 0:
        is_user_registered = True
        
    user_id = None 
    user_email = email.recipient 
    team_id = email.team_id 
    role = Role.member 
    access = Access.view 
    verified = False 
    
    if is_user_registered: 
        # extract user_id 
        user_id = recipient_data[0].get('id')
        
    user_team_ = UserTeam(
        user_id=user_id, 
        user_email=user_email, 
        team_id=team_id, 
        role=role, 
        access=access, 
        verified=verified 
    )
    
    team_service.create_new_team_user_relation(user_team=user_team_)

    return JSONResponse(
        status_code=200,
        content={"link": invitation_token, "is_user_registered": is_user_registered},
    )


@router.post("/send-team-email-invitation")
def send_team_email_invitation(
    current_user: Annotated[User, Depends(get_current_active_user)],
    email: Email,
):
    # just sending email

    user_service.send_email(
        body=email.body,
        subject=email.subject,
        from_email=email.sender,
        to_email=email.recipient,
    )
    return {"email": "sent"}

@router.post("/validate-team-invitation")
def validate_team_invitation(
    current_user: Annotated[User, Depends(get_current_active_user)], 
    team_validation: TeamValidation 
): 
    
    
    # print("team_validation.invite_link", team_validation.invite_link)

    result = team_service.validate_and_insert_user_team_s(current_user, team_validation.invite_link)

    return JSONResponse(status_code=200, content=result.dict())