# Legal Summarizer 
## CONGRATS, YOU MADE IT TO THE PROJECT THAT SURVIVED CLOUDFLARE 2025 OUTAGE😤
### Description
Legal Summarizer is a smart AI that takes your legal agreements, scoops out Article numbers, sections, matches the agreement with Indian Constitution and rules, and gives a verdict.
### Architecture Diagram of the project (Current)
<img width="1394" height="1074" alt="image" src="https://github.com/user-attachments/assets/61afef49-3524-4b84-b712-f0b2bb6b176c" />







### Tech Stack
1. Frontend : NextJS
2. Backend Services : Django Ninja, fastAPI
3. Common Database: Neon (Serverless PostgreSQL)
4. Task Broker : GCP Pub/Sub
5. Caching : Redis Cloud
6. Authentication : Amazon Cognito
7. AI Agent Layer : Strands Framework
8. Containerization : Docker
9. Deployments : GCP Cloud Run, Vercel
#### Project Improvements:
1. Cloudflare workers migration (underway)
2. Extending supported file types (underway)
3. OCR Fallback (via pytesseract) for extracting text from image based PDFs

## How to contribute
### 1. Fork the repository
Click the **Fork** button on the top-right of the GitHub page.
### 2. Clone your fork locally
```bash
git clone https://github.com/your-username/capstone-proj.git
cd capstone-proj
```
### 3.Create a new branch for your work
```bash
git checkout -b branch-name
```
### 4.Commit your changes
```bash
git add .
git commit -m "describe your changes"
```
### 5.Push your branch
```bash
git push origin branch-name
```
### 6. Open a Pull Request
Go to your fork on GitHub → Compare & Pull Request
Provide:
1. What you changed
2. Why you changed it
3. Screenshots/Testing video if applicable

Submit the PR ✔️
