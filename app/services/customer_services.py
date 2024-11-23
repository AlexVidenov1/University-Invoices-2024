from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.models import ICustomer
from fastapi import HTTPException

async def list_customers(db: AsyncSession):
    result = await db.execute(select(ICustomer))
    return result.scalars().all()

async def create_customer(db: AsyncSession, customer: ICustomer):
    db.add(customer)
    await db.commit()
    await db.refresh(customer)
    return customer

async def get_customer(db: AsyncSession, customer_id: int):
    result = await db.execute(select(ICustomer).where(ICustomer.id == customer_id))
    customer = result.scalar_one_or_none()
    if not customer:
        raise HTTPException(status_code=404, detail="Customer not found")
    return customer
