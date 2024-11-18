import pytest
from app import create_app, db
from app.models import Student

@pytest.fixture
def client():
    app = create_app()
    app.config['TESTING'] = True
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///:memory:'
    with app.test_client() as client:
        with app.app_context():
            db.create_all()
        yield client
        with app.app_context():
            db.drop_all()

def test_add_student(client):
    response = client.post('/students/', json={"name": "John Doe"})
    assert response.status_code == 201
    assert response.json['message'] == "Student added successfully"

def test_get_students(client):
    client.post('/students/', json={"name": "John Doe"})
    client.post('/students/', json={"name": "Jane Smith"})
    response = client.get('/students/')
    assert response.status_code == 200
    assert len(response.json) == 2

def test_delete_student(client):
    client.post('/students/', json={"name": "John Doe"})
    response = client.delete('/students/1')
    assert response.status_code == 200
    assert response.json['message'] == "Student deleted successfully"
