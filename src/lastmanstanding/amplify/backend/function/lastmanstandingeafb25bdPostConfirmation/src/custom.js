var AWS = require("aws-sdk");

var docClient = new AWS.DynamoDB.DocumentClient();
var table = "PlayerDB-develop";

exports.handler = (event, context, callback) => {
  // console.log(event);
  var sub = event.request.userAttributes.sub;
  var email = event.request.userAttributes.email;
  var username = event.userName;
  var params = {
    TableName: "PlayerDB-develop",
    KeyConditionExpression: '#UserID = :val1',
    ExpressionAttributeNames:{
      '#UserID': 'Sub'
    },
    ExpressionAttributeValues:{
      ':val1' : sub
    }
  };
  docClient.query(params, function(err, data){
    if (err){
      console.log('error: ', JSON.stringify(err, null, 2));
    } else {
      if (data.Items.length < 1){
        var params = {
          TableName: table,
          Item: {
            'Sub': sub,
            'Username': username,
            'email': email,
            'leagueIDs': [],
            'wins': '0',
            'losses': '0',
          },
        };
        const dynamoPromise = docClient.put(params).promise();
        dynamoPromise
          .then((data) => {
            console.log("PutItem succeeded:", JSON.stringify(data, null, 2));
            callback(null, event);
          })
          .catch((err) => {
            console.log(
              "Unable to PUT item. Error JSON:",
              JSON.stringify(err, null, 2)
            );
            callback(err, null);
          });
      }else{
        console.log('user resetting password', JSON.stringify(err, null, 2));
      }
    }
  });
};