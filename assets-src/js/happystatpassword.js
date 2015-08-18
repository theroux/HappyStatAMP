'use strict';
var happy = {
	sentiment : function() {
      var sentimentDataRef = new Firebase('https://happystat.firebaseio.com/');


      $('form').on('submit', function(e) {
        e.preventDefault();
        var sentiment = $('input[name=mood]:checked').val(),
          cdid = $('#cdid').val(),
          question = $('.hs-question').text(),
          referrer = $('#referrer').val();
        sentimentDataRef.push({sentiment: sentiment, cdid: cdid, question : question, referrer : referrer, timestamp : Firebase.ServerValue.TIMESTAMP });
        console.log('submitted sentiment');

      });
    },
};
$(function() {
	if ($('.sentiment-form').length) {
		happy.sentiment();
	}
});