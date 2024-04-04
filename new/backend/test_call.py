import twitter_roberta_base_sentiment_latest as sen
import topic
import word_count as wc
text = "Please give an example of when you received a constructive feedback and how you reacted."

# text = "Flu is speading fast, but covid is not spreading as fast!"
def calling_functions(text):
    sentiment = sen.sentiment_analysis(text)
    w = wc.count_words(text)
    t = topic.topic_extraction(text)
    # print(sentiment)
    # print(w)
    # print(t)
    return [sentiment, w, t]
# text_ques = "Tell me about a time when you had to deal with a challenging team member. How did you handle the situation, and what was the outcome?"
# text_res = "In my previous role as a project manager, I encountered a situation where one team member consistently missed deadlines, affecting the overall project timeline. To address this, I scheduled a private meeting with the team member to discuss the challenges they were facing. During our conversation, I actively listened to their concerns and identified specific obstacles hindering their performance. To provide support, I collaborated with the team member to create a realistic action plan, breaking down tasks into manageable steps. Additionally, I offered guidance on time management techniques and suggested resources to improve their skills. Throughout this process, I maintained open communication, ensuring the team member felt supported rather than criticized. As a result, the team member's performance significantly improved, and they started meeting deadlines consistently. The project, which initially faced delays, regained momentum, and the team's overall morale improved. This experience taught me the importance of addressing issues with empathy and finding collaborative solutions to achieve positive outcomes."
# calling_functions(text)