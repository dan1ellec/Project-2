import os
from sqlalchemy import create_engine, Table, Column, Float, Integer, String, MetaData
# from app import db
​
# # db.drop_all()
# db.create_all()
​
meta = MetaData()
​
connection = os.environ.get('DATABASE_URL', '') or "sqlite:///db.sqlite"
​
print("connection to databse")
engine = create_engine(connection)
​
if not engine.has_table("pets"):
    print("Creating Table")
​
    new_table = Table(
        'postalresults', meta,
        Column('electoral_division', Integer, primary_key=True),
        Column('yes_count', Integer),
        Column('no_count', Integer),
        Column('total_responses', Integer),,
    )
​
    meta.create_all(engine)
​
    print("Table created")
​
    seed_data = [
        {"electoral_division": "103", "yes_count": "37736", "no_count": "46343", "total_responses": "84079",}, 
    ]
​
    with engine.connect() as conn:
        conn.execute(new_table.insert(), seed_data)
​
    print("Seed Data Imported")
else:
    print("Table already exists")
print("initdb complete")