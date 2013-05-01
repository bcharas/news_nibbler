var accessToken;
var signedRequest;
var response;
  
function handleStatusChange(response) {
  document.body.className = response.authResponse ? 'connected' : 'not_connected';
  if (response.authResponse) {
    //updateUserInfo(response);
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

  FB.getLoginStatus(function(response) {
    if (response.status === 'connected') {
      accessToken = response.authResponse.accessToken;
      signedRequest = response.authResponse.signedRequest;
      updateUserInfo(response);
      $("#login_container").addClass("hidden");
      $("#footer_container").removeClass("hidden");    
      $("#feed_container").removeClass("hidden");
    }
    else {
      //$("#login_container").removeClass("hidden");
     // $("#footer_container").addClass("hidden");    
     // $("#feed_container").addClass("hidden");
    }
  });

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

function isAndroid(){
    return navigator.userAgent.indexOf("Android") !== -1;
}

function isIOS(){
   return  !!(navigator.userAgent.match(/iPhone/i) ||
           navigator.userAgent.match(/iPod/i) ||
           navigator.userAgent.match(/iPad/i));
}

function loginUser() {
  FB.getLoginStatus(function(response) {
    if (response.status === 'connected') {
      accessToken = response.authResponse.accessToken;
      signedRequest = response.authResponse.signedRequest;
      updateUserInfo(response);
      $("#login_container").addClass("hidden");
      $("#footer_container").removeClass("hidden");    
      $("#feed_container").removeClass("hidden");
    }
    else {
      console.log("NOT LOGGED IN");
      FB.login(function(response) { 
        if (response.authResponse !== null) {
          accessToken = response.authResponse.accessToken;
          updateUserInfo(response);
          $("#login_container").addClass("hidden");
          $("#footer_container").removeClass("hidden");    
          $("#feed_container").removeClass("hidden");
          //window.top.location = '/static/startScreens.html';
          //console.log(window.top.location);
        }
      }, 
      {
        scope:'email,user_likes,user_interests'
      });     
    }
  });
}

function facebookLogout() {
  FB.logout(function(response) {});
}

function updateUserInfo(response) {
 FB.api('/me', function(response) {
   document.getElementById('profile_pic').innerHTML = '<img src="https://graph.facebook.com/' + response.id + '/picture">';
   document.getElementById('username').innerHTML = response.name;
 });
}

function getUserFriends() {
  FB.api('/me/friends?fields=name,picture', function(response) {

    if (!response.error) {
      var markup = '';

      var friends = response.data;

      for (var i=0; i < friends.length && i < 25; i++) {
         var friend = friends[i];
         var prof = "<div class ='topic'>"
         var pic = '<div class= "pro_pic" > <img src="' + friend.picture.data.url + '"> </div> '
         var name = '<div class= "friend_name">'+ friend.name +'</div></div>'
         prof.append(pic);
         prof.append(name);
         markup.append(prof);
         }
      document.getElementById('friends').innerHTML = markup;
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

