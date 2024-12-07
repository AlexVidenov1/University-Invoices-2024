from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.orm import sessionmaker
from app.models import Base

DATABASE_URL = "postgresql+asyncpg://postgres:admin@localhost/invoice_tracking"

# Async database engine
engine = create_async_engine(DATABASE_URL, echo=True)

# Async session factory
AsyncSessionLocal = sessionmaker(bind=engine, class_=AsyncSession, expire_on_commit=False)

# Dependency for getting async DB session
async def get_db() -> AsyncSession:
    async with AsyncSessionLocal() as session:
        yield session
