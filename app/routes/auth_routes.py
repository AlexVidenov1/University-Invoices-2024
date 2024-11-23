from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from app.database import get_db
from app.auth_utils import create_access_token
from app.services.auth_services import authenticate_user, create_user
from pydantic import BaseModel
from sqlalchemy.future import select
from app.models import IUser

router = APIRouter()

class RegisterRequest(BaseModel):
    username: str
    password: str

class LoginRequest(BaseModel):
    username: str
    password: str

@router.post("/register")
async def register(request: RegisterRequest, db: AsyncSession = Depends(get_db)):
    existing_user = await db.execute(select(IUser).where(IUser.username == request.username))
    if existing_user.scalar_one_or_none():
        raise HTTPException(status_code=400, detail="Username already exists")
    user = await create_user(db, request.username, request.password)
    return {"message": f"Welcome {user.username}!"}

@router.post("/login")
async def login(request: LoginRequest, db: AsyncSession = Depends(get_db)):
    user = await authenticate_user(db, request.username, request.password)
    token_data = {"sub": user.username}
    access_token = create_access_token(token_data)
    return {"access_token": access_token, "token_type": "bearer"}
