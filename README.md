<div align="center">
<!-- Animated Header -->
<img src="https://readme-typing-svg.herokuapp.com?font=JetBrains+Mono&weight=700&size=50&duration=3000&pause=1000&color=FFFFFF&center=true&vCenter=true&width=600&lines=roblox+ai+test;powered+by+vercel;javascript+backend;full+stack+chaos" alt="Typing SVG" />
<!-- Tech Stack Badges -->
<p align="center">
<img src="https://img.shields.io/badge/roblox-lua-000000?style=for-the-badge&logo=roblox&logoColor=white" />
<img src="https://img.shields.io/badge/vercel-serverless-000000?style=for-the-badge&logo=vercel&logoColor=white" />
<img src="https://img.shields.io/badge/javascript-backend-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" />
<img src="https://img.shields.io/badge/api-connected-0070f3?style=for-the-badge&logo=google-cloud&logoColor=white" />
</p>
</div>
the architecture
ok so basically, roblox is too weak to run the ai logic itself. so i built a bridge.
it's a full-stack loop:
Roblox captures the chat.
Sends a POST request to my Vercel web server.
The server processes the logic (JS) and pings the AI API.
Sends the smart response back to Roblox.
code
Mermaid
graph LR
    A[Roblox Client] -->|HttpService| B(Vercel Web Server);
    B -->|Fetch| C{AI API};
    C -->|Response| B;
    B -->|JSON| A;
the stack
Front: Roblox (Luau) handling the UI and NPC bodies.
Middle: Node.js/Express running on Vercel (Serverless).
Back: The LLM API doing the thinking.
