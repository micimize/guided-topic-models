"""
def env(*suffixes):
    environ = {
        "DBNAME": "training",
        "URL": "http://localhost:5984",
        "USERNAME": "admin",
        "PASSWORD": "admin"
    }
    return tuple(environ[suffix] for suffix in suffixes)
"""
import glob, json, os
from collections import deque

import couchdb

def env(*suffixes):
    return tuple(os.environ["COUCHDB_%s" % suffix] for suffix in suffixes)

couch = couchdb.Server("http://%s:%s@localhost:5984/" % env("USERNAME", "PASSWORD"))

def init_db(name: str):
    try:
        return couch[name]
    except couchdb.ResourceNotFound as e:
        couch.create(name)
        return couch[name]

def framer(frame_size=50):
    def frame(iterable):
      return (next(iterable, None) for _ in range(frame_size))
    return frame

def windowed(seq, frame_size=50):
    frame = framer(frame_size)
    iterable = iter(seq)
    window = deque(frame(iterable), maxlen=frame_size)
    yield window
    append = window.append
    for element in iterable:
        append(element)
        yield window

def load_json(path: str):
    with open(path) as file:
      return json.load(file)

def load_corpus(source='./corpuses/newsgroup-20-docs/*', target='newgroup-20'):
    db = init_db(target)
    for batch in windowed(glob.glob(source), 100):
        db.update([ load_json(path) for path in batch ])


