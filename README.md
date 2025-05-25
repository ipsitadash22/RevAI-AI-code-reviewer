# 🚀 RevAI
RevAI — Your AI Code Reviewer

**RevAI** is an AI-powered code review tool that leverages Google’s Gemini 2.0 Flash model to provide intelligent, actionable feedback on code snippets. It helps developers quickly assess code quality, identify bugs, optimize performance, and follow industry best practices — all in real-time via an intuitive web interface.

---

## 🔧 Features

* Multi-language support: JavaScript, Python, C++, and Java
* Real-time AI code analysis: Quality, structure, performance, security, and maintainability
* Syntax-highlighted, editable code editor
* Markdown-rendered review output
* Simple language selector, editor, and feedback pane
* Powered by **Google Gemini 2.0 Flash**

---

## 🛠 Tech Stack

| Layer          | Technology                                                      |
| -------------- | --------------------------------------------------------------- |
| Backend        | Node.js, Express.js                                             |
| AI Integration | Google Gemini 2.0 Flash API                                     |
| Frontend       | React.js, `react-simple-code-editor`, PrismJS, `react-markdown` |
| HTTP Client    | Axios                                                           |
| Styling        | Custom CSS                                                      |

---

## 📁 Project Structure

```bash
RevAI/
├── backend/
│   ├── src/
│   │   ├── controllers/          # API route handlers
│   │   ├── routers/              # Express routes
│   │   ├── services/             # Gemini API integration
│   │   └── app.js                # Express app setup
│   ├── server.js                 # Server entry point
│   └── .env                      # Environment variables (API keys)
├── frontend/
│   ├── public/                   # Static files
│   ├── .gitignore
│   ├── index.html
│   ├── eslint.config.js
│   ├── vite.config.js
│   ├── package.json
│   └── src/                      # React app source code
│       ├── App.jsx              # Main app component
│       ├── App.css              # Styling
│       ├── main.jsx             # React DOM render
│       └── index.css            # Global CSS
```

---

## ⚙️ Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` folder:

```ini
GOOGLE_GEMINI_KEY=your_api_key_here
```

Start the backend server:

```bash
npm run start
```

> The server runs at `http://localhost:3000`.

---

## ⚙️ Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

> The frontend runs at `http://localhost:5173` (default port).

---

## 📝 Usage

1. Open the frontend in your browser
2. Select the programming language
3. Paste or write your code snippet
4. Click **Review**
5. View the AI-generated feedback in the result pane

---

## 🔮 Future Plans

* GitHub PR integration for automatic AI reviews
* User authentication & saved review history
* Support for more languages/frameworks
* Inline annotations and auto-fix suggestions
* Cloud deployment with scalable APIs
* Editor plugin/extension (VSCode, etc.)

---

## 🤝 Contribution

We welcome contributions!

1. Fork the repo
2. Create a branch: `git checkout -b feature/your-feature`
3. Commit changes: `git commit -m "Add feature"`
4. Push to GitHub: `git push origin feature/your-feature`
5. Open a pull request

---

## 📄 License

Licensed under the **MIT License**.

---



This project is licensed under the **MIT License**.

---


