const { application, json } = require('express');
const express = require('express');
const app = express();
const { MongoClient } = require('mongodb');
require('dotenv').config();
const cors = require('cors');
const port = process.env.PORT || 9000


app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.57jms.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


async function run() {
    try {
        await client.connect();
        const database = client.db("ash_moment_count");
 


    } finally {
        //   await client.close();  
    }
}
run().catch(console.dir);
app.get('/', (req, res) => {
    res.send('Ash_Moment_Count server working!')
})

app.listen(port, () => {
    console.log(`Ash_Moment_Count`, port)
})