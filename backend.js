import cors from "cors";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

// 👉 Serve static files from React frontend build
app.use(express.static(path.join(__dirname, "dist")));

let notes = [
  { id: "1", content: "HTML is easy", important: true },
  { id: "2", content: "Browser can execute only JavaScript", important: false },
  {
    id: "3",
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true,
  },
  { id: "4", content: "LOUIE JAMES SORIANO", important: true },
];

// ✅ API routes
app.get("/api/notes", (req, res) => res.json(notes));
app.get("/api/notes/:id", (req, res) => {
  const id = req.params.id;
  const note = notes.find((note) => note.id === id);
  note ? res.json(note) : res.status(404).end();
});
app.delete("/api/notes/:id", (req, res) => {
  notes = notes.filter((note) => note.id !== req.params.id);
  res.status(204).end();
});
app.post("/api/notes", (req, res) => {
  const body = req.body;
  if (!body.content) {
    return res.status(400).json({ error: "content missing" });
  }
  const newNote = {
    id: String(Math.max(...notes.map((n) => Number(n.id))) + 1),
    content: body.content,
    important: body.important || false,
  };
  notes = notes.concat(newNote);
  res.json(newNote);
});
app.put("/api/notes/:id", (req, res) => {
  const id = req.params.id;
  const note = notes.find((note) => note.id === id);
  if (!note) return res.status(404).json({ error: "note not found" });

  const updatedNote = {
    ...note,
    content: req.body.content,
    important: req.body.important,
  };
  notes = notes.map((note) => (note.id === id ? updatedNote : note));
  res.json(updatedNote);
});

// ✅ Fallback to index.html for React Router
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
