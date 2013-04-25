// add feed to directory, then reload feed page
function add_new_feed(name, url){
	window.numFeeds++;
	new Feed(name, url);
	//TODO: check that feed is not already in list
	rebuild_feeds();
}

//delete existing feed from directory, then reload
function delete_feed(name){
	window.numFeeds--;
	for (var i = 0; i < window.user_feeds.length; i++){
		var feed = window.user_feeds[i];
		if (feed.feed_name == name){
			window.user_feeds.splice(i, 1);
			//console.log("Feed '" + name + "' deleted successfully");
			rebuild_feeds();
			return;
		}
	}			
}

//button to reload feeds (more recent articles, update to changes in feeds)
function rebuild_feeds(){
	//TODO: need a rebuild feet button
	//console.log("\n\nRESETING FEEDS...");
	window.this_feed_num = 0;
	window.all_feeds_loaded = false;
	window.has_published = false;
	$("#feed_box").empty();
	load_all_feeds();
}

function custom_new_feed_entry(){
	var directory = $("#browse");
	var div_html = "<div class='snippet' ";
	div_html += "id='custom_feed'><div class= 'headline'>Add another feed:</div> </div>";
	directory.append(div_html);
	var new_div = $("#custom_feed");
	var name_input = "Name <input id='name_input' class='data'></input>";
	var url_input = "<br/> Url<input id='url_input' class='data'></input>";
	var feed_generator = "<div id='generator_button'> Generate New Feed </div>";
	new_div.append(name_input);
	new_div.append(url_input);
	new_div.append(feed_generator);
	
	var generator = $("#generator_button");
	generator.click(generate_given_feed);
	
}

function generate_given_feed(){
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
	if (!(is_unique_feed(input_name, input_url))){
		console.log("Requested feed uses occupied name or url");
		return;
	}
	test_potential_feed(input_name, input_url);
}

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


//TODO: check if feed already subscribed to
//tests a supplied feed to see if malformed input
function test_potential_feed(name, url){
	var connection = new google.feeds.Feed(url);
	
	var attempt_to_load_feed = function(result){
									parse_test(result, name, url, connection);
								};	
	connection.load(attempt_to_load_feed);
}

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
		return false;
	}
}

//saves a new feed whose contents have been tested and can be parsed 
function add_validated_feed(name, url, connection){
	window.numFeeds++;
	var new_feed = new Object();
	new_feed.feed_name = name;
	new_feed.feed_src = url
	new_feed.connection = connection;
	window.user_feeds.push(new_feed);
}



//connect with user account via MongoDB

//changes in deleted/additional feeds automatically shown on feed page

/*
function unignore_feed(div, feed){
	//window.numFeeds++;
	//console.log("unignoring feed");
	feed.ignore = false;
	if (div.hasClass("ignored_feed")){
		//console.log("removing ignore class");
		div.removeClass("ignored_feed");
	}
	if (!(div.hasClass("listing"))){
		//console.log("adding listing class");
		div.addClass("listing");
	}
	div.unbind('click', function(){
					unignore_feed(div, feed);
				});
	div.bind('click', function(){
				ignore_feed(div, feed);
			});
	rebuild_feeds();
}
	

function ignore_feed(div, feed){
	//window.numFeeds--;
	//console.log("ignoring feed");
	feed.ignore = true;
	if (div.hasClass("listing")){
		//console.log("removing listing class");
		div.removeClass("listing");
	}
	if (!(div.hasClass("ignored_feed"))){
		//console.log("adding ignore class");
		div.addClass("ignored_feed");
	}
	div.unbind('click', function(){
					ignore_feed(div, feed);
				});
	div.bind('click',function(){
					unignore_feed(div, feed);
			});
	//console.log("attempting ignore on: " + feed.feed_name + " (current ignore status: " + feed.ignore +")");
	rebuild_feeds();
}
*/