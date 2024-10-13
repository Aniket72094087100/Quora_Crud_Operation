const express = require('express');
const methodOverride = require('method-override');
const app = express();
const port = 8080;
const path = require('path')
const bodyParser = require('body-parser');
const uuid = require('uuid')



app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, "views"))
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.get('/', (req, res) => {
    res.send("hello world");
})

let posts = [
    {
        id: uuid.v4(),
        username: "Aniket",
        content: "I love My self"
    },
    {
        id: uuid.v4(),
        username: "Rohit",
        content: "I love Aniket"
    }
]

app.get('/posts', (req, res) => {
    res.render("post.ejs", { posts })
})

app.post('/posts', (req, res) => {

    let { username, content } = req.body;
    posts.push({
        id: uuid.v4(), username, content
    })
    res.redirect('/posts')
})

app.get('/post/:id/edit', (req, res) => {

    let id = req.params.id;
    // console.log(id);

    let post = posts.find(post => post.id === id);
    if (!post) {
        return res.status(404).send("Post not found");
    }

    // Render the edit form with the existing post details
    res.render("post_edit.ejs", { post });

})

app.patch('/post/:id', (req, res) => {
    console.log("Request method:", req.method);
    const { id } = req.params;
    const content = req.body.content;

    // Find the post by id
    let post = posts.find((post) => id === post.id);
    if (!post) {
        return res.status(404).send("Post not found");
    }

    // Update the post's content
    post.content = content;

    // Optionally save the updated posts array

    // Redirect back to the posts page
    res.redirect(`/posts`);
});




app.get('/postdata', (req, res) => {
    res.render("postdata.ejs")
})

app.listen(port, () => {
    console.log(`Server started at port : ${port}`);
})