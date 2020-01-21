const fs = require("fs")
const path = require("path")

const skip_directories = ['node_modules', '.git']
const skip_files = ['index.js', 'package-lock.json', 'package.json', 'get_todo_files.js', 'todo-files-list.test.js']

getAllFiles = (dirPath, arrayOfFiles) => {
    files = fs.readdirSync(dirPath)

    files.forEach(function(file) {
        file_stat = fs.statSync(dirPath + "/" + file)
        
        if (file_stat.isDirectory() && !skip_directories.includes(file)) {
            arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles)
        } else if (file_stat.isFile() && file_stat.size > 0 && !skip_files.includes(file)){
            file_name = path.join(__dirname, "../", dirPath, "/", file)
            arrayOfFiles.push(file_name)
        }
    })
    
    return arrayOfFiles
}

module.exports = {
    getAllFiles: getAllFiles
}
