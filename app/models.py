from sqlalchemy import BigInteger, Column, Integer, String, Float, Date, ForeignKey, Enum
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base
from enum import Enum as PyEnum

Base = declarative_base()

class ITypeEnum(PyEnum):
    income = "income"
    expense = "expense"

class IStatusEnum(PyEnum):
    unpaid = "unpaid"
    partially_paid = "partially_paid"
    paid = "paid"

class ICustomer(Base):
    __tablename__ = "customers"

    id = Column(Integer, primary_key=True, index=True)  # ID на контрагент
    name = Column(String, nullable=True)  # Име (за физическо лице)
    surname = Column(String, nullable=True)  # Фамилия (за физическо лице)
    fullname = Column(String, nullable=True)  # Наименование (за юридическо лице)
    egn = Column(BigInteger, nullable=True, unique=True)  # ЕГН
    bulstat = Column(BigInteger, nullable=True, unique=True)  # БУЛСТАТ
    email = Column(String, unique=True, nullable=False)  # Email
    phone = Column(String, nullable=True)  # Телефон
    address = Column(String, nullable=True)  # Адрес за кореспонденция

    invoices = relationship("IInvoice", back_populates="customer")

class IInvoice(Base):
    __tablename__ = "invoices"

    id = Column(Integer, primary_key=True, index=True)
    number = Column(String(10), unique=True, nullable=False)
    date = Column(Date, nullable=False)
    due_date = Column(Date, nullable=False)
    type = Column(Enum(ITypeEnum), nullable=False)
    value = Column(Float, nullable=False)
    status = Column(Enum(IStatusEnum), default=IStatusEnum.unpaid, nullable=False)
    comment = Column(String(400), nullable=True)  # Ensure this line exists

    customer_id = Column(Integer, ForeignKey("customers.id"), nullable=False)
    customer = relationship("ICustomer", back_populates="invoices")

    payments = relationship("IPayment", back_populates="invoice")


class IPayment(Base):
    __tablename__ = "payments"

    id = Column(Integer, primary_key=True, index=True)  # ID на плащане
    date = Column(Date, nullable=False)  # Дата на плащане
    amount = Column(Float, nullable=False)  # Сума (>0)

    invoice_id = Column(Integer, ForeignKey("invoices.id"), nullable=False)  # ID на фактура
    invoice = relationship("IInvoice", back_populates="payments")

class IType(Base):
    __tablename__ = "invoice_types"

    id = Column(Integer, primary_key=True, index=True)  # ID на вид
    name = Column(String(20), nullable=False, unique=True)  # Наименование на вида

class IUser(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)  # ID
    username = Column(String, unique=True, index=True)  # Username
    password = Column(String, nullable=False)  # Hashed password
