from sqlalchemy import Column, Integer, String, Numeric, Date, ForeignKey
from sqlalchemy.orm import relationship
from app.database import Base

class Client(Base):
    __tablename__ = "clients"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    surname = Column(String, index=True)
    email = Column(String, unique=True, index=True)
    address = Column(String)

    invoices = relationship("Invoice", back_populates="client")

class Invoice(Base):
    __tablename__ = "invoices"

    id = Column(Integer, primary_key=True, index=True)
    client_id = Column(Integer, ForeignKey("clients.id"))
    number = Column(String, unique=True, index=True)
    date = Column(Date)
    due_date = Column(Date)
    type = Column(String)  # income/expense
    status = Column(String, default="unpaid")
    value = Column(Numeric(10, 2))

    client = relationship("Client", back_populates="invoices")
    payments = relationship("Payment", back_populates="invoice")

class Payment(Base):
    __tablename__ = "payments"

    id = Column(Integer, primary_key=True, index=True)
    invoice_id = Column(Integer, ForeignKey("invoices.id"))
    date = Column(Date)
    amount = Column(Numeric(10, 2))

    invoice = relationship("Invoice", back_populates="payments")
