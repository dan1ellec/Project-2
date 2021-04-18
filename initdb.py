import os
from sqlalchemy import create_engine, Table, Column, Float, Integer, String, MetaData

meta = MetaData()

connection = os.environ.get('DATABASE_URL', '') or "sqlite:///db.sqlite"

print("connection to databse")
engine = create_engine(connection)

if not engine.has_table("pets"):
    print("Creating Table")

    new_table = Table(
        'pets', meta,
        Column('id', Integer, primary_key=True, autoincrement=True),
        Column('name', String),
        Column('lat', Float),
        Column('lon', Float),
    )

    meta.create_all(engine)
    
    print("Table created")

    seed_data = [
        {"name": "Doug", "lat": 40.7128, "lon": 74.006},
        {"name": "Doug", "lat": -40.7128, "lon": 74.006},
        {"name": "Doug", "lat": 40.7128, "lon": -74.006},
        {"name": "austin", "lat": 30.0, "lon": -97},
    ]
    
    with engine.connect() as conn:
        conn.execute(new_table.insert(), seed_data)

    print("Seed Data Imported")
else:
    print("Table already exists")
print("initdb complete")