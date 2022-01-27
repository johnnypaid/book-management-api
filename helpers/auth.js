const expressJwt = require('express-jwt');

function auth() {
    const secret = process.env.SECRET;

    return expressJwt({
        secret,
        algorithms: ['HS256'],
        isRevoked: isRevoked
    }).unless({
        path: [
            {url: /\/api\/books(.*)/, methods: ['GET', 'OPTIONS']},
            {url: '/api/author/login'}
        ]
    })
}

async function isRevoked(req, payload, done) {
    if(!payload.authorEmail) {
        done(null, true);
    }

    done();
}

module.exports = auth;