import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

var posts = new Map();
var postNumber = 0;

var loggedIn = false;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render("index.ejs", {
        loggedIn: loggedIn,
        posts: posts
    });
});

app.get("/africa", (req, res) => {
    res.redirect("/")
});
app.get("/australia", (req, res) => {
    res.redirect("/")
});
app.get("/antarctica", (req, res) => {
    res.redirect("/")
});
app.get("/asia", (req, res) => {
    res.redirect("/")
});
app.get("/europe", (req, res) => {
    res.redirect("/")
});
app.get("/north-america", (req, res) => {
    res.redirect("/")
});
app.get("/south-america", (req, res) => {
    res.redirect("/")
});

app.get("/sign-up", (req, res) => {
    loggedIn = true;
    res.redirect("/");
});

app.get("/logout", (req, res) => {
    loggedIn = false;
    res.redirect("/");
});

app.get("/create", (req, res) => {
    res.render("create.ejs", {
        loggedIn: loggedIn
    });
});

app.post("/submit", (req, res) => {
    var title = req.body["title"];
    var text = req.body["textArea"];
    const newPost = new Post(title, text, Date.now());
    posts.set(newPost._id, newPost);
    res.redirect("/");
});

app.post("/:id/submit", (req, res) => {
    var id = req.params.id;
    posts.get(id).title = req.body["title"];
    posts.get(id).text = req.body["textArea"];
    res.redirect("/");
});
  
app.post("/edit/:id", (req, res) => {
    var id = req.params.id;
    res.render("edit.ejs", {
        post: posts.get(id)
    });
});

app.post("/delete/:id", (req, res) => {
    var id = req.params.id;
    posts.delete(id);
    res.redirect("/");
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

function Post(title, text, date) {
    this._id = (postNumber++).toString();
    this.title = title;
    this.text = text;
    this.date = date;
    this.edited = false;
}