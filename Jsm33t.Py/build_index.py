import os
import faiss
import pickle
from pathlib import Path
from sentence_transformers import SentenceTransformer

MODEL_NAME = "all-MiniLM-L6-v2"
DATA_PATH = "static/index/data.txt"
INDEX_PATH = "static/index/doc_index.faiss"
META_PATH = "static/index/metadata.pkl"

model = SentenceTransformer(MODEL_NAME)

# === Load text file and split into chunks ===
with open(DATA_PATH, "r", encoding="utf-8") as f:
    lines = [line.strip() for line in f if line.strip()]

if not lines:
    print("[WARN] No valid text data found in", DATA_PATH)
    exit(1)

# === Embed ===
embeddings = model.encode(lines, convert_to_numpy=True)

# === Build FAISS index ===
dimension = embeddings.shape[1]
index = faiss.IndexFlatL2(dimension)
index.add(embeddings)

# === Save index and metadata ===
faiss.write_index(index, INDEX_PATH)
with open(META_PATH, "wb") as f:
    pickle.dump(lines, f)

print(f"[INFO] FAISS index built: {INDEX_PATH} with {len(lines)} entries.")
