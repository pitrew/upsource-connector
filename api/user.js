"use strict";

var errorStrings = require('./../lib/error');

module.exports = UserClient;

function UserClient(upsourceClient) {
    this.upsourceClient = upsourceClient;

    this.getUsersForReview = function (pid, rid, callback) {
        var options = {
            uri: this.upsourceClient.buildURL('getUsersForReview'),
            method: 'POST',
            json: true,
            body: {
                reviewId: {
                    projectId: pid,
                    reviewId: rid
                },
                role: 2
            }
        };

        this.upsourceClient.makeRequest(options, callback);
    };


    // this.getUserInfo = function (name, callback) {
    //     var options = {
    //         uri: this.upsourceClient.buildHubURL('users/queryAssist'),
    //         method: 'GET',
    //         //json: true,
    //         qs: {
    //             query: 'authName:' + name
    //         }
    //     };
    //
    //     this.upsourceClient.makeRawRequest(options, callback);
    // };

    // this.getUserInfo = function (name, callback) {
    //     var options = {
    //         uri: this.upsourceClient.buildHubURL('users'),
    //         method: 'GET',
    //         json: true,
    //     };
    //
    //     this.upsourceClient.makeRequest(options, callback);
    // };

}
