from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.models import ICustomer
from app.database import get_db
from app.schemas import ICustomerCreate, ICustomerRead  # Import Pydantic schemas
from typing import List  # Import List type from typing module
from sqlalchemy.orm import selectinload

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
    result = await db.execute(select(ICustomer).options(selectinload(ICustomer.invoices)))
    customers = result.scalars().all()
    return customers

@router.get("/customers/{customer_id}", response_model=ICustomerRead)
async def get_customer(customer_id: int, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(ICustomer).where(ICustomer.id == customer_id))
    customer = result.scalar_one_or_none()
    if not customer:
        raise HTTPException(status_code=404, detail="Customer not found")
    return customer

@router.put("/customers/{customer_id}", response_model=ICustomerRead)
async def edit_customer(
    customer_id: int,
    customer_data: ICustomerCreate,  # Pydantic schema with the fields to update
    db: AsyncSession = Depends(get_db)
):
    # Fetch the existing customer from the database
    result = await db.execute(select(ICustomer).where(ICustomer.id == customer_id))
    customer = result.scalar_one_or_none()

    if not customer:
        raise HTTPException(status_code=404, detail="Customer not found")

    # Update the customer's fields with the new data
    for key, value in customer_data.dict(exclude_unset=True).items():
        setattr(customer, key, value)

    # Commit the changes to the database
    await db.commit()
    await db.refresh(customer)  # Refresh to get the updated object from the DB

    return customer  # Return the updated customer data as response