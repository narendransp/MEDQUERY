from fastapi import FastAPI, UploadFile, File
from pydantic import BaseModel
from youtube_transcript_api import YouTubeTranscriptApi, TranscriptsDisabled, NoTranscriptFound
from PyPDF2 import PdfReader
import os
from dotenv import load_dotenv
import google.generativeai as genai
from fastapi.middleware.cors import CORSMiddleware

# Load API key
load_dotenv()
genai.configure(api_key="AIzaSyBlj7FRSxcM4zpEApGTHv6ntkPsBUGbxyk")

# App
app = FastAPI()

# Allow frontend requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"]
)

# --- Schemas ---
class YouTubeRequest(BaseModel):
    url: str

class SummaryResponse(BaseModel):
    summary: str

# --- Helper ---
def generate_summary(text, role="Summarizer"):
    prompt = f"""
    You are a helpful {role}.
    Please summarize the following text in bullet points within 250 words:
    {text}
    """
    model = genai.GenerativeModel("gemini-1.5-flash")
    response = model.generate_content(prompt)
    return response.text

# --- YouTube Transcript ---
def extract_transcript(youtube_url: str):
    try:
        if "v=" in youtube_url:
            video_id = youtube_url.split("v=")[-1].split("&")[0]
        elif "youtu.be/" in youtube_url:
            video_id = youtube_url.split("/")[-1].split("?")[0]
        else:
            return "⚠️ Invalid YouTube URL.", None

        transcript_list = YouTubeTranscriptApi().list(video_id)
        try:
            transcript = transcript_list.find_transcript(['en'])
        except NoTranscriptFound:
            transcript = transcript_list.find_generated_transcript(['en'])
        transcript_text = " ".join([t["text"] for t in transcript.fetch()])
        return transcript_text, video_id
    except (TranscriptsDisabled, NoTranscriptFound):
        return None, None
    except Exception as e:
        return f"⚠️ Could not fetch transcript. Error: {str(e)}", None

# --- PDF Extraction ---
def extract_pdf_text(file):
    reader = PdfReader(file)
    text = ""
    for page in reader.pages:
        text += page.extract_text() or ""
    return text 

# --- Routes ---
@app.post("/youtube", response_model=SummaryResponse)
async def summarize_youtube(request: YouTubeRequest):
    transcript, _ = extract_transcript(request.url)
    if transcript:
        summary = generate_summary(transcript, "YouTube video summarizer")
        return {"summary": summary}
    return {"summary": "⚠️ Could not fetch transcript."}


@app.post("/pdf", response_model=SummaryResponse)
async def summarize_pdf(file: UploadFile = File(...)):
    try:
        # Ensure we read the file correctly as a stream
        text = extract_pdf_text(file.file)
        if not text.strip():
            return {"summary": "⚠️ No extractable text in PDF."}
        
        summary = generate_summary(text, "PDF summarizer")
        return {"summary": summary}

    except Exception as e:
        # Catch errors like corrupt PDF, read errors, etc.
        return {"summary": f"⚠️ Error fetching PDF summary: {str(e)}"}
