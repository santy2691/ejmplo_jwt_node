const mongoose = require('mongoose');


mongoose.connect("mongodb://root:example@localhost:27017/api-product?authSource=admin",{
    useUnifiedTopology: true, 
    useNewUrlParser: true 

})
    .then(db => console.log("Db is connect"))
    .catch(error => console.log(error))


