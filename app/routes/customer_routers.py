from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.models import ICustomer
from app.database import get_db
from app.schemas import ICustomerCreate, ICustomerRead  # Import Pydantic schemas
from typing import List  # Import List type from typing module

router = APIRouter()

@router.post("/customers", response_model=ICustomerRead)
async def create_customer(customer: ICustomerCreate, db: AsyncSession = Depends(get_db)):
    new_customer = ICustomer(**customer.dict())  # Create SQLAlchemy model from Pydantic model
    db.add(new_customer)
    await db.commit()
    await db.refresh(new_customer)
    return new_customer  # Automatically serialized to ICustomerRead

@router.get("/customers", response_model=List[ICustomerRead])
async def list_customers(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(ICustomer))
    customers = result.scalars().all()
    return customers

@router.get("/customers/{customer_id}", response_model=ICustomerRead)
async def get_customer(customer_id: int, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(ICustomer).where(ICustomer.id == customer_id))
    customer = result.scalar_one_or_none()
    if not customer:
        raise HTTPException(status_code=404, detail="Customer not found")
    return customer
