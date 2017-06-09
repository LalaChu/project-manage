var passport = require('passport');
var LocalStrategy = require('passport-local');

// 这里引入的是一个操作数据库的 User 工具函数
var Staff = require('./models/staff');

// 这个配置就是参照官方示例来的，不过官方的讲解不够详细
// 我将在这里详细讲讲是怎样获取用户并验证是否正确
passport.use(new LocalStrategy(

  /**
   * @param username 用户输入的用户名
   * @param password 用户输入的密码
   * @param done 验证验证完成后的回调函数，由passport调用
   */
  function (username, password, done) {
    // 在编写 User.findUniqueUserByUsername 时，包含两个参数，一个是 username
    // 一个是我们现在所传入的回调函数，我们将获取到的用户信息传递给我们的回调函数
    Staff.findOne({"telephone": username}, function (err, user) {
      if (err) {
        console.log('出现错误.');
        return done(err);
      }
      if (!user) {
        console.log('没有找到对应的用户名.');

        return done(null, false, {message: '没有找到对应的用户名.'});
      }
      if (user.password != password) {
        console.log('密码匹配有误.');

        return done(null, false, {message: '密码匹配有误.'});
      }
      return done(null, user);
    });
  }
));

passport.serializeUser(function (user, done) {
  done(null, user.telephone);
});
passport.deserializeUser(function (username, done) {
  Staff.findOne({"telephone":username}, function (err, user) {
    if (err) {
      return done(err);
    }
    done(null, user);
  });
});


// 这是封装了一个中间件函数到 passport 中，可以在需要拦截未验证的用户的请求的时候调用
passport.authenticateMiddleware = function authenticationMiddleware() {
  return function (req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect('/login');
  }
};


module.exports = passport;






