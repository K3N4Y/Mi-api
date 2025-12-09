from httpx import AsyncClient
from app.main import app

async def test_register():
    async with AsyncClient(app=app, base_url="http://test") as ac:
        r = await ac.post("/auth/register", json={"email":"a@b.com","password":"pass"})
        assert r.status_code == 201
