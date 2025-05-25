# 🤖 AI Code Reviewer

An AI-powered code review tool that leverages Google’s Gemini 2.0 Flash model to provide intelligent, actionable feedback on code snippets. It helps developers quickly assess code quality, identify bugs, optimize performance, and follow industry best practices — all in real-time via an intuitive web interface.

---

## 🚀 Features

- Multi-language support: Review code snippets in JavaScript, Python, C++, and Java.  
- Real-time AI-powered code analysis: Get detailed feedback on code quality, structure, performance, security risks, and maintainability.  
- Syntax-highlighted editable code editor: Write or paste code with language-aware syntax highlighting.  
- Markdown-rendered review output: View AI feedback with rich formatting for readability.  
- User-friendly interface: Simple language selector, code editor, and review results pane.  
- Powered by Google Gemini 2.0 Flash: State-of-the-art AI model trained for software development tasks.  

---

## 🛠️ Tech Stack

| Layer           | Technology                                         |
|-----------------|--------------------------------------------------|
| Backend         | Node.js, Express.js                               |
| AI Integration  | Google Gemini 2.0 Flash API                       |
| Frontend        | React.js, react-simple-code-editor, PrismJS, react-markdown |
| HTTP Client     | Axios                                            |
| Styling         | CSS (custom styles)                               |

📁 Project Structure

AI_Code_Reviewer/
├── backend/
│   ├── src/
│   │   ├── controllers/        # API route handlers (e.g., ai.controller.js)
│   │   ├── routers/            # Express routes
│   │   ├── services/           # Gemini API integration (e.g., ai.services.js)
│   │   └── app.js              # Express app setup
│   ├── server.js               # Server entry point
│   └── .env                    # Environment variables (e.g., Gemini API key)
│
├── frontend/
│   ├── public/                 # Static files
│   ├── src/                    # React app source code
│   │   ├── App.jsx             # Main app component
│   │   ├── App.css             # Styling for App
│   │   ├── main.jsx            # React DOM entry point
│   │   └── index.css           # Global styles
│   ├── .gitignore              # Git ignore rules
│   ├── eslint.config.js        # ESLint configuration
│   ├── index.html              # Main HTML file
│   ├── package.json            # Frontend dependencies & scripts
│   ├── README.md               # Frontend-specific README (optional)
│   └── vite.config.js          # Vite bundler configuration


## ⚙️ Local Setup & Installation

### Prerequisites

- Node.js (v16+ recommended)  
- npm or yarn  
- Google Gemini 2.0 API key (access required)  



### ⚙️ Backend Setup

1. Navigate to the backend folder:

   ```bash
   cd backend
````

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the backend root directory and add your Gemini API key:

   ```ini
   GOOGLE_GEMINI_KEY=your_api_key_here
   ```

4. Start the backend server:

   ```bash
   npm run start
   ```

The backend server will run at: [http://localhost:3000](http://localhost:3000)

Absolutely! Here's your **Frontend Setup**, **Usage**, **Future Plans**, **Contribution**, and **License** sections with emojis — in plain text format:

---

Got it! Here's a **cleaned-up version** with **minimal emojis** for clarity and a professional tone:

---

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The frontend will be available at [http://localhost:5173](http://localhost:5173) (or your default React dev server port).

---

### Usage

1. Open the frontend in your browser.
2. Select a programming language from the dropdown.
3. Paste or write your code snippet in the editor.
4. Click **Review** to submit the code for AI feedback.
5. View detailed suggestions and improvements in the output pane.

---

### Future Plans

* Integrate with GitHub to automatically review Pull Requests.
* Add user authentication and save review history.
* Support more programming languages and frameworks.
* Improve feedback with inline annotations and auto-fix suggestions.
* Deploy the app to a scalable cloud platform.
* Develop plugins for popular code editors.

---

### Contribution

We welcome contributions! To contribute:

1. Fork the repository
2. Create a new branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m "Add your feature"`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a pull request describing your changes

---

### License

This project is licensed under the **MIT License**.

---


