import os
import faiss
import pickle
from dotenv import load_dotenv
from openai import OpenAI
from sentence_transformers import SentenceTransformer

load_dotenv()
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
    
# === Config ===
INDEX_PATH = "static/index/doc_index.faiss"
META_PATH = "static/index/metadata.pkl"
MODEL_NAME = "all-MiniLM-L6-v2"
TOP_K = 5
MAX_CONTEXT_CHARS = 4000

# === Validate index and metadata files ===
if not os.path.exists(INDEX_PATH):
    print(f"[ERROR] FAISS index file not found: {INDEX_PATH}")
    exit(1)

if not os.path.exists(META_PATH):
    print(f"[ERROR] Metadata file not found: {META_PATH}")
    exit(1)

# === Load FAISS + metadata + model once ===
index = faiss.read_index(INDEX_PATH)
with open(META_PATH, "rb") as f:
    metadata = pickle.load(f)
model = SentenceTransformer(MODEL_NAME)

def get_context(query: str) -> str:
    vec = model.encode([query], convert_to_numpy=True)
    _, I = index.search(vec, TOP_K)
    results = []
    total_len = 0

    for idx in I[0]:
        if idx >= len(metadata):
            continue

        content = metadata[idx].strip()
        if total_len + len(content) <= MAX_CONTEXT_CHARS:
            results.append(content)
            total_len += len(content)

    if not results:
        print(f"[INFO] No context found for query: '{query}'")

    return "\n\n---\n\n".join(results)

def get_chat_reply(message: str, system_prompt: str) -> str:
    context = get_context(message)
    prompt = f"Context:\n{context}\n\nQuestion:\n{message}"

    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": prompt}
        ],
        temperature=0.7
    )
    return response.choices[0].message.content.strip()
