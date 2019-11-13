const db = require('./db')('example3') //('example')

db.dropDatabase(db, (err) => {
    if(err) {
       return console.log(err)
    } 
})

// db.insertRecord({name: 'Sandra', title:'Mrs'})




// db.createDatabase('example1',[], (err) => {
//     if(!err) {
//         console.log('database created')
//     }
// })