""" Utilities to apply a buffered change to the entry """


def splice(string, start, deletion, addition, force=False):
    deletion_end = len(deletion) + start
    if not force and len(deletion) and not (string[start:deletion_end] == deletion):
        raise ValueError('target substring "%s" does not match deletion string "%s"' % (
                    string[start:deletion_end], deletion ))
    return string[:start] + addition + string[deletion_end:]


def patch(string, diff, reverse=False):
    index = int(diff.get("i"))
    if reverse:
        deletion = diff.get("+", "")
        addition = diff.get("-", "")
    else:
        deletion = diff.get("-", "")
        addition = diff.get("+", "")
    return splice(string, index, deletion, addition, force=True)

def last_applied_action(history, state="UNDONE"):
    return next((i, act) for i, act
         in reversed(enumerate(history))
         if act.get("state", "APPLIED") != "UNDONE")

def apply_change(doc, buffer):
    if buffer.has_key("state"):
        index, act = last_applied_action(
                doc["@meta"]["history"], buffer["state"])
        patch(doc["entry"], buffer["diff"],
            reverse=True if buffer["state"] == "UNDONE" else False)
        doc["@meta"]["history"][index]["state"] = buffer["state"]
    doc["entry"] = patch(doc["entry"], buffer["diff"])
    doc["@meta"]["history"].append(buffer)
    return doc


def debuffer_changes(doc):
    buffer = doc["@meta"]["buffer"]
    if isinstance(buffer, list):
        for change in buffer:
            doc = apply_change(doc, change)
    else:
        doc = apply_change(doc, buffer)
    del doc["@meta"]["buffer"]
    return doc


