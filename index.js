const express = require('express')
const app = express()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

var cors = require('cors')
var multer = require('multer')
const dotenv = require('dotenv').config()
const port = process.env.PORT || 5000
const jwt = require('jsonwebtoken');




const bodyParser = require('body-parser')

const path = require("path")
var cors = require('cors')


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json());
app.use(express.static("uploads"));

app.use(cors());






const UPLOADS_FOLDER = './uploads';

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
        const courseCollection = client.db('icare_data').collection('course_home');

        // About page Collection 
        const vissionCollection = client.db('icare_data').collection('vission_home');

        // Admission page collection 
        const admission_page_aboutCollection = client.db('icare_data').collection('admission_page_about');

        // Academic page collection 
        const academic_page_pgCollection = client.db('icare_data').collection('academic_page_pg');
        const academic_page_finanCollection = client.db('icare_data').collection('academic_page_finan');
        const academic_page_ugCollection = client.db('icare_data').collection('academic_page_ug');

        // Inner banner collection  start
        const innerBannerCollection = client.db('icare_data').collection('inner_banner')
        // Collage details page 
        const collageDetailAboutCollection = client.db('icare_data').collection('collage_details_about')
        const collageDetailmoreCollection = client.db('icare_data').collection('collage_details_more')
        const teamCollection = client.db('icare_data').collection('team_member')
        const collageCourseCollection = client.db('icare_data').collection('collage_course')

        const toolRoomAboutCollection = client.db('icare_data').collection('tool_room')












        app.get('/collage_course_get', async (req, res) => {
            const result = await collageCourseCollection.find().toArray();
            res.send(result)
        });


        app.get('/team_member_get', async (req, res) => {
            const result = await teamCollection.find().toArray();
            res.send(result)
        });

        app.get('/collage_details_about_get', async (req, res) => {
            const result = await collageDetailAboutCollection.find().toArray();
            res.send(result)
        });

        app.get('/toolroom_get', async (req, res) => {
            const result = await toolRoomAboutCollection.find().toArray();
            res.send(result)
        });


        app.get('/collage_details_more_get', async (req, res) => {
            const result = await collageDetailmoreCollection.find().toArray();
            res.send(result)
        });




        app.get('/inner_banner_get', async (req, res) => {
            const result = await innerBannerCollection.find().toArray();
            res.send(result)
        });

        app.post('/collage_course_post', async (req, res) => {
            const collage = req.body;
            const result = await collageCourseCollection.insertOne(collage);
            res.send(result);

        });


        app.post('/team_member_post', async (req, res) => {
            const collage = req.body;
            const result = await teamCollection.insertOne(collage);
            res.send(result);

        });


        app.post('/inner_banner_post', async (req, res) => {
            const collage = req.body;
            const result = await innerBannerCollection.insertOne(collage);
            res.send(result);

        });


        // Update Api 
        app.put('/inner_banner_update/:page', async (req, res) => {
            const id = req.params.id;
            let data = req.body
            // console.log(data.title, data.desc, data.picture, data.link);


            const filter = { page: data.page };

            console.log(filter)

            const options = { upsert: true };
            let updatedDoc;
            if (data.image == "") {
                console.log("image not selected");




                updatedDoc = {
                    $set: {
                        collageName: data.collageName,
                        page: data.page,



                    }
                }

            }
            else {
                console.log('imasge seleted')
                updatedDoc = {
                    $set: {
                        collageName: data.collageName,
                        page: data.page,
                        image: data.image

                    }
                }
            }




            const result = await innerBannerCollection.updateOne(filter, updatedDoc, options);
            res.send(result)

        })


        app.put('/team_member_update/:membername', async (req, res) => {
            const membername = req.params.membername;

            let data = req.body

            console.log(membername, data)


            const filter = { membername: data.membername };



            const options = { upsert: true };
            let updatedDoc;
            if (data.image == "") {
                console.log("image not selected");




                updatedDoc = {
                    $set: {
                        membername: data.membername,
                        designation: data.designation,
                        status: data.status,
                        social1: data.social1,
                        social2: data.social2,
                        social3: data.social3,



                    }
                }

            }
            else {
                console.log('imasge seleted')
                updatedDoc = {
                    $set: {
                        membername: data.membername,
                        designation: data.designation,
                        status: data.status,
                        social1: data.social1,
                        social2: data.social2,
                        social3: data.social3,
                        image: data.image

                    }
                }
            }




            const result = await teamCollection.updateOne(filter, updatedDoc, options);
            res.send(result)

        })




        // Contact page form sumission 

        const formCollection = client.db('icare_data').collection('c_form');
        const newsCollection = client.db('icare_data').collection('news_letter');
        const donateCollection = client.db('icare_data').collection('donate');
        const resumeCollection = client.db('icare_data').collection('resume');
        const tenderCollection = client.db('icare_data').collection('tenders');

        app.get('/tender_get', async (req, res) => {
            const result = await tenderCollection.find().toArray();
            res.send(result)
        });

        app.get('/donate_get', async (req, res) => {
            const result = await donateCollection.find().toArray();
            res.send(result)
        });


        app.get('/resume_get', async (req, res) => {
            const result = await resumeCollection.find().toArray();
            res.send(result)
        });

        app.get('/c_form_get', async (req, res) => {
            const result = await formCollection.find().toArray();
            res.send(result)
        });


        app.get('/news_get', async (req, res) => {
            const result = await newsCollection.find().toArray();
            res.send(result)
        });



        app.post('/news_post', async (req, res) => {
            const collage = req.body;
            const result = await newsCollection.insertOne(collage);
            res.send(result);

        });
        app.post('/tender_post', async (req, res) => {
            const collage = req.body;
            const result = await tenderCollection.insertOne(collage);
            res.send(result);

        });

        app.post('/donate_post', async (req, res) => {
            const collage = req.body;
            const result = await donateCollection.insertOne(collage);
            res.send(result);

        });

        app.post('/resume_post', async (req, res) => {
            const collage = req.body;
            const result = await resumeCollection.insertOne(collage);
            res.send(result);

        });


        app.post('/c_form_post', async (req, res) => {
            const collage = req.body;
            const result = await formCollection.insertOne(collage);
            res.send(result);

        });




        // Contact page form sumission End

        app.get('/pg', async (req, res) => {
            const result = await academic_page_pgCollection.find().toArray();
            res.send(result)
        });
        app.get('/finan', async (req, res) => {
            const result = await academic_page_finanCollection.find().toArray();
            res.send(result)
        });
        app.get('/ug', async (req, res) => {
            const result = await academic_page_ugCollection.find().toArray();
            res.send(result)
        });

        // Academic single Api
        app.get('/pg/:id', async (req, res) => {
            const id = req.params.id;
            console.log(id)
            const query = { _id: ObjectId(id) };
            const result = await academic_page_pgCollection.findOne(query);
            res.send(result);
        })
        app.get('/finan/:id', async (req, res) => {
            const id = req.params.id;
            console.log(id)
            const query = { _id: ObjectId(id) };
            const result = await academic_page_finanCollection.findOne(query);
            res.send(result);
        })
        app.get('/ug/:id', async (req, res) => {
            const id = req.params.id;
            console.log(id)
            const query = { _id: ObjectId(id) };
            const result = await academic_page_ugCollection.findOne(query);
            res.send(result);
        })

        // Academic POST Api

        app.post('/pg_section', async (req, res) => {
            const collage = req.body;
            const result = await academic_page_pgCollection.insertOne(collage);
            res.send(result);

        });

        app.post('/finan_section', async (req, res) => {
            const collage = req.body;
            const result = await academic_page_finanCollection.insertOne(collage);
            res.send(result);

        });

        app.post('/ug_section', async (req, res) => {
            const collage = req.body;
            const result = await academic_page_ugCollection.insertOne(collage);
            res.send(result);

        });


        //Academic Delete Api 
        app.delete('/pg_delete/:id', async (req, res) => {
            const id = req.params.id;
            console.log(id)
            const query = { _id: ObjectId(id) };
            const result = await academic_page_pgCollection.deleteOne(query);
            res.send(result);
        })

        app.delete('/collage_course_delete/:id', async (req, res) => {
            const id = req.params.id;
            console.log(id)
            const query = { _id: ObjectId(id) };
            const result = await collageCourseCollection.deleteOne(query);
            res.send(result);
        })

        app.delete('/team_member_delete/:id', async (req, res) => {
            const id = req.params.id;
            console.log(id)
            const query = { _id: ObjectId(id) };
            const result = await teamCollection.deleteOne(query);
            res.send(result);
        })


        app.delete('/finan_delete/:id', async (req, res) => {
            const id = req.params.id;
            console.log(id)
            const query = { _id: ObjectId(id) };
            const result = await academic_page_finanCollection.deleteOne(query);
            res.send(result);
        })
        app.delete('/ug_delete/:id', async (req, res) => {
            const id = req.params.id;
            console.log(id)
            const query = { _id: ObjectId(id) };
            const result = await academic_page_ugCollection.deleteOne(query);
            res.send(result);
        })

        app.delete('/tender_delete/:id', async (req, res) => {
            const id = req.params.id;
            console.log(id)
            const query = { _id: ObjectId(id) };
            const result = await tenderCollection.deleteOne(query);
            res.send(result);
        })



        // Update status Api 


        app.put('/pg-status/:id', async (req, res) => {
            const id = req.params.id;
            const status = req.body;


            const filter = { _id: ObjectId(id) };
            const options = { upsert: true };

            const updatedDoc = {
                $set: {
                    status: status.status,

                }
            }

            const result = await academic_page_pgCollection.updateOne(filter, updatedDoc, options);
            res.send(result)

        })


        app.put('/finan-status/:id', async (req, res) => {
            const id = req.params.id;
            const status = req.body;


            const filter = { _id: ObjectId(id) };
            const options = { upsert: true };

            const updatedDoc = {
                $set: {
                    status: status.status,

                }
            }

            const result = await academic_page_finanCollection.updateOne(filter, updatedDoc, options);
            res.send(result)

        })


        app.put('/ug-status/:id', async (req, res) => {
            const id = req.params.id;
            const status = req.body;


            const filter = { _id: ObjectId(id) };
            const options = { upsert: true };

            const updatedDoc = {
                $set: {
                    status: status.status,

                }
            }

            const result = await academic_page_ugCollection.updateOne(filter, updatedDoc, options);
            res.send(result)

        })





        // Upadte Api Start 


        app.put('/pg_update/:id', async (req, res) => {
            const id = req.params.id;
            let data = req.body

            const filter = { _id: ObjectId(id) };
            const options = { upsert: true };

            const updatedDoc = {
                $set: {
                    title: data.title,
                    sits: data.sits,

                }
            }

            const result = await academic_page_pgCollection.updateOne(filter, updatedDoc, options);
            res.send(result)

        })

        app.put('/finan_update/:id', async (req, res) => {
            const id = req.params.id;
            let data = req.body

            const filter = { _id: ObjectId(id) };
            const options = { upsert: true };

            const updatedDoc = {
                $set: {
                    title: data.title,
                    sits: data.sits,

                }
            }

            const result = await academic_page_finanCollection.updateOne(filter, updatedDoc, options);
            res.send(result)

        })

        app.put('/ug_update/:id', async (req, res) => {
            const id = req.params.id;
            let data = req.body

            const filter = { _id: ObjectId(id) };
            const options = { upsert: true };

            const updatedDoc = {
                $set: {
                    title: data.title,
                    sits: data.sits,

                }
            }

            const result = await academic_page_ugCollection.updateOne(filter, updatedDoc, options);
            res.send(result)

        })

        // Academic page collection end






        app.get('/banner', async (req, res) => {
            const result = await bannerCollection.find().toArray();
            res.send(result)
        });

        app.get('/banner/:id', async (req, res) => {
            const id = req.params.id;
            console.log(id)
            const query = { _id: ObjectId(id) };
            const result = await bannerCollection.findOne(query);
            res.send(result);
        })
        // app.get('/single_course/:id', async (req, res) => {
        //     const id = req.params.id;
        //     console.log(id)
        //     const query = { _id: ObjectId(id) };
        //     const result = await collageCourseCollection.findOne(query);
        //     res.send(result);
        // })


        app.get('/feature_home', async (req, res) => {
            const result = await featureCollection.find().toArray();
            res.send(result)
        });
        app.get('/feature_home/:id', async (req, res) => {
            const id = req.params.id;
            console.log(id)
            const query = { _id: ObjectId(id) };
            const result = await featureCollection.findOne(query);
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


        app.get('/collage_home_detail/:id', async (req, res) => {
            const id = req.params.id;
            console.log(id)
            const query = { _id: ObjectId(id) };
            const result = await collagehomeCollection.findOne(query);
            res.send(result)
        });


        app.get('/overview_home', async (req, res) => {
            const result = await overviewHomeCollection.find().toArray();
            res.send(result);
        });


        app.get('/testimonial_home', async (req, res) => {
            const result = await testimonialHomeCollection.find().toArray();
            res.send(result);
        });


        app.get('/testimonial_home_detail/:id', async (req, res) => {
            const id = req.params.id;
            console.log(id)
            const query = { _id: ObjectId(id) };
            const result = await testimonialHomeCollection.findOne(query);
            res.send(result)
        });

        app.get('/home-certificate', async (req, res) => {
            const result = await rewardHomeCollection.find().toArray();
            res.send(result);
        });

        app.get('/course_home', async (req, res) => {
            const result = await courseCollection.find().toArray();
            res.send(result);
        });

        app.get('/course-home/:id', async (req, res) => {
            const id = req.params.id;
            console.log(id)
            const query = { _id: ObjectId(id) };
            const result = await courseCollection.findOne(query);
            res.send(result)
        });



        // About page get Api 
        app.get('/vission_home', async (req, res) => {
            const result = await vissionCollection.find().toArray();
            res.send(result);
        });


        // Mission page get Api 
        app.get('/mission_page', async (req, res) => {
            const result = await admission_page_aboutCollection.find().toArray();
            res.send(result);
        });







        // Delete Api 
        app.delete('/add-banner/:id', async (req, res) => {
            const id = req.params.id;
            console.log(id)
            const query = { _id: ObjectId(id) };
            const result = await bannerCollection.deleteOne(query);
            res.send(result);
        })

        app.delete('/feature_home/:id', async (req, res) => {
            const id = req.params.id;
            console.log(id)
            const query = { _id: ObjectId(id) };
            const result = await featureCollection.deleteOne(query);
            res.send(result);
        })

        app.delete('/course_home/:id', async (req, res) => {
            const id = req.params.id;
            console.log(id)
            const query = { _id: ObjectId(id) };
            const result = await courseCollection.deleteOne(query);
            res.send(result);
        })


        app.delete('/collage_home_delete/:id', async (req, res) => {
            const id = req.params.id;
            console.log(id)
            const query = { _id: ObjectId(id) };
            const result = await collagehomeCollection.deleteOne(query);
            res.send(result);
        })

        app.delete('/testimonial_home_delete/:id', async (req, res) => {
            const id = req.params.id;
            console.log(id)
            const query = { _id: ObjectId(id) };
            const result = await testimonialHomeCollection.deleteOne(query);
            res.send(result);
        })

        app.delete('/award_home_delete/:id', async (req, res) => {
            const id = req.params.id;
            console.log(id)
            const query = { _id: ObjectId(id) };
            const result = await rewardHomeCollection.deleteOne(query);
            res.send(result);
        })




        // Update status Api start 


        app.put('/banner-status/:id', async (req, res) => {
            const id = req.params.id;
            const status = req.body;


            const filter = { _id: ObjectId(id) };
            const options = { upsert: true };

            const updatedDoc = {
                $set: {
                    status: status.status,

                }
            }

            const result = await bannerCollection.updateOne(filter, updatedDoc, options);
            res.send(result)

        })

        app.put('/feature-status/:id', async (req, res) => {
            const id = req.params.id;
            const status = req.body;


            const filter = { _id: ObjectId(id) };
            const options = { upsert: true };

            const updatedDoc = {
                $set: {
                    status: status.status,

                }
            }

            const result = await featureCollection.updateOne(filter, updatedDoc, options);
            res.send(result)

        })



        app.put('/about-status/:id', async (req, res) => {
            const id = req.params.id;
            const status = req.body;


            const filter = { _id: ObjectId(id) };
            const options = { upsert: true };

            const updatedDoc = {
                $set: {
                    status: status.status,

                }
            }

            const result = await abouthomeCollection.updateOne(filter, updatedDoc, options);
            res.send(result)

        })

        app.put('/toolroom_status/:id', async (req, res) => {
            const id = req.params.id;
            const status = req.body;


            const filter = { _id: ObjectId(id) };
            const options = { upsert: true };

            const updatedDoc = {
                $set: {
                    status: status.status,

                }
            }

            const result = await toolRoomAboutCollection.updateOne(filter, updatedDoc, options);
            res.send(result)

        })


        app.put('/choose-status/:id', async (req, res) => {
            const id = req.params.id;
            const status = req.body;


            const filter = { _id: ObjectId(id) };
            const options = { upsert: true };

            const updatedDoc = {
                $set: {
                    status: status.status,

                }
            }

            const result = await choosehomeCollection.updateOne(filter, updatedDoc, options);
            res.send(result)

        })

        app.put('/course-status/:id', async (req, res) => {
            const id = req.params.id;
            const status = req.body;


            const filter = { _id: ObjectId(id) };
            const options = { upsert: true };

            const updatedDoc = {
                $set: {
                    status: status.status,

                }
            }

            const result = await courseCollection.updateOne(filter, updatedDoc, options);
            res.send(result)

        })
        app.put('/overview-status/:id', async (req, res) => {
            const id = req.params.id;
            const status = req.body;


            const filter = { _id: ObjectId(id) };
            const options = { upsert: true };

            const updatedDoc = {
                $set: {
                    status: status.status,

                }
            }

            const result = await overviewHomeCollection.updateOne(filter, updatedDoc, options);
            res.send(result)

        })


        app.put('/collage-status/:id', async (req, res) => {
            const id = req.params.id;
            const status = req.body;


            const filter = { _id: ObjectId(id) };
            const options = { upsert: true };

            const updatedDoc = {
                $set: {
                    status: status.status,

                }
            }

            const result = await collagehomeCollection.updateOne(filter, updatedDoc, options);
            res.send(result)

        })

        app.put('/testimonial-status/:id', async (req, res) => {
            const id = req.params.id;
            const status = req.body;


            const filter = { _id: ObjectId(id) };
            const options = { upsert: true };

            const updatedDoc = {
                $set: {
                    status: status.status,

                }
            }

            const result = await testimonialHomeCollection.updateOne(filter, updatedDoc, options);
            res.send(result)

        })


        app.put('/award-status/:id', async (req, res) => {
            const id = req.params.id;
            const status = req.body;


            const filter = { _id: ObjectId(id) };
            const options = { upsert: true };

            const updatedDoc = {
                $set: {
                    status: status.status,

                }
            }

            const result = await rewardHomeCollection.updateOne(filter, updatedDoc, options);
            res.send(result)

        })

        app.put('/vission-status/:id', async (req, res) => {
            const id = req.params.id;
            const status = req.body;


            const filter = { _id: ObjectId(id) };
            const options = { upsert: true };

            const updatedDoc = {
                $set: {
                    status: status.status,

                }
            }

            const result = await vissionCollection.updateOne(filter, updatedDoc, options);
            res.send(result)

        })


        app.put('/admission_page_status/:id', async (req, res) => {
            const id = req.params.id;
            const status = req.body;


            const filter = { _id: ObjectId(id) };
            const options = { upsert: true };

            const updatedDoc = {
                $set: {
                    status: status.status,

                }
            }

            const result = await admission_page_aboutCollection.updateOne(filter, updatedDoc, options);
            res.send(result)

        })


        app.put('/tender_status/:id', async (req, res) => {
            const id = req.params.id;
            const status = req.body;


            const filter = { _id: ObjectId(id) };
            const options = { upsert: true };

            const updatedDoc = {
                $set: {
                    status: status.status,

                }
            }

            const result = await tenderCollection.updateOne(filter, updatedDoc, options);
            res.send(result)

        })



        app.put('/collage_details_more_status/:id', async (req, res) => {
            const id = req.params.id;
            const status = req.body;


            const filter = { _id: ObjectId(id) };
            const options = { upsert: true };

            const updatedDoc = {
                $set: {
                    status: status.status,

                }
            }

            const result = await collageDetailmoreCollection.updateOne(filter, updatedDoc, options);
            res.send(result)

        })





        app.put('/collage_details_about__status/:id', async (req, res) => {
            const id = req.params.id;
            const status = req.body;


            const filter = { _id: ObjectId(id) };
            const options = { upsert: true };

            const updatedDoc = {
                $set: {
                    status: status.status,

                }
            }

            const result = await collageDetailAboutCollection.updateOne(filter, updatedDoc, options);
            res.send(result)

        })

        app.put('/collage_course_status/:id', async (req, res) => {
            const id = req.params.id;
            const status = req.body;


            const filter = { _id: ObjectId(id) };
            const options = { upsert: true };

            const updatedDoc = {
                $set: {
                    status: status.status,

                }
            }

            const result = await collageCourseCollection.updateOne(filter, updatedDoc, options);
            res.send(result)

        })

        app.put('/team_member_status/:id', async (req, res) => {
            const id = req.params.id;
            const status = req.body;


            const filter = { _id: ObjectId(id) };
            const options = { upsert: true };

            const updatedDoc = {
                $set: {
                    status: status.status,

                }
            }

            const result = await teamCollection.updateOne(filter, updatedDoc, options);
            res.send(result)

        })


        // Update status Api end


        // Update Api 
        app.put('/update-banner/:id', async (req, res) => {
            const id = req.params.id;
            let data = req.body
            // console.log(data.title, data.desc, data.picture, data.link);


            const filter = { _id: ObjectId(id) };
            const options = { upsert: true };
            let updatedDoc;
            if (data.picture == "") {
                console.log("image not selected");




                updatedDoc = {
                    $set: {
                        title: data.title,
                        subtitle: data.subtitle,
                        desc: data.desc,
                        link: data.link

                    }
                }

            }
            else {
                console.log('imasge seleted')
                updatedDoc = {
                    $set: {
                        title: data.title,
                        subtitle: data.subtitle,
                        desc: data.desc,
                        link: data.link,
                        picture: data.picture
                    }
                }
            }




            const result = await bannerCollection.updateOne(filter, updatedDoc, options);
            res.send(result)

        })



        app.put('/update-about/:id', async (req, res) => {
            const id = req.params.id;
            let data = req.body
            // console.log(data.title, data.desc, data.picture, data.link);


            const filter = { _id: ObjectId(id) };
            const options = { upsert: true };
            let updatedDoc;
            if (data.image == "") {
                console.log("image not selected");




                updatedDoc = {
                    $set: {
                        aboutTitle: data.aboutTitle,
                        percentage: data.percentage,
                        aboutDesc: data.aboutDesc,


                    }
                }

            }
            else {
                console.log('imasge seleted')
                updatedDoc = {
                    $set: {
                        aboutTitle: data.aboutTitle,
                        percentage: data.percentage,
                        aboutDesc: data.aboutDesc,
                        image: data.image
                    }
                }
            }




            const result = await abouthomeCollection.updateOne(filter, updatedDoc, options);
            res.send(result)

        })




        app.put('/toolroom_update/:id', async (req, res) => {
            const id = req.params.id;
            let data = req.body
            // console.log(data.title, data.desc, data.picture, data.link);


            const filter = { _id: ObjectId(id) };
            const options = { upsert: true };
            let updatedDoc;
            if (data.image == "") {
                console.log("image not selected");




                updatedDoc = {
                    $set: {
                        titlte2: data.titlte2,
                        title1: data.title1,
                        descOne: data.descOne,
                        descTwo: data.descTwo,


                    }
                }

            }
            else {
                console.log('imasge seleted')
                updatedDoc = {
                    $set: {
                        titlte2: data.titlte2,
                        title1: data.title1,
                        descOne: data.descOne,
                        descTwo: data.descTwo,
                        image: data.image
                    }
                }
            }




            const result = await toolRoomAboutCollection.updateOne(filter, updatedDoc, options);
            res.send(result)

        })




        app.put('/update-choose/:id', async (req, res) => {
            const id = req.params.id;
            let data = req.body
            // console.log(data.title, data.desc, data.picture, data.link);


            const filter = { _id: ObjectId(id) };
            const options = { upsert: true };
            let updatedDoc;
            if (data.image == "") {
                console.log("image not selected");




                updatedDoc = {
                    $set: {
                        mainTitle: data.mainTitle,
                        subTitileOne: data.subTitileOne,
                        subTitileTwo: data.subTitileTwo,
                        subTitileThree: data.subTitileThree,
                        subTitileFour: data.subTitileFour,


                    }
                }

            }
            else {
                console.log('imasge seleted')
                updatedDoc = {
                    $set: {
                        mainTitle: data.mainTitle,
                        subTitileOne: data.subTitileOne,
                        subTitileTwo: data.subTitileTwo,
                        subTitileThree: data.subTitileThree,
                        subTitileFour: data.subTitileFour,
                        image: data.image
                    }
                }
            }




            const result = await choosehomeCollection.updateOne(filter, updatedDoc, options);
            res.send(result)

        })




        app.put('/course_update/:id', async (req, res) => {
            const id = req.params.id;
            let data = req.body
            // console.log(data.title, data.desc, data.picture, data.link);


            const filter = { _id: ObjectId(id) };
            const options = { upsert: true };
            let updatedDoc;
            if (data.picture == "") {
                console.log("image not selected");




                updatedDoc = {
                    $set: {
                        title: data.title,
                        link: data.link,



                    }
                }

            }
            else {
                console.log('imasge seleted')
                updatedDoc = {
                    $set: {
                        title: data.title,
                        link: data.link,
                        picture: data.picture
                    }
                }
            }




            const result = await courseCollection.updateOne(filter, updatedDoc, options);
            res.send(result)

        })





        app.put('/collage_update/:id', async (req, res) => {
            const id = req.params.id;
            let data = req.body
            // console.log(data.title, data.desc, data.picture, data.link);


            const filter = { _id: ObjectId(id) };
            const options = { upsert: true };
            let updatedDoc;
            if (data.image == "") {
                console.log("image not selected");




                updatedDoc = {
                    $set: {
                        collageName: data.collageName,
                        collageLink: data.collageLink,
                        collageDesc: data.collageDesc,




                    }
                }

            }
            else {
                console.log('imasge seleted')
                updatedDoc = {
                    $set: {
                        collageName: data.collageName,
                        collageLink: data.collageLink,
                        collageDesc: data.collageDesc,

                        image: data.image,
                    }
                }
            }




            const result = await collagehomeCollection.updateOne(filter, updatedDoc, options);
            res.send(result)

        })




        app.put('/admission_vission_update/:id', async (req, res) => {
            const id = req.params.id;
            let data = req.body
            // console.log(data.title, data.desc, data.picture, data.link);


            const filter = { _id: ObjectId(id) };
            const options = { upsert: true };
            let updatedDoc;
            if (data.imageOne == "" && data.imageTwo == "") {
                console.log("image not selected");

                updatedDoc = {
                    $set: {
                        firstTitle: data.firstTitle,
                        percentage: data.percentage,
                        subone: data.subone,
                        subTwo: data.subTwo,
                        subThree: data.subThree,


                    }
                }

            }
            else if (data.imageOne == "") {
                console.log('imasge seleted')
                updatedDoc = {
                    $set: {
                        firstTitle: data.firstTitle,
                        percentage: data.percentage,
                        subone: data.subone,
                        subTwo: data.subTwo,
                        subThree: data.subThree,
                        imageTwo: data.imageTwo,
                    }
                }
            } else if (data.imageTwo == "") {
                updatedDoc = {
                    $set: {
                        firstTitle: data.firstTitle,
                        percentage: data.percentage,
                        subone: data.subone,
                        subTwo: data.subTwo,
                        subThree: data.subThree,
                        imageOne: data.imageOne,

                    }
                }
            } else {
                updatedDoc = {
                    $set: {
                        firstTitle: data.firstTitle,
                        percentage: data.percentage,
                        subone: data.subone,
                        subTwo: data.subTwo,
                        subThree: data.subThree,
                        imageOne: data.imageOne,
                        imageTwo: data.imageTwo,

                    }
                }
            }




            const result = await admission_page_aboutCollection.updateOne(filter, updatedDoc, options);
            res.send(result)

        })






        app.put('/collage_details_about_update/:collage', async (req, res) => {
            const collage = req.params.collage;
            let data = req.body
            // console.log(data.title, data.desc, data.picture, data.link);


            const filter = { collage };
            const options = { upsert: true };
            let updatedDoc;
            if (data.imageOne == "" && data.imageTwo == "") {
                console.log("image not selected");

                updatedDoc = {
                    $set: {
                        firstTitle: data.firstTitle,

                        subone: data.subone,
                        subTwo: data.subTwo,
                        collage: data.collage


                    }
                }

            }
            else if (data.imageOne == "") {
                console.log('imasge seleted')
                updatedDoc = {
                    $set: {
                        firstTitle: data.firstTitle,

                        subone: data.subone,
                        subTwo: data.subTwo,
                        collage: data.collage,
                        imageTwo: data.imageTwo,
                    }
                }
            } else if (data.imageTwo == "") {
                updatedDoc = {
                    $set: {
                        firstTitle: data.firstTitle,

                        subone: data.subone,
                        subTwo: data.subTwo,
                        collage: data.collage,
                        imageOne: data.imageOne,

                    }
                }
            } else {
                updatedDoc = {
                    $set: {
                        firstTitle: data.firstTitle,

                        subone: data.subone,
                        subTwo: data.subTwo,

                        imageOne: data.imageOne,
                        imageTwo: data.imageTwo,
                        collage: data.collage
                    }
                }
            }




            const result = await collageDetailAboutCollection.updateOne(filter, updatedDoc, options);
            res.send(result)

        })




        app.put('/home_feature/:id', async (req, res) => {
            const id = req.params.id;
            let data = req.body

            const filter = { _id: ObjectId(id) };
            const options = { upsert: true };

            const updatedDoc = {
                $set: {
                    title: data.title,
                    fontLink: data.fontLink,
                    desc: data.desc,
                    readMoreLink: data.readMoreLink

                }
            }

            const result = await featureCollection.updateOne(filter, updatedDoc, options);
            res.send(result)

        })

        app.put('/testimonial_update/:id', async (req, res) => {
            const id = req.params.id;
            let data = req.body

            const filter = { _id: ObjectId(id) };
            const options = { upsert: true };

            const updatedDoc = {
                $set: {
                    desc: data.desc,
                    username: data.username,


                }
            }

            const result = await testimonialHomeCollection.updateOne(filter, updatedDoc, options);
            res.send(result)

        })



        app.put('/collage_course_update/:collage', async (req, res) => {
            const collage = req.params.collage;
            let data = req.body

            const filter = { collage: data.collage };
            const options = { upsert: true };

            const updatedDoc = {
                $set: {
                    collage: data.collage,
                    course: data.course,


                }
            }

            const result = await collageCourseCollection.updateOne(filter, updatedDoc, options);
            res.send(result)

        })



        // About PAge Update API

        app.put('/home_vission_update/:id', async (req, res) => {
            const id = req.params.id;
            let data = req.body

            const filter = { _id: ObjectId(id) };
            const options = { upsert: true };

            const updatedDoc = {
                $set: {
                    firstTitle: data.firstTitle,
                    collageDesc: data.collageDesc,
                    subone: data.subone,
                    subTwo: data.subTwo,
                    subTwo: data.subTwo,
                    subThree: data.subThree,
                    subFour: data.subFour,
                    subFive: data.subFive,
                    subSix: data.subSix,
                    secondTitle: data.secondTitle,
                    secondDesc: data.secondDesc,


                }
            }

            const result = await vissionCollection.updateOne(filter, updatedDoc, options);
            res.send(result)

        })

        app.put('/collage_details_more_update/:collage', async (req, res) => {
            const collage = req.params.collage;
            let data = req.body

            const filter = { collage };
            const options = { upsert: true };

            const updatedDoc = {
                $set: {
                    collage: data.collage,
                    websiteLink: data.websiteLink,
                    address: data.address,
                    phone: data.phone,




                }
            }

            const result = await collageDetailmoreCollection.updateOne(filter, updatedDoc, options);
            res.send(result)

        })

        // app.put('/course_update/:id', async (req, res) => {
        //     const id = req.params.id;
        //     let data = req.body

        //     const filter = { _id: ObjectId(id) };
        //     const options = { upsert: true };

        //     const updatedDoc = {
        //         $set: {
        //             title: data.title,
        //             fontLink: data.fontLink,
        //             desc: data.desc,
        //             readMoreLink: data.readMoreLink

        //         }
        //     }

        //     const result = await featureCollection.updateOne(filter, updatedDoc, options);
        //     res.send(result)

        // })





        app.put('/update-about/:id', async (req, res) => {
            const id = req.params.id;
            let data = req.body
            // console.log(data.title, data.desc, data.picture, data.link);


            const filter = { _id: ObjectId(id) };
            const options = { upsert: true };
            let updatedDoc;
            if (data.image == "") {
                console.log("image not selected");




                updatedDoc = {
                    $set: {
                        aboutTitle: data.aboutTitle,
                        percentage: data.percentage,
                        aboutDesc: data.aboutDesc,


                    }
                }

            }
            else {
                console.log('imasge seleted')
                updatedDoc = {
                    $set: {
                        aboutTitle: data.aboutTitle,
                        percentage: data.percentage,
                        aboutDesc: data.aboutDesc,
                        image: data.image
                    }
                }
            }




            const result = await choosehomeCollection.updateOne(filter, updatedDoc, options);
            res.send(result)

        })



        // Post api 

        app.post('/home_feature', async (req, res) => {
            const feature = req.body;
            const result = await featureCollection.insertOne(feature);
            res.send(result);
        });

        app.post('/collage_details_about_post', async (req, res) => {
            const feature = req.body;
            const result = await collageDetailAboutCollection.insertOne(feature);
            res.send(result);
        });
        app.post('/toolroom_post', async (req, res) => {
            const feature = req.body;
            const result = await toolRoomAboutCollection.insertOne(feature);
            res.send(result);
        });

        app.post('/collage_details_more_post', async (req, res) => {
            const feature = req.body;
            const result = await collageDetailmoreCollection.insertOne(feature);
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

        app.post('/home_course', async (req, res) => {
            const collage = req.body;
            const result = await courseCollection.insertOne(collage);
            res.send(result);


        });

        app.post('/home_vission', async (req, res) => {
            const collage = req.body;
            const result = await vissionCollection.insertOne(collage);
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



        app.post("/login_check", (req, res) => {
            const email = req.body;

            const token = jwt.sign(email, process.env.ACCESS_TOKEN_SECRET);

            res.send({ token })
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




// verify token function
function verifyToken(token) {
    let email;
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, function (err, decoded) {
        if (err) {
            email = 'Invalid email'
        }
        if (decoded) {
            console.log(decoded)
            email = decoded
        }
    });
    return email;
}