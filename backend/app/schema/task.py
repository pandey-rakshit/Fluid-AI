
from datetime import datetime
from uuid import UUID

from pydantic import BaseModel

from app.model.task import TaskStatus


class CreateTaskRequest(BaseModel):
    title: str
    description: str | None = None

class UpdateTaskRequest(BaseModel):
    title: str | None = None
    description: str | None = None
    status: TaskStatus | None = None

class TaskResponse(BaseModel):
    id: UUID
    title: str
    description: str | None = None
    status: TaskStatus
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True