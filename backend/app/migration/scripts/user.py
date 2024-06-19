from app.db.base import engine 
from sqlalchemy import text 
def create_user_database(): 
    with engine.connect() as conn: 
        query = """
        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            email VARCHAR(255) NOT NULL,
            password VARCHAR(255) NOT NULL,
            first_name VARCHAR(255),
            last_name VARCHAR(255),
            verified BOOLEAN DEFAULT FALSE
        );

        CREATE INDEX IF NOT EXISTS idx_users_email_hash ON users USING hash (email);
        """
        conn.execute(text(query))


