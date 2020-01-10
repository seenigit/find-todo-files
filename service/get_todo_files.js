const fs = require("fs")

exports.getTodoFiles = (file_names) => {
    files_with_todos = ''

    file_names.forEach(function(file_name) {
        content = fs.readFileSync(file_name, 'utf-8') 
    
        if (content.includes('TODO:')) {
            console.log(file_name)
            files_with_todos += file_name + '<br/>'
        }
    })
    
    return files_with_todos
}