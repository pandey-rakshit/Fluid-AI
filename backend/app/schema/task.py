from datetime import datetime
from uuid import UUID

from pydantic import BaseModel

from app.models.task import TaskStatus


class CreateOrUpdateTaskRequest(BaseModel):
    id: UUID | None = None
    title: str
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
