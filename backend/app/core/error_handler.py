from fastapi import Request
from fastapi.responses import JSONResponse

from app.core.exceptions import AppBaseException


async def app_exception_handler(request: Request, exc: AppBaseException) -> JSONResponse:
    return JSONResponse(
        status_code=exc.status_code,
        content={
            "error": exc.__class__.__name__,
            "message": exc.message,
            "path": request.url.path,
        },
    )