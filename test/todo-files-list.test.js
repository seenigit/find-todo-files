var get_files_service = require('../service/get_files_list');
var get_todo_files_service = require('../service/get_todo_files');

const mock_file_names = [
    'dir_one_dir_two_file_one.js', 'dir_one_file_one.js',
    'dir_one_file_two.js', 'file_one.js',
    'file_two.js', 'get_files_list.js'
]

const mock_todo_file_names = [
    'dir_one_dir_two_file_one.js', 'dir_one_file_one.js',
    'dir_one_file_two.js', 'file_one.js'
]

describe('todo-files-list', () => {
    it('should list all files', () => {
        const result = get_files_service.getAllFiles('.', [])

        filenames = []

        result.forEach(function(file_name) {
            if (file_name.includes('\\')) {
                //For Windows
                file_name = file_name.split('\\')
            } else {
                //For Linux
                file_name = file_name.split('/')
            }
        
            filenames.push(file_name[file_name.length - 1])
        })
        
        expect(filenames).toEqual(expect.arrayContaining(mock_file_names));
    })

    it('should list files containing string "TODO:"', () => {
        let result = get_todo_files_service.getTodoFiles(get_files_service.getAllFiles('.', []))
        result = result.split('<br/>')
        result.pop()

        filenames = []

        result.forEach(function(file_name) {
            if (file_name.includes('\\')) {
                //For Windows
                file_name = file_name.split('\\')
            } else {
                //For Linux
                file_name = file_name.split('/')
            }
        
            filenames.push(file_name[file_name.length - 1])
        })
        
        expect(filenames).toEqual(expect.arrayContaining(mock_todo_file_names));

        const fs = require("fs")
        content = fs.readFileSync(result[0], 'utf-8') 
        expect(content).toContain('TODO:')
    })
});