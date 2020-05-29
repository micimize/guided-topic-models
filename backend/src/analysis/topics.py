from gensim.models.keyedvectors import KeyedVectors
import os

dir = os.path.dirname(__file__)

DIMENSIONS = 300
GLOVE_PATH = '../../data/glove.6B/glove.6B.%sd.txt' % DIMENSIONS

word_vectors = KeyedVectors.load_word2vec_format(os.path.join(dir, GLOVE_PATH), binary=False)

def similarity(tokens, includes=[], excludes=[]):
    return word_vectors.n_similarity(tokens, includes) - word_vectors.n_similarity(tokens, excludes)

empty = {
  "title": "null",
  "similarity": 0
}

def nearest_topic(blob: str, topics=[]):
    tokens = blob.split()
    chosen = None 
    for topic in topics:
        words = topic.get('explicit', {})
        topic_similarity = similarity(tokens, **words)
        if topic_similarity > chosen:
            chosen = {
                "title": topic["title"],
                "similarity": topic_similarity
            }
    return chosen

def sentence_topics(blob: str, topics=[]):
    return [ nearest_topic(sentence, topics) for sentence in blob.split('.') ]
