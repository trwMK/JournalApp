import { useState } from "react";

export default function EditItem({ item, onUpdateItem, setShowEdit }) {
  const [header, setHeader] = useState(item.header);
  const [body, setBody] = useState(item.body);

  function handleSubmitEdit(e) {
    e.preventDefault();
    const updatedItem = { ...item, header, body };
    onUpdateItem(updatedItem);
    setShowEdit(false);
  }

  return (
    <form className="addForm" onSubmit={handleSubmitEdit}>
      <label className="formName">
        Today´s mode:
        <input
          className="inputField"
          type="text"
          value={header}
          onChange={(e) => {
            setHeader(e.target.value);
          }}
          placeholder="Mode..."
        />
      </label>
      <label className="labelTextfield">
        How was your day?
        <textarea
          placeholder="Write down your thoughts.."
          value={body}
          className="textareaField"
          onChange={(e) => {
            setBody(e.target.value);
          }}
          rows={6}
          cols={40}
        />
      </label>
      <input type="submit" value="Update" className="btnSubmit" />
    </form>
  );
}
