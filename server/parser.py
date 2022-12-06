import sys, fitz
import re
import spacy
import pandas
from spacy import displacy


def convertToText(fname):
    doc = fitz.open(fname)
    text = ''
    for page in doc:
        text = text + str(page.get_text())
    tx = " ".join(text.split('\n'))
    return tx
text = convertToText('./public/Chem UA 120-Introduction to Modern Chemistry-Syllabus-Spring 2022.pdf')
nlp = spacy.load("./en_core_web_lg-3.4.1/en_core_web_lg/en_core_web_lg-3.4.1")

ruler = nlp.add_pipe("entity_ruler", before="ner")

patterns = [ 
        {
            "label": "EMAIL", "pattern": [{"TEXT": {"REGEX": "([^@|\s]+@[^@]+\.[^@|\s]+)"}}
        ]},
        {
            "label": "COURSE_NAME", "pattern": [{"TEXT": {"REGEX": "([A-Z]{4}( |-)(U[A-Z])?([0-9]{3}.[0-9]{3})?[^\r\n]*)"}}
        ]},
        {
            "label": "GRADING", "pattern": [{"TEXT": {"REGEX": "^.*[0-9]{1,3}%.*$"}}
        ]}
 ]

ruler.add_patterns(patterns)
doc = nlp(text)
displacy.render(doc, style="ent", jupyter=True)