from gensim.summarization import keywords as gensim_keywords
from gensim.summarization.summarizer import INPUT_MIN_LENGTH, summarize


def summary(blob: str):
    try:
        return summarize(blob) if len(blob) > INPUT_MIN_LENGTH else blob
    except ValueError as error:
        if error.args and error.args[0] == "input must have more than one sentence":
            return blob


def keywords(blob: str):
    """Extract keywords from blob
    """
    
    try:
        return gensim_keywords(blob, scores=True) if len(blob) > INPUT_MIN_LENGTH else []
    except ZeroDivisionError as error:
        return []
