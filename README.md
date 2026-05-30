# OttoGPT

OttoGPT is an AI-powered customer support assistant built using FastAPI, Gemini AI, ChromaDB, and Retrieval-Augmented Generation (RAG).

The project allows users to upload support documents in PDF format and ask natural language questions. OttoGPT retrieves relevant information from the uploaded documents using semantic search and generates context-aware responses through Google's Gemini AI.

---

## Project Vision

OttoGPT started as a document-based question answering system but is designed with a broader goal in mind.

The long-term objective is to transform OttoGPT into an enterprise knowledge assistant capable of serving organizations and support teams. Instead of uploading documents for every conversation, companies will be able to build persistent knowledge repositories containing:

* Employee handbooks
* Product documentation
* Technical manuals
* Customer support procedures
* Internal training materials
* Organizational policies

OttoGPT will then act as a dedicated AI assistant trained on that organization's knowledge base, providing fast and accurate answers without requiring users to manually search through documents.

---

## Features

### PDF-Based Knowledge Retrieval

Upload support documents and instantly ask questions based on their contents.

### Retrieval-Augmented Generation (RAG)

Relevant document sections are retrieved before response generation, improving factual accuracy and reducing hallucinations.

### Semantic Search

Uses vector embeddings and ChromaDB to locate contextually relevant information rather than relying on simple keyword matching.

### Gemini AI Integration

Generates intelligent and natural responses using Google's Gemini models.

### Modern Web Interface

Responsive React frontend with a modern chat experience.

### Enterprise-Oriented Architecture

Built with future scalability in mind, allowing expansion toward multi-document organizational knowledge systems.

---

## Tech Stack

### Frontend

* React
* Vite
* Tailwind CSS
* Axios
* Framer Motion

### Backend

* FastAPI
* Python

### AI & Retrieval

* Gemini AI
* ChromaDB
* Sentence Transformers
* RAG Pipeline

---

## Project Structure

bot/
├── frontend/
│ ├── src/
│ ├── public/
│ └── package.json
│
├── backend/
│ ├── uploads/
│ ├── chroma_db/
│ ├── main.py
│ ├── requirements.txt
│ └── .env.example
│
├── README.md
├── LICENSE
└── .gitignore

---

## Installation

### Clone Repository

git clone https://github.com/yourusername/OttoGPT.git

cd OttoGPT

### Backend Setup

cd backend

python -m venv venv

source venv/bin/activate

pip install -r requirements.txt

### Configure Environment Variables

Create a .env file based on .env.example

GEMINI_API_KEY=YOUR_API_KEY

### Start Backend

uvicorn main:app --reload

### Frontend Setup

cd frontend

npm install

npm run dev

---

## Future Improvements

* Multi-document knowledge repositories
* Organization-specific AI assistants
* User authentication
* Conversation history
* Team workspaces
* Role-based access control
* Document management dashboard
* Knowledge base analytics
* API integrations
* Fine-tuned organizational models

---

## License

This project is licensed under the MIT License.

---

## Author

Eshaan Sayani

Built as a practical exploration of Retrieval-Augmented Generation, semantic search, and enterprise AI support systems.
