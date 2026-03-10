from fastapi import FastAPI

from app.api.v1.router import router as v1_router
from app.core.error_handler import app_exception_handler
from app.core.exceptions import AppBaseException

app = FastAPI(title="Task Manager", version="1.0.0")

app.add_exception_handler(AppBaseException, app_exception_handler)
app.include_router(v1_router, prefix="/api/v1")


@app.get("/")
async def read_root():
    return {"Hello": "World"}


@app.get("/health")
async def health_check():
    return {"status": "healthy"}
