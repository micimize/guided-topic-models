# Gaussian-LDA-word2vec
LDA topic modeling with word2vec using gaussian topic distributions for infinite vocabulary

Based off of the paper written by Rajarshi Das, Manzil Zaheer and Chris Dryer http://rajarshd.github.io/papers/acl2015.pdf

It does LDA, but with word2vec instead of typical tf-idf word vectorization schemes.  Since the word vectors are continuous, 
fitting the topic distributions to gaussians is ideal.  This allows you to handle out of vocabulary words when assessing
new documents. 

The current implementation does not have the fancy speed-up tricks used in the paper (eg. cholesky decomposition)... Those will come soon.

