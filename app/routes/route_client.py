from fastapi import APIRouter

router = APIRouter()

@router.get("/")
async def get_clients():
    return {"message": "List of clients"}

@router.post("/")
async def create_client(client: dict):
    return {"message": f"Client {client.get('name')} created successfully"}
