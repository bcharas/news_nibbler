var accessToken;
var signedRequest;
  
function handleStatusChange(response) {
  document.body.className = response.authResponse ? 'connected' : 'not_connected';
  if (response.authResponse) {
    //console.log(response);
    console.log("Got to handleStatusChange");
    updateUserInfo(response);
  }
}

window.fbAsyncInit = function() {
  FB.init({
    appId      : '359071470879336', // App ID
    channelUrl : 'http://newsnibbler.net/static/channel.html', // Channel File
    status     : true, // check login status
    cookie     : true, // enable cookies to allow the server to access the session
    xfbml      : true  // parse XFBML
  });

  /*FB.getLoginStatus(function(response) {
    if (response.status === 'connected') {
      accessToken = response.authResponse.accessToken;
      signedRequest = response.authResponse.signedRequest;
    }
  });*/

  FB.Event.subscribe('auth.statusChange', handleStatusChange);

};

// Load the SDK Asynchronously
(function(d){
   var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
   if (d.getElementById(id)) {return;}
   js = d.createElement('script'); js.id = id; js.async = true;
   js.src = "//connect.facebook.net/en_US/all.js";
   ref.parentNode.insertBefore(js, ref);
}(document));
 
function loginUser() {    
 FB.login(function(response) { 
    //accessToken = response.authResponse.accessToken;
    //console.log(response.authResponse);
   FB.getLoginStatus(function (resp) {
     console.log(resp);
   }, true);
  }, 
  {
    scope:'email,user_likes,user_interests'
  });     
}

function updateUserInfo(response) {
 FB.api('/me', function(response) {
   document.getElementById('user-info').innerHTML = '<img src="https://graph.facebook.com/' + response.id + '/picture">' + response.name;
 });
}


function getUserFriends() {
FB.api('/me/friends?fields=name,picture', function(response) {
 console.log('Got friends: ', response);

 if (!response.error) {
   var markup = '';

   var friends = response.data;

   for (var i=0; i < friends.length && i < 25; i++) {
     var friend = friends[i];

     markup += '<img src="' + friend.picture.data.url + '"> ' + friend.name + '<br>';
   }

   document.getElementById('user-friends').innerHTML = markup;
 }
});
}

function getLikes() { 
 FB.api('/me/likes?fields=name', function(response) {
   console.log('Got likes: ', response);

   if (!response.error) {
     var markup = '';


     var likes = response.data;
      console.log("Likes:", likes);

     for (var i=0; i < likes.length && i < 25; i++) {
       var like = likes[i];

       markup +=  like.name + '<br>';
     }

     document.getElementById('user-likes').innerHTML = markup;
   }
 });
}

function getInterests() { 
 FB.api('/me/interests?fields=name', function(response) {
   console.log('Got interests: ', response);

   if (!response.error) {
     var markup = '';


     var interests = response.data;
      console.log("Interests:", interests);

     for (var i=0; i < interests.length && i < 25; i++) {
       var interest = interests[i];

       markup +=  interest.name + '<br>';
     }

     document.getElementById('user-interests').innerHTML = markup;
   }
 });
}

