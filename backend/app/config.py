from pathlib import Path

from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    APP_ENV: str = "dev"
    CORS_ALLOWED_ORIGINS: str = "http://localhost:5173,http://127.0.0.1:5173"
    OPENROUTER_API_KEY: str = ""
    OPENROUTER_BASE_URL: str = "https://openrouter.ai/api/v1"
    CHAT_MODEL: str = "anthropic/claude-sonnet-4.5"
    DATABASE_PATH: str = "aibutler.sqlite3"

    class Config:
        env_file = ".env"
        extra = "ignore"

    @property
    def database_file(self) -> Path:
        path = Path(self.DATABASE_PATH)
        if path.is_absolute():
            return path
        return Path(__file__).resolve().parents[1] / path


settings = Settings()

