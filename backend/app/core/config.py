import os

from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    allowed_origins: list[str] = ['http://localhost:3000']
    storage_path: str = "/tmp/tasks.json" if os.getenv("VERCEL") else "storage/tasks.json"

    class Config:
        env_file = '.env'

settings = Settings()