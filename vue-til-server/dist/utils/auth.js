"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.authenticateUser = exports.verifyToken = exports.newToken = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _config = require("../config");

var _UserModel = _interopRequireDefault(require("../models/UserModel.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// json related
// modules
const newToken = user => {
  const payload = {
    username: user.username,
    _id: user._id
  };
  return _jsonwebtoken.default.sign(payload, _config.SECRET_KEY, {
    expiresIn: _config.EXPIRATION_DATE
  });
};

exports.newToken = newToken;

const verifyToken = token => new Promise((resolve, reject) => {
  _jsonwebtoken.default.verify(token, _config.SECRET_KEY, (err, payload) => {
    if (err) return reject(err);
    resolve(payload);
  });
}); // middleware


exports.verifyToken = verifyToken;

const authenticateUser = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({
      message: 'token must be included'
    });
  }

  const token = req.headers.authorization;
  let payload;

  try {
    payload = await verifyToken(token);
  } catch (e) {
    return res.status(401).json({
      message: 'token is invalid'
    });
  }

  const user = await _UserModel.default.findById(payload._id).select('-password').lean().exec();

  if (!user) {
    return res.status(401).json({
      message: 'user is not found'
    });
  }

  req.user = user;
  next();
};

exports.authenticateUser = authenticateUser;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9hdXRoLmpzIl0sIm5hbWVzIjpbIm5ld1Rva2VuIiwidXNlciIsInBheWxvYWQiLCJ1c2VybmFtZSIsIl9pZCIsImp3dCIsInNpZ24iLCJTRUNSRVRfS0VZIiwiZXhwaXJlc0luIiwiRVhQSVJBVElPTl9EQVRFIiwidmVyaWZ5VG9rZW4iLCJ0b2tlbiIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwidmVyaWZ5IiwiZXJyIiwiYXV0aGVudGljYXRlVXNlciIsInJlcSIsInJlcyIsIm5leHQiLCJoZWFkZXJzIiwiYXV0aG9yaXphdGlvbiIsInN0YXR1cyIsImpzb24iLCJtZXNzYWdlIiwiZSIsIlVzZXJNb2RlbCIsImZpbmRCeUlkIiwic2VsZWN0IiwibGVhbiIsImV4ZWMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFDQTs7QUFDQTs7QUFFQTs7OztBQUpBO0FBR0E7QUFHTyxNQUFNQSxRQUFRLEdBQUdDLElBQUksSUFBSTtBQUM5QixRQUFNQyxPQUFPLEdBQUc7QUFDZEMsSUFBQUEsUUFBUSxFQUFFRixJQUFJLENBQUNFLFFBREQ7QUFFZEMsSUFBQUEsR0FBRyxFQUFFSCxJQUFJLENBQUNHO0FBRkksR0FBaEI7QUFJQSxTQUFPQyxzQkFBSUMsSUFBSixDQUFTSixPQUFULEVBQWtCSyxrQkFBbEIsRUFBOEI7QUFDbkNDLElBQUFBLFNBQVMsRUFBRUM7QUFEd0IsR0FBOUIsQ0FBUDtBQUdELENBUk07Ozs7QUFVQSxNQUFNQyxXQUFXLEdBQUdDLEtBQUssSUFDOUIsSUFBSUMsT0FBSixDQUFZLENBQUNDLE9BQUQsRUFBVUMsTUFBVixLQUFxQjtBQUMvQlQsd0JBQUlVLE1BQUosQ0FBV0osS0FBWCxFQUFrQkosa0JBQWxCLEVBQThCLENBQUNTLEdBQUQsRUFBTWQsT0FBTixLQUFrQjtBQUM5QyxRQUFJYyxHQUFKLEVBQVMsT0FBT0YsTUFBTSxDQUFDRSxHQUFELENBQWI7QUFDVEgsSUFBQUEsT0FBTyxDQUFDWCxPQUFELENBQVA7QUFDRCxHQUhEO0FBSUQsQ0FMRCxDQURLLEMsQ0FRUDs7Ozs7QUFDTyxNQUFNZSxnQkFBZ0IsR0FBRyxPQUFPQyxHQUFQLEVBQVlDLEdBQVosRUFBaUJDLElBQWpCLEtBQTBCO0FBQ3hELE1BQUksQ0FBQ0YsR0FBRyxDQUFDRyxPQUFKLENBQVlDLGFBQWpCLEVBQWdDO0FBQzlCLFdBQU9ILEdBQUcsQ0FBQ0ksTUFBSixDQUFXLEdBQVgsRUFBZ0JDLElBQWhCLENBQXFCO0FBQUVDLE1BQUFBLE9BQU8sRUFBRTtBQUFYLEtBQXJCLENBQVA7QUFDRDs7QUFFRCxRQUFNZCxLQUFLLEdBQUdPLEdBQUcsQ0FBQ0csT0FBSixDQUFZQyxhQUExQjtBQUNBLE1BQUlwQixPQUFKOztBQUNBLE1BQUk7QUFDRkEsSUFBQUEsT0FBTyxHQUFHLE1BQU1RLFdBQVcsQ0FBQ0MsS0FBRCxDQUEzQjtBQUNELEdBRkQsQ0FFRSxPQUFPZSxDQUFQLEVBQVU7QUFDVixXQUFPUCxHQUFHLENBQUNJLE1BQUosQ0FBVyxHQUFYLEVBQWdCQyxJQUFoQixDQUFxQjtBQUFFQyxNQUFBQSxPQUFPLEVBQUU7QUFBWCxLQUFyQixDQUFQO0FBQ0Q7O0FBRUQsUUFBTXhCLElBQUksR0FBRyxNQUFNMEIsbUJBQVVDLFFBQVYsQ0FBbUIxQixPQUFPLENBQUNFLEdBQTNCLEVBQ2hCeUIsTUFEZ0IsQ0FDVCxXQURTLEVBRWhCQyxJQUZnQixHQUdoQkMsSUFIZ0IsRUFBbkI7O0FBS0EsTUFBSSxDQUFDOUIsSUFBTCxFQUFXO0FBQ1QsV0FBT2tCLEdBQUcsQ0FBQ0ksTUFBSixDQUFXLEdBQVgsRUFBZ0JDLElBQWhCLENBQXFCO0FBQUVDLE1BQUFBLE9BQU8sRUFBRTtBQUFYLEtBQXJCLENBQVA7QUFDRDs7QUFFRFAsRUFBQUEsR0FBRyxDQUFDakIsSUFBSixHQUFXQSxJQUFYO0FBQ0FtQixFQUFBQSxJQUFJO0FBQ0wsQ0F4Qk0iLCJzb3VyY2VzQ29udGVudCI6WyIvLyBqc29uIHJlbGF0ZWRcbmltcG9ydCBqd3QgZnJvbSAnanNvbndlYnRva2VuJztcbmltcG9ydCB7IFNFQ1JFVF9LRVksIEVYUElSQVRJT05fREFURSB9IGZyb20gJy4uL2NvbmZpZyc7XG4vLyBtb2R1bGVzXG5pbXBvcnQgVXNlck1vZGVsIGZyb20gJy4uL21vZGVscy9Vc2VyTW9kZWwuanMnO1xuXG5leHBvcnQgY29uc3QgbmV3VG9rZW4gPSB1c2VyID0+IHtcbiAgY29uc3QgcGF5bG9hZCA9IHtcbiAgICB1c2VybmFtZTogdXNlci51c2VybmFtZSxcbiAgICBfaWQ6IHVzZXIuX2lkLFxuICB9O1xuICByZXR1cm4gand0LnNpZ24ocGF5bG9hZCwgU0VDUkVUX0tFWSwge1xuICAgIGV4cGlyZXNJbjogRVhQSVJBVElPTl9EQVRFLFxuICB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCB2ZXJpZnlUb2tlbiA9IHRva2VuID0+XG4gIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICBqd3QudmVyaWZ5KHRva2VuLCBTRUNSRVRfS0VZLCAoZXJyLCBwYXlsb2FkKSA9PiB7XG4gICAgICBpZiAoZXJyKSByZXR1cm4gcmVqZWN0KGVycik7XG4gICAgICByZXNvbHZlKHBheWxvYWQpO1xuICAgIH0pO1xuICB9KTtcblxuLy8gbWlkZGxld2FyZVxuZXhwb3J0IGNvbnN0IGF1dGhlbnRpY2F0ZVVzZXIgPSBhc3luYyAocmVxLCByZXMsIG5leHQpID0+IHtcbiAgaWYgKCFyZXEuaGVhZGVycy5hdXRob3JpemF0aW9uKSB7XG4gICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAxKS5qc29uKHsgbWVzc2FnZTogJ3Rva2VuIG11c3QgYmUgaW5jbHVkZWQnIH0pO1xuICB9XG5cbiAgY29uc3QgdG9rZW4gPSByZXEuaGVhZGVycy5hdXRob3JpemF0aW9uO1xuICBsZXQgcGF5bG9hZDtcbiAgdHJ5IHtcbiAgICBwYXlsb2FkID0gYXdhaXQgdmVyaWZ5VG9rZW4odG9rZW4pO1xuICB9IGNhdGNoIChlKSB7XG4gICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAxKS5qc29uKHsgbWVzc2FnZTogJ3Rva2VuIGlzIGludmFsaWQnIH0pO1xuICB9XG5cbiAgY29uc3QgdXNlciA9IGF3YWl0IFVzZXJNb2RlbC5maW5kQnlJZChwYXlsb2FkLl9pZClcbiAgICAuc2VsZWN0KCctcGFzc3dvcmQnKVxuICAgIC5sZWFuKClcbiAgICAuZXhlYygpO1xuXG4gIGlmICghdXNlcikge1xuICAgIHJldHVybiByZXMuc3RhdHVzKDQwMSkuanNvbih7IG1lc3NhZ2U6ICd1c2VyIGlzIG5vdCBmb3VuZCcgfSk7XG4gIH1cblxuICByZXEudXNlciA9IHVzZXI7XG4gIG5leHQoKTtcbn07XG4iXX0=