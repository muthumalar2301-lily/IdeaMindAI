# IdeaMindAI

### AI-Powered Startup & Project Feasibility Platform

IdeaMindAI is a full-stack web application that helps users evaluate startup and project ideas using Generative AI.

Users can enter an idea, and IdeaMindAI analyzes it from different perspectives such as market demand, target audience, revenue potential, competition, risks, and growth opportunities. The results are presented as a structured feasibility report rather than a simple chatbot response.

## Features

- AI-powered startup and project idea analysis
- Market demand and target audience insights
- Revenue and business model suggestions
- Competition and risk analysis
- Growth opportunities
- Structured feasibility report

## Tech Stack

**Frontend**
- Next.js
- React
- TypeScript

**Backend**
- Python
- FastAPI

**AI**
- Google Gemini API

## How It Works

```text
User Idea
   ↓
Next.js Frontend
   ↓
FastAPI Backend
   ↓
Google Gemini API
   ↓
AI Feasibility Analysis
   ↓
Structured Report
```
## Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
cd IdeaMindAI
```

### 2. Start the backend

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

Create a `.env` file in the backend folder:

```env
GEMINI_API_KEY=your_api_key_here
```

### 3. Start the frontend

```bash
cd frontend
npm install
npm run dev
```

Open [**http://localhost:3000**](http://localhost:3000) in your browser.

## Project Status

The core MVP is complete, including the frontend, backend, Gemini integration, and AI-generated feasibility analysis. Further features such as authentication, analysis history, database integration, PDF reports, and advanced market research can be added in future versions.

## Author

**Malar**

Built as a full-stack AI project exploring how Generative AI can be used for startup and project feasibility analysis.
