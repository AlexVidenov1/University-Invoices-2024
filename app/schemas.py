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

class ICustomerCreate(BaseModel):
    name: str
    surname: str
    fullname: str
    egn: int
    bulstat: int
    email: str
    phone: str
    address: str

class ICustomerRead(BaseModel):
    id: int
    name: str
    surname: str
    email: str
    address: str

    class Config:
        orm_mode = True  

class IInvoiceCreate(BaseModel):
    customer_id: int
    amount: float
    due_date: date 
    ## TO DO

class IInvoiceRead(BaseModel):
    id: int
    customer_id: int
    amount: float
    due_date: date

    class Config:
        from_attributes = True 


class IPaymentCreate(BaseModel):
    invoice_id: int
    amount: float
    payment_date: datetime

class IPaymentRead(BaseModel):
    id: int
    invoice_id: int
    amount: float
    payment_date: datetime

    class Config:
        from_attributes = True 
