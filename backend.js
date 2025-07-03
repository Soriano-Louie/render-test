require("dotenv").config();
const express = require("express");
const path = require("path");
const Note = require("./models/note");
const { error } = require("console");
const app = express();
app.use(express.json());

// 👉 Serve static files from React frontend build
app.use(express.static(path.join(__dirname, "dist")));

// ✅ API routes
app.get("/api/notes", (request, response) => {
  Note.find({}).then((notes) => {
    response.json(notes);
  });
});

app.get("/api/notes/:id", (req, res, next) => {
  Note.findById(req.params.id)
    .then((note) => {
      if (note) {
        res.json(note);
      } else {
        res.status(404).end();
      }
    })
    .catch((error) => next(error));
});
app.delete("/api/notes/:id", async (req, res, next) => {
  try {
    const deletedNote = await Note.findByIdAndDelete(req.params.id);

    if (deletedNote) {
      console.log("Note deleted successfuly: ", deletedNote);
      res.status(204).json({ message: "Note deleted successfully" });
    } else {
      console.log("Note not found");
      res.status(404).json({ error: "Note not found" });
    }
  } catch (error) {
    next(error);
  }

  // notes = notes.filter((note) => note.id !== req.params.id);
  // res.status(204).end();
});
app.post("/api/notes", (request, response) => {
  const body = request.body;
  if (!body.content) {
    return response.status(400).json({ error: "content missing" });
  }

  const note = new Note({
    content: body.content,
    important: body.important || false,
  });

  note.save().then((savedNote) => {
    response.json(savedNote);
  });
});

app.put("/api/notes/:id", (request, response, next) => {
  const { content, important } = request.body;

  Note.findById(request.params.id)
    .then((note) => {
      if (!note) {
        return response.status(404).end();
      }

      note.content = content;
      note.important = important;

      return note.save().then((updatedNote) => {
        response.json(updatedNote);
      });
    })
    .catch((error) => next(error));
});

// const updatedNote = {
//   ...note,
//   content: req.body.content,
//   important: req.body.important,
// };
// notes = notes.map((note) => (note.id === id ? updatedNote : note));
// res.json(updatedNote);

// // ✅ Fallback to index.html for React Router
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  }

  next(error);
};

// this has to be the last loaded middleware, also all the routes should be registered before this!
app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
