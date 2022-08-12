//jshint esversion:6

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

//TODO
mongoose.connect("mongodb+srv://sanrsa:rahman417@cluster0.w7dwc.mongodb.net/wikiDB", {useNewUrlparser: true});

 const ArticleSchema = {
    title: String,
    content: String
 }

 const Article = mongoose.model("Article",ArticleSchema)

//////////////////////////////////////all articles /////////////////////////////////////////////////////////
app.route("/articles")

.get( function(req, res){
    Article.find(function(err, foundArticles){
        if (!err){
            res.send(foundArticles)
        } else {
            res.send(err)
        }
      });
    })


.post(function(req, res){
    const newArticle = new Article ({
      title: req.body.title,
      content: req.body.content
    })

	console.log(newArticle)

    newArticle.save(function(err){
       if (!err){
      res.send("successfully added new article.")
    } else {
      res.send(err)
    }
    });
  })


.delete(function(req, res){
    Article.deleteMany(function(err){
      if (!err){
        res.send("Successfully deleted")
      } else {
        res.send(err)
      }
    });
  });



  ////////////////////////////////////specific article////////////////////////////////////////////////////

app.route("/articles/:ptitle")


.get(function(req, res){

  Article.findOne(
    {title:req.params.ptitle}, function(err, result) {
      if (result) {
        res.send(result)
      } else {
        res.send(err + "Artcle not found")
      }
    });
})


.put(function(req, res) {
  
  Article.update(
    {title: req.params.ptitle},
    {title: req.body.title, content: req.body.content},
    {overwrite: true},

    function(err){
      if (!err){
        res.send("successfully edited")
      } else {
        res.send(err)
      }
    });
})


.patch(function(req, res) {
  Article.update(
    {title: req.params.ptitle},
    {$set: req.body},
    
    function(err){
      if (!err){
        res.send("successfully edited")
      } else {
        res.send(err)
      }
    });
})


.delete(function(req, res){
  Article.deleteOne({title: req.params.ptitle}, function(err){
    if (!err){
      res.send("Successfully deleted")
    } else {
      res.send(err)
    }
  });
});


app.listen(3000, function() {
  console.log("Server started on port 3000");
});