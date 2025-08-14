

# Code Review App

A web-based code editor with syntax highlighting, language selection, and AI-powered code reviews.
Supports multiple programming languages and light/dark theme switching.

## 🚀 Features

* **Multiple Language Support**: JavaScript, Python, Java, C++, Go, Rust, C#, Ruby.
* **Live Syntax Highlighting** using Prism.js.
* **Editable Code Editor** with [react-simple-code-editor](https://github.com/satya164/react-simple-code-editor).
* **AI-Powered Code Review** via backend API.
* **Dark/Light Mode** toggle.
* **Markdown Rendering** for AI review output.

---

## 📦 Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/your-username/code-review-app.git
   cd code-review-app
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Setup Environment Variables**

   Create a `.env` file in the root directory:

   ```env
   VITE_API_BASE_URL=http://localhost:5000
   ```

4. **Run the App**

   ```bash
   npm run dev
   ```

---

## 🛠️ Tech Stack

* **Frontend**: React + Vite
* **Editor**: react-simple-code-editor
* **Syntax Highlighting**: Prism.js + Highlight.js
* **Markdown Rendering**: react-markdown + rehype-highlight
* **HTTP Client**: Axios

---

## 📂 Project Structure

```
src/
│── App.jsx         # Main React component
│── App.css         # Styles
│── main.jsx        # App entry point
│── components/     # (Optional) Split UI components
```

---

## 🌐 API Endpoint

The app expects a backend endpoint:

`POST /ai/get-review`

### Request Body:

```json
{
  "code": "function sum() { return 1 + 1 }",
  "language": "javascript"
}
```

### Response:

Markdown-formatted review string from the AI.

---

## 🎯 Usage

1. Select a programming language from the dropdown.
2. Write or paste your code in the editor.
3. Click **Review** to send it to the AI backend.
4. View feedback in the right panel.

---

## 🖼️ Screenshot

*(Add your screenshot here)*

---

## 📜 License

This project is licensed under the MIT License.

---
