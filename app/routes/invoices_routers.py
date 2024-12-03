from typing import List
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
    
    response_data = {
        **new_invoice.__dict__,
        "date": new_invoice.date.isoformat(),
        "due_date": new_invoice.due_date.isoformat(),
    }
    
    return response_data



@router.get("/invoices", response_model=List[IInvoiceRead])
async def list_invoices(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(IInvoice))
    invoices = result.scalars().all()
    return [
        IInvoiceRead(
            id=invoice.id,
            status=invoice.status,
            customer_id=invoice.customer_id,
            date=invoice.date.isoformat(),
            due_date=invoice.due_date.isoformat(),
            type=invoice.type,
            value=invoice.value,
            number=invoice.number,
            comment=invoice.comment,
        )
        for invoice in invoices
    ]

@router.get("/invoices/{invoice_id}", response_model=IInvoiceRead)
async def get_invoice(invoice_id: int, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(IInvoice).where(IInvoice.id == invoice_id))
    invoice = result.scalar_one_or_none()
    if not invoice:
        raise HTTPException(status_code=404, detail="Invoice not found")

  
    return IInvoiceRead(
        id=invoice.id,
        status=invoice.status,
        customer_id=invoice.customer_id,
        date=invoice.date.isoformat(),
        due_date=invoice.due_date.isoformat(),
        type=invoice.type,
        value=invoice.value,
        number=invoice.number,
        comment=invoice.comment,
    )


@router.put("/invoices/{invoice_id}", response_model=IInvoiceRead)
async def update_invoice(
    invoice_id: int,
    updated_invoice: IInvoiceCreate,
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(select(IInvoice).where(IInvoice.id == invoice_id))
    invoice = result.scalar_one_or_none()

    if not invoice:
        raise HTTPException(status_code=404, detail="Invoice not found")

    for key, value in updated_invoice.dict().items():
        setattr(invoice, key, value)

    db.add(invoice)
    await db.commit()
    await db.refresh(invoice)

    return IInvoiceRead(
        id=invoice.id,
        status=invoice.status,
        customer_id=invoice.customer_id,
        date=invoice.date.isoformat(),
        due_date=invoice.due_date.isoformat(),
        type=invoice.type,
        value=invoice.value,
        number=invoice.number,
        comment=invoice.comment,
    )

@router.get("/invoices/client/{customer_id}", response_model=list[IInvoiceRead])
async def get_invoices_by_client_id(
    customer_id: int,
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(select(IInvoice).where(IInvoice.customer_id == customer_id))
    invoices = result.scalars().all()

    if not invoices:
        raise HTTPException(status_code=404, detail="No invoices found for this client")

    # Serialize each SQLAlchemy object into a Pydantic model
    return [IInvoiceRead.model_validate(invoice) for invoice in invoices]

