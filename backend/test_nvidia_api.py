import os
from pathlib import Path
from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()
load_dotenv(Path(__file__).resolve().parent / ".env")

base_url = os.getenv("OPENAI_BASE_URL", "https://integrate.api.nvidia.com/v1").strip()
api_key = (
    os.getenv("OPENAI_API_KEY", "").strip()
    or os.getenv("OPENROUTER_API_KEY", "").strip()
    or os.getenv("NVIDIA_API_KEY", "").strip()
)
model = os.getenv("OPENAI_MODEL", "").strip() or (
    "openai/gpt-4o-mini" if "openrouter.ai" in base_url else "google/gemma-4-31b-it"
)

print("="*80)
print("🎨 ASKING LLM PROVIDER TO GENERATE MANIM CODE")
print(f"base_url={base_url}")
print(f"model={model}")
print("="*80 + "\n")

if not api_key:
    print("❌ OPENAI_API_KEY not found in .env")
    exit(1)

# Initialize client
client = OpenAI(
    api_key=api_key,
    base_url=base_url,
    default_headers={
        "HTTP-Referer": "http://localhost:5173",
        "X-Title": "AlgoArena",
    } if "openrouter.ai" in base_url else {},
)

# Simple prompt for Manim code
prompt = """Generate ONLY simple Manim Python code. NO explanations.

Requirements:
- Start with: from manim import *
- Create class DemoScene(Scene):
- Add def construct(self): method
- Draw a blue circle in the center
- Write "Hello Manim" in red text above the circle
- Animate them appearing
- Wait 2 seconds
- Animate them disappearing
- Return ONLY executable Python code
- No markdown backticks
- No comments with special characters

Generate code now:"""

try:
    print("🚀 Sending request to LLM provider...\n")
    
    response = client.chat.completions.create(
        model=model,
        messages=[{"role": "user", "content": prompt}],
        temperature=0.7,
        max_tokens=500,
        timeout=60
    )
    
    code = response.choices[0].message.content.strip()
    
    print("="*80)
    print("📝 RAW RESPONSE FROM LLM PROVIDER:")
    print("="*80)
    print(code)
    print("="*80 + "\n")
    
    # Clean markdown if present
    if code.startswith("```python"):
        code = code[9:]
    elif code.startswith("```"):
        code = code[3:]
    
    if code.endswith("```"):
        code = code[:-3]
    
    code = code.strip()
    
    # Ensure import is first
    if "from manim import" not in code:
        code = "from manim import *\n\n" + code
    else:
        lines = code.split('\n')
        for i, line in enumerate(lines):
            if "from manim import" in line:
                import_line = lines.pop(i)
                code = import_line + "\n\n" + "\n".join(lines)
                break
    
    print("="*80)
    print("✅ CLEANED CODE:")
    print("="*80)
    print(code)
    print("="*80 + "\n")
    
    # Save to file
    with open("backend/generated/test_scene.py", "w") as f:
        f.write(code)
    
    print("✅ Code saved to: backend/generated/test_scene.py\n")
    
    # Try to render it
    print("🎬 Attempting to render the video...\n")
    import subprocess
    
    result = subprocess.run(
        ["manim", "backend/generated/test_scene.py", "DemoScene", "-pql", "--frame_rate=15"],
        capture_output=True,
        text=True,
        timeout=300
    )
    
    if result.returncode == 0:
        print("="*80)
        print("✅ VIDEO RENDERED SUCCESSFULLY! 🎉")
        print("="*80)
    else:
        print("="*80)
        print("❌ RENDERING FAILED")
        print("="*80)
        if result.stderr:
            print("\nError output:")
            print(result.stderr[:1000])
        print()

except Exception as e:
    print("="*80)
    print(f"❌ ERROR:")
    print("="*80)
    print(f"{e}\n")
    import traceback
    traceback.print_exc()
