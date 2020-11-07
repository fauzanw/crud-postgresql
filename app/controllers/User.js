const { comments, posts, users } = require('../models')
exports.findAllPost = async (req, res) => {
    const { auth_data } = req;
    const findAllPost = await posts.findAll({
        where: { user_id: auth_data.id },
        include: [{model: users, as: 'user'}]
    })

    res.status(200).json({
        status: true,
        message: 'Successfully retrieved all post data',
        data: findAllPost
    })
}

exports.createPost = async (req, res) => {
    const { auth_data } = req;
    const { title, body } = req.body;
    const createPost = await posts.create({
        title, body,
        user_id: auth_data.id
    }, {include: [{model: users, as: 'user'}]});

    res.status(200).json({
        status: true,
        message: 'Successfully create a new post.',
        data: createPost
    });
}

exports.createComment = async (req, res) => {
    const { auth_data } = req;
    const { id } = req.params;
    const { comment } = req.body;
    const checkPost = await posts.findOne({where: {id}});
    if(!checkPost) {
        res.status(400).json({
            status: false,
            message: 'Post ID not found.'
        })
    }else{
        const createComment = await comments.create({
            comment,
            user_id: auth_data.id,
            post_id: id
        });

        res.status(200).json({
            status: true,
            message: 'Successfully create a comment',
            data: createComment
        })
    }
}

exports.deletePost = async (req, res) => {
    const { auth_data } = req;
    const { id } = req.params;
    const checkPost = await posts.findOne({where: {id}});
    if(!checkPost) {
        res.status(400).json({
            status: false,
            message: 'Post ID not found.'
        })
    }else{
        if(checkPost.user_id != auth_data.id) {
            res.status(403).json({
                status: false,
                message: 'You don\'t have access to this post'
            })
        }else{
            await posts.destroy({where: {id, user_id: auth_data.id}});
            res.json({
                status: true,
                message: 'Successfully delete a post.'
            })
        }
    }
}