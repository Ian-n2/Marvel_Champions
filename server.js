const Bundler = require('parcel-bundler');
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

const proxyOptions = {
  changeOrigin: true,
  target: 'https://marvelcdb.com'
}

app.use(createProxyMiddleware('/api', proxyOptions));
app.use(createProxyMiddleware('/bundles', proxyOptions));

const bundler = new Bundler('src/index.html');
app.use(bundler.middleware());

app.listen(Number(process.env.PORT || 1234));
