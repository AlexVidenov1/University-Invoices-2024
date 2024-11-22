from fastapi import FastAPI
from app.routes.route_client import router as client_router

app = FastAPI()

app.include_router(client_router, prefix="/clients", tags=["clients"])

@app.on_event("startup")
async def startup():
    print("Starting application")

@app.on_event("shutdown")
async def shutdown():
    print("Shutting down application")
