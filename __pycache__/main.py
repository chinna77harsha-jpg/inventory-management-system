from fastapi import FastAPI

app = FastAPI(
    title="Inventory Management System",
    version="1.0"
)

@app.get("/")
def home():
    return {"message": "Inventory Management System"}

