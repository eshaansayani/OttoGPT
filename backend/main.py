from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv

from google import genai
from pypdf import PdfReader
from sentence_transformers import SentenceTransformer

import chromadb
import os
load_dotenv()

# -------------------------
# GEMINI SETUP
# -------------------------

client_ai = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY")
)

# -------------------------
# FASTAPI SETUP
# -------------------------

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -------------------------
# CHROMADB SETUP
# -------------------------

client = chromadb.PersistentClient(
    path="./chroma_db"
)

collection = client.get_or_create_collection(
    name="support_docs"
)

# -------------------------
# EMBEDDING MODEL
# -------------------------

embedding_model = SentenceTransformer(
    "all-MiniLM-L6-v2"
)

# -------------------------
# REQUEST MODEL
# -------------------------

class ChatRequest(BaseModel):
    message: str

# -------------------------
# ROOT
# -------------------------

@app.get("/")
def home():
    return {"status": "running"}

# -------------------------
# PDF UPLOAD
# -------------------------

@app.post("/upload")
async def upload_pdf(file: UploadFile = File(...)):

    filepath = f"uploads/{file.filename}"

    with open(filepath, "wb") as f:
        f.write(await file.read())

    # READ PDF

    reader = PdfReader(filepath)

    text = ""

    for page in reader.pages:

        extracted = page.extract_text()

        if extracted:
            text += extracted

    # CHUNKING

    chunk_size = 1000
    overlap = 200

    chunks = []

    for i in range(0, len(text), chunk_size - overlap):

        chunk = text[i:i + chunk_size]

        chunks.append(chunk)

    print("TOTAL CHUNKS:", len(chunks))

    # STORE IN CHROMADB

    for i, chunk in enumerate(chunks):

        embedding = embedding_model.encode(
            chunk
        ).tolist()

        collection.add(
            documents=[chunk],
            embeddings=[embedding],
            ids=[f"{file.filename}_{i}"]
        )

    return {
        "message": "PDF uploaded successfully"
    }

# -------------------------
# CHAT ENDPOINT
# -------------------------

@app.post("/chat")
async def chat(req: ChatRequest):

    try:

        # CREATE QUESTION EMBEDDING

        query_embedding = embedding_model.encode(
            req.message
        ).tolist()

        # SEARCH CHROMADB

        results = collection.query(
            query_embeddings=[query_embedding],
            n_results=3
        )

        # CHECK IF DOCUMENTS EXIST

        if not results["documents"] or not results["documents"][0]:

            return {
                "reply": "No support documents uploaded yet."
            }

        # GET CONTEXT

        context = "\n".join(
            results["documents"][0]
        )

        print("CONTEXT:")
        print(context)

        # PROMPT

        prompt = f"""
You are SupportGPT, an AI customer support assistant.

Use the provided context to answer the question.

If the answer exists partially,
try your best to answer clearly.

If the answer truly does not exist,
say:
"I could not find that information in the uploaded documents."

Context:
{context}

Question:
{req.message}
"""

        # GEMINI RESPONSE

        response = client_ai.models.generate_content(
            model="gemini-2.5-flash",
            contents=prompt
        )

        return {
            "reply": response.text
        }

    except Exception as e:

        print("CHAT ERROR:", e)

        return {
            "reply": f"Error: {str(e)}"
        }