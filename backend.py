from fastapi import FastAPI
from pydantic import BaseModel
import requests
from bs4 import BeautifulSoup

app = FastAPI()

class Query(BaseModel):
    url: str
    question: str

@app.get("/")
def read_root():
    return {"message": "AI-Powered Web Assistant is running!"}

@app.get("/ask")
def ask_ai(url: str, question: str):
    try:
        # Fetch website content
        response = requests.get(url)
        soup = BeautifulSoup(response.text, "html.parser")
        text = soup.get_text()

        # Basic keyword search (improve later)
        if question.lower() in text.lower():
            return {"answer": f"Yes, the page contains information about '{question}'."}
        else:
            return {"answer": "Sorry, no relevant information found on the page."}

    except Exception as e:
        return {"error": str(e)}

