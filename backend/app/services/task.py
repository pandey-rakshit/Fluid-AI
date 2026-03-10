from datetime import datetime
from typing import List
from uuid import UUID

from app.models.task import Task
from app.repositories.contract import ContractTaskRepository
from app.schema.task import CreateTaskRequest, UpdateTaskRequest


class TaskService:

    def __init__(self, repository: ContractTaskRepository):
        self._repo = repository

    def get_all(self) -> List[Task]:
        return self._repo.get_all()

    def get_by_id(self, id: UUID) -> Task | None:
        return self._repo.get_by_id(id)

    def save(
        self,
        params: CreateTaskRequest | UpdateTaskRequest,
        task_id: UUID | None = None
    ) -> Task | None:
        if task_id:
            task = self._repo.get_by_id(task_id)
            if not task:
                return None

            updates = params.model_dump(exclude_unset=True)
            has_changes = any(
                getattr(task, key) != value for key, value in updates.items()
            )

            if not has_changes:
                return task

            for field, value in updates.items():
                setattr(task, field, value)

            task.updated_at = datetime.now(datetime.timezone.utc)
        else:
            task = Task(title=params.title, description=params.description)

            return self._repo.save(task)
    
    def delete(self, task_id: UUID) -> bool:
        task = self._repo.get_by_id(task_id)
        if not task:
            return False

        return self._repo.delete(task_id)
