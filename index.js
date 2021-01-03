const express = require("express");
const app = express();
const datawrite = require("nedb");

app.listen(3000 , () => console.log("server runing at port 3000"));
app.use(express.static("public"));

const database = new datawrite('database.db');
database.loadDatabase();

app.use(express.json({limit:'1mb'}));
app.post('/api' , (req,res) => {
    console.log(req.body);
    const data = req.body;
    const timestamp = Date.now();
    data.timestamp = timestamp;
    database.insert(data);
    //res.end();
    res.json({
        status: 'succes',
        timestamp: timestamp,
        latitude: data.lat,
        logitude: data.lon
    });
});



// database.insert({name: 'skerdi',age: 20});
// database.insert({name: 'arlindi', age:26});