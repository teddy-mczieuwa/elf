
const db = require('./db')('example1') //('example')

db.dropDatabase(db, (err) => {
    if(err) {
        console.log(err)
    } else {
        console.log('Database was successfully dropped')
    }
})

// db.insertRecord({name: 'Sandra', title:'Mrs'})




// db.createDatabase('example1',[], (err) => {
//     if(!err) {
//         console.log('database created')
//     }
// })

