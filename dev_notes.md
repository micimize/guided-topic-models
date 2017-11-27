# Architecture targets
* backends
  * db/management
    * watch user db for `action/load`
      * couchdb.playground: limited sync based on "event" doc put in the playground
    * ensure load stays within resource constraints
    * filtered replicatoin into playground from corpus
  * analysis:
    * use max sentence-wise BOW NN to find the given topic for a sentence
    * we want to maintain the topic distribution
    * sentence importance is maybe `word_count - stopword_count`
    - later we can split long sentences based on grammar queues
* frontend
  * document editor with:
    * topic annotation 
      - later specifying the topic of a sentence should autochange the topics
    * meta data view
  * topic editor sidebar
  * list of documents
* protocol
  * is `@meta` for required actions a good strategy?
  * `@meta` probably buffer necessary for not punching yourself in the face with changes


# notes:
## polling for analysis notes
simple multiple dbs on the server:
* poll `/_db_updates`
* grab docs from `/{db_name}/_changes` on change
* dedupe and analyze

polling multiple dbs on the server:
* maintain list of open feeds
* poll `/_db_updates`
* when a db is created or updated, add it to the list of open feeds
* poll `_changes` from all open feeds
* when a db hasn't been changed in under `timeout` time, close 

scaling the above:
* `/user_activity` db with open feeds list
* anaysis microservice 

## current document formats
```json
{
  "@annotations": {
    "corpus": {
      "or": [
        "{{name}}",
        {
          "name": "newsgroup-20",
          "partition": "test",
          "class": "alt.atheism"
        }
      ]
    }
  "text": "..."
}
```
corpus records:
```json
{
  "name": "newsgroup",
  "href": "http://qwone.com/~jason/20Newsgroups/20news-bydate.tar.gz",
  "description": "20 Newsgroups sorted by date; duplicates and some headers removed (18846 documents)"
}
```


### 
