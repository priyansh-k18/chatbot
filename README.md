# Flora - AI Plant Care Assistant 🌿

This project is a beautifully designed, responsive AI Plant Care Assistant built as part of the Thinkly Labs Software Engineering role assignment.

## Why this topic?
I chose to build an AI Botanist ("Flora") because plant care is a domain where users deeply value thoughtful, calming, and highly tailored guidance. It provided an excellent opportunity to showcase "Frontend Thinking" through:
- **Design:** Establishing a nature-inspired, glassmorphic UI using a sage green and cream color palette.
- **Micro-Interactions:** Using smooth CSS animations for message bubbles and a custom bouncing “growing leaf” typing indicator.
- **Graceful States:** Designing an inviting empty state with interactive suggested prompts, and carefully handling the asynchronous mock AI streaming to simulate complex backend loading naturally.
- **Robustness:** No reliance on generic chat wrappers. The entire interface components (`ChatContainer`, `MessageBubble`, `InputArea`) were built from scratch using pure React and Vanilla CSS.

## Getting Started

To run this project locally:

1. Clone the repository and navigate to the folder:
   ```bash
   cd chatbot
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Built With
- React & TypeScript
- Vite
- Vanilla CSS (No Tailwind, as per a focus on custom CSS craftsmanship)
