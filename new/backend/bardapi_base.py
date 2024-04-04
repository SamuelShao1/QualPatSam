#from https://github.com/dsdanielpark/Bard-API
#need to install 
#use pip to install

from bardapi import Bard
import os

example_file_1="new/backend/data/newexample.csv"
example_file_2="new/backend/data/newexample1.csv"
example_file_3="new/backend/data/newexample2.csv"
example_file_4="new/backend/data/sample_response_2.csv"
with open(example_file_1) as f:
    example_1 = f.read()
with open(example_file_2) as f:
    example_2 = f.read()
with open(example_file_3) as f:
    example_3 = f.read()
with open(example_file_4) as f:
    example_4 = f.read()

#input: text- text to analyze, cur_token- your Google account token (see bardAPI txt file)
#output: a string with of the paragraph of Bard's summary of the conversation and a overall sentiment description at the end
def extract_summary(text, cur_token):

    bard = Bard(token=cur_token)
    response = bard.get_answer(
        "The following text consists of pairs of questions and answers. Could you give me a summary of the answer for each pair? Following text: " + text)['content']
    print("EXAMPLE 1 RESPONSE :" + response)
    return response

extract_summary(example_4, 'dwjPYkb8v3Lm0aM7vdnTwh1iO0Ei--cY6WVfGvf7jDonIOTzAFhLP_jT-swJNOlkXL0t6g.')