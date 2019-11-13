// require modules
const fs = require('fs')
const path = require('path')

const db = (model) => {
    console.log(__dirname)

    // base directory for the database store
    const baseDir = path.join(__dirname, './.local')

    if (model) {
        // get the file path
        var filename = path.join(__dirname, `./.local/${model}.json`)

        // require the file from the file path
        var records = require(filename)
    }

    // private helper functions

    // generate a new id
    const _generateId = (array) => {
        if (array.length > 0) {
            // get the last item in the array and increment it by 1
            return array[array.length - 1].id + 1
        } else {
            // returns 1 if there is no existing record
            return 1
        }
    }

    // create a new date
    const _newDate = () => new Date().toString()


    // checks whether a record exists 
    const _mustBeInArray = (array, id) => {
        return new Promise((resolve, reject) => {
            // compare id passed in with the id in the array
            const row = array.find(r => r.id == id)
            if (!row) {
                reject({
                    message: 'record does not exist',
                })
            }
            resolve(row)
        })
    }

    const _writeJSONFile = (filename, content) => {

        //open the file
        fs.open(filename,'r+', (err, fd) => {
            if(!err && fd) {
                // write to the file
                fs.writeFile(filename, JSON.stringify(content, null, 2), 'utf8', (err) => {
                    if (!err) {
                        //close the file
                        fs.close(fd, (err) => {
                            if(err) {
                                console.log('Error closing the file')
                            } else {
                                console.log('file closed')
                            }
                        })
                        
                    } else {
                        console.log('error writing file ',err)
                    }
                })
            } else {
                console.log('error opening file ',err)
            }
            
        })
    }

    // end private helper functions

    // insert a new record 
    const insertRecord = (newRecord) => {
        return new Promise((resolve, reject) => {
            const id = { id: _generateId(records) }
            const date = { 
                createdAt: _newDate(),
                updatedAt: _newDate()
            } 
            // spread the content of newRecord into a new object 
            // containing id, createdAt and updatedAt as default values
            newRecord = { ...id, ...date, ...newRecord }

            console.log(newRecord)
            records.push(newRecord)
            _writeJSONFile(filename, records)
            resolve(newRecord)
        })
    }

    // get all records
    const findRecords = () => {
    return new Promise((resolve, reject) => {
        // check for the length of the array
        if (records.length === 0) {
            resolve({
                message: 'no records',
            })
        }
            console.log(records)
            resolve(records)
        })
    }

    // get single record by id
    const findRecordById = (id) => {
        return new Promise((resolve, reject) => {
            _mustBeInArray(records, id)
            .then(record => {
                console.dir(record,{color:'orange'})
                resolve(record)
            })
            .catch(err => reject(err))
        })
    }
        

        
    const dropDatabase = () => {
        // console.log('baseDir',baseDir)
        // console.log('file:', model)

        fs.unlink(`${baseDir}/${model}.json`, (err) => {
            if(!err) {
                console.log(`${model} has been deleted`)
            } else {
                console.log(err)
                callback('Error deleting file', err)
            }
        })
    }
    

    const createDatabase = ( file, data, callback) => {
        //if(!file) return callback('Please select document to add data')
        fs.open(`${baseDir}/${file}.json`, 'wx', (err, fd) => {
            if(!err && fd) {
                // stringify the data
                const stringData = JSON.stringify(data)

                fs.writeFile(fd, stringData, (err) => {
                    if(!err) {
                        // close the file
                        fs.close(fd,(err) => {
                            if(!err) {
                                callback(false)
                            } else {
                                callback('Error closing file')
                            }
                        })
                    } else {
                        callback('Error writing to new File')
                    }
                })

            } else {
                //console.log(err)
                callback('Could not create data, file may already exist')
            }
        })
    }

    return {
        records,
        createDatabase,
        dropDatabase,
        insertRecord,
        findRecords,
        findRecordById
    }
   
}

module.exports = db