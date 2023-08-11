//Conecciones
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.static("public"));

main().catch(err => console.log(err));

async function main() {

    await mongoose.connect('mongodb://127.0.0.1:27017/wikiDB');

}

const articlesSchema = new mongoose.Schema({
    title: String,
    content: String
});

const Article = mongoose.model('Article', articlesSchema);

//////////////// Requesst Targetting All Articles//////////////////
app.route('/articles')
    .get((req, res) => {
        Article.find({})
        .then(foundArticles => {
            res.send(foundArticles);
        })
        .catch(err => {
            console.error(err);
        });
    })
    .post((req, res) => {
        const newArticle = new Article({
            title: req.body.title,
            content: req.body.content
        });

        newArticle.save()
        .then(() => {
            res.send("Successfully added a new article.");
        })
        .catch(err => {
            res.send(err);
        });
    })
    .delete((req, res) => {
        Article.deleteMany({})
        .then(() => {
            res.send("Successfully Deleted all articles.");
        })
        .catch(err => {
            res.send(err);
        });
    });

//////////////// Requesst Targetting Specifi Articles////////////////
app.route('/articles/:articleTitle')
    .get((req, res) => { 
        
        Article.findOne({title: req.params.articleTitle})
        .then(foundArticle => {
            if (foundArticle) {
                res.send(foundArticle);    
            } else {
                res.send("No articles matching that title was found.");
            }
            
        })
        .catch(err => {
            console.error(err);
        });
    })
    .put((req, res) => {
        Article.findOneAndUpdate(
            { title: req.params.articleTitle }, // Condiciones
            { title: req.body.title, content: req.body.content }, // Actualizaciones
            { overwrite: true } // Sobrescribir
        )
        .then(() => {
            res.send("Successfully updated article");
        })
        .catch(error => {
            console.error(error);
            res.status(500).send("Error updating article");
        });
    })
    .patch((req, res) => {
        Article.findOneAndUpdate(
            { title: req.params.articleTitle }, // Condiciones
            { $set:req.body}, // Actualizaciones
            { overwrite: true } // Sobrescribir
        )
        .then(() => {
            res.send("Successfully updated article");
        })
        .catch(error => {
            console.error(error);
            res.status(500).send("Error updating article");
        });
    })
    .delete((req, res) => {
        Article.deleteOne({title: req.params.articleTitle})
        .then(() => {
            res.send("Successfully delete the article");
        })
        .catch(error => {
            console.error(error);
            res.status(500).send("Error delete article");
        });
    });


app.listen(3000, function() {
    console.log("Server started on port 3000");
});