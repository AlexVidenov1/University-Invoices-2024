from fastapi import APIRouter, Depends
from app.auth_utils import get_current_user

router = APIRouter()

@router.get("/protected")
def read_protected_route(current_user: dict = Depends(get_current_user)):
    """
    Example of a protected route.

    Args:
        current_user (dict): User data extracted from the token.

    Returns:
        dict: A welcome message for the authenticated user.
    """
    return {"message": f"Welcome {current_user['username']}!"}

