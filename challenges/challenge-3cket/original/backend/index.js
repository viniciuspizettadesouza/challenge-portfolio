const express = require('express');
const fs = require('fs');
const data = fs.readFileSync('public/events.json');
const events = JSON.parse(data);

const app = express();
const cors = require('cors');

app.listen(3001, () => {
    console.log("Server running on port 3001");
});

app.use(express.static('public'));

app.use(cors());

app.get("/events", (req, res) => {
    res.json(events);
});


app.get('/events/:event', function (req, res) {
    const slug = req.params.event;

    const filter = events.data.filter(function (el) {
        return el.slug === slug
    });

    if (filter.length !== 1) {
        res.status(404).send({error: 'Not Found', code: 404, message: `Event Slug ${slug} not found.`});
        return;
    }

    res.status(200).send({data: filter[0]});
});
