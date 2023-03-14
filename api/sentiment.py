from dostoevsky.tokenization import RegexTokenizer
from dostoevsky.models import FastTextSocialNetworkModel

tokenizer = RegexTokenizer()
tokens = tokenizer.split('всё очень плохо')

model = FastTextSocialNetworkModel(tokenizer=tokenizer)

def reviews_sentiment(text):
    messages = [text]

    results = model.predict(messages, k=2)
    for message, sentiment in zip(messages, results):
        for item in sentiment:
            return item