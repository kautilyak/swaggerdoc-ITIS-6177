const express = require('express')
const app = express();
const cors = require('cors');
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const axios = require("axios")
const bodyParser = require('body-parser');
const swagger = require("./swagger.json")


app.use(cors());
app.use(express.json())

const port = 3001;



app.use('/docs', swaggerUi.serve, swaggerUi.setup(swagger));


app.get('/posts', (req, res) => {
    axios.get("http://localhost:3000/posts")
    .then(function(data) {
        res.json(data.data)
    })
    .catch(function(err) {
        if (err) {
            console.log(err);
        }
    })
});



 app.post('/posts', (req, res) => {
    id = req.body.id;

    axios.get(`http://localhost:3000/posts/${id}`)
        .then(function(data) {
            res.status(400);
            res.send("ID already present!")
            
        })

        .catch(function(err) {
            if (err.response.status == 404) {
                axios.post("http://localhost:3000/posts", req.body)
                .then(function(data) {
                    res.send(data.data)
                })
                .catch(function(err) {
                    if (err) {
                        console.log(err);
                    }
                })
            }
        })
});


// Create PUT 
app.put('/posts', async (req, res) => {
    id = req.body.id;
    // sanitation
    if (isNaN(id)) {
        res.status(400);
        res.send("Not a valid id!");
    }

    //validation
    axios.get(`http://localhost:3000/posts/${id}`)
    .then(function(data) {
        // success, present in db
        axios.put(`http://localhost:3000/posts/${id}`, req.body)
        .then(function(data) {
            res.status(200)
            res.send(data.data)
            
        })
        .catch(function(err) {
            if (err) {
                res.status(400);
                res.send("Bad Request!")
                console.log(err);
            }
        })
    })
    .catch(function(err) {
        if (err) {
           res.status(404);
           res.send("No such ID")
        }
    })

    
});

// Create PATCH
app.patch('/posts', async (req, res) => {
    id = req.query.id;


    // sanitation
    if (isNaN(id)) {
        res.status(400);
        res.send("Not a valid id!");
    }

    //validation
    axios.get(`http://localhost:3000/posts/${id}`)
    .then(function(data) {
        // success, present in db
        axios.patch(`http://localhost:3000/posts/${id}`, req.body)
        .then(function(data) {
            res.status(200)
            res.send(data.data)
            
        })
        .catch(function(err) {
            if (err) {
                res.status(400);
                res.send("Bad Request!")
                console.log(err);
            }
        })
    })
    .catch(function(err) {
        if (err) {
           res.status(404);
           res.send("No such ID")
        }
    })

    
});

// Create DELETE
app.delete('/posts', async (req, res) => {
    id = req.body.id;
    // sanitation
    if (isNaN(id)) {
        res.status(400);
        res.send("Not a valid id!");
    }

    //validation
    axios.get(`http://localhost:3000/posts/${id}`)
    .then(function(data) {
        // success, present in db
        axios.delete(`http://localhost:3000/posts/${id}`)
        .then(function(data) {
            res.status(200)
            res.send("Deleted")
            
        })
        .catch(function(err) {
            if (err) {
                console.log(err);
            }
        })
    })
    .catch(function(err) {
        if (err) {
           res.status(404);
           res.send("No such ID")
        }
    })

    
});



app.listen(port, () => {
    console.log('Listening on port 3001');
})