
const db = require('./db')('example') //('example')


// db.dropDatabase(db, (err) => {
//     if(err) {
//        return console.log(err)
//     } 
// })

db.insertRecord({Country: 'Ireland', Shengen: false})




// db.createDatabase('example1',[], (err) => {
//     if(!err) {
//         console.log('database created')
//     }
// })

