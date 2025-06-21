from fastapi import APIRouter
from .schema import ChatRequest, ChatResponse
from .service import get_chat_reply

router = APIRouter()

@router.post("/", response_model=ChatResponse)
def chat_endpoint(request: ChatRequest):
    reply = get_chat_reply(request.message, request.system)
    return ChatResponse(reply=reply)
