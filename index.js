const express = require('express')
const app = express()
const { MongoClient, ServerApiVersion } = require('mongodb');

var cors = require('cors')
const dotenv = require('dotenv').config()
const port = process.env.PORT || 5000
app.use(cors());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.9shharo.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
console.log(uri)





async function run() {
    try {
        await client.connect();
        const bannerCollection = client.db('icare_data').collection('banner');
        const featureCollection = client.db('icare_data').collection('feature_home');
        const abouthomeCollection = client.db('icare_data').collection('about_home');




        app.get('/banner', async (req, res) => {
            const result = await bannerCollection.find().toArray();
            res.send(result)
        });
        app.get('/feature_home', async (req, res) => {
            const result = await featureCollection.find().toArray();
            res.send(result)
        });
        app.get('/about_home', async (req, res) => {
            const result = await abouthomeCollection.find().toArray();
            res.send(result)
        });



    }
    finally {

    }
}

run().catch(console.dir);





app.get('/', (req, res) => {
    res.send('Hello I care Education')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})