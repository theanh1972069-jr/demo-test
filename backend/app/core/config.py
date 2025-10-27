# File: app/core/config.py (Phần được sửa đổi)

from functools import lru_cache
from typing import (
    Any,
    Dict,
    Optional,
)
from pydantic import (
    BaseSettings,
    PostgresDsn,
    validator
)


class Settings(BaseSettings):
    PROJECT_NAME: str = "FastAPI School Management System"
    API_V1_STR: str = "/api/v1"
    
    DB_HOST: str
    DB_USER: str
    DB_PASSWORD: str
    DB_NAME: str
    DB_PORT: str = "5432" # Thêm cổng với giá trị mặc định là 5432 (Nếu không có trong .env)

    SQLALCHEMY_DATABASE_URI: Optional[PostgresDsn] = None

    # @validator("SQLALCHEMY_DATABASE_URI", pre=True)
    # def assemble_db_connection(
    #     cls, v: Optional[str], values: Dict[str, Any]
    # ) -> Any:
    #     if isinstance(v, str):
    #         return v
    #     return PostgresDsn.build(
    #         scheme="postgresql",
    #         user=values.get("DB_USER"),
    #         password=values.get("DB_PASSWORD"),
    #         host=values.get("DB_HOST"),
    #         port=values.get("DB_PORT"), # Bổ sung Port vào đây
    #         path=f"/{values.get('DB_NAME') or  ''}",
    #     )

    def assemble_db_connection(
        cls, v: Optional[str], values: Dict[str, Any]
    ) -> Any:
        if isinstance(v, str):
            return v
        # Sử dụng dialect 'mysql+pymysql'
        return f"mysql+pymysql://{values.get('DB_USER')}:{values.get('DB_PASSWORD')}@{values.get('DB_HOST')}:{values.get('DB_PORT')}/{values.get('DB_NAME')}"

    class Config:
        case_sensitive = True
        env_file = ".env"


# ... Phần còn lại của file giữ nguyên


@lru_cache
def get_settings():
    return Settings()


settings = get_settings()
