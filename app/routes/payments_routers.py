from fastapi import APIRouter, Depends, HTTPException

from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.models import IPayment
from app.database import get_db
from app.schemas import IPaymentCreate, IPaymentRead

router = APIRouter()

@router.post("/payments/invoices/{invoice_id}/payments")
async def create_payment(
    invoice_id: int,
    payment: IPaymentCreate,
    db: AsyncSession = Depends(get_db)  # Inject session dependency
):
    new_payment = IPayment(
        invoice_id=invoice_id,  # Use invoice_id from the URL, not from payment object
        amount=payment.amount,
        date=payment.date,
    )
    
    db.add(new_payment)  # Add the new payment to the session
    await db.commit()  # Asynchronous commit
    await db.refresh(new_payment)  # Asynchronously refresh the object to get any changes (like auto-generated ID)
    
    return {"message": "Payment created successfully", "payment": new_payment}  # Return the newly created payment


@router.get("/payments/{invoice_id}", response_model=list[IPaymentRead])
async def list_payments(invoice_id: int, db: AsyncSession = Depends(get_db)):
    # Fetch payments filtered by the specific invoice_id
    result = await db.execute(select(IPayment).filter(IPayment.invoice_id == invoice_id))
    payments = result.scalars().all()
    return payments  # Returns the payments related to the given invoice_id
