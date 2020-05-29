import couchdb, os

def env(*suffixes):
    return tuple(os.environ["COUCHDB_%s" % suffix] for suffix in suffixes)

couch = couchdb.Server(*env("URL")) #)"http://%s:%s@%s/" % env("USERNAME", "PASSWORD", "URL"))

def raw_doc(row):
    return row["doc"]

def init_db(name):
    try:
        return couch[name]
    except couchdb.ResourceNotFound as e:
        couch.create(name)
        return couch[name]

db = init_db('blei-lab-associated-press')

def save(doc):
    if (doc.get('@status', None) == 'REFRESHED'):
      doc['@status'] = 'CHECKED_OUT'
    if (doc.get('@status', None) == 'SAVED'):
      del doc['@status']
    _id, _rev = db.save(doc)
    return db[_id]

def poller(feed="continuous", heartbeat="1000", include_docs=True, since='now', **kwargs):
    def poll(function):
        changes = db.changes(
                since=since,
                feed=feed,
                heartbeat=heartbeat,
                include_docs=include_docs,
                view="""function(doc, req) {
                  return doc['@status'] && ((doc['@status'] === 'SAVED') || (doc['@status'] === 'REFRESHED'))
                }""",
                **kwargs)
        for change in changes:
            doc = change["doc"]
            function(doc, db) 
    return poll

def run_on_all(function):
    for doc in db.view('_all_docs', include_docs=True, wrapper=raw_doc):
        function(doc, db)
        print(doc['_id'])

def get_prefixed(db, prefix: str):
    return db.view('_all_docs',
        include_docs=True,
        wrapper=raw_doc,
        startkey=prefix,
        endkey=prefix + "\ufff0"
    )
    


def get_prefixed(db, prefix: str):
    return db.view('_all_docs',
        include_docs=True,
        wrapper=raw_doc,
        startkey=prefix,
        endkey=prefix + "\ufff0"
    )
    
