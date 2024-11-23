from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.models import IPayment
from app.database import get_db
from app.schemas import IPaymentCreate, IPaymentRead

router = APIRouter()

@router.post("/invoices/{invoice_id}/payments", response_model=IPaymentRead)
async def create_payment(invoice_id: int, payment: IPaymentCreate, db: AsyncSession = Depends(get_db)):
    new_payment = IPayment(**payment.dict())  # Convert Pydantic to SQLAlchemy
    db.add(new_payment)
    await db.commit()
    await db.refresh(new_payment)
    return new_payment  # Automatically serialized to IPaymentRead

@router.get("/payments", response_model=list[IPaymentRead])
async def list_payments(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(IPayment))
    payments = result.scalars().all()
    return payments  # Serialized to list of IPaymentRead
