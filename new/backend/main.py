# Import flask and datetime module for showing date and time
from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
from test_call import calling_functions
import datetime
import json

def data(request):
    """Responds to both GET and POST requests."""
    if request.method == 'GET':
        result = "empty"
    elif request.method == 'POST':
        request_json = request.get_json(silent=True)
        if request_json and 'text' in request_json:
            text = request_json['text']
            result = calling_functions(text)
        else:
            result = "No text provided"
    else:
        return 'Only GET and POST methods are supported', 405
    
    return json.dumps(str(result))

def login(request):
    """Handles login POST requests only."""
    if request.method == 'POST':
        return json.dumps({'token': 'test123'})
    else:
        return 'Only POST method is supported', 405
