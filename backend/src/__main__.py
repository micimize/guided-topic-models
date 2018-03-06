from db import poller, save, get_prefixed
from debuffer import debuffer_changes
from analysis import analyze

def defaults(doc):
    if not doc.has_key("text"):
        doc["text"] = ""
    if not doc.has_key("@annotations"):
        doc["@annotations"] = { "topics": [] }
    return doc

def raw_doc(row):
    return row["doc"]

def process_changes(doc, db):
    doc = defaults(doc)
    doc = analyze(doc, get_prefixed(db, 'topic/'))
    doc = save(doc)
    return doc

if __name__ == "__main__":
    poll = poller() # TODO: add cli flag for analyzing all unanalyzed docs. Or maybe a view
    poll(process_changes)

