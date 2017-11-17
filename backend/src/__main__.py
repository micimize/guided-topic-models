from db import poller, save
from debuffer import debuffer_changes
from analysis import analyze

from annotate import annotate_text

def analyze(doc):
    doc["annotations"] = annotate_text(doc["entry"])
    return doc

def defaults(doc):
    if not doc.has_key("entry"):
        doc["entry"] = ""
    if not doc.has_key("@meta"):
        doc["@meta"] = { "history": [] }
    if not doc["@meta"].has_key("history"):
        doc["@meta"]["history"] = []
    return doc

def process_changes(doc):
    if doc["@meta"].has_key("buffer"):
        doc = defaults(doc)
        doc = debuffer_changes(doc)
        doc = analyze(doc)
        doc = save(doc)
        return doc

if __name__ == "__main__":
    poll = poller() # TODO: add cli flag for analyzing all unanalyzed docs. Or maybe a view
    poll(process_changes)

