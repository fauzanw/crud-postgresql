const { Auth, Post, User } = require("./app/controllers");
const JWT = require("./app/middlewares/global/JWT");

module.exports = (app) => {
    app.post('/auth/register', Auth.register);
    app.post('/auth/login', Auth.login);

    app.get('/user/post', [JWT], User.findAllPost);
    app.post('/user/post/create', [JWT], User.createPost);
    app.post('/user/post/:id/comment', [JWT], User.createComment);
    app.delete('/user/post/:id/delete', [JWT], User.deletePost)

    app.get('/post', Post.findAllPost)
    app.get('/post/:id/detail', Post.detailPost);
}