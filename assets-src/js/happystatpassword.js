'use strict';
var happy = {
	sentiment : function() {
      var sentimentDataRef = new Firebase('https://happystat.firebaseio.com/');
      
      $('form[action=/IdentityGuardSelfService/administer/validateLDAPChangePassword').bind('submit', function(e) {
        e.preventDefault();
        var sentiment = $('input[name=mood]:checked').val(),
          cdid = $('#username').val(),
          question = $('.hs-question').text(),
          referrer = $('#referrer').val(),
          $form = $(this);
        sentimentDataRef.push({sentiment: sentiment, cdid: cdid, question : question, referrer : referrer, timestamp : Firebase.ServerValue.TIMESTAMP });
        console.log('submitted sentiment');
        $form.submit();
      });
    },
};
$(function() {
	if ($('.sentiment-form').length) {
		happy.sentiment();
	}
});