const http=require('http');
const fs=require('fs');

const server=http.createServer(function(req,res){
    console.log(req.url, req.method);

    var filePath='./views/';

    switch(req.url){
        case '/':
            filePath+='index.html';
            break;
        case '/about':
            filePath+='about.html';
            break;
        default:
            filePath+='404_page.html';
            break;
    }

    fs.readFile(filePath,(err,data)=>{
        if(err)
        console.log(err);
        else
        res.write(data);
        res.end();
    });

});

server.listen(3000,'localhost',()=>{
    console.log('Listening to localhost 3000');
})
