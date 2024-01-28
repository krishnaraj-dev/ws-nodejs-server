/**
 * Module dependencies.
 */
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

/**
 * Configure proxy middleware
 */
const wsProxy = createProxyMiddleware({
  target: 'ws://test.mosquitto.org:8080/mqtt',
  // pathRewrite: {
  //  '^/websocket' : '/socket',        // rewrite path.
  //  '^/removepath' : ''               // remove path.
  // },
  changeOrigin: true, // for vhosted sites, changes host header to match to target's host
  ws: true, // enable websocket proxy
  logger: console,
});

const app = express();
app.use('/', express.static(__dirname)); // demo page
app.use(wsProxy); // add the proxy to express

const server = app.listen(3000);
server.on('upgrade', wsProxy.upgrade); // optional: upgrade externally

console.log('[DEMO] Server: listening on port 3000');
