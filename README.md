# guided-topic-models

**OK, SO,** the original intent of this project was to do topic modeling so as to discretely label blobs of text,
such as "this sentence is about work" or "this sentence is about eating". 
  
Coming back to it now, this is less useful than simple tag generation/recommendation, and word vector-based search - 
at least for my current use cases (blogs, articles, writing analysis, etc). So instead, I'm going to go with something clientside,
like vector-based search or w/e

## Architecture

Perhaps the most interesting thing about this project is the couchdb-polling "annotate on change" design.
My thinking was that one could have a number of docker containers all listening to changes on `text` or other `@meta` fields,
For a modular and scalable database-centric architecture. This would be suitable in a more serious / heavy duty active learning scenario,
which is what I had in mind.

```bash
# truncated/annotated `tree -L 2 .` output
├── backend
│   ├── data # vectors go here
│   └── src  # gensim wrappers, couchdb poller
├── data
│   ├── corpuses       
│   │   ├── newsgroup-20-docs         # processed from http://qwone.com/~jason/20Newsgroups/ 
│   │   └── blei-lab-associated-press # processed from http://www.cs.columbia.edu/~blei/lda-c/
│   ├── designDocs     # couch design doc
│   └── etl            # loading scripts
├── web                # this react app is absolutely ancient
├── docker-compose.yml # broken, maybe never worked
└── dev_notes.md       # some notes from when this project was alive
```


### Concept, thoughts, brainstorming

On top of our pretrained word vectors, we add another dimension: the user-defined topic dimension.
This dimension isn't learned. Rather, it is used to warp the entire word vector space.

Surprisingly, I haven't found any techniques for smoothly warping a vector space the way I want to.
Perhaps I just don't know the right domain keywords to search by – anyhow, guided k-means might be more appropriate

A more sensible approach is actively learned "Known Constraints on the Observations"
https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3979639/

Actually the whole idea might not be that good.

Reason being, tags are pretty much just more useful than topics, and topics can be modeled as tag clusters,
So just use tags and group them by proximity or explicit links.

This solves the problem without having to learn any new features of the data, I think

