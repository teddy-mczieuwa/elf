
const db = require('./db')('example') //('example')


// db.dropDatabase(db, (err) => {
//     if(err) {
//        return console.log(err)
//     } 
// })

//db.insertRecord({star: 'Rigel', position: 6})
//db.findRecords()
//db.findRecordById(1)
db.updateRecord(1, {star: 'Rigel', position:6})

// db.createDatabase('example1',[], (err) => {
//     if(!err) {
//         console.log('database created')
//     }
// })

