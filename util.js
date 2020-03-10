'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function isPermissionsExist(routePermission) {
    return routePermission.length > 0;
}

function isRouteExist(permissions, routeToVerify) {
    return permissions.indexOf(routeToVerify) > -1;
}

function getRole(request, roleKey) {
    var keyArray = roleKey.split('.');
    var roleName = request[keyArray[0]];
    if (keyArray.length > 1) {
        for (var key = 1; key < keyArray.length; key++) {
            roleName = roleName[keyArray[key]];
        }
    }
    return roleName;
}

var RoleBasedError = function (_Error) {
    _inherits(RoleBasedError, _Error);

    function RoleBasedError(message) {
        _classCallCheck(this, RoleBasedError);

        var _this = _possibleConstructorReturn(this, (RoleBasedError.__proto__ || Object.getPrototypeOf(RoleBasedError)).call(this));

        _this.message = message || 'You are not authorized to access this route';
        _this.name = 'InsufficientAuthorization';
        return _this;
    }

    return RoleBasedError;
}(Error);

exports.isPermissionsExist = isPermissionsExist;
exports.isRouteExist = isRouteExist;
exports.getRole = getRole;
exports.RoleBasedError = RoleBasedError;