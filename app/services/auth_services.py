from passlib.context import CryptContext
from sqlalchemy import select
from sqlalchemy.orm import Session
from sqlalchemy.ext.asyncio import AsyncSession
from fastapi import HTTPException
from app.models import IUser

# Initialize passlib context for hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

def hash_password(password: str) -> str:
    return pwd_context.hash(password)

async def authenticate_user(db: AsyncSession, username: str, password: str) -> IUser:
    result = await db.execute(select(IUser).where(IUser.username == username))
    user = result.scalar_one_or_none()

    if not user or not verify_password(password, user.password):
        raise HTTPException(status_code=400, detail="Invalid credentials")
    return user

async def create_user(db: AsyncSession, username: str, password: str) -> IUser:
    hashed_password = hash_password(password)
    user = IUser(username=username, password=hashed_password)
    db.add(user)
    await db.commit()
    await db.refresh(user)
    return user