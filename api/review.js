"use strict";

var errorStrings = require('./../lib/error');

module.exports = ReviewClient;

function ReviewClient(upsourceClient) {
    this.upsourceClient = upsourceClient;

    this.createReview = function (pid, title, revision, branch, callback) {
        var options = {
            uri: this.upsourceClient.buildURL('createReview'),
            method: 'POST',
            followAllRedirects: true,
            json: true,
            body: {
                projectId: pid,
                title: title,
                revisions: [revision],
                branch: branch
            }
        };

        this.upsourceClient.makeRequest(options, callback);
    };

    this.removeReview = function (pid, rid, callback) {
        var options = {
            uri: this.upsourceClient.buildURL('removeReview'),
            method: 'POST',
            followAllRedirects: true,
            json: true,
            body: {
                projectId: pid,
                reviewId: rid
            }
        };

        this.upsourceClient.makeRequest(options, callback);
    };

    this.addParticipant = function (pid, rid, uid, callback) {
        var options = {
            uri: this.upsourceClient.buildURL('addParticipantToReview'),
            method: 'POST',
            followAllRedirects: true,
            json: true,
            body: {
                reviewId: {
                    projectId: pid,
                    reviewId: rid
                },
                participant: {
                    userId: uid,
                    role: 2
                }
            }
        };

        this.upsourceClient.makeRequest(options, callback);
    };
}
