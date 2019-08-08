const http = require('http');
const fs = require('fs');
const url = require('url');
const qs = require('querystring');

let contents;

var app = http.createServer(function(request, response) {
  var _url = request.url;
  var queryData = url.parse(_url, true).query;
  var pathname = url.parse(_url, true).pathname;
  var id = queryData.id;
  

  if (pathname === '/') {    
    console.log(pathname);
    console.log(id);
    /* Get Navigation */
    var strNavigation = GetNavigation(fs);
    
    /* Get Contents */    
    if (id === undefined) { // HOME
      id = 'Welcome';
      contents = 'Hello, Node JS';
    } else { // Contents
      contents = fs.readFileSync(`data/${id}`, 'utf8');
    }
    
    /* HTML */
    response.writeHead(200);
    response.end(GetHTML(id, strNavigation, contents));

  } else if (pathname === '/create') {
        
    /* Get Navigation */
    var strNavigation = GetNavigation(fs);
    
    /* Get Contents */
    id = 'CREATE';
    contents = fs.readFileSync(`form.html`, 'utf8');    
    
    /* HTML */
    response.writeHead(200);
    response.end(GetHTML(id, strNavigation, contents));

  } else if(pathname === '/process_create'){

    var body ="";
    request.on('data',function(data){
      body += data;
      if(body.length > 1e6)
        request.connection.destroy();
    });
    request.on('end', function(){
      var post = qs.parse(body);
      console.log(post);

    });
    response.writeHead(200);
    response.end("Success");
  } else {
    response.writeHead(404);
    response.end('<h1>4 0 4</h1><h2>Page Not found</h2>');
  }
});
app.listen(3000); //포트의 기본값은 80

/*Get Navigation*/
function GetNavigation(fs){  
    var list = fs.readdirSync('data/', 'utf8');
    var string = "<ul>";  
    var size = list.length;  
    for (var i = 0; i < size; i++) {
      string = string + `<li><a href="/?id=${list[i]}">${list[i]}</a></li>`;
    }  
    string = string + "</ul>";  
  return string;
}

/* Get HTML */

function GetHTML(id, strNavigation, contents){
  return `
<!doctype html>
<html>
<head>
  <meta charset="utf-8">
</head>
<body>
  <h1><a href="/">앨리스 읽기</a></h1>
  ${strNavigation}
  <a href="/create">
    <input type="hidden" type="button" value="CREATE">
  </a>
  <h2>${id}</h2>
  <p>${contents}</p>
</body>
</html>
`;       
}


