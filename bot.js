var Credentials = require('./credentials');
var Twit = require('twit');

var Bot = new Twit(Credentials.credentials);

Bot.get('search/tweets', { q: '\"should of\"', count: 1, lang: 'en' }, function(err, data, response) {
  if (err) {
	  console.log('Error while retrieving tweet:', err);
	  return;
  }
  
  var tweet = data['statuses'][0];
  
  var tweetText = tweet['text'];
  var tweeterScreenName = tweet['user']['screen_name'];
  
  console.log(tweeterScreenName, ' wrote \"', tweetText, '\"');
});
