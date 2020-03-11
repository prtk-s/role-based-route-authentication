'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.setPermissionsWithRole = setPermissionsWithRole;

var _require = require('./util'),
    isPermissionsExist = _require.isPermissionsExist,
    isRouteExist = _require.isRouteExist,
    getRole = _require.getRole,
    RoleBasedError = _require.RoleBasedError,
    UndefinedRoleError = _require.UndefinedRoleError;

function setPermissionsWithRole(permissionJSON, roleKey) {
    function roleBasedAuthenticator(permissionJSON, roleKey, request, response, next) {
        try {
            var baseUrl = request.baseUrl.slice(1);
            var method = request.method;
            var routeToVerify = method + '_' + baseUrl;
            var publicPermissions = permissionJSON['publicRoutes'];

            if (publicPermissions && isPermissionsExist(publicPermissions) && isRouteExist(publicRoute, routeToVerify)) {
                return next();
            }

            var isRoleKey = roleKey ? roleKey : 'users';
            var role = getRole(request, isRoleKey);

            if (!role) {
                throw new UndefinedRoleError();
            }

            var rolePermissions = permissionJSON[role];

            if (!isPermissionsExist(rolePermissions)) {
                throw new RoleBasedError();
            }
            if (rolePermissions === 'all') {
                next();
            }

            if (isRouteExist(rolePermissions, routeToVerify)) {
                return next();
            }

            var path = request.path.split('/').splice(1).join('_');
            var params = request.params;
            if (Object.keys(params).length) {
                var firstParamKey = Object.keys(params)[0];
                var firstParamValue = params[firstParamKey];
                var paramValueIndex = path.indexOf(firstParamValue);
                path = path.substr(0, paramValueIndex - 1);
            }
            routeToVerify = routeToVerify + '_' + path;

            if (!isRouteExist(rolePermissions, routeToVerify)) {
                throw new RoleBasedError();
            }
            return next();
        } catch (error) {
            return response.status(404).json(error);
        }
    }
    return roleBasedAuthenticator.bind(this, permissionJSON, roleKey);
}