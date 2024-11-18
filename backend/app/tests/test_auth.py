def test_register_user(client):
    response = client.post('/auth/register', json={
        "username": "test_user",
        "password": "secure_password",
        "role": "student"
    })
    assert response.status_code == 201

def test_login_user(client):
    client.post('/auth/register', json={
        "username": "test_user",
        "password": "secure_password"
    })
    response = client.post('/auth/login', json={
        "username": "test_user",
        "password": "secure_password"
    })
    assert response.status_code == 200
