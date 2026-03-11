from app.repositories.database import TaskRepository
from app.services.task import TaskService

from app.core.config import settings


def get_task_service():
    return TaskService(repository=TaskRepository(filepath=settings.storage_path))
