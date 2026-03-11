# Fluid AI — Backend

REST API for the Task Manager, built with **FastAPI** following clean architecture principles — repository pattern, service layer, dependency injection, and CBV (Class Based Views).

**Live API Docs** → [fluid-ai-smoky.vercel.app/docs](https://fluid-ai-smoky.vercel.app/docs)

---

## Architecture

```
app/
├── main.py                  # FastAPI app, middleware, exception handlers
├── api/
│   └── v1/
│       ├── router.py        # Aggregates all v1 routes
│       └── endpoints/
│           └── task.py      # Task endpoints (CBV)
├── core/
│   ├── config.py            # Settings via pydantic-settings
│   ├── dependencies.py      # Dependency injection
│   ├── exceptions.py        # Custom exceptions
│   ├── error_handler.py     # Global exception handlers
│   └── middleware.py        # Request logging middleware
├── models/
│   └── task.py              # Task domain model (dataclass)
├── schema/
│   └── task.py              # Pydantic request/response schemas
├── services/
│   └── task.py              # Business logic
└── repositories/
    ├── contract.py          # Abstract base repository
    └── database.py          # JSON file storage implementation
```

**Design decisions:**
- `repositories/contract.py` defines an abstract interface
- `services/` is storage-agnostic — pure business logic only
- `core/dependencies.py` is the composition root — wiring is done in one place
- CBV with `fastapi-utils` keeps endpoint classes clean, `Depends` is injected once at the class level

---

## API Reference

**Base URL:** `/api/v1`

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/tasks/` | List all tasks |
| `POST` | `/tasks/` | Create or update a task |
| `GET` | `/tasks/{id}` | Get task by ID |
| `DELETE` | `/tasks/{id}` | Delete a task |

**Task schema:**
```json
{
  "id": "uuid",
  "title": "string",
  "description": "string | null",
  "status": "todo | in_progress | done",
  "created_at": "datetime",
  "updated_at": "datetime"
}
```

**Error response format:**
```json
{
  "error": "TaskNotFoundException",
  "message": "Task with ID <id> not found.",
  "path": "/api/v1/tasks/<id>"
}
```

---

## Local Development

**Prerequisites:** Python 3.13+, [uv](https://github.com/astral-sh/uv)

```bash
cd backend

# Install dependencies
uv sync

# Run development server
uv run uvicorn app.main:app --reload
```

API available at `http://localhost:8000`
Swagger UI at `http://localhost:8000/docs`

---

## Environment Variables

Create a `.env` file in the `backend/` directory:

```env
ALLOWED_ORIGINS=["http://localhost:3000"]
```

| Variable | Description | Default |
|---|---|---|
| `ALLOWED_ORIGINS` | Comma-separated list of allowed CORS origins | `["http://localhost:3000"]` |

---

## Deployment (Vercel)

| Setting | Value |
|---|---|
| Install command | `pip install -r requirements.txt` |
| Build command | *(leave empty)* |
| Output directory | *(leave empty)* |

Generate `requirements.txt` before deploying:

```bash
uv pip compile pyproject.toml -o requirements.txt
```

> **Note:** v1 uses JSON file storage via `/tmp` on Vercel. Data resets on cold starts. This is expected behavior for v1.

---

## Author

**Rakshit Pandey**
[github.com/pandey-rakshit](https://github.com/pandey-rakshit) · [linkedin.com/in/pandey-rakshit](https://linkedin.com/in/pandey-rakshit)
