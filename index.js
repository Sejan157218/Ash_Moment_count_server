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
        const usersCollection = database.collection("users");

        // post user
        app.post('/users', async (req, res) => {
            const body = req.body;
            const result = await usersCollection.insertOne(body);
            res.json(result)
        })
        // put user
        app.put('/users', async (req, res) => {
            const user = req.body;
            const find = { email: user.email };
            const options = { upsert: true };
            const updateDoc = { $set: user };
            const result = await usersCollection.updateOne(find, updateDoc, options);
            res.json(result)
        })

        // put user
        app.put('/user/admin', async (req, res) => {
            const user = req.body;
            const find = { email: user.email };
            const updateDoc = { $set: { role: 'admin' } };
            const result = await usersCollection.updateOne(find, updateDoc);
            res.json(result)
        })

        // admin check
        app.get('/user/:email', async (req, res) => {
            const email = req.params.email;
            const find = { email: email };
            const result = await usersCollection.findOne(find);
            let isAdmin = false;
            if (result?.role === "admin") {
                isAdmin = true
            }
            res.json({ admin: isAdmin })
        })


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