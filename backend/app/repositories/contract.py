from abc import ABC, abstractmethod
from typing import List
from uuid import UUID

from app.models.task import Task


class ContractTaskRepository(ABC):

    @abstractmethod
    def get_all(self) -> List[Task]:
        raise NotImplementedError

    @abstractmethod
    def get_by_id(self, id: UUID) -> Task | None:
        raise NotImplementedError

    @abstractmethod
    def save(self, task: Task) -> Task:
        raise NotImplementedError

    @abstractmethod
    def delete(self, id: UUID) -> None:
        raise NotImplementedError
