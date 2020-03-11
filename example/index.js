var express = require('express');
var app = express();
const usersRoute = require('./usersRoute');
const { setPermissionsWithRole } = require('role-based-route-authentication');
const  permissionJSON = {
'ADMIN': 'all',
'CLIENT': ['GET_users'],
};
const  roleKey = "users";

const roleBasedAuthenticator = setPermissionsWithRole(permissionJSON, roleKey);

app.use('/users', roleBasedAuthenticator, usersRoute);