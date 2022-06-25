const express = require('express')
const app = express()
const { MongoClient, ServerApiVersion } = require('mongodb');

var cors = require('cors')
var multer = require('multer')
const dotenv = require('dotenv').config()
const port = process.env.PORT || 5000






const bodyParser = require('body-parser')

const path = require("path")
var cors = require('cors')


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json());

app.use(cors());






const UPLOADS_FOLDER = '../home_icare_design/public/uploads';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {

        cb(null, UPLOADS_FOLDER)
    },
    filename: (req, file, cb) => {
        const fileExt = path.extname(file.originalname);
        const fileName = file.originalname
            .replace(fileExt, "")
            .toLowerCase()
            .split(" ")
            .join("-") + "-" + Date.now();
        cb(null, fileName + fileExt)
    }
});

const upload = multer({ storage: storage });







const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.9shharo.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
console.log(uri)






async function run() {
    try {
        await client.connect();
        const bannerCollection = client.db('icare_data').collection('banner');
        const featureCollection = client.db('icare_data').collection('feature_home');
        const abouthomeCollection = client.db('icare_data').collection('about_home');
        const choosehomeCollection = client.db('icare_data').collection('choose_home');

        const collagehomeCollection = client.db('icare_data').collection('collage_home');


        const overviewHomeCollection = client.db('icare_data').collection('overview_home');
        const testimonialHomeCollection = client.db('icare_data').collection('rating_home');
        const rewardHomeCollection = client.db('icare_data').collection('award_home');




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

        app.get('/choose_home', async (req, res) => {
            const result = await choosehomeCollection.find().toArray();
            res.send(result);
        });
        app.get('/collage_home', async (req, res) => {
            const result = await collagehomeCollection.find().toArray();
            res.send(result);
        });
        app.get('/overview_home', async (req, res) => {
            const result = await overviewHomeCollection.find().toArray();
            res.send(result);
        });
        app.get('/testimonial_home', async (req, res) => {
            const result = await testimonialHomeCollection.find().toArray();
            res.send(result);
        });
        app.get('/home-certificate', async (req, res) => {
            const result = await rewardHomeCollection.find().toArray();
            res.send(result);
        });





        // Post api 

        app.post('/home_feature', async (req, res) => {
            const feature = req.body;
            const result = await featureCollection.insertOne(feature);
            res.send(result);
        });

        app.post('/home_testimonial', async (req, res) => {
            const feature = req.body;
            const result = await testimonialHomeCollection.insertOne(feature);
            res.send(result);
        });
        app.post('/home_banner', async (req, res) => {
            const feature = req.body;
            const result = await bannerCollection.insertOne(feature);
            res.send(result);
        });

        app.post('/home_about', async (req, res) => {
            const feature = req.body;
            const result = await abouthomeCollection.insertOne(feature);
            res.send(result);
        });
        app.post('/home_choose', async (req, res) => {
            const feature = req.body;
            const result = await choosehomeCollection.insertOne(feature);
            res.send(result);
        });

        app.post('/home_overview', async (req, res) => {
            const feature = req.body;
            const result = await overviewHomeCollection.insertOne(feature);
            res.send(result);
        });


        app.post('/home-collage', async (req, res) => {
            const collage = req.body;
            const result = await collagehomeCollection.insertOne(collage);
            res.send(result);


        });
        app.post('/home_certificate', async (req, res) => {
            const collage = req.body;
            const result = await rewardHomeCollection.insertOne(collage);
            res.send(result);


        });


        app.post('/api/images', upload.single('image'), (req, res) => {
            console.log(req.file);
            if (!req.file) {
                res.send | ({ code: 500, msg: 'error' })
            } else {

                const result = (req.file)
                res.send({ code: 200, msg: "upload successfully", result })
            }
        })


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