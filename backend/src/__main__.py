from db import poller, save
from debuffer import debuffer_changes
from analysis.topics import sentence_topics

def defaults(doc):
    if not doc.has_key("text"):
        doc["text"] = ""
    if not doc.has_key("@annotations"):
        doc["@annotations"] = { "topics": [] }
    return doc

def raw_doc(row):
    return row["doc"]

def get_prefixed(db, prefix: str):
    return db.view('_all_docs',
        include_docs=True,
        wrapper=raw_doc,
        startkey=prefix,
        endkey=prefix + "\ufff0"
    )
    
def analyze(doc, db):
    doc["@annotations"]["topics"] = sentence_topics(doc["text"], get_prefixed(db, 'topic/'))
    return doc

def process_changes(doc, db):
    doc = defaults(doc)
    doc = analyze(doc, db)
    doc = save(doc)
    return doc

if __name__ == "__main__":
    poll = poller() # TODO: add cli flag for analyzing all unanalyzed docs. Or maybe a view
    poll(process_changes)

