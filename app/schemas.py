from pydantic import BaseModel, EmailStr
from typing import List, Optional
from datetime import date

class PaymentBase(BaseModel):
    date: date
    amount: float

class PaymentCreate(PaymentBase):
    pass

class Payment(PaymentBase):
    id: int

    class Config:
        orm_mode = True

class InvoiceBase(BaseModel):
    number: str
    date: date
    due_date: date
    type: str
    value: float
    status: str = "unpaid"

class InvoiceCreate(InvoiceBase):
    client_id: int

class Invoice(InvoiceBase):
    id: int
    payments: List[Payment] = []

    class Config:
        orm_mode = True

class ClientBase(BaseModel):
    name: str
    surname: str
    email: EmailStr
    address: str

class ClientCreate(ClientBase):
    pass

class Client(ClientBase):
    id: int
    invoices: List[Invoice] = []

    class Config:
        orm_mode = True
