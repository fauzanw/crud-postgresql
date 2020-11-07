const { comments, posts, users } = require('../models')

exports.findAllPost = async (req, res) => {
    const findAllPost = await posts.findAll({
        include: [
            {
                model: comments, 
                include: [
                    {model: users}
                ]
            },
            {
                model: users, 
                as: 'user'
            }
        ]
    })

    res.status(200).json({
        status: true,
        message: 'Successfully retrieved all post data',
        data: findAllPost
    })
}

exports.detailPost = async (req, res) => {
    const { id } = req.params;
    const detailPost = await posts.findOne({
        where: {id}, 
        include: [
            {
                model: comments, 
                include: [
                    {model: users}
                ]
            }, 
            {
                model: users, 
                as: 'user'
            }
        ]
    });
    if(!detailPost) {
        res.status(400).json({
            status: false,
            message: 'Post ID not found.'
        });
    }else {
        res.status(200).json({
            status: true,
            message: 'Successfully retrieved detail post data',
            data: detailPost
        })
    }
}