from sqlalchemy import create_engine
from models import Base

# Define the database URL
DATABASE_URL = "postgresql://postgres:NqkoidenshesumtejukMilioner111@localhost:5432/invoice_tracking"

# Create an engine that connects to the database
engine = create_engine(DATABASE_URL)

# Create all tables defined in the Base metadata
Base.metadata.create_all(bind=engine)

print("Tables created successfully!")
