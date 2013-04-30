//Handles posting subscriptions to the topic page, and adding new ones via user input

/*
//moved to globals to init.js
//constructor Feed moved to feed.js
//delete_feed moved to feed.js
//moved default_feed_directory to init.js
*/


//loops through user feeds and posts a subscription listing for each
//changed name from publish_feed_directory
function post_subscriptions(){	
	var directory = $("#feed_subs");
	directory.empty();
	////console.log("user feeds length: " + window.user_feeds.length);
	for (var i = 0; i < window.user_feeds.length; i++){
		var feed = window.user_feeds[i];
        profile_subs(feed);
		post_subscription_listing(feed, directory);
	}
	//console.log("directory complete");
}

//posts the subscription listing for a given feed
function profile_subs(feed){
    var container = $("#all_pages");
    var div = "<div class='topic' ";
	div += "id='" + feed.feed_name + "_prof'></div>"
	container.append(div);
	var to_publish = "<div class='headline'";
	to_publish += ">";
	to_publish += feed.feed_name;
	to_publish += "</div>";
    to_publish += "<div class = 'date topic_link'>";
    to_publish += feed.feed_src;
    to_publish += "</div>";
	var published_div = $("#" + feed.feed_name+"_prof");
	published_div.selected = true;
	published_div.append(to_publish);
	feed.ignore = false;
}
//changed name from publish_feed_listing


function post_subscription_listing(feed, container){
	var div = "<div class='topic' ";
	div += "id='" + feed.feed_name + "'></div>"
	container.append(div);
	var to_publish = "<div class='headline'";
	to_publish += ">";
	to_publish += feed.feed_name;
	to_publish += "</div>";
    to_publish += "<div class = 'date topic_link'>";
    to_publish += feed.feed_src;
    to_publish += "</div>";
	var published_div = $("#" + feed.feed_name);
	published_div.selected = true;
	published_div.append(to_publish);
	feed.ignore = false;
	
	
	var delete_feed_html = "<div id='" + feed.feed_name + "' class='delete_topic_button'> Unsubscribe </div>";
	published_div.append(delete_feed_html);
	
	var delete_this_feed = function(){
								delete_feed(feed.feed_name);
							};
	var delete_button = $("#" + feed.feed_name);
	delete_button.onButtonTap(delete_this_feed);
}

//builds the box that allows users to subscribe to new feeds
//changed name from custom_new_feed_entry
function new_subscription_input(){
	var directory = $("#browse");
	var div_html = "<div class='snippet' ";
	div_html += "id='custom_feed'><div class= 'headline'>Add another feed:</div> </div>";
	directory.append(div_html);
	var new_div = $("#custom_feed");
	var name_input = "Name <input id='name_input' class='data'></input>";
	var url_input = "<br/> Url<input id='url_input' class='data'></input>";
	var subscribe_button_html = "<div id='generator_button'> Subscribe! </div>";
	new_div.append(name_input);
	new_div.append(url_input);
	new_div.append(subscribe_button_html);
	
	var subscribe_button = $("#generator_button");
	subscribe_button.click(subscribe);
	
}

//called whenever a user presses subscribe, tries to subscribe to input feed
//changed name from generate_feed
function subscribe(){
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
	/*
	if (!(is_unique_feed(input_name, input_url))){
		console.log("Requested feed uses occupied name or url");
		return;
	}
	test_potential_feed(input_name, input_url);
	*/
	
	add_new_feed(input_name, input_url);
	
}