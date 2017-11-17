import glob, json, os


def makedirs_p(dir_name):
    if not os.path.exists(dir_name):
        os.makedirs(dir_name)


def contents_of(file_name):
    with open(file_name, 'r', encoding='utf8') as f:
      return f.read()


def corpus_annotations(corpus_name, path):
    path = path.split('/')
    corpus_id = path[-1]
    corpus_class = path[-2]
    partition = path[-3].split('-')[-1]
    return [ corpus_name, corpus_class, partition, corpus_id ], {
        "name": corpus_name,
        "partition": partition,
        "class": corpus_class,
    }


def flatten(corpus_name, path):
    identifiers, annotations = corpus_annotations(corpus_name, path)
    return '_'.join(identifiers[1:]) + '.json', {
        "_id": '/'.join(identifiers),
        "@annotations": { "corpus": annotations },
        "text": contents_of(path)
    }
  

def flatten_corpus(source='./corpuses/20news-bydate/*/*/*', target='./corpuses/newsgroup-20-docs'):
    makedirs_p(target)
    for path in glob.glob(source):
        flat_name, data = flatten('newsgroup-20', path)
        with open(target + '/' + flat_name, 'w', encoding='utf8') as f:
            json.dump(data, f, ensure_ascii=False)


if __name__ == "__main__":
    flatten_corpus()
