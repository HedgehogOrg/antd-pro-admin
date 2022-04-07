const { Login } = require('./Login');

module.exports = {
  GET: {
    ...Login.GET,
  },
  POST: {
    ...Login.POST,
  }
}
