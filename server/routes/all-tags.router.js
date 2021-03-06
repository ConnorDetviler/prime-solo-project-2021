const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

/**
 * GET route for all tags
 */
router.get('/', rejectUnauthenticated, (req, res) => {
    const user = req.user.id;

    const queryText = `
        SELECT * FROM "tag"
        WHERE "tag".user_id = $1;
    `;

    pool
    .query(queryText, [user])
    .then(result => {
        res.send(result.rows)
    })
    .catch(err => {
        console.log('error completing SELECT all tags:', err)
        res.sendStatus(500)
    })
});

router.post('/', rejectUnauthenticated, (req, res) => {
    const tag = req.body.name;
    const user = req.user.id
    console.log(tag.name)

    const queryText = `
        INSERT INTO "tag" ("name", "user_id")
        VALUES ($1, $2);
    `;

    pool
    .query(queryText, [tag, user])
    .then(result => {
        console.log(result)
    })
    .catch(err => {
        console.log('error creating new tag in all-tags.router.js', err)
    })

})

module.exports = router;
