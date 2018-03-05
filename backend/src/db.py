import couchdb, os

def env(*suffixes):
    return tuple(os.environ["COUCHDB_%s" % suffix] for suffix in suffixes)

couch = couchdb.Server(*env("URL")) #)"http://%s:%s@%s/" % env("USERNAME", "PASSWORD", "URL"))

def init_db(name):
    try:
        return couch[name]
    except couchdb.ResourceNotFound as e:
        couch.create(name)
        return couch[name]

db = init_db('blei-lab-associated-press')

def save(doc):
    _id, _rev = db.save(doc)
    return db[_id]

def poller(feed="continuous", heartbeat="1000", include_docs=True, since='now', **kwargs):
    def poll(function):
        changes = db.changes(
                since=since,
                feed=feed,
                heartbeat=heartbeat,
                include_docs=include_docs,
                **kwargs)
        for change in changes:
            doc = change["doc"]
            function(doc, db) 
    return poll

def get_prefixed(db, prefix: str):
    return db.view('_all_docs',
        include_docs=True,
        wrapper=raw_doc,
        startkey=prefix,
        endkey=prefix + "\ufff0"
    )
    
