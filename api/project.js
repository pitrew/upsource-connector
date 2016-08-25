"use strict";

// var errorStrings = require('./../lib/error');

module.exports = ProjectClient;

function ProjectClient(upsourceClient) {
    this.upsourceClient = upsourceClient;

    this.getAllProjects = function (callback) {
        var options = {
            uri: this.upsourceClient.buildURL('getAllProjects'),
            method: 'GET',
            followAllRedirects: true
        };

        this.upsourceClient.makeRequest(options, callback);
    };

    this.getReviews = function (projectId, callback) {
        var options = {
            uri: this.upsourceClient.buildURL('getReviews'),
            method: 'GET',
            followAllRedirects: true,
            json: true,
            body: {
                limit: 30,
                projectId: projectId
            }
        };

        this.upsourceClient.makeRequest(options, callback);
    };

    this.refresh = function (projectId, callback) {
        var options = {
            uri: this.upsourceClient.buildURL(projectId, 'vcs'),
            method: 'GET',
            json: false
        };

        this.upsourceClient.makeRawRequest(options, callback);
    };
}
