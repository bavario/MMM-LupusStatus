// Dependencies
const express = require('express');
const proxy = require('http-proxy-middleware');

// Config
const { routes } = require('./routes.json');

const app = express();

for (route of routes) {
    app.use(route.route,
        proxy({
            target: route.address,
            pathRewrite: (path, req) => {
                return path.split('/').slice(2).join('/'); // Could use replace, but take care of the leading '/'
            }
        })
    );
}

app.listen(8081, () => {
    console.log('Proxy listening on port 8081');
});
