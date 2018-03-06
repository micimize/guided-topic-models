from .summary import summary, keywords
from .topics import topics

def analyze(doc, topics):
    text = doc["text"]
    doc["@annotations"]["topics"] = sentence_topics(text, topics)
    doc["@annotations"]["summary"] = summary(text)
    doc["@annotations"]["keywords"] = keywords(text)
    return doc

