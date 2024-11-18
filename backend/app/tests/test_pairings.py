import pytest
from app import create_app, db
from app.models import Student, Pairing

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

def test_pair_students(client):
    client.post('/students/', json={"name": "John Doe"})
    client.post('/students/', json={"name": "Jane Smith"})
    response = client.post('/pairings/')
    assert response.status_code == 201
    assert len(response.json['pairs']) == 1

def test_get_pairings(client):
    client.post('/students/', json={"name": "John Doe"})
    client.post('/students/', json={"name": "Jane Smith"})
    client.post('/pairings/')
    response = client.get('/pairings/')
    assert response.status_code == 200
    assert len(response.json) == 1
