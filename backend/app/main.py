import json
import os

from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from google import genai
from pydantic import BaseModel


# Load environment variables
load_dotenv()

# Get Gemini API key
api_key = os.getenv("GEMINI_API_KEY")

if not api_key:
    raise RuntimeError("GEMINI_API_KEY is not set in the .env file")

# Create Gemini client
client = genai.Client(api_key=api_key)


app = FastAPI()


# Allow requests from the Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class IdeaRequest(BaseModel):
    ideaName: str
    description: str
    targetUsers: str
    industry: str


@app.get("/")
def read_root():
    return {"message": "IdeaMindAI backend is running"}


@app.post("/analyze")
def analyze_idea(request: IdeaRequest):

    prompt = f"""
You are IdeaMindAI, an expert startup and project feasibility consultant.

Your job is to deeply analyze the startup/project idea provided below.

IDEA NAME:
{request.ideaName}

DESCRIPTION:
{request.description}

TARGET USERS:
{request.targetUsers}

INDUSTRY:
{request.industry}

Analyze this idea as if you were advising a founder before they spend significant time or money building it.

Be practical, realistic, specific to this idea, and concise enough for a startup feasibility report.

IMPORTANT:
- Do not give generic startup advice.
- Base the analysis on the information provided.
- Clearly state assumptions when information is uncertain.
- Do not invent precise statistics or fake companies.
- Do not claim that market research was performed unless actual research data is available.
- Return ONLY valid JSON.
- Do not use Markdown.
- Do not include ```json or ```.

Return EXACTLY this JSON structure:

{{
    "summary": "Explain what the idea is, what problem it solves, and its overall feasibility.",

    "market_demand": "Explain the likely demand for this product or service and the factors that could influence adoption.",

    "target_users": "Identify the primary customers, secondary customers, and their main needs or pain points.",

    "competitor_analysis": [
        {{
            "name": "Competitor or comparable solution",
            "description": "What this competitor or alternative provides",
            "strength": "Its main strength",
            "weakness": "Its main weakness"
        }},
        {{
            "name": "Another competitor or comparable solution",
            "description": "What it provides",
            "strength": "Its main strength",
            "weakness": "Its main weakness"
        }},
        {{
            "name": "Another competitor or comparable solution",
            "description": "What it provides",
            "strength": "Its main strength",
            "weakness": "Its main weakness"
        }}
    ],

    "market_gaps": [
        "Potential unmet need or market gap 1",
        "Potential unmet need or market gap 2",
        "Potential unmet need or market gap 3"
    ],

    "differentiation": [
        "Potential differentiation strategy 1",
        "Potential differentiation strategy 2",
        "Potential differentiation strategy 3"
    ],

    "revenue_model": "Explain the most realistic revenue model and how the business could generate revenue.",

    "pros": [
        "Major advantage 1",
        "Major advantage 2",
        "Major advantage 3",
        "Major advantage 4"
    ],

    "cons": [
        "Major disadvantage 1",
        "Major disadvantage 2",
        "Major disadvantage 3",
        "Major disadvantage 4"
    ],

    "key_risks": [
        "Important business or market risk 1",
        "Important business or market risk 2",
        "Important technical or operational risk 3",
        "Important financial or growth risk 4"
    ],

    "swot": {{
        "strengths": [
            "Strength 1",
            "Strength 2",
            "Strength 3"
        ],
        "weaknesses": [
            "Weakness 1",
            "Weakness 2",
            "Weakness 3"
        ],
        "opportunities": [
            "Opportunity 1",
            "Opportunity 2",
            "Opportunity 3"
        ],
        "threats": [
            "Threat 1",
            "Threat 2",
            "Threat 3"
        ]
    }},

    "recommended_mvp": [
        "Essential MVP feature 1",
        "Essential MVP feature 2",
        "Essential MVP feature 3",
        "Essential MVP feature 4",
        "Essential MVP feature 5",
        "Essential MVP feature 6"
    ],

    "development_roadmap": [
        "Phase 1: What should be built first",
        "Phase 2: What should be built next",
        "Phase 3: What should be built after initial validation",
        "Phase 4: Future expansion"
    ],

    "technology_stack": {{
        "frontend": "Recommended frontend technology",
        "backend": "Recommended backend technology",
        "database": "Recommended database",
        "ai": "Recommended AI technology",
        "other": "Other important technology or infrastructure"
    }},

    "development_cost_estimate": "Give a rough development cost range for an MVP and explain the main cost factors. Do not pretend this is an exact quote.",

    "investor_readiness_score": 75,

    "final_verdict": "Give a clear overall verdict: whether the idea appears promising, what its biggest challenge is, and what the founder should do next."
}}
"""


    try:
        response = client.models.generate_content(
            model="gemini-3.5-flash-lite",
            contents=prompt,
            config={
                "response_mime_type": "application/json",
            },
        )

        if not response.text:
            raise HTTPException(
                status_code=500,
                detail="Gemini returned an empty response."
            )

        analysis = json.loads(response.text)

        return {
            "message": "Analysis generated successfully",
            "idea": {
                "ideaName": request.ideaName,
                "description": request.description,
                "targetUsers": request.targetUsers,
                "industry": request.industry,
            },
            "analysis": analysis,
        }

    except json.JSONDecodeError:
        print("GEMINI ERROR: Invalid JSON response")
        print("Response:", response.text if response else "No response")

        raise HTTPException(
            status_code=500,
            detail="Gemini returned an invalid analysis format."
        )

    except Exception as e:
        print("GEMINI ERROR:", repr(e))

        raise HTTPException(
            status_code=500,
            detail=f"Gemini error: {str(e)}"
        )