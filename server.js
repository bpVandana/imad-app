var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));
var 
    articles={
    'article-one':{
    title:'Article-one|Vandana',
    heading:'Article one',
    date:'aug 6th 2017',
    content:` <p>
                  This is my first articlr.Hello
              This is my first articlr.Hello
              This is my first articlr.Hello This is my first articlr.Hello
              v
             </p>
              <p>This is my first articlr.Hello
              This is my first articlr.Hello
              This is my first articlr.Hello This is my first articlr.Hello
              v
             </p><p>This is my first articlr.Hello
              This is my first articlr.Hello
              This is my first articlr.Hello This is my first articlr.Hello
              v
             </p>`
},
    'article-two':{
            title:'Article-2|Vandana',
    heading:'Article Two',
    date:'aug 13th 2017',
    content:` <p>
                  This is my 2nd articlr.Hello
              This is my first articlr.Hello
              This is my first articlr.Hello This is my first articlr.Hello
              v</p>`
             
    },
    'article-three':{
            title:'Article-three|Vandana',
    heading:'Article Two',
    date:'aug 13th 2017',
    content:` <p>
                  This is my 2nd articlr.Hello
              This is my first articlr.Hello
              This i </p>`
    }
};
function createTemplate(data){
    var title=data.title;
    var content=data.content;
    var  heading=data.heading;
    var date= data.date;
    var htmlTemplate=`
        <!DOCTYPE html>
      <head>
          <title>
              ${title}
          </title>
          <meta name="viewport" content="width=width-device,initial-scale=1">
           <link href="/ui/style.css" rel="stylesheet" />
           </head>
      <body>
          <div class ="container">
              <div>
                  <a href="\">Home</a>
              </div>
              <hr/>
              <h3>${heading}</h3>
              
              <div>
                ${date}
              </div>
             <div>${content}</div>
          </div>
      </body>
    </html>
    `
   ;
    return htmlTemplate;
}
var counter=0;
app.get('/',function(req,res){
    counter=counte + 1;
    res.send(counter.toString());
}
);
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/ui/style.css', function (req, res) {
    
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});
app.get('/:articleName' ,function (req, res)
    { var articleName=req.params.articleName;
        res.send(createTemplate(articles[articleName]));
});
app.get('/ui/main.js', function (req, res) {
    
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});


app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
