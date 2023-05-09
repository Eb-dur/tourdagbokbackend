import sqlite3
from flask import g

DATABASE_URI = "database.db"
DATABASE_CONNECTION = sqlite3.connect(DATABASE_URI)


def get_db():
    try:
        # for server connection
        db = getattr(g, 'db', None)
        if db is None:
            db = g.db = sqlite3.connect(DATABASE_URI)
        return db
    except:
        # local debug purpose
        print("g does not work!")
        return DATABASE_CONNECTION


def disconnect():
    db = getattr(g, 'db', None)
    if db is not None:
        g.db.close()
        g.db = None


def get_entries():
    "Retrieves data from db"
    try:
        cursor= get_db().execute(
            "select * from entries;")
        matches = cursor.fetchall()
        cursor.close()

        result = []
        for index in range(len(matches)):
            result.append({
                'namn': matches[index][0],
                'text': matches[index][1],
                'date': matches[index][2],
                "id":   matches[index][3]
            })

        return result, True
    except:
        return "Fail", False


def post_entry(entry: dict):
    "Adds an entry to db"
    id = len(get_entries()[0])
    try:
        get_db().execute(
            "INSERT INTO entries VALUES(?,?,?,?);", [entry['namn'], entry['text'], entry['date'], id])
        get_db().commit()
        return True
    except:
        return False


