const db = require('./db')('example1') // ('example')

// db.createDatabase('example1',[], (err) => {
//     if(!err) console.log('database created')
// })

console.log(db.records)