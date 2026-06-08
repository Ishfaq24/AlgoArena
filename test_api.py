import os
from pathlib import Path

from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()
load_dotenv(Path(__file__).resolve().parent / "ml-services" / ".env")

base_url = os.getenv("OPENAI_BASE_URL", "https://openrouter.ai/api/v1").strip()
model = os.getenv("OPENAI_MODEL", "").strip() or (
    "openai/gpt-4o-mini" if "openrouter.ai" in base_url else "google/gemma-4-31b-it"
)
api_key = (
    os.getenv("OPENAI_API_KEY", "").strip()
    or os.getenv("OPENROUTER_API_KEY", "").strip()
    or os.getenv("NVIDIA_API_KEY", "").strip()
)

if not api_key:
    raise RuntimeError("OPENAI_API_KEY not found")

client = OpenAI(
    api_key=api_key,
    base_url=base_url,
    default_headers={
        "HTTP-Referer": "http://localhost:5173",
        "X-Title": "AlgoArena",
    } if "openrouter.ai" in base_url else {},
)

response = client.chat.completions.create(
    model=model,
    messages=[
        {"role": "user", "content": "what is machine learning"}
    ]
)

print(response.choices[0].message.content)
