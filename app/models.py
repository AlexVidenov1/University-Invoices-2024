from sqlalchemy import Column, Integer, String, Float, Date, ForeignKey, Enum
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base
from enum import Enum as PyEnum

Base = declarative_base()

# Enum for Invoice Type and Status
class ITypeEnum(PyEnum):
    income = "income"
    expense = "expense"

class IStatusEnum(PyEnum):
    unpaid = "unpaid"
    partially_paid = "partially_paid"
    paid = "paid"

# ICustomer Model
class ICustomer(Base):
    __tablename__ = "customers"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    surname = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False)
    address = Column(String, nullable=False)

    # Relationship with IInvoice
    invoices = relationship("IInvoice", back_populates="customer")

# IInvoice Model
class IInvoice(Base):
    __tablename__ = "invoices"

    id = Column(Integer, primary_key=True, index=True)
    number = Column(String, unique=True, nullable=False)
    date = Column(Date, nullable=False)
    due_date = Column(Date, nullable=False)
    type = Column(Enum(ITypeEnum), nullable=False)
    value = Column(Float, nullable=False)
    status = Column(Enum(IStatusEnum), default=IStatusEnum.unpaid, nullable=False)

    customer_id = Column(Integer, ForeignKey("customers.id"), nullable=False)
    customer = relationship("ICustomer", back_populates="invoices")

    # Relationship with IPayment
    payments = relationship("IPayment", back_populates="invoice")

# IPayment Model
class IPayment(Base):
    __tablename__ = "payments"

    id = Column(Integer, primary_key=True, index=True)
    date = Column(Date, nullable=False)
    amount = Column(Float, nullable=False)

    invoice_id = Column(Integer, ForeignKey("invoices.id"), nullable=False)
    invoice = relationship("IInvoice", back_populates="payments")

# IType Model
class IType(Base):
    __tablename__ = "invoice_types"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False, unique=True)
