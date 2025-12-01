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
