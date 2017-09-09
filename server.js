var express = require('express');
var morgan = require('morgan');
var path = require('path');
var pool=require('pg').Pool;
var config={
    user: 'vandanakumari291',
    database:'vandanakumari291',
    host:'db.imad.hasura-app.io',
    port:'5432',
    password:process.env.DB_PASSWORD
};
var pool=new Pool(config);
pool.query('SELECT * FROM test',function(err,result)
{
    
    if(err){
    res.status(500).send(err.toString());}
    else{
     res.send(JSON.stringfy(result));}
    
});
function hash(input,salt)
{
    var hashed=crypto.pbkdf2Sync(input,salt,10000,512,'shaf12');
    return hashed.toString('hex');
}
app.get('/hash/input',function(req,res){
    var hashedString=hash(req.params.input,'this-is-a random-string');
    res.send(hashedString);
});
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
                ${date.toDateString()}
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
app.get('/counter',function(req,res){
    counter=counter + 1;
    res.send(counter.toString());
}
);
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});
app.get('/test-db', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});


app.get('/ui/style.css', function (req, res) {
    
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});
app.get('/articles/:articleName' ,function (req, res)
    { //var articleName=req.params.articleName;
    pool.query("SELECT * FROM article WHERE title=$1,"[req.params.articleName],function(err,result)
    {
        if(err)
        {res.status(500).send(err.toString());
        }
        else
        {
            if(result.rows.length===0)
            {
                res.status(404).send('Article nOt found');
            }
            else
            {
                var articleData=result.rows[0];
                res.send(createTemplate(articleData));
            }
        }
        
        
    });
        
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
