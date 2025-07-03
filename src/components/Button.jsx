const Note = ({ note, toggleImportance, removeNote }) => {
  // console.log("Note component rendered with props:", {
  //   note,
  //   toggleImportance: typeof toggleImportance,
  //   removeNote: typeof removeNote,
  // });

  const label = note.important ? "make not important" : "make important";

  return (
    <li>
      <span>{note.content}</span>
      <button onClick={toggleImportance}>{label}</button>
      <button
        onClick={removeNote}
        style={{
          marginLeft: "10px",
          backgroundColor: "red",
          color: "white",
          padding: "5px 10px",
          border: "none",
          cursor: "pointer",
        }}
      >
        DELETE
      </button>
    </li>
  );
};

export default Note;
