# Built-in imports
from typing import Optional, Union
import uuid

# External imports
from aws_lambda_powertools import Logger


def custom_logger(
    correlation_id: Optional[Union[str, uuid.UUID, None]] = None
) -> Logger:
    """Returns a custom <aws_lambda_powertools.Logger> Object."""
    return Logger(
        service="todo-app",
        log_uncaught_exceptions=True,
        owner="Eka Prasetyo",
        correlation_id=correlation_id,
    )
