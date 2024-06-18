from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_read_items():
    response = client.get("/api/v1/items/")
    assert response.status_code == 200
    assert response.json() == []
