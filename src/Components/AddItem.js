import { useState } from "react";

export default function AddItem({ onAddItems }) {
  const [header, setHeader] = useState("");
  const [body, setBody] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    onAddItems({ header, body });
    setHeader("");
    setBody("");
  }

  return (
    <form className="addForm" onSubmit={handleSubmit}>
      <label className="formName">
        Today´s mode:
        <input
          className="inputField"
          type="text"
          value={header}
          onChange={(e) => setHeader(e.target.value)}
          placeholder="Mode..."
        />
      </label>
      <label className="labelTextfield">
        How was your day?
        <textarea
          placeholder="Write down your thoughts.."
          value={body}
          className="textareaField"
          onChange={(e) => setBody(e.target.value)}
          rows={6}
          cols={40}
        />
      </label>
      <input type="submit" value="Submit" className="btnSubmit" />
    </form>
  );
}
