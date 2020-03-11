
# role-based-route-authentication

role-based-route-authentication provides route authentication on role based for nodejs.

By using role-based-route-authentication we can authenticate route on based of roles easily.

## Installation

role-based-route-authentication may be installed via npm with: 

	npm install role-based-route-authentication
  

## Usage

The sample below and others are included in the `example` directory.

To use role-based-route-authentication we need to define two things.

#### First we need a role based permission JSON as below format:

```javascript
roleBasedPermissionJSON = {
'role': ['METHOD_routeUrl']
}
```

According to above format `key` of JSON will be role. ANd `value` of key will be an array.

The values of array will be combination of `http method` and `api route url`.

For E.g

```javascript
roleBasedPermissionJSON = {
'ADMIN': ['GET_users'],
}
/* ADMIN is the role, and GET is the http method join with route
 * by using underscore '_'.
 * if you want to authenticate deep routing for e.g api route
 * is'/users/details' of GET.
 * Then permission will be 'GET_users_details' as below:
 */
roleBasedPermissionJSON = {
'ADMIN': ['GET_users_details'],
}
```
#### Second thing we need is the `key` by using whic we can get role from node `request` object.

For E.g
```javascript
const { setPermissionsWithRole } = require('role-based-route-authentication');

const  permissionJSON = {
'SUPER_ADMIN': 'all',
'ADMIN': ['GET_users'],
'CLIENT': ['GET_list'],
};
/* To allowed permission fro all routes just simply set the value
 * of role is 'all'.
 */
const  roleKey = "users";
/* As e.g roleKey is "users". So we get the role always from
 * request.users.role.
 */
const roleBasedAuthenticator = setPermissionsWithRole(permissionJSON, roleKey);

/* Now to use role based authentication we just need to place 
 * above variable "roleBasedAuthenticator" as middleware in api
 * route as below:
 */

route.get('/users', roleBasedAuthenticator, function(request, response){
	//This code will be execute if route is authenticated. 
})
```
#### To use authentication only for baseUrl of route 
To use role based route authentication only for base url, we can set authentication exact after `baseUrl` as middleware as below:
For E.g 
```javascript
var express = require('express');
var app = express();
const usersRoute = require('./usersRoute');
const { setPermissionsWithRole } = require('role-based-route-authentication');
const  permissionJSON = {
'ADMIN': ['GET_users'],
'CLIENT': ['GET_list'],
};
const  roleKey = "users";
const roleBasedAuthenticator = setPermissionsWithRole(permissionJSON, roleKey);

app.use('/users', roleBasedAuthenticator, usersRoute);

```
#### To use authentication for deep route
Always place authenticator as middleware till where you want to authenticate your route.
For E.g 
```javascript
const { setPermissionsWithRole } = require('role-based-route-authentication');
const  permissionJSON = {
'ADMIN': ['GET_users'],
'CLIENT': ['GET_list'],
};
const  roleKey = "users";
const roleBasedAuthenticator = setPermissionsWithRole(permissionJSON, roleKey);

/* Now if route is "/users/details" of GET type.
 * If we want to authenticate only for baseUrl (e.g "users"), then
 * place "roleBasedAuthenticator" after baseUrl as middleware as
 * below:
 */
app.use('/users', roleBasedAuthenticator, usersRoute);

/* But if we want to authenticate for deep ruote (e.g"/users/details"), then
 * place "roleBasedAuthenticator" after api url till where we want
 * to authenticate as middleware as below:
 */
 app.use('/users', usersRoute);
 route.get('/details', roleBasedAuthenticator, function(request, response){
	//This code will be execute if route "/users/details" is authenticated.
})
```

Similarly use for all routes.
On unauthorized route it will throw error for 404 status.

## Node Support Policy
role-based-route-authentication supports all versions of node v5 and so on.

## Issues

Please report any issues using the [role-based-route-authentication issue tracker][issues]. When using

the issue tracker

- Include complete details about the issue.

- You can include a link to a [gist](http://gist.github.com/) with any stack traces/logs (and you can also attach these directly to the bug report).

- Your bug report will be closed if you do not provide enough information abut the issue.

- Please only open new issue and reference the original issue in your report.


[issues]: https://github.com/prtk-s/role-based-route-authentication/issues

