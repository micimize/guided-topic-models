# guided-topic-models

**OK, SO,** the original intent of this project was to do topic modeling so as to discretely label blobs of text,
such as "this sentence is about work" or "this sentence is about eating". 
  
Coming back to it now, this is less useful than simple tag generation/recommendation, and word vector-based search - 
at least for my current use cases (blogs, articles, writing analysis, etc). So instead, I'm going to go with something clientside,
like vector-based search or w/e


## Fundamental Idea:

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
