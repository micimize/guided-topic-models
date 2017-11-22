'''
<DOC>
<DOCNO> AP123456-0123 </DOCNO>
<TEXT>
...article text...
 </TEXT>
</DOC>
'''
import json, os
from xml.etree.cElementTree import XMLPullParser
from collections import defaultdict

def etree_to_dict(t):
    "https://stackoverflow.com/a/10076823/2234013"
    d = { t.tag: {} if t.attrib else None }
    children = list(t)
    if children:
        dd = defaultdict(list)
        for dc in map(etree_to_dict, children):
            for k, v in dc.items():
                dd[k].append(v)
        d = {t.tag: {k: v[0] if len(v) == 1 else v
                     for k, v in dd.items()}}
    if t.attrib:
        d[t.tag].update(('@' + k, v)
                        for k, v in t.attrib.items())
    if t.text:
        text = t.text.strip()
        if children or t.attrib:
            if text:
              d[t.tag]['#text'] = text
        else:
            d[t.tag] = text
    return d

def parse_associated_press(tree):
    structure = etree_to_dict(tree)['DOC']
    corpus = 'blei-lab-associated-press'
    return structure['DOCNO'] + '.json', {
        '@annotations': { 'corpus': corpus },
        '_id': corpus + '/' + structure['DOCNO'],
        'text': structure['TEXT'],
    }


def read_in_chunks(f, size=1024):
    while True:
        chunk = f.read(size)
        if not chunk:
            break
        yield chunk

def clean(text: str):
    return text.replace('&','&amp;')

def xml_stream_reader(file_pointer, extract, parse=etree_to_dict, clean=clean):
    parser = XMLPullParser([ 'start', 'end' ])
    parser.feed('<WRAPPER>')
    root = list(parser.read_events())[0][1]
    with open(file_pointer) as f:
        for chunk in read_in_chunks(f):
            parser.feed(clean(chunk))
            for event, elem in parser.read_events():
                if (event == 'end' and elem.tag in extract):
                    yield parse(elem)
                    elem.clear()
                    root.clear()
    parser.feed('</WRAPPER>')
    root.clear()
    parser.close()




def makedirs_p(dir_name):
    if not os.path.exists(dir_name):
        os.makedirs(dir_name)


def contents_of(file_name):
    with open(file_name, 'r', encoding='utf8') as f:
      return f.read(chunk)


def flatten(corpus_name, path):
    identifiers, annotations = corpus_annotations(corpus_name, path)
    return '_'.join(identifiers[1:]) + '.json', {
        "_id": '/'.join(identifiers),
        "@annotations": { "corpus": annotations },
        "text": contents_of(path)
    }
  

def flatten_corpus(source='./associated_press.txt', target='./corpuses/blei-lab-associated-press'):
    makedirs_p(target)
    for flat_name, data in xml_stream_reader(source,
            extract=['DOC'],
            parse=parse_associated_press):
        with open(target + '/' + flat_name, 'w', encoding='utf8') as f:
            json.dump(data, f, ensure_ascii=False)


if __name__ == "__main__":
    flatten_corpus()
