window.user_feeds = [];

function Feed(name, url){
	this.feed_name = name;
	this.feed_src = url;
	this.connection = new google.feeds.Feed(url);
	window.user_feeds.push(this);
}

function default_feed_directory(){
	window.user_feeds = [];
	var reddit = new Feed("Reddit", "http://www.reddit.com/.rss");	
	var digg = new Feed("Digg", "http://www.digg.com/rss/index.xml");
	var cnn = new Feed("CNN", "http://rss.cnn.com/rss/cnn_topstories.rss");
}

function publish_feed_listing(feed, container){
	var div = "<div class='listing' ";
	div += "id='" + feed.feed_name + "'></div>"
	container.append(div);
	var to_publish = "<br/><div class='headline'"
	to_publish += ">";
	to_publish += feed.feed_name;
	to_publish += ": ";
	to_publish += feed.feed_src;
	to_publish += "</div>";
	var published_div = $("#" + feed.feed_name);
	published_div.selected = true;
	published_div.append(to_publish);
	feed.ignore = false;
}

function publish_feed_directory(){	
	var directory = $("#directory");
	for (var i = 0; i < window.user_feeds.length; i++){
		var feed = window.user_feeds[i];
		publish_feed_listing(feed, directory);
	}
}

// add feed to directory, then reload feed page
function add_new_feed(name, url){
	window.numFeeds++;
	new Feed(name, url);
	rebuild_feeds();
	//save_to_local_storage();
}

//delete existing feed from directory, then reload
function delete_feed(name){
	window.numFeeds--;
	for (var i = 0; i < window.user_feeds.length; i++){
		var feed = window.user_feeds[i];
		if (feed.feed_name == name){
			window.user_feeds.splice(i, 1);
			rebuild_feeds();
			//save_to_local_storage();
			return;
		}
	}
	return;
}

//button to reload feeds (more recent articles, update to changes in feeds)
function rebuild_feeds(){
	window.this_feed_num = 0;
	window.all_feeds_loaded = false;
	window.has_published = false;
	$("#feed_container").empty();
	$("#directory").empty();
	publish_feed_directory();
	load_all_feeds();
	custom_new_feed_entry();
}

function custom_new_feed_entry(){
	var directory = $("#directory");
	var div_html = "<div class='listing' ";
	div_html += "id='custom_feed'>Add another feed: </div>";
	directory.append(div_html);
	var new_div = $("#custom_feed");
	var name_input = "<br/>Name: <input id='name_input'></input>";
	var url_input = "Url:<input id='url_input'></input>";
	var feed_generator = "<div id='generator_button' class='button'> Generate New Feed </div>";
	new_div.append(name_input);
	new_div.append(url_input);
	new_div.append(feed_generator);
	
	var generator = $("#generator_button");
	generator.click(generate_given_feed);
	
	var container = $("#browser_container");
	var deadspace_html = "<div class='deadspace'>24601</div>";
	container.append(deadspace_html);
}

function generate_given_feed(){
	var input_name = $("#name_input").val();
	var input_url = $("#url_input").val();
	if ((input_name === "") || (input_url === "")){
		return;
	}
	add_new_feed(input_name, input_url)
	return;
}
/*
function save_to_local_storage(){
	if (typeof(localStorage) !== "undefined"){
		var app_name = "news_nibbler";
		var key = "user_feeds";
		localStorage[app_name + key] = JSON.stringify(window.user_feeds);
		//console.log("saved");
	}
	else{
		//console.log("unable to access local storage");
	}
}
			
function load_from_local_storage(){
	if (typeof(localStorage) !== "undefined"){
		var app_name = "news_nibbler";
		var key = "user_feeds";
		if (localStorage[app_name + key] !== undefined){
			var saved_value = localStorage[app_name + key];
			if (saved_value == ""){
				default_feed_directory();
				return;
			}
			//console.log(saved_value);
			window.user_feeds = JSON.parse(JSON.stringify(saved_value));
			//console.log("load success");
		}
		else{
			default_feed_directory();
			return;
		}
	}
	else{
		default_feed_directory();
		return;
	}
}
*/
/*

code to allow temporary ignoring / unignoring of feeds

function unignore_feed(div, feed){
	//window.numFeeds++;
	////console.log("unignoring feed");
	feed.ignore = false;
	if (div.hasClass("ignored_feed")){
		////console.log("removing ignore class");
		div.removeClass("ignored_feed");
	}
	if (!(div.hasClass("listing"))){
		////console.log("adding listing class");
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
	////console.log("ignoring feed");
	feed.ignore = true;
	if (div.hasClass("listing")){
		////console.log("removing listing class");
		div.removeClass("listing");
	}
	if (!(div.hasClass("ignored_feed"))){
		////console.log("adding ignore class");
		div.addClass("ignored_feed");
	}
	div.unbind('click', function(){
					ignore_feed(div, feed);
				});
	div.bind('click',function(){
					unignore_feed(div, feed);
			});
	////console.log("attempting ignore on: " + feed.feed_name + " (current ignore status: " + feed.ignore +")");
	rebuild_feeds();
}
*/
