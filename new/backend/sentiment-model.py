import torch
import torch.nn.functional as F

model_name = "mrm8488/distilroberta-finetuned-financial-news-sentiment-analysis"



# from transformers import RobertaTokenizer, RobertaModel
# tokenizer = RobertaTokenizer.from_pretrained('roberta-base')
# model = RobertaModel.from_pretrained('roberta-base')
# text = "Replace me by any text you'd like."
# encoded_input = tokenizer(text, return_tensors='pt')
# output = model(**encoded_input)


# from transformers import pipeline

# distilled_student_sentiment_classifier = pipeline(
#     model="lxyuan/distilbert-base-multilingual-cased-sentiments-student", 
#     return_all_scores=True
# )

# # english
# distilled_student_sentiment_classifier ("I love this movie and i would watch it again and again!")
# # >> [[{'label': 'positive', 'score': 0.9731044769287109},
# #   {'label': 'neutral', 'score': 0.016910076141357422},
# #   {'label': 'negative', 'score': 0.009985478594899178}]]

# # malay
# distilled_student_sentiment_classifier("Saya suka filem ini dan saya akan menontonnya lagi dan lagi!")
# # [[{'label': 'positive', 'score': 0.9760093688964844},
# #   {'label': 'neutral', 'score': 0.01804516464471817},
# #   {'label': 'negative', 'score': 0.005945465061813593}]]

# # japanese
# distilled_student_sentiment_classifier("私はこの映画が大好きで、何度も見ます！")
# # >> [[{'label': 'positive', 'score': 0.9342429041862488},
# #   {'label': 'neutral', 'score': 0.040193185210227966},
# #   {'label': 'negative', 'score': 0.025563929229974747}]]
