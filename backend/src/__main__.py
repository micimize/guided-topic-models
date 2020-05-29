from db import poller, save, get_prefixed, run_on_all
from analysis import analyze

default_doc = {
    "text": "",
    "@annotations": {}
}

def defaults(doc):
    for key, value in default_doc.items():
        if (key not in doc):
            doc[key] = value
    return doc

def process_changes(doc, db):
    doc = defaults(doc)
    doc = analyze(doc, get_prefixed(db, 'topic/'))
    doc = save(doc)
    return doc

if __name__ == "__main__":
    if (False):
      run_on_all(process_changes)
    poll = poller() # TODO: add cli flag for analyzing all unanalyzed docs. Or maybe a view
    poll(process_changes)

