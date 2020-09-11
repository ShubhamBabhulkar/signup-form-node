var express = require('express');
const _ = require('lodash');
const auth = require('../middleware/auth.middleware');
const {News, validate, updateValidate} = require('../models/news.model');
var router = express.Router();

router.post('/', auth, async (req, res) => {
    req.body.user = req.user._id;
    const { error } = validate(req.body);
    if(error){
        return res.status(400).send(error.details[0].message);
    } else {
        let news = new News(req.body);
        news = await news.save();
        news = _.pick(news, ['title']);
        res.json({news: news, message: 'News added successfully'});
    }
});

router.get('/', auth, async (req, res) => {
    let news = await News.find({})
    .populate('user', ['name'])
    .sort('-_id');
    if(!news.length) {
        return res.status(404).json({message: 'News not found'});
    } else {
        res.json({news: news});
    }
});

router.get('/mynews', auth, async (req, res) => {
    let news = await News.find({user: req.user._id})
    .populate('user', ['name'])
    .sort('-_id');
    if(!news.length) {
        return res.status(404).json({message: 'News not found'});
    } else {
        res.json({news: news, message: 'Get news successfully'});
    }
});

router.patch('/:id', auth, async (req, res) => {
    const { error } = updateValidate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let news = await News.findByIdAndUpdate(req.params.id, {title: req.body.title, description : req.body.description});
    if(!news) {
        return res.status(404).json({message: 'News not found'});
    } else {
        res.json({updatedNews: news, message: 'News updated successfully'});
    }
});

router.delete('/:id', async (req, res) => {
    let news = await News.findByIdAndDelete(req.params.id);
    if(!news) {
        return res.status(404).json({message: 'News not found'});
    } else {
        res.json(news);
    }
});

module.exports = router;
