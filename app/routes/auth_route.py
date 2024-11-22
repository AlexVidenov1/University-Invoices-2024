from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.services.auth_service import login_user

router = APIRouter()

@router.post("/login")
def login(username: str, password: str, db: Session = Depends(get_db)):
    """
    Login endpoint to authenticate a user.

    Args:
        username (str): The username provided by the user.
        password (str): The password provided by the user.
        db (Session): The database session.

    Returns:
        dict: A success message if credentials are valid.
    """
    return login_user(db, username, password)
