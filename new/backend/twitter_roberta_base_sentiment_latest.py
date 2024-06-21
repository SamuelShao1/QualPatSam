from transformers import AutoModelForSequenceClassification
from transformers import TFAutoModelForSequenceClassification
from transformers import AutoTokenizer, AutoConfig
import numpy as np
from scipy.special import softmax
# Preprocess text (username and link placeholders)
from flask import escape, jsonify, request


def preprocess(text):
    new_text = []
    for t in text.split(" "):
        t = '@user' if t.startswith('@') and len(t) > 1 else t
        t = 'http' if t.startswith('http') else t
        new_text.append(t)
        
    return " ".join(new_text)

def sentiment_analysis(request):
    request_json = request.get_json(silent=True)
    request_args = request.args

    if request_json and 'text' in request_json:
        text = request_json['text']
    elif request_args and 'text' in request_args:
        text = request_args['text']
    else:
        return 'No text provided', 400

    text = preprocess(text)
    print(text)
    encoded_input = tokenizer(text, return_tensors='pt')
    output = model(**encoded_input)
    scores = output[0][0].detach().numpy()
    scores = softmax(scores)

    results = {}
    ranking = np.argsort(scores)[::-1]
    for i in range(scores.shape[0]):
        label = config.id2label[ranking[i]]
        score = scores[ranking[i]]
        result = np.round(float(score), 3)
        results[label] = result

    results_list = [results.get("positive"), results.get("neutral"), results.get("negative")]
    print(results_list)
    return jsonify(results_list)

# Model and tokenizer initialization
MODEL = "lxyuan/distilbert-base-multilingual-cased-sentiments-student"
tokenizer = AutoTokenizer.from_pretrained(MODEL, cache_dir='/tmp')
config = AutoConfig.from_pretrained(MODEL, cache_dir='/tmp')
model = AutoModelForSequenceClassification.from_pretrained(MODEL, cache_dir='/tmp')
