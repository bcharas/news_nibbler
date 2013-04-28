/*
//add_new_feed moved to feed.js
//delete_feed moved to feed.js
*/

/*
//moved to parse_feed_data
//button to reload feeds (more recent articles, update to changes in feeds)
//changed name from rebuild_feeds
//new name: refresh_feeds
function rebuild_feeds(){
	//TODO: need a rebuild feet button
	//console.log("\n\nRESETING FEEDS...");
	//window.this_feed_num = 0;
	window.all_feeds_loaded = false;
	window.has_published = false;
	$("#feed_box").empty();
	load_all_feeds();
}
*/
//custom_new_feed_entry moved to topic_page.js
/*
//moved to topic_page.js
//topic_page.js or feed.js
//changed name from generate_feed
//new name: generate_input_feed
function generate_feed(){
	console.log("generating!");
	var input_name = $("#name_input").val();
	var input_url = $("#url_input").val();
	if (input_name == ""){
		console.log("Feeds must be named before they can be added");
		return;
	}
	if (input_url == ""){
		console.log("No feed URL supplied for generator");
		return;
	}
	//
	if (!(is_unique_feed(input_name, input_url))){
		console.log("Requested feed uses occupied name or url");
		return;
	}
	test_potential_feed(input_name, input_url);
	///
	
	add_new_feed(input_name, input_url);
	
}
*/
//is_unique_feed moved to feed.js
/*
//topic_page.js or feed.js
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
*/

//test_potential_feed moved to feed.js
/*
//tests a supplied feed to see if malformed input
function test_potential_feed(name, url){
	var connection = new google.feeds.Feed(url);
	
	var attempt_to_load_feed = function(result){
									parse_test(result, name, url, connection);
								};	
	connection.load(attempt_to_load_feed);
}
*/

//parse_test moved to feed.js
/*
//tries to load the contents of a given feed to see if valid
function parse_test(result, name, url, connection){
	if (!result.error){
		$("#name_input").val("");
		$("#url_input").val("");
		add_validated_feed(name, url, connection);
		console.log("new feed added!");
		console.log("reloading feeds...");
		rebuild_feeds();
		console.log("feeds updated!");
		publish_feed_directory();
		console.log("directory updated!");
	}
	else{	
		console.log("Invalid feed");
		return;
	}
}
*/

//add_validated_feed moved to feed.js
/*
//saves a new feed whose contents have been tested and can be parsed 
function add_validated_feed(name, url, connection){
	var new_feed = new Object();
	new_feed.feed_name = name;
	new_feed.feed_src = url
	new_feed.connection = connection;
	window.user_feeds.push(new_feed);
}
*/


/* moved functions
//connect with user account via MongoDB
//changes in deleted/additional feeds automatically shown on feed page
//ignore/unignore functions moved to unused_code.js
*/
