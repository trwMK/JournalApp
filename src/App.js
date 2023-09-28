import "./styles.css";
import ItemList from "./Components/ItemList";
import AddItem from "./Components/AddItem";
import { useEffect, useState } from "react";

export default function App() {
  const [items, setItems] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [item, setItem] = useState({});
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchData() {
      setIsPending(true);
      try {
        const res = await fetch("http://localhost:8000/items");

        if (!res.ok) {
          throw Error("Could not fetch the data");
        }

        const data = await res.json();
        console.log(data);
        setItems(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsPending(false);
        setError("");
      }
    }
    fetchData();
  }, []);

  //Handler Functions
  async function handleAddItems(newItem) {
    try {
      const res = await fetch("http://localhost:8000/items", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newItem),
      });

      if (!res.ok) {
        throw Error("Could not add the item");
      }

      const data = await res.json();
      setItems([...items, data]);
    } catch (error) {
      console.error("Error: ", error);
    }
  }

  async function handleDeleteItem(deletedItem) {
    try {
      const res = await fetch(`http://localhost:8000/items/${deletedItem.id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw Error("Could not delete the item");

      const updatedItems = items.filter((item) => item.id !== deletedItem.id);
      setItems(updatedItems);
    } catch (error) {
      console.log(error.message);
    }
  }

  async function handleUpdateItem(updatedItem) {
    try {
      const res = await fetch(`http://localhost:8000/items/${updatedItem.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedItem),
      });

      if (!res.ok) {
        throw Error("Could not update the item");
      }

      const data = await res.json();
      const updatedItems = items.map((item) =>
        item.id === updatedItem.id ? data : item
      );
      setItems(updatedItems);
    } catch (error) {
      console.error("Error: ", error);
    }
  }

  return (
    <div className="App">
      {error && <div>{error}</div>}
      {isPending ? (
        <div>Loading data...</div>
      ) : (
        <>
          <div className="header">
            <h1>Your diary to a better life</h1>
            <button
              className={
                showForm ? "btnFormHide btnForm" : "btnFormAdd btnForm"
              }
              onClick={() => setShowForm(!showForm)}
            >
              {showForm ? "Hide Form" : "Show Form"}
            </button>
          </div>
          <h2>{items.length ? "Your journal" : "Write about your life"}</h2>
          {showForm && (
            <div>
              <AddItem onAddItems={handleAddItems} setShowForm={setShowForm} />
            </div>
          )}
          <ItemList
            onUpdateItem={handleUpdateItem}
            onDeleteItem={handleDeleteItem}
            item={item}
            setItem={setItem}
            items={items}
          />
        </>
      )}
    </div>
  );
}
