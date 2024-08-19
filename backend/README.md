# Backend 
quick start 

```
python -m pip install -r requirements.txt 
python -m uvicorn app.main:app --reload 
```


database migration 


```
alembic init migrations 
alembic revision --autogenerate -m "create hero table"
alembic upgrade head
```
