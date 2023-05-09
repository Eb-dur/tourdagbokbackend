from flask import Flask, render_template, request, jsonify
import databasehelper as dbh
from waitress import serve

app = Flask(__name__)


@app.route('/', methods = ['GET'])
def return_data():
    data, suc = dbh.get_entries()
    if not suc:
        return "Fail", 500
    else:
        return jsonify(data), 200

@app.route('/send', methods = ['POST'])
def publish_data():
    entrydata = request.get_json()
    if not all(x for x in entrydata.values()):
        return "Return något fält tomt", 400
    suc = dbh.post_entry(entrydata)
    if not suc:
        return "Fail", 500
    else:
        return "Succ", 200
    

if __name__ == "__main__":
    serve(app, listen='*:8080')





