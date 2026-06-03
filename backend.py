from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

products = [
    {"id": 1, "name": "Laptop", "price": 50000, "stock": 10},
    {"id": 2, "name": "Mouse", "price": 500, "stock": 25}
]
customers = [
    {
        "id": 1,
        "customer name": "Harsha",
        "email": "harsha@gmail.com",
        "phone": "9876543210"
    }
]
@app.get("/customers")
def get_customers():
    return customers

class Product(BaseModel):
    id: int
    name: str
    price: float
    stock: int


class Customer(BaseModel):
    id: int
    name: str
    email: str
    phone: str


@app.get("/")
def home():
    return {"message": "Inventory Management System"}


# ---------------- PRODUCTS ----------------

@app.get("/products")
def get_products():
    return products


@app.post("/products")
def add_product(product: Product):
    products.append(product.dict())
    return {"message": "Product Added Successfully"}


@app.delete("/products/{product_id}")
def delete_product(product_id: int):
    for product in products:
        if product["id"] == product_id:
            products.remove(product)
            return {"message": "Product Deleted"}

    return {"message": "Product Not Found"}


# ---------------- CUSTOMERS ----------------
class Customer(BaseModel):
    id: int
    name: str
    email: str
    phone: str

@app.get("/customers")
def get_customers():
    return customers


@app.post("/customers")
def add_customer(customer: Customer):
    customers.append(customer.dict())
    return {"message": "Customer Added Successfully"}

@app.delete("/customers/{customer_id}")
def delete_customer(customer_id: int):
    global customers

    customers = [
        customer for customer in customers
        if customer["id"] != customer_id
    ]

    return {"message": "Customer deleted successfully"}