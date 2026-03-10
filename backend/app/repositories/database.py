import json
from datetime import datetime
from pathlib import Path
from typing import Dict, List
from uuid import UUID

from app.models.task import Task, TaskStatus
from app.repositories.contract import ContractTaskRepository


class TaskRepository(ContractTaskRepository):
    def __init__(self, filepath: str = "storage/tasks.json"):
        self._path = Path(filepath)
        self._path.parent.mkdir(parents=True, exist_ok=True)
        if not self._path.exists():
            self._path.write_text("[]")

    def _load(self) -> List[Dict]:
        return json.loads(self._path.read_text())

    def _dump(self, tasks: List[Dict]) -> None:
        self._path.write_text(json.dumps(tasks, indent=4, default=str))

    def _to_model(self, data: Dict) -> Task:
        return Task(
            id=data["id"],
            title=data["title"],
            description=data["description"],
            status=TaskStatus(data["status"]),
            created_at=datetime.fromisoformat(data["created_at"]),
            updated_at=datetime.fromisoformat(data["updated_at"]),
        )

    def _to_dict(self, task: Task) -> Dict:
        return {
            "id": task.id,
            "title": task.title,
            "description": task.description,
            "status": task.status.value,
            "created_at": task.created_at.isoformat(),
            "updated_at": task.updated_at.isoformat(),
        }

    def get_all(self) -> List[Task]:
        data = self._load()
        return [self._to_model(item) for item in data]

    def get_by_id(self, id: UUID) -> Task | None:
        data = self._load()
        for item in data:
            if item["id"] == id:
                return self._to_model(item)
        return None

    def save(self, task: Task) -> Task:
        tasks = self._load()
        for i, item in enumerate(tasks):
            if item["id"] == task.id:
                tasks[i] = self._to_dict(task)
                self._dump(tasks)
                return task
        tasks.append(self._to_dict(task))
        self._dump(tasks)
        return task

    def delete(self, id: UUID) -> None:
        tasks = self._load()
        tasks = [item for item in tasks if item["id"] != id]
        self._dump(tasks)
