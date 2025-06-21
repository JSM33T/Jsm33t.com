from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from dotenv import load_dotenv
from api.apps.chat.app import router as chat_router

load_dotenv()  # Load .env file

app = FastAPI()
app.include_router(chat_router, prefix="/chat", tags=["Chat"])

@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    mock_log_exception(exc)
    return JSONResponse(
        status_code=500,
        content={"error": "An internal error occurred. Please try again later."}
    )

def mock_log_exception(exc: Exception):
    print(f"[EXCEPTION LOGGED] {exc}")
