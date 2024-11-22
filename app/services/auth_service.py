from sqlalchemy.orm import Session
from fastapi import HTTPException
from app.models import IUser

def login_user(db: Session, username: str, password: str):
    """
    Service function to validate user credentials.

    Args:
        db (Session): Database session.
        username (str): Provided username.
        password (str): Provided password.

    Returns:
        dict: Success message or raises HTTPException.
    """
    user = db.query(IUser).filter(IUser.username == username).first()
    if not user or user.password != password:
        raise HTTPException(status_code=401, detail="Invalid username or password")
    return {"message": "Login successful"}
