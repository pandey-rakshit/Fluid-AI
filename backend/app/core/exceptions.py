from uuid import UUID


class AppBaseException(Exception):
    def __init__(self, message: str, status_code: int):
        self.message = message
        self.status_code = status_code
        super().__init__(message)


class TaskNotFoundException(AppBaseException):
    def __init__(self, task_id: UUID):
        super().__init__(
            message=f"Task with ID {task_id} not found.",
            status_code=404,
        )