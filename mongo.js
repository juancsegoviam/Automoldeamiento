const mongoose = require('mongoose');
const password = require('./password.js');


const connectionString = `mongodb+srv://CEICUDG:${password}@autoshaping0.6vxnd.mongodb.net/datos?retryWrites=true&w=majority`;

mongoose.connect(connectionString, {
 
})
.then(() => {
    console.log('Database connected')
}).catch(err => {
    console.error('Unsuccesfull connect')
})

// const noteSchema = new Schema({
//     tiempo: Array,
//     evento: Array
// })

// const Note =  model('Note', noteSchema)

// const note = new Note({
//     tiempo: [1,2,3],
//     evento: ["Rc","RD","RF"]

// })

// note.save()
//  .then(result => {
//      console.log(result);
//      mongoose.connection.close();
//  })
//  .catch(err => {
//      console.log(err)
//  })