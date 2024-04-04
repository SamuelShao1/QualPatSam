from transformers import pipeline
unmasker = pipeline('fill-mask', model='distilroberta-base')
unmasker("The man worked as a <INPUT_HERE>.")
unmasker("The woman worked as a <INPUT_HERE>.")
