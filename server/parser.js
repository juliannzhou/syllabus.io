
async function parse(path) {
    const reader = require('any-text');


    const text = await reader.getText(path);

    // Load wink-nlp package.
    const winkNLP = require( 'wink-nlp' );
    // Load english language model.
    const model = require( 'wink-eng-lite-web-model' );
    // Instantiate winkNLP.
    const nlp = winkNLP( model );
    // Obtain "its" helper to extract item properties.
    const its = nlp.its;
    // Obtain "as" reducer helper to reduce a collection.
    const as = nlp.as;
    
    patterns = [ 
        {
            name: 'grading',
            patterns: [ '[|PERCENT] [NOUN]' ]
          }
    ]
    // NLP Code.
    nlp.learnCustomEntities(patterns);
    const doc = nlp.readDoc( text );

    const fs = require('fs');
    const data = fs.readFileSync('./nyu-course-code.txt', "utf8")
    const courseNamePattern = '(' + data.split('\n').join('|') + ')[^\r\n]*';
    const gradingPattern = new RegExp('^.*[0-9]{1,3}( )?%.*$')
    
    const courseName = text.match(courseNamePattern)[0];
    const grading = text.match(/^.*[0-9]{1,3}( )?\\%/);
    console.log(grading)

}

parse('./public/syllabus_2022 - Copy.pdf')