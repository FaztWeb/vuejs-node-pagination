const { Router } = require('express');
const router = Router();

const faker = require('faker');

const Article = require('../models/Article');

router.get('/create', async (req, res) => {
    // console.log(faker.image.imageUrl());
    // console.log(faker.name.title());
    // console.log(faker.lorem.paragraph());
    // res.json('data');
    for(let i = 0; i < 100; i++) {
        await Article.create({
            title: faker.name.title(),
            imageURL: faker.image.imageUrl(),
            description: faker.lorem.paragraph()
        });
    }
    res.json({message: '100 Records Created'});
});

router.get('/articles', async (req, res) => {
    const articles = await Article.find();
    res.json({articles});
});

module.exports = router;