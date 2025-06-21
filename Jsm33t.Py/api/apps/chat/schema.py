from pydantic import BaseModel
from typing import Optional

class ChatRequest(BaseModel):
    message: str
    system: Optional[str] = "You are a helpful assistant. who reads through the context and responds accordingly"

class ChatResponse(BaseModel):
    reply: str
