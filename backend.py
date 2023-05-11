from flask import Flask, request, jsonify, render_template
import databasehelper as dbh
from waitress import serve

app = Flask(__name__)

@app.teardown_request
def teardown(exception):
    dbh.disconnect()

@app.route('/', methods=["GET"])
def root():
    return render_template("kuken.html")


@app.route('/get', methods = ['GET'])
def return_data():
    data, suc = dbh.get_entries()
    entries = {"entries":data}
    if not suc:
        entries = {"entries": "Fail"}
        return entries, 500
    else:
        print(entries)
        return jsonify(entries), 200

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





