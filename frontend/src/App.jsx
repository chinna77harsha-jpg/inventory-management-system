import { useEffect, useState } from "react";

function App() {
  const [products, setProducts] = useState([]);
  const [customers, setCustomers] = useState([]);

  const [customerName, setCustomerName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    fetch("http://127.0.0.1:8000/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));

    fetch("http://127.0.0.1:8000/customers")
      .then((res) => res.json())
      .then((data) => setCustomers(data));
  }, []);

  const handleSubmit = async () => {
     const newCustomer = {
    id: customers.length + 1,
    name: customerName,
    email: email,
    phone: phone,
  };

  const response = await fetch(
    "http://127.0.0.1:8000/customers",
     {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newCustomer),
  });

  if (response.ok) {
    alert("Customer Added!");
    window.location.reload();
  }
};
const handleAddCustomer = async () => {
  const newCustomer = {
    id: customers.length + 1,
    name: customerName,
    email: email,
    phone: phone,
  };

  const response = await fetch(
    "http://127.0.0.1:8000/customers",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newcustomer),
    }
  );

  if (response.ok) {
    alert("Customer Added!");
    window.location.reload();
  }
  };

  const deleteProduct = async (id) => {
    await fetch(`http://127.0.0.1:8000/products/${id}`, {
      method: "DELETE",
    });

    window.location.reload();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Inventory Management System</h1>

      <h2> Customer Management</h2>
<input
  type="text"
  placeholder="Customer Name"
  value={customerName}
  onChange={(e) => setCustomerName(e.target.value)}
/>

<br /><br />

<input
  type="email"
  placeholder="Email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
/>

<br /><br />

<input
  type="text"
  placeholder="Phone"
  value={phone}
  onChange={(e) => setPhone(e.target.value)}
/>

<br /><br />

<button onClick={handleAddCustomer}>
  Add Customer
</button>

<br /><br />
      <input
        type="number"
        placeholder="Price"
        onChange={(e) => setPrice(e.target.value)}
      />

      <br />
      <br />

      <input
        type="number"
        placeholder="Stock"
        onChange={(e) => setStock(e.target.value)}
      />

      <br />
      <br />

      <button onClick={handleSubmit}>
        Add Product
      </button>

      <hr />

      <h2>Products</h2>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.stock}</td>
              <td>
                <button
                  onClick={() =>
                    deleteProduct(product.id)
                  }
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <hr />

      <h2>Customer Management</h2>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {customers.map((customer) => (
            <tr key={customer.id}>
  <td>{customer.id}</td>
  <td>{customer.name}</td>
  <td>{customer.email}</td>
  <td>{customer.phone}</td>

  <td>
    <button onClick={() => deleteCustomer(customer.id)}>
      Delete
    </button>
  </td>
</tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default App;