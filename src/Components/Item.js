import { useState } from "react";
import EditItem from "./EditItem";
export default function Item({ item, onDeleteItem, onUpdateItem }) {
  const [showEdit, setShowEdit] = useState(false);

  const date = new Date();
  const curDate = date.toDateString();

  return (
    <>
      <li className="item">
        <div className="itemHeader">
          <h6>{curDate}</h6>
          <button className="btnDelete" onClick={() => onDeleteItem(item.id)}>
            X
          </button>
        </div>
        <div className="itemBody">
          <h4>{item.header}</h4>
          <p>{item.body}</p>
          <button className="btnUpdate" onClick={() => setShowEdit(!showEdit)}>
            Up
          </button>
        </div>
      </li>
      {showEdit && (
        <EditItem
          item={item}
          onUpdateItem={onUpdateItem}
          setShowEdit={setShowEdit}
        />
      )}
    </>
  );
}
