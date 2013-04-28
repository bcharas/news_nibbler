//handles loading, deleting, and adding (with validating) feeds

//constructor for feed object
function Feed(name, url){
	this.feed_name = name;
	this.feed_src = url;
	this.connection = new google.feeds.Feed(url);
	window.user_feeds.push(this);
}

//deletes an existing feed, then refreshes feeds/topics
function delete_feed(name){
	for (var i = 0; i < window.user_feeds.length; i++){
		var feed = window.user_feeds[i];
		if (feed.feed_name == name){
			window.user_feeds.splice(i, 1);
			//console.log("Feed '" + name + "' deleted successfully");
			refresh_feeds();
			post_subscriptions();
			return;
		}
	}			
}

//adds input feed if it is a new and valid rss feed
function add_new_feed(name, url){
	if (!(is_unique_feed(name, url))){
		console.log("Requested feed uses occupied name or url");
		return;
	}
	
	var connection = new google.feeds.Feed(url);
	
	var attempt_to_load_feed = function(result){
									if (is_valid_rss_feed(result, name, url, connection)){
												$("#name_input").val("");
												$("#url_input").val("");
												refresh_feeds();
												post_subscriptions();
									}
								};
	connection.load(attempt_to_load_feed);
	
	
}
	
//checks if user already subscribes to a given feed
function is_unique_feed(name, url){
	for (var i = 0; i < window.user_feeds.length; i++){
		var feed = window.user_feeds[i];
		if (feed.feed_name == name){
			console.log("there is already a feed with that name!");
			return false;
		}
		if (feed.feed_src == url){
			console.log("You are already subscribed to this feed!");
			return false;
		}
	}
	return true;
}	
	
//tries to load the contents of a given feed to see if valid feed
function is_valid_rss_feed(result, name, url, connection){
	if (!result.error){
		//$("#name_input").val("");
		//$("#url_input").val("");
		save_validated_feed(name, url, connection);
		//refresh_feeds();
		//post_subscriptions();
		return true;
	}
	else{	
		console.log("Invalid feed");
		return false;
	}
}	

//takes in a feed that is known to be valid, and adds it to user's subscriptions
function save_validated_feed(name, url, connection){
	var new_feed = new Object();
	new_feed.feed_name = name;
	new_feed.feed_src = url
	new_feed.connection = connection;
	window.user_feeds.push(new_feed);
}
