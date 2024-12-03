from pydantic import BaseModel, EmailStr, field_validator
from typing import List, Optional
from datetime import datetime
from datetime import date

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
    number: str
    date: date
    due_date: date
    type: str
    value: float
    status: str
    comment: Optional[str] = None
    customer_id: int


class IInvoiceRead(BaseModel):
    id: int
    status: str
    customer_id: int
    date: str  # Explicitly marked as a string
    due_date: str
    type: str
    value: float
    number: str
    comment: Optional[str] = None

    model_config = {
        "from_attributes": True,  # Replaces `orm_mode=True` in Pydantic v2
    }

    # Automatically convert `date` and `due_date` to strings during validation
    @field_validator("date", "due_date", mode="before")
    @classmethod
    def convert_date_to_string(cls, value):
        if isinstance(value, date):  # Check if it's a date object
            return value.isoformat()  # Convert to ISO 8601 string
        return value

class IPaymentCreate(BaseModel):
    invoice_id: int
    amount: float
    date: datetime  # Rename from `payment_date` to `date` to match SQLAlchemy model

class IPaymentRead(BaseModel):
    id: int
    invoice_id: int
    amount: float
    date: datetime  # Rename from `payment_date` to `date`

    model_config = {
        "from_attributes": True,  # Enable ORM compatibility
    }
