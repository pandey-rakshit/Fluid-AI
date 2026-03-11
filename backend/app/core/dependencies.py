from app.repositories.database import TaskRepository
from app.services.task import TaskService


def get_task_service():
    return TaskService(repository=TaskRepository())
