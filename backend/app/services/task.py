from datetime import datetime, timezone
from typing import List
from uuid import UUID

from app.core.exceptions import TaskNotFoundException
from app.models.task import Task
from app.repositories.contract import ContractTaskRepository
from app.schema.task import CreateOrUpdateTaskRequest


class TaskService:

    def __init__(self, repository: ContractTaskRepository):
        self._repo = repository

    def list_tasks(self) -> List[Task]:
        return self._repo.get_all()

    def get_by_id(self, id: UUID) -> Task:
        task = self._repo.get_by_id(id)
        if not task:
            raise TaskNotFoundException(id)
        return task

    def save(self, params: CreateOrUpdateTaskRequest, task_id: UUID | None = None) -> Task:
        if task_id:
            task = self.get_by_id(task_id)  # reuse — raises if not found
            updates = params.model_dump(exclude_unset=True)
            has_changes = any(getattr(task, key) != value for key, value in updates.items())
            if not has_changes:
                return task
            for field, value in updates.items():
                setattr(task, field, value)
            task.updated_at = datetime.now(timezone.utc)
        else:
<<<<<<< Updated upstream
            task = Task(title=params.title, description=params.description)
=======
            task = Task(title=params.title, description=params.description, status=params.status)
>>>>>>> Stashed changes

        return self._repo.save(task)

    def delete(self, task_id: UUID) -> bool:
        self.get_by_id(task_id)  # raises if not found
        return self._repo.delete(task_id)