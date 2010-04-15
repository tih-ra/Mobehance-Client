Defines = function() {
	var api_server = "http://mobehance.tokenwatcher.com/",
		links_keypairs = [
					["_LINK_FEATURED", "projects.xml"], 
					["_LINK_RECENT", "projects/recent.xml"],
					["_LINK_WEEK_VIEWED", "projects/week_viewed.xml"],
					["_LINK_DEFAULT", "projects.xml"],
					["_LINK_GALLERY", "project/"],
					["_LINK_SEARCH", "projects/search/"],
					["_LINK_AUTH", "signin"],
					["_LINK_COMMENT", "comments"],
					["_LINK_REST_FAVORITES", "favorites"],
					["_LINK_REST_USERS", "users/"],
					["_LINK_PORTFOLIO", "projects/users"],
					["_LINK_CATEGORIES", "projects/realms"]
				   ],
		
		info_keypairs = [
							["_TITLE_FEATURED", "FEATURED"],
							["_TITLE_RECENT", "MOST RECENT"],
							["_TITLE_WEEK_VIEWED", "WEEK MOST VIEWED"],
							["_TITLE_DEFAULT", "FEATURED"],
							["_TITLE_SEARCH", "Results for: "],
							["_TITLE_USER", "USER"],
							["_TITLE_FAVORITES", "MY FAVORITES"],
							["_BEHANCE_SESSIONS", null],
							["_LOGGED_IN_LISTENER", null],
							["_MSG_COMMENT_SUCCESSFULLY", "Your comment has been successfully added"],
							["_MSG_LOGIN_SUCCESSFULLY", "You have successfully logged in"],
							["_MSG_FAVORITES_SUCCESSFULLY", "The project has been successfully added to favorites"],
							["_MSG_FAVORITES_SUCCESSFULLY_DEL", "The project has been successfully deleted from favorites"],
							["_MSG_LOGIN_ERROR", "You have stated wrong login or password"],
							["_MSG_FAVORITES_ISSET", "The project has already been added to favorites"],
							["_MSG_FAVORITES_EMPTY", "You do not have favorite projects"],
							["_MSG_COMMENTS_EMPTY", "No comments here"],
							["_MSG_COMMENT_ERROR", "An error occured when adding a comment"],
							["_MSG_FAVORITES_ERROR", "An error occured when adding to favorites"],
							["_MSG_FAVORITES_ERROR_DEL", "An error occured when deleting from favorites"],
							["_MSG_GET_ERROR", "An error occured when getting information"]
						  ]
	
	function initDefines() {
		for (var i=0;i<links_keypairs.length;i++) {
			Titanium.App.Properties.setString(links_keypairs[i][0], api_server+links_keypairs[i][1])
		}
		
		for (var i=0;i<info_keypairs.length;i++) {
			Titanium.App.Properties.setString(info_keypairs[i][0], info_keypairs[i][1])
		}
	}
	
	return {
		_init: function() {
			initDefines();
		} 
	};
}();