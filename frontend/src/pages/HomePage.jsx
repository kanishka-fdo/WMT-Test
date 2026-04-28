import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getItems, deleteItem } from "../api/itemApi";

function HomePage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchItems = async () => {
    try {
      setLoading(true);
      const res = await getItems();
      setItems(res.data.data);
    } catch (err) {
      setError("Failed to load items. Make sure the backend is running.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;
    try {
      await deleteItem(id);
      setItems((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      alert("Failed to delete item.");
    }
  };

  if (loading) return <div className="loading">Loading items...</div>;

  return (
    <div className="container">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1 className="page-title">All Items</h1>
        <Link to="/add" className="btn btn-primary">+ Add New Item</Link>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      {items.length === 0 ? (
        <div className="empty-state">
          <h3>No items found</h3>
          <p>Start by adding your first item!</p>
        </div>
      ) : (
        <div className="items-grid">
          {items.map((item) => (
            <div key={item._id} className="item-card">
              <span className="badge">{item.category}</span>
              <h3>{item.name}</h3>
              <p><span>Quantity:</span> {item.quantity}</p>
              <p><span>Price:</span> ${parseFloat(item.price).toFixed(2)}</p>
              {item.description && <p><span>Description:</span> {item.description}</p>}
              <p className="item-detail">
  Serial Number: <span>{item.serialNumber}</span>
</p>
              <div className="card-actions">
                <Link to={`/edit/${item._id}`} className="btn btn-edit">Edit</Link>
                <button className="btn btn-danger" onClick={() => handleDelete(item._id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default HomePage;
