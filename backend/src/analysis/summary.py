from gensim.summarization import summarize, keywords, INPUT_MIN_LENGTH
import os

def summary(blob: str):
    return summarize(blob) if len(blob) > INPUT_MIN_LENGTH else blob

# keywords is good enough on it's own
