from fastapi import APIRouter, Depends
from fastapi.responses import JSONResponse
from app.models.user import User
from typing import  Annotated
from app.utils.password_utils import get_current_active_user
from app.crud.team import TeamService 
router = APIRouter()


team_service = TeamService() 



@router.get('/default-team-members')
def get_default_team_members(current_user: Annotated[User, Depends(get_current_active_user)]): 
    output = team_service.get_default_team_member_of_a_user(current_user)
    return JSONResponse(status_code=200, content=output)