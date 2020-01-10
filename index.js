var http = require("http");
var get_files_service = require('./service/get_files_list');
var get_todo_files_service = require('./service/get_todo_files');

http.createServer(function (request, response) {
    response.writeHead(200, {'Content-Type': 'text/html'});
    
    if(request.url === '/') {
        response.write('<a href="/todo-files-list">Todo Files List</a>')
        response.end()
    } else if (request.url === '/todo-files-list') {
        console.log('List of files which cotains string "TODO:" -')
        files_with_todos = get_todo_files_service.getTodoFiles(get_files_service.getAllFiles('.', []))
        response.write('<h2>Here\'s the list of files which cotains string "TODO"</h2>' + files_with_todos);
        response.end()
    } else {
        response.end('Request Not Found')
    }
}).listen(8081);

console.log('Server running at http://127.0.0.1:8081/');