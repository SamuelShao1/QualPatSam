from transformers import AutoModelForSequenceClassification
from transformers import TFAutoModelForSequenceClassification
from transformers import AutoTokenizer, AutoConfig
import numpy as np
from scipy.special import softmax
# Preprocess text (username and link placeholders)

def preprocess(text):
    new_text = []
    for t in text.split(" "):
        t = '@user' if t.startswith('@') and len(t) > 1 else t
        t = 'http' if t.startswith('http') else t
        new_text.append(t)
    return " ".join(new_text)

def sentiment_analysis(text):
    text = preprocess(text)
    encoded_input = tokenizer(text, return_tensors='pt')
    output = model(**encoded_input)
    scores = output[0][0].detach().numpy()
    scores = softmax(scores)

    # Create a list to store results
    results = {}

    # Print labels and scores
    ranking = np.argsort(scores)
    ranking = ranking[::-1]
    for i in range(scores.shape[0]):
        label = config.id2label[ranking[i]]
        score = scores[ranking[i]]
        # getting rid of labels for simplification purposes when parsing for the frontend
        # the labels always come out in the order of: neutral, negative, and positive
        result = np.round(float(score), 3)
        results[label] = result

    # create list of results - correct order for table
    print(results)
    results_list = []
    results_list.append(results.get("positive"))
    results_list.append(results.get("neutral"))
    results_list.append(results.get("negative"))
    print(results_list)
    return results_list


MODEL = f"lxyuan/distilbert-base-multilingual-cased-sentiments-student"
tokenizer = AutoTokenizer.from_pretrained(MODEL)
config = AutoConfig.from_pretrained(MODEL)
# PT
model = AutoModelForSequenceClassification.from_pretrained(MODEL)
#model.save_pretrained(MODEL)

# text = "Flu is speading fast, but covid is not spreading as fast!"
# sentiment_analysis(text)