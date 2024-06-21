from transformers import AutoModelForSequenceClassification, TFAutoModelForSequenceClassification
from transformers import AutoTokenizer
import numpy as np
from scipy.special import expit
'''
# The Cloud Functions for Firebase SDK to create Cloud Functions and set up triggers.
from firebase_functions import firestore_fn, https_fn

# The Firebase Admin SDK to access Cloud Firestore.
from firebase_admin import initialize_app, firestore
import google.cloud.firestore

app = initialize_app()
'''

MODEL = f"cardiffnlp/tweet-topic-21-multi"
tokenizer = AutoTokenizer.from_pretrained(MODEL)

def topic_extraction(text):
        # PT
    model = AutoModelForSequenceClassification.from_pretrained(MODEL)
    class_mapping = model.config.id2label

    tokens = tokenizer(text, return_tensors='pt')
    output = model(**tokens)

    scores = output[0][0].detach().numpy()
    scores = expit(scores)
    predictions = (scores >= 0.1) * 1


    # TF
    #tf_model = TFAutoModelForSequenceClassification.from_pretrained(MODEL)
    #class_mapping = tf_model.config.id2label
    #text = "It is great to see athletes promoting awareness for climate change."
    #tokens = tokenizer(text, return_tensors='tf')
    #output = tf_model(**tokens)
    #scores = output[0][0]
    #scores = expit(scores)
    #predictions = (scores >= 0.5) * 1

    results = []

    # Map to classes
    for i in range(len(predictions)):
        if predictions[i]:
            result = (class_mapping[i], scores[i])
            results.append(result)

    return results