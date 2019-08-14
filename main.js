const http = require('http');
const fs = require('fs');
const url = require('url');
const qs = require('querystring');
const express = require('express');
const path = require('path');
var app = express();

let contents;

app.use(express.static(__dirname+`/WebGL`));

app = http.createServer(function(request, response) {
  var _url = request.url;
  var queryData = url.parse(_url, true).query;
  var pathname = url.parse(_url, true).pathname;
  var id = queryData.id;

  

  if(pathname === '/style.css'){
    var data = fs.readFileSync(path.join(__dirname,"style.css"), 'utf8');
      response.writeHead(200, {"Content-Type": "text/css"});
      response.end(data);
  }


  if (pathname === '/') {    
    console.log(pathname);
    console.log(id);
    /* Get Navigation */
    var strNavigation = GetNavigation(fs, id);
    
    /* Get Contents */    
    if (id === undefined) { // HOME
      id = '이상한 나라의 앨리스';
      contents = '저자: 루이스 캐럴 / 역자: Jjw';

    } else { // Contents
      contents = fs.readFileSync(`data/${id}`, 'utf8');
    }
    
    /* HTML */
    response.writeHead(200);
    response.end(GetHTML(id, strNavigation, contents));

  } else if (pathname === '/create') {
        
    /* Get Navigation */
    var strNavigation = GetNavigation(fs, id);
    
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
  } else if(pathname === '/WebGL'){    
    
    response.writeHead(200);
    response.end(`
    <!DOCTYPE html>
<html lang="en-us">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <title>Unity WebGL Player | webGL_eye</title>
    <link rel="shortcut icon" href="TemplateData/favicon.ico">
    <link rel="stylesheet" href="TemplateData/style.css">
    <script src="TemplateData/UnityProgress.js"></script>
    <script src="Build/UnityLoader.js"></script>
    <script>
      var unityInstance = UnityLoader.instantiate("unityContainer", "Build/WebGL.json", {onProgress: UnityProgress});
    </script>
  </head>
  <body>
    <div class="webgl-content">
      <div id="unityContainer" style="width: 960px; height: 600px"></div>
      <div class="footer">
        <div class="webgl-logo"></div>
        <div class="fullscreen" onclick="unityInstance.SetFullscreen(1)"></div>
        <div class="title">webGL_eye</div>
      </div>
    </div>
  </body>
</html>

    
    `);

  } else {
    response.writeHead(404);
    response.end('<h1>4 0 4</h1><h2>Page Not found</h2>');
  }
});
app.listen(3000); //포트의 기본값은 80

/*Get Navigation*/
function GetNavigation(fs, id){  
    var list = fs.readdirSync('data/', 'utf8');
    var string = "<ul>";  
    var size = list.length;  
    for (var i = 0; i < size; i++) {

      var red ="";
      if(list[i] == id)
        red = `style="color:red"`;

      string = string + `<li><a href="/?id=${list[i]}" ${red}>${list[i]}</a></li>`;
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
  <link rel="stylesheet" type="text/css" href="style.css">
  <link href="https://fonts.googleapis.com/css?family=Karla:400,700|Noto+Serif+KR&display=swap" rel="stylesheet">
  <title>${id}</title>
</head>

<body>
  <h1><a href="/">이상한 나라의 앨리스</a></h1>
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