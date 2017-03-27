/* global process */
var config = {
  webServer: {
    ip: '0.0.0.0',
    port: process.env.PORT || 3002,
    isProdMode: true
  }
};
module.exports = config;
