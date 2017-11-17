import couchdb, os

def env(*suffixes):
    return tuple(os.environ["COUCHDB_%s" % suffix] for suffix in suffixes)

couch = couchdb.Server(*env("URL")) #)"http://%s:%s@%s/" % env("USERNAME", "PASSWORD", "URL"))

def init_db(name="training"):
    try:
        return couch[name]
    except couchdb.ResourceNotFound, e:
        couch.create(name)
        return couch[name]

db = init_db()

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
            function(doc) 
    return poll

