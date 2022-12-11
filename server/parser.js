function loadPdf() {
  var flag = 0
  var textArr = []
  var courseName=""
  var textMap = {}
  return new Promise((resolve, reject) => {
      PDFJS.workerSrc = 'js/pdf.worker.js';
      PDFJS.cMapUrl = '/assets/pdfjs/cmaps/';
      PDFJS.cMapPacked = true;
      textMap =  textCreate("./syllabus_2022 - Copy.pdf")
      // textMap =  textCreate("./Computer-Systems-Organization-Course-Description-and-Syllabus-Spring2022.pdf")
      // textMap =  textCreate("./Chem UA 120-Introduction to Modern Chemistry-Syllabus-Spring 2022.pdf")
      resolve(textMap)
})

  
}

function textCreate(fileURL) {
 return new Promise((a,b) => {
  PDFJS.getDocument(fileURL).then(function (pdf) {
  var pageNum = pdf.numPages
  var index = 1
  var textMap={}
  var textMapHeight = {}
  var a = 0, b = 0,c = 0
  for(i = 1; i <= pageNum;i++) {
    pdf.getPage(i).then(function(page) {  
        page.getTextContent().then(function(textContent) { 
        var textHeight = textContent.items[0].height
        var text = textContent.items[0].str
        courseName = text;
        textMapHeight[index] = textContent.items[0].height
        textMap[index] = text
        textContent.items.filter(function(x) {return x.str.lenght != 0 && x.str!="\n"})
        for(let j = 1; j < textContent.items.length; j++) {
            text = textContent.items[j].str.replace(/\r|\n/g,"").replace(/\s*/g,"")
            if(indenText(text)) {
              if(textContent.items[j].height == textHeight) {
                textMap[index] = textMap[index] + text
                textMapHeight[index] = textContent.items[j].height
              } else{
                textMap[++index] = text
                textHeight = textContent.items[j].height
                textMapHeight[index] = textHeight
              }
            }
          }
          if(b == 0) {
console.log("Course Name")
            if (courseNameI(textMap[1])) {
              console.log(textMap[2])
            } else {
              console.log(textMap[1])
            }
            b++
          }
          for(var key in textMap) {
            if(typeof(textMap[key] == "string")) {
              if(textMap[key].includes("DESCRIPTION") || textMap[key].includes("Description")) {
                if(a == 0) {
console.log("Course Description")
                   console.log(textMap[++key])
                   a++
                }
              }
            }
          for(var key in textMap) {
            if(typeof(textMap[key] == "string")) {
              if((textMap[key].includes("Grade") || textMap[key].includes("GRADING POLICY") ) && (textMapHeight[key] > textMapHeight[parseInt(key)+1]) ){
                //&& (textMapHeight[key] > textMapHeight[parseInt(key)+1])
               if(c == 0) {
console.log("Grading")
                console.log(textMap[key])
                console.log(textMap[++key])
                c++
               }
              }
            }
          }

    }
    });
  });
  }
  });
 })
}


function consoleMap(map) {
  for (var key in map) {
    var item = map[key]
    console.log(item)
  }
}
function indenText(text) {
  if(typeof(text) == "undefined" || text == "undefined" || text =="|") {
    return false
  }
  if(text.length < 1) {return false}
  return true
}

function courseNameI(text) {
  text = text.toUpperCase()
  if(text.includes("UNIVERSITY") || text.includes("SPRING") || text.includes("AUTUMN") || text.includes("FALL")) {
    return true
  }
  return false
}