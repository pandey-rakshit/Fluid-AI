import json
import logging

from fastapi import Request

logger = logging.getLogger("uvicorn")


async def log_request_middleware(request: Request, call_next):
    body = await request.body()
    if body:
        try:
            parsed = json.loads(body)
            logger.info(f"[{request.method}] {request.url.path} → {json.dumps(parsed, indent=2)}")
        except json.JSONDecodeError:
            logger.info(f"[{request.method}] {request.url.path} → {body.decode()}")
    else:
        logger.info(f"[{request.method}] {request.url.path}")

    return await call_next(request)