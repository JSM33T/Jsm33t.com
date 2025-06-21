import streamlit as st
import faiss
import pickle
from pathlib import Path
from sentence_transformers import SentenceTransformer
from openai import OpenAI

# === CONFIG ===
INDEX_PATH = "doc_index.faiss"
META_PATH = "metadata.pkl"
MODEL_NAME = "all-MiniLM-L6-v2"
OPENAI_API_KEY = "TAKE FORM ENV"
TOP_K = 5
MAX_CONTEXT_CHARS = 4000

# === INIT GPT CLIENT ===
client = OpenAI(api_key=OPENAI_API_KEY)

# === LOAD RESOURCES ===
@st.cache_resource
def load_all():
    index = faiss.read_index(INDEX_PATH)
    with open(META_PATH, "rb") as f:
        metadata = pickle.load(f)
    model = SentenceTransformer(MODEL_NAME)
    return index, metadata, model

index, metadata, model = load_all()

# === SEARCH CONTEXT ===
def retrieve_context(query):
    vec = model.encode([query], convert_to_numpy=True)
    _, I = index.search(vec, TOP_K)
    results = []
    total_len = 0

    for idx in I[0]:
        if idx >= len(metadata): continue
        path = metadata[idx]
        try:
            content = Path(path).read_text(encoding="utf-8", errors="ignore")
            content = content.strip()
            if total_len + len(content) <= MAX_CONTEXT_CHARS:
                results.append(f"File: {path}\n{content}")
                total_len += len(content)
        except Exception:
            continue
    return "\n\n---\n\n".join(results)

# === GPT CHAT ===
def chat_with_gpt(query, context):
    system = "You are a helpful assistant that answers based on C# project files. Use only the given context."
    prompt = f"Context:\n{context}\n\nQuestion:\n{query}"

    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": system},
            {"role": "user", "content": prompt}
        ],
        temperature=0.2
    )
    return response.choices[0].message.content.strip()

st.title("C# Codebase Chat")
query = st.text_input("Ask about your project:", placeholder="e.g. how is MQTT configured?")

if query:
    with st.spinner("Retrieving context..."):
        context = retrieve_context(query)

    with st.spinner("Generating answer..."):
        response = chat_with_gpt(query, context)

    st.markdown("### 💡 GPT Answer:")
    st.write(response)
