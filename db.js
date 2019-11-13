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
        dropDatabase
    }
   
}

module.exports = db