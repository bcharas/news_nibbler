window.user_feeds = [];
//default_feed_directory();

function Feed(name, url){
	this.feed_name = name;
	this.feed_src = url;
	this.connection = new google.feeds.Feed(url);
	window.user_feeds.push(this);
}

function default_feed_directory(){
	window.user_feeds = [];
	//console.log("getting default directory...");
	var reddit = new Feed("Reddit", "http://www.reddit.com/.rss");	
	var digg = new Feed("Digg", "http://www.digg.com/rss/index.xml");
	var cnn = new Feed("CNN", "http://rss.cnn.com/rss/cnn_topstories.rss");
//	var hacker_news = new Feed("Hacker_News", "https://news.ycombinator.com/rss");
  var cooking = new Feed("Cooking_with_Friends", "http://www.cookingwithfriendsclub.com/index.php?/rss/blog");
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
	//var directory = $("#browser_container");
  var directory = $("#directory");
	////console.log("user feeds length: " + window.user_feeds.length);
	for (var i = 0; i < window.user_feeds.length; i++){
		var feed = window.user_feeds[i];
		publish_feed_listing(feed, directory);
	}
	//console.log("directory complete");
}

// add feed to directory, then reload feed page
function add_new_feed(name, url){
	window.numFeeds++;
	new Feed(name, url);
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
	$("#feed_container").empty();
	$("#directory").empty();
  publish_feed_directory();
  load_all_feeds();
  custom_new_feed_entry();
}

function custom_new_feed_entry(){
	//var directory = $("#browser_container");
	var directory = $("#directory");
  var div_html = "<div class='listing' ";
	div_html += "id='custom_feed'>Add another feed: </div>";
	directory.append(div_html);
	var new_div = $("#custom_feed");
	var name_input = "<br/>Name: <input id='name_input'></input>";
	var url_input = "Url:<input id='url_input'></input>";
	//var feed_generator = "<div id='generator_button'> Generate New Feed </div>";
	var feed_generator = "<div id='generator_button' class='button'> Generate New Feed </div>";
  new_div.append(name_input);
	new_div.append(url_input);
	new_div.append(feed_generator);
	
	var generator = $("#generator_button");
	generator.click(generate_given_feed);

  var container = $("#browser_container");
  var deadspace_html = "<div class='deadspace'>i</div>";
  container.append(deadspace_html);
}

function generate_given_feed(){
	var input_name = $("#name_input").val();
	var input_url = $("#url_input").val();
	//var new_feed = new Feed(input_name, input_url);
	//TODO: given an input name, url, fetches a new feed and adds it to the rss reader
  if ((input_name === "") || (input_url === "")) {
    return;
  }
  add_new_feed(input_name, input_url);
	return;
}

//connect with user account via MongoDB

//changes in deleted/additional feeds automatically shown on feed page

