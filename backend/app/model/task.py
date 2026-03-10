from dataclasses import dataclass, field
from datetime import datetime, timezone

from uuid import UUID, uuid4

from enum import Enum

class TaskStatus(str, Enum):
    TODO = "TODO"
    IN_PROGRESS = "IN_PROGRESS"
    DONE = "DONE"

@dataclass
class Task:
    title: str
    id: UUID = field(default_factory=uuid4)
    description: str | None = None
    status: TaskStatus = TaskStatus.TODO
    created_at: datetime = field(default_factory=lambda: datetime.now(timezone.utc))
    updated_at: datetime = field(default_factory=lambda: datetime.now(timezone.utc))