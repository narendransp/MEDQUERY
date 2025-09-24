
#  AI Summarizer Dashboard

A modern web application to **summarize YouTube videos, PDFs, and manage tasks** using AI.
Built with **React (Vite + Tailwind)** for the frontend and **FastAPI + Python** for the backend. Uses **Google Gemini API** for summarization and **YouTube Transcript API** for fetching video transcripts.

---

## **Features**

### **YouTube Summarizer**

* Input a YouTube URL to fetch its transcript.
* Generates a concise bullet-point summary using AI.
* Displays video thumbnail for reference.

### **PDF Summarizer**

* Upload a PDF file.
* Extracts text from all pages.
* Generates AI-based summary in bullet points.
* Handles multi-page PDFs and gracefully handles missing text.

### **Task Manager**

* Add, view, and manage tasks directly from the dashboard.
* Persistent session state using **Streamlit frontend** (or React state if using web app).

### **AI Summarization**

* Uses **Google Gemini API** (`gemini-1.5-flash`) for natural language summarization.
* Summarizes YouTube transcripts and PDF content efficiently.

---

## **💻 Tech Stack**

### **Frontend**

* React (Vite + JSX)
* Tailwind CSS for UI styling
* Axios for HTTP requests

### **Backend**

* Python 3.12+
* FastAPI for REST API
* PyPDF2 for PDF text extraction
* youtube-transcript-api for YouTube transcripts
* dotenv for environment variables
* Google Gemini API for AI summarization

---

## **⚡ Installation**

### **Backend Setup**

```bash
cd backend
python -m venv venv
source venv/bin/activate    # Linux/Mac
venv\Scripts\activate       # Windows

pip install -r requirements.txt
```

Create a `.env` file in the backend folder with your Gemini API key:

```
GOOGLE_API_KEY=your_api_key_here
```

Run FastAPI backend:

```bash
uvicorn main:app --reload
```

Default URL: `http://localhost:8000`

---

### **Frontend Setup**

```bash
cd frontend
npm install
npm install axios
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
npm run dev
```

* Dev server: `http://localhost:5173`
* Axios requests point to `http://localhost:8000` for the backend.

---

## **🎨 Styling**

* Tailwind CSS for gradient cards, hover effects, rounded corners, and responsive design.
* Aesthetic design for YouTube & PDF summarizer cards.
* Smooth button animations and focus effects.

---

## **📂 Folder Structure**

```
project/
├─ backend/
│  ├─ main.py
│  ├─ requirements.txt
│  ├─ .env
├─ frontend/
│  ├─ src/
│  │  ├─ App.jsx
│  │  ├─ index.css
│  │  └─ components/
│  ├─ package.json
│  └─ vite.config.js
├─ README.md
```

---

## **📌 Usage**

1. **YouTube Summarizer**

   * Paste a YouTube URL.
   * Click “Summarize YouTube”.
   * Wait for transcript fetching and AI summary.

2. **PDF Summarizer**

   * Upload a PDF.
   * Click “Summarize PDF”.
   * AI generates a bullet-point summary.

3. **Task Manager**

   * Enter a task and click “Add Task”.
   * Tasks are displayed in order and can be extended with edit/delete features.

---

## **⚠️ Notes & Troubleshooting**

* ⚠️ Ensure the YouTube video has **captions enabled**.
* ⚠️ PDF must have **extractable text**; scanned images will not be read without OCR.
* ⚠️ Check your `.env` API key and network connectivity for AI summarization.
* ⚠️ CORS errors may occur if frontend and backend ports differ — configure FastAPI CORS middleware if needed.

---

## **🚀 Future Improvements**

* Add **OCR support** for scanned PDFs.
* Add **multi-language support** for YouTube transcripts.
* Persist **tasks in database** instead of session state.
* Add **user authentication** for private dashboards.
* Enhance frontend with **animations and dark mode**.

---

## **📝 License**

MIT License – free to use, modify, and distribute.

---

If you want, I can also **add badges, GitHub links, and API usage examples** to make this README **look professional and GitHub-ready**.

Do you want me to do that next?
