from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from app.database import get_db
from app.models import IInvoice, IStatusEnum
from datetime import datetime
from sqlalchemy.future import select

router = APIRouter()

@router.get("/notifications/overdue")
async def get_overdue_invoices(db: AsyncSession = Depends(get_db)):
    today = datetime.today().date()
    result = await db.execute(
        select(IInvoice)
        .where(
            IInvoice.due_date < today,
            IInvoice.status != IStatusEnum.paid
        )
    )
    overdue_invoices = result.scalars().all()
    return overdue_invoices
