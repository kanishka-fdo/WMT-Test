import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { createItem } from "../api/itemApi";

const initialState = {
  name: "",
  category: "",
  quantity: "",
  price: "",
  description: "",
  serialNumber: '',
};

function AddItemPage() {
  const [formData, setFormData] = useState(initialState);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.name || !formData.category || !formData.quantity || !formData.price) {
      setError("Please fill in all required fields.");
      return;
    }

    try {
      setLoading(true);
      await createItem(formData);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add item.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1 className="page-title">Add New Item</h1>
      <div className="form-card">
        {error && <div className="alert alert-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Item Name *</label>
            <input
              type="text"
              name="name"
              placeholder="Enter item name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Category *</label>
            <input
              type="text"
              name="category"
              placeholder="e.g. Electronics, Furniture"
              value={formData.category}
              onChange={handleChange}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Quantity *</label>
              <input
                type="number"
                name="quantity"
                placeholder="0"
                min="0"
                value={formData.quantity}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Price ($) *</label>
              <input
                type="number"
                name="price"
                placeholder="0.00"
                min="0"
                step="0.01"
                value={formData.price}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              placeholder="Optional description"
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
  <label htmlFor="serialNumber">Serial Number</label>
  <input
    type="text"
    id="serialNumber"
    name="serialNumber"
    value={formData.serialNumber}
    onChange={handleChange}
    placeholder="Enter serial number"
    required
  />
</div>

          <div style={{ display: "flex", gap: "1rem", marginTop: "0.5rem" }}>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? "Adding..." : "Add Item"}
            </button>
            <Link to="/" className="btn btn-secondary">Cancel</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddItemPage;
