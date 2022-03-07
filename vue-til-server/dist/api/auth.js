"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _express = require("express");

var _auth = require("../utils/auth.js");

var _UserModel = _interopRequireDefault(require("../models/UserModel.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// libs
// modules
// import passport from '../passport.js';
// router init
const router = (0, _express.Router)(); // router

router.post('/login', (req, res) => {
  // find the user
  _UserModel.default.findOne({
    username: req.body.username
  }).then(user => {
    // non registered user
    if (!user) {
      res.status(401).send('Authentication failed. User not found.');
    }

    _bcrypt.default.compare(req.body.password, user.password, (error, result) => {
      if (error) {
        res.status(500).send('Internal Server Error');
      }

      if (result) {
        // create token with user info
        const token = (0, _auth.newToken)(user); // current logged-in user

        const loggedInUser = {
          username: user.username,
          nickname: user.nickname
        }; // return the information including token as JSON

        res.status(200).json({
          success: true,
          user: loggedInUser,
          message: 'Login Success',
          token: token
        });
      } else {
        res.status(401).json('Authentication failed. Wrong password.');
      }
    });
  }).catch(error => {
    res.status(500).json('Internal Server Error');
    throw error;
  });
});
router.post('/signup', (req, res) => {
  const {
    username,
    password,
    nickname
  } = req.body; // encrypt password
  // NOTE: 10 is saltround which is a cost factor

  _bcrypt.default.hash(password, 10, (error, hashedPassword) => {
    if (error) {
      console.log(error);
      return res.status(500).json({
        error
      });
    } else {
      const newUser = new _UserModel.default({
        username,
        password: hashedPassword,
        nickname
      });
      newUser.save((error, saved) => {
        if (error) {
          console.log(error);
          res.status(409).send(error);
        } else {
          console.log(saved);
          res.send(saved);
        }
      });
    }
  });
}); // TODO: Logout 구현 필요

var _default = router;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hcGkvYXV0aC5qcyJdLCJuYW1lcyI6WyJyb3V0ZXIiLCJwb3N0IiwicmVxIiwicmVzIiwiVXNlck1vZGVsIiwiZmluZE9uZSIsInVzZXJuYW1lIiwiYm9keSIsInRoZW4iLCJ1c2VyIiwic3RhdHVzIiwic2VuZCIsImJjcnlwdCIsImNvbXBhcmUiLCJwYXNzd29yZCIsImVycm9yIiwicmVzdWx0IiwidG9rZW4iLCJsb2dnZWRJblVzZXIiLCJuaWNrbmFtZSIsImpzb24iLCJzdWNjZXNzIiwibWVzc2FnZSIsImNhdGNoIiwiaGFzaCIsImhhc2hlZFBhc3N3b3JkIiwiY29uc29sZSIsImxvZyIsIm5ld1VzZXIiLCJzYXZlIiwic2F2ZWQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFDQTs7QUFDQTs7QUFJQTs7QUFDQTs7OztBQVBBO0FBSUE7QUFDQTtBQUlBO0FBQ0EsTUFBTUEsTUFBTSxHQUFHLHNCQUFmLEMsQ0FFQTs7QUFDQUEsTUFBTSxDQUFDQyxJQUFQLENBQVksUUFBWixFQUFzQixDQUFDQyxHQUFELEVBQU1DLEdBQU4sS0FBYztBQUNsQztBQUNBQyxxQkFBVUMsT0FBVixDQUFrQjtBQUNoQkMsSUFBQUEsUUFBUSxFQUFFSixHQUFHLENBQUNLLElBQUosQ0FBU0Q7QUFESCxHQUFsQixFQUdHRSxJQUhILENBR1FDLElBQUksSUFBSTtBQUNaO0FBQ0EsUUFBSSxDQUFDQSxJQUFMLEVBQVc7QUFDVE4sTUFBQUEsR0FBRyxDQUFDTyxNQUFKLENBQVcsR0FBWCxFQUFnQkMsSUFBaEIsQ0FBcUIsd0NBQXJCO0FBQ0Q7O0FBQ0RDLG9CQUFPQyxPQUFQLENBQWVYLEdBQUcsQ0FBQ0ssSUFBSixDQUFTTyxRQUF4QixFQUFrQ0wsSUFBSSxDQUFDSyxRQUF2QyxFQUFpRCxDQUFDQyxLQUFELEVBQVFDLE1BQVIsS0FBbUI7QUFDbEUsVUFBSUQsS0FBSixFQUFXO0FBQ1RaLFFBQUFBLEdBQUcsQ0FBQ08sTUFBSixDQUFXLEdBQVgsRUFBZ0JDLElBQWhCLENBQXFCLHVCQUFyQjtBQUNEOztBQUNELFVBQUlLLE1BQUosRUFBWTtBQUNWO0FBQ0EsY0FBTUMsS0FBSyxHQUFHLG9CQUFTUixJQUFULENBQWQsQ0FGVSxDQUlWOztBQUNBLGNBQU1TLFlBQVksR0FBRztBQUNuQlosVUFBQUEsUUFBUSxFQUFFRyxJQUFJLENBQUNILFFBREk7QUFFbkJhLFVBQUFBLFFBQVEsRUFBRVYsSUFBSSxDQUFDVTtBQUZJLFNBQXJCLENBTFUsQ0FVVjs7QUFDQWhCLFFBQUFBLEdBQUcsQ0FBQ08sTUFBSixDQUFXLEdBQVgsRUFBZ0JVLElBQWhCLENBQXFCO0FBQ25CQyxVQUFBQSxPQUFPLEVBQUUsSUFEVTtBQUVuQlosVUFBQUEsSUFBSSxFQUFFUyxZQUZhO0FBR25CSSxVQUFBQSxPQUFPLEVBQUUsZUFIVTtBQUluQkwsVUFBQUEsS0FBSyxFQUFFQTtBQUpZLFNBQXJCO0FBTUQsT0FqQkQsTUFpQk87QUFDTGQsUUFBQUEsR0FBRyxDQUFDTyxNQUFKLENBQVcsR0FBWCxFQUFnQlUsSUFBaEIsQ0FBcUIsd0NBQXJCO0FBQ0Q7QUFDRixLQXhCRDtBQXlCRCxHQWpDSCxFQWtDR0csS0FsQ0gsQ0FrQ1NSLEtBQUssSUFBSTtBQUNkWixJQUFBQSxHQUFHLENBQUNPLE1BQUosQ0FBVyxHQUFYLEVBQWdCVSxJQUFoQixDQUFxQix1QkFBckI7QUFDQSxVQUFNTCxLQUFOO0FBQ0QsR0FyQ0g7QUFzQ0QsQ0F4Q0Q7QUEwQ0FmLE1BQU0sQ0FBQ0MsSUFBUCxDQUFZLFNBQVosRUFBdUIsQ0FBQ0MsR0FBRCxFQUFNQyxHQUFOLEtBQWM7QUFDbkMsUUFBTTtBQUFFRyxJQUFBQSxRQUFGO0FBQVlRLElBQUFBLFFBQVo7QUFBc0JLLElBQUFBO0FBQXRCLE1BQW1DakIsR0FBRyxDQUFDSyxJQUE3QyxDQURtQyxDQUVuQztBQUNBOztBQUNBSyxrQkFBT1ksSUFBUCxDQUFZVixRQUFaLEVBQXNCLEVBQXRCLEVBQTBCLENBQUNDLEtBQUQsRUFBUVUsY0FBUixLQUEyQjtBQUNuRCxRQUFJVixLQUFKLEVBQVc7QUFDVFcsTUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVlaLEtBQVo7QUFDQSxhQUFPWixHQUFHLENBQUNPLE1BQUosQ0FBVyxHQUFYLEVBQWdCVSxJQUFoQixDQUFxQjtBQUMxQkwsUUFBQUE7QUFEMEIsT0FBckIsQ0FBUDtBQUdELEtBTEQsTUFLTztBQUNMLFlBQU1hLE9BQU8sR0FBRyxJQUFJeEIsa0JBQUosQ0FBYztBQUM1QkUsUUFBQUEsUUFENEI7QUFFNUJRLFFBQUFBLFFBQVEsRUFBRVcsY0FGa0I7QUFHNUJOLFFBQUFBO0FBSDRCLE9BQWQsQ0FBaEI7QUFLQVMsTUFBQUEsT0FBTyxDQUFDQyxJQUFSLENBQWEsQ0FBQ2QsS0FBRCxFQUFRZSxLQUFSLEtBQWtCO0FBQzdCLFlBQUlmLEtBQUosRUFBVztBQUNUVyxVQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWVosS0FBWjtBQUNBWixVQUFBQSxHQUFHLENBQUNPLE1BQUosQ0FBVyxHQUFYLEVBQWdCQyxJQUFoQixDQUFxQkksS0FBckI7QUFDRCxTQUhELE1BR087QUFDTFcsVUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVlHLEtBQVo7QUFDQTNCLFVBQUFBLEdBQUcsQ0FBQ1EsSUFBSixDQUFTbUIsS0FBVDtBQUNEO0FBQ0YsT0FSRDtBQVNEO0FBQ0YsR0F0QkQ7QUF1QkQsQ0EzQkQsRSxDQTZCQTs7ZUFFZTlCLE0iLCJzb3VyY2VzQ29udGVudCI6WyIvLyBsaWJzXG5pbXBvcnQgYmNyeXB0IGZyb20gJ2JjcnlwdCc7XG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tICdleHByZXNzJztcblxuLy8gbW9kdWxlc1xuLy8gaW1wb3J0IHBhc3Nwb3J0IGZyb20gJy4uL3Bhc3Nwb3J0LmpzJztcbmltcG9ydCB7IG5ld1Rva2VuIH0gZnJvbSAnLi4vdXRpbHMvYXV0aC5qcyc7XG5pbXBvcnQgVXNlck1vZGVsIGZyb20gJy4uL21vZGVscy9Vc2VyTW9kZWwuanMnO1xuXG4vLyByb3V0ZXIgaW5pdFxuY29uc3Qgcm91dGVyID0gUm91dGVyKCk7XG5cbi8vIHJvdXRlclxucm91dGVyLnBvc3QoJy9sb2dpbicsIChyZXEsIHJlcykgPT4ge1xuICAvLyBmaW5kIHRoZSB1c2VyXG4gIFVzZXJNb2RlbC5maW5kT25lKHtcbiAgICB1c2VybmFtZTogcmVxLmJvZHkudXNlcm5hbWUsXG4gIH0pXG4gICAgLnRoZW4odXNlciA9PiB7XG4gICAgICAvLyBub24gcmVnaXN0ZXJlZCB1c2VyXG4gICAgICBpZiAoIXVzZXIpIHtcbiAgICAgICAgcmVzLnN0YXR1cyg0MDEpLnNlbmQoJ0F1dGhlbnRpY2F0aW9uIGZhaWxlZC4gVXNlciBub3QgZm91bmQuJyk7XG4gICAgICB9XG4gICAgICBiY3J5cHQuY29tcGFyZShyZXEuYm9keS5wYXNzd29yZCwgdXNlci5wYXNzd29yZCwgKGVycm9yLCByZXN1bHQpID0+IHtcbiAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgcmVzLnN0YXR1cyg1MDApLnNlbmQoJ0ludGVybmFsIFNlcnZlciBFcnJvcicpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgICAvLyBjcmVhdGUgdG9rZW4gd2l0aCB1c2VyIGluZm9cbiAgICAgICAgICBjb25zdCB0b2tlbiA9IG5ld1Rva2VuKHVzZXIpO1xuXG4gICAgICAgICAgLy8gY3VycmVudCBsb2dnZWQtaW4gdXNlclxuICAgICAgICAgIGNvbnN0IGxvZ2dlZEluVXNlciA9IHtcbiAgICAgICAgICAgIHVzZXJuYW1lOiB1c2VyLnVzZXJuYW1lLFxuICAgICAgICAgICAgbmlja25hbWU6IHVzZXIubmlja25hbWUsXG4gICAgICAgICAgfTtcblxuICAgICAgICAgIC8vIHJldHVybiB0aGUgaW5mb3JtYXRpb24gaW5jbHVkaW5nIHRva2VuIGFzIEpTT05cbiAgICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7XG4gICAgICAgICAgICBzdWNjZXNzOiB0cnVlLFxuICAgICAgICAgICAgdXNlcjogbG9nZ2VkSW5Vc2VyLFxuICAgICAgICAgICAgbWVzc2FnZTogJ0xvZ2luIFN1Y2Nlc3MnLFxuICAgICAgICAgICAgdG9rZW46IHRva2VuLFxuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJlcy5zdGF0dXMoNDAxKS5qc29uKCdBdXRoZW50aWNhdGlvbiBmYWlsZWQuIFdyb25nIHBhc3N3b3JkLicpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KVxuICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICByZXMuc3RhdHVzKDUwMCkuanNvbignSW50ZXJuYWwgU2VydmVyIEVycm9yJyk7XG4gICAgICB0aHJvdyBlcnJvcjtcbiAgICB9KTtcbn0pO1xuXG5yb3V0ZXIucG9zdCgnL3NpZ251cCcsIChyZXEsIHJlcykgPT4ge1xuICBjb25zdCB7IHVzZXJuYW1lLCBwYXNzd29yZCwgbmlja25hbWUgfSA9IHJlcS5ib2R5O1xuICAvLyBlbmNyeXB0IHBhc3N3b3JkXG4gIC8vIE5PVEU6IDEwIGlzIHNhbHRyb3VuZCB3aGljaCBpcyBhIGNvc3QgZmFjdG9yXG4gIGJjcnlwdC5oYXNoKHBhc3N3b3JkLCAxMCwgKGVycm9yLCBoYXNoZWRQYXNzd29yZCkgPT4ge1xuICAgIGlmIChlcnJvcikge1xuICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNTAwKS5qc29uKHtcbiAgICAgICAgZXJyb3IsXG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgbmV3VXNlciA9IG5ldyBVc2VyTW9kZWwoe1xuICAgICAgICB1c2VybmFtZSxcbiAgICAgICAgcGFzc3dvcmQ6IGhhc2hlZFBhc3N3b3JkLFxuICAgICAgICBuaWNrbmFtZSxcbiAgICAgIH0pO1xuICAgICAgbmV3VXNlci5zYXZlKChlcnJvciwgc2F2ZWQpID0+IHtcbiAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgICAgICAgIHJlcy5zdGF0dXMoNDA5KS5zZW5kKGVycm9yKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhzYXZlZCk7XG4gICAgICAgICAgcmVzLnNlbmQoc2F2ZWQpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH0pO1xufSk7XG5cbi8vIFRPRE86IExvZ291dCDqtaztmIQg7ZWE7JqUXG5cbmV4cG9ydCBkZWZhdWx0IHJvdXRlcjtcbiJdfQ==