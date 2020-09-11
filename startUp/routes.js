const error = require('../middleware/error.middleware');
var indexRouter = require('../routes/index');
var usersRouter = require('../routes/users');
var authRouter = require('../routes/auth');
var newsRouter = require('../routes/news');

module.exports = function(app) {
    app.use('/', indexRouter);
    app.use('/user', usersRouter);
    app.use(error)
}