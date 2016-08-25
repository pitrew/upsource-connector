# upsource-connector
Upsource connector

## Usage
```
var UpsourceClient = require('upsource-connector');
var upsource = new UpsourceClient({
    host: '192.168.1.1',
    basic_auth: {
        username: 'my-username',
        password: 'my-password'
    }
});
```
## Refresh VCS
```
upsource.project.refresh('projectId', function (err, data) {

     if (err) {
         console.log('Error', err);
    } else {
         console.log(data);
     }
 });
```

## Get all projects
```
upsource.project.getAllProjects(function (err, data) {

 if (err) {
     console.log('Error', err);
 } else {
     console.log(data.result);
 }
});
```

## Create review

```
upsource.review.createReview('projectId', 'Test review', null, 'branch-name', function (err, data) {

    if (err) {
        console.log('Error', err);
    } else {
        console.log(data);
    }
});
```

## Remove review
```
upsource.review.removeReview('projectId', 'reviewId', function (err, data) {

 if (err) {
     console.log('Error', err);
 } else {
     console.log(data);
 }
});
```

## Get list of users that can be added to a review
```
upsource.user.getUsersForReview('projectId', 'reviewId', function (err, data) {

 if (err) {
     console.log('Error', err);
 } else {
     console.log(data);
 }
});
```

### Add user to a review as a reviewer

```
upsource.review.addParticipant('projectId', 'reviewId', 'userId', function (err, data) {

 if (err) {
     console.log('Error', err);
 } else {
     console.log(data);
 }
});
```