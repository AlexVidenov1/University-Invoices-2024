from pydantic import BaseModel, EmailStr
from typing import List, Optional
from datetime import datetime
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


class CustomerCreate(BaseModel):
    fullname: str
    email: EmailStr
    phone: str
    address: str

from pydantic import BaseModel
from typing import Optional, List

# Pydantic Model for Creating a Customer
class ICustomerCreate(BaseModel):
    name: str
    surname: str
    email: str
    address: str

# Pydantic Model for Reading a Customer
class ICustomerRead(BaseModel):
    id: int
    name: str
    surname: str
    email: str
    address: str

    class Config:
        orm_mode = True  # Enables reading SQLAlchemy objects directly


# Pydantic Model for Creating an Invoice
class IInvoiceCreate(BaseModel):
    customer_id: int
    amount: float
    due_date: date

# Pydantic Model for Reading an Invoice
class IInvoiceRead(BaseModel):
    id: int
    customer_id: int
    amount: float
    due_date: date

    class Config:
        from_attributes = True  # Pydantic v2 replacement for `orm_mode`


# Schema for creating a payment
class IPaymentCreate(BaseModel):
    invoice_id: int
    amount: float
    payment_date: datetime

# Schema for reading a payment
class IPaymentRead(BaseModel):
    id: int
    invoice_id: int
    amount: float
    payment_date: datetime

    class Config:
        from_attributes = True  # Needed for SQLAlchemy-to-Pydantic conversion
