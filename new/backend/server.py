# Import flask and datetime module for showing date and time
from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
from test_call import calling_functions
import datetime
import json

x = datetime.datetime.now()
 
# Initializing flask app
app = Flask(__name__)
CORS(app, support_credentials=True)
 

@app.route('/data', methods=['GET', 'POST'])
@cross_origin(supports_credentials=True)
def get_results():
    result = "empty"
    if request.method == 'POST':
        data = request.get_json()
        result = calling_functions(data['text'])
    return json.dumps(str(result))

@app.route('/login', methods=['POST'])
@cross_origin(supports_credentials=True)
def login():
    return jsonify(token='test123')
    
# Running app
if __name__ == '__main__':
    app.run(debug=True)