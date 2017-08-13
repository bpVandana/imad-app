
var button=document.getElementById('counter');

button.onclick=function()
{
    var request=new XMLHttpRequest();
    //make a request
    request.onreadystatechange=function()
{
    if(request.readystate==XMLHttpRequest.DONE)
    {
        
        if(request.status==200)
        {
            
            var counter=request.responseText;
            var span=document.getElementById('count');
    span.innerHTML=counter.toString();
        }
    }
    
};
//make the request
request.open('GET','http://http://vandanakumari291.imad.hasura-app.io/counter',true);
request.send(null);
   //render request
   
};
