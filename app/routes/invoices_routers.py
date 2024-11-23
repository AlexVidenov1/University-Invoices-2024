from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.models import IInvoice
from app.database import get_db
from app.schemas import IInvoiceCreate, IInvoiceRead  # Import Pydantic schemas

router = APIRouter()

@router.post("/invoices", response_model=IInvoiceRead)
async def create_invoice(invoice: IInvoiceCreate, db: AsyncSession = Depends(get_db)):
    new_invoice = IInvoice(**invoice.dict())  # Convert Pydantic model to SQLAlchemy model
    db.add(new_invoice)
    await db.commit()
    await db.refresh(new_invoice)
    return new_invoice  # Automatically converted to IInvoiceRead

@router.get("/invoices", response_model=list[IInvoiceRead])
async def list_invoices(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(IInvoice))
    invoices = result.scalars().all()
    return invoices  # Converted to list of IInvoiceRead

@router.get("/invoices/{invoice_id}", response_model=IInvoiceRead)
async def get_invoice(invoice_id: int, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(IInvoice).where(IInvoice.id == invoice_id))
    invoice = result.scalar_one_or_none()
    if not invoice:
        raise HTTPException(status_code=404, detail="Invoice not found")
    return invoice  # Automatically converted to IInvoiceRead
