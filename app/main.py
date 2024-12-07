from fastapi import FastAPI
from app.routes.auth_routes import router as auth_router
from app.routes.customer_routers import router as client_router
from app.routes.invoices_routers import router as invoice_router
from app.routes.notification_router import router as notification_router
from app.routes.payments_routers import router as payment_router
from app.routes.protected_routes import router as protected_routes
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.include_router(auth_router, prefix='/auth', tags=["auth"])
app.include_router(client_router, prefix="/clients", tags=["clients"])
app.include_router(protected_routes, prefix='/protected', tags=["Protected"])
app.include_router(invoice_router, prefix="/invoices", tags=["invoices"])
app.include_router(payment_router, prefix="/payments", tags=["payments"])
app.include_router(notification_router, prefix="/notifications", tags=["notifications"])

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Replace with your frontend's origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def startup():
    print("Starting application")

@app.on_event("shutdown")
async def shutdown():
    print("Shutting down application")
