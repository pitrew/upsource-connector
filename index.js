"use strict";

var url = require('url');

var request = require('request');

var oauth_util = require('./lib/oauth_util');
var errorStrings = require('./lib/error');
var review = require('./api/review');
var project = require('./api/project');
var user = require('./api/user');

var UpsourceClient = module.exports = function (config) {
    if(!config.host) {
        throw new Error(errorStrings.NO_HOST_ERROR);
    }
    this.hub = config.hub;
    this.hub.protocol = config.hub.protocol ? config.hub.protocol : 'http';
    this.hub.path_prefix = config.hub.path_prefix ? config.hub.path_prefix : '/';
    this.hub.port = config.hub.port;

    this.host = config.host;
    this.protocol = config.protocol ? config.protocol : 'http';
    this.path_prefix = config.path_prefix ? config.path_prefix : '/';
    this.port = config.port;

    if (config.oauth) {
        if (!config.oauth.consumer_key) {
            throw new Error(errorStrings.NO_CONSUMER_KEY_ERROR);
        } else if (!config.oauth.private_key) {
            throw new Error(errorStrings.NO_PRIVATE_KEY_ERROR);
        } else if (!config.oauth.token) {
            throw new Error(errorStrings.NO_OAUTH_TOKEN_ERROR);
        } else if (!config.oauth.token_secret) {
            throw new Error(errorStrings.NO_OAUTH_TOKEN_SECRET_ERROR);
        }

        this.oauthConfig = config.oauth;
        this.oauthConfig.signature_method = 'RSA-SHA1';

    } else if (config.basic_auth) {
        if (config.basic_auth.base64) {
            this.basic_auth = {
                base64: config.basic_auth.base64
            }
        } else {
            if (!config.basic_auth.username) {
                throw new Error(errorStrings.NO_USERNAME_ERROR);
            } else if (!config.basic_auth.password) {
                throw new Error(errorStrings.NO_PASSWORD_ERROR);
            }

            this.basic_auth = {
                user: config.basic_auth.username,
                pass: config.basic_auth.password
            };
        }
    }

    if (config.cookie_jar) {
        this.cookie_jar = config.cookie_jar;
    }

    this.review = new review(this);
    this.project = new project(this);
    this.user = new user(this);
};

(function () {

    this.buildURL = function (action, mode) {
        var apiBasePath = this.path_prefix + '~' + (mode ? mode : 'rpc') + '/';
        var requestUrl = url.format({
            protocol: this.protocol,
            hostname: this.host,
            port: this.port,
            pathname: apiBasePath + action
        });

        return decodeURIComponent(requestUrl);
    };

    this.buildHubURL = function (action) {
        var apiBasePath = this.hub.path_prefix + 'hub/api/rest/';
        var requestUrl = url.format({
            protocol: this.hub.protocol,
            hostname: this.hub.host,
            port: this.hub.port,
            pathname: apiBasePath + action
        });

        return decodeURIComponent(requestUrl);
    };

    this.makeRawRequest = function (options, callback) {

        console.log('aaa', options);
        request(options, function (err, resp) {

            return callback(null, resp);
        });
    };

    this.makeRequest = function (options, callback, successString) {
        if (this.oauthConfig) {
            options.oauth = this.oauthConfig;
        } else if (this.basic_auth) {
            if (this.basic_auth.base64) {
                options.headers = {
                    Authorization: 'Basic ' + this.basic_auth.base64
                }
            } else {
                options.auth = this.basic_auth;
            }
        }
        if (this.cookie_jar) {
            options.jar = this.cookie_jar;
        }

        console.log(options);
        request(options, function (err, response, body) {
            if (err || response.statusCode.toString()[0] != 2) {
                return callback(err ? err : body, null, response);
            }

            if (typeof body == 'string') body = JSON.parse(body);

            return callback(null, successString ? successString : body, response);
        });
    };


}).call(UpsourceClient.prototype);