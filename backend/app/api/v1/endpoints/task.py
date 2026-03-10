from typing import List
from uuid import UUID

from fastapi import APIRouter, Depends
from fastapi_utils.cbv import cbv

from app.core.dependencies import get_task_service
from app.schema.task import CreateOrUpdateTaskRequest, TaskResponse
from app.services.task import TaskService

router = APIRouter()


@cbv(router)
class TaskController:
    service: TaskService = Depends(get_task_service)

    @router.get("/", response_model=List[TaskResponse])
    def list_tasks(self):
        return self.service.list_tasks()

    @router.get("/{task_id}", response_model=TaskResponse)
    def get_task(self, task_id: UUID):
        return self.service.get_by_id(task_id)

    @router.post("/", response_model=TaskResponse, status_code=200)
    def save_task(self, params: CreateOrUpdateTaskRequest):
        task_id = getattr(params, "id", None)
        print(task_id)
        return self.service.save(params, task_id=task_id)

    @router.delete("/{task_id}", status_code=204)
    def delete_task(self, task_id: UUID):
        self.service.delete(task_id)
