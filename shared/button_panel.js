buttonsBar = function() {
/* BUTTONS BAR */
var ButtonFeatured = Titanium.UI.createButton({
		top:10,
		image:'../../images/button_pl_black.png',
		backgroundSelectedImage: '../../images/button_pl_black_e.png',
		width: 173,
		height: 26,
		title: Titanium.App.Properties.getString("_TITLE_FEATURED"),
		color:'#fff',
		font:{fontSize:18,fontWeight:'normal',fontFamily:'Helvetica Neue'}
	}),
	ButtonRecent = Titanium.UI.createButton({
		top:46,
		image:'../../images/button_pl_black.png',
		backgroundSelectedImage: '../../images/button_pl_black_e.png',
		width: 173,
		height: 26,
		title: Titanium.App.Properties.getString("_TITLE_RECENT"),
		color:'#fff',
		font:{fontSize:18,fontWeight:'normal',fontFamily:'Helvetica Neue'}
	}),
	ButtonWeekViewed = Titanium.UI.createButton({
		top:82,
		image:'../../images/button_pl_black.png',
		backgroundSelectedImage: '../../images/button_pl_black_e.png',
		width: 173,
		height: 26,
		title: Titanium.App.Properties.getString("_TITLE_WEEK_VIEWED"),
		color:'#fff',
		font:{fontSize:18,fontWeight:'normal',fontFamily:'Helvetica Neue'}
	}),
	search = Titanium.UI.createSearchBar({
		barColor:'#fff', 
		showCancel:true,
		height:43,
		width:260,
		top:138,
		hintText: 'Search'
	}),
	buttonsBar = Titanium.UI.createView({
		top: 40,
		borderRadius:10,
		borderColor:'#000',
		opacity:0.7,
		height: 300,
		width: 300,
		visible: false,
		zIndex:600
	}),
	ButtonMiniFavorite = Titanium.UI.createButton({
		bottom:10,
		left: 20,
		image:'../../images/icon_favorite.png',
		backgroundSelectedImage: '../../images/icon_favorite_e.png',
		width: 73,
		height: 73
	}),
	ButtonMiniContact = Titanium.UI.createButton({
		bottom:10,
		left: (buttonsBar.width/2) - 37,
		image:'../../images/icon_contact.png',
		backgroundSelectedImage: '../../images/icon_contact_e.png',
		width: 73,
		height: 73
	}),
	ButtonMiniProfile = Titanium.UI.createButton({
		bottom:10,
		right: 20,
		image:'../../images/icon_profile.png',
		backgroundSelectedImage:'../../images/icon_profile_e.png',
		width: 73,
		height: 73
	}), 
	
	ButtonTopComment = Titanium.UI.createButton({
		image:'../../images/add_comment.png',
		width:20,
		height:20,
		right:5,
	}),
	
	ButtonTopHand = Titanium.UI.createButton({
		image:'../../images/hand.png',
		width:20,
		height:20,
		right:5,
	}),
	
	ButtonTopFvorite = Titanium.UI.createButton({
		image:'../../images/favorites.png',
		width:20,
		height:20,
		right:30,
	}),
	buttonbar_visibility = false,
	commentbar_visibility = false

	/*BUTTON EVENT LISTENERS*/
		search.addEventListener('return', function(e){
			titleLabel.text = Titanium.App.Properties.getString("_TITLE_SEARCH")+search.value;
			apiClient.getCollection(Titanium.App.Properties.getString("_LINK_SEARCH")+search.value+".xml", 'GET', win, parseResponse);

			buttonBarShowHide();
		 
		});

		ButtonFeatured.addEventListener('click', function(e){
			titleLabel.text = Titanium.App.Properties.getString("_TITLE_FEATURED")
			apiClient.getCollection(Titanium.App.Properties.getString("_LINK_FEATURED"), 'GET', win, parseResponse);

			buttonBarShowHide();
		});

		ButtonRecent.addEventListener('click', function(e){
			titleLabel.text = Titanium.App.Properties.getString("_TITLE_RECENT")
		    apiClient.getCollection(Titanium.App.Properties.getString("_LINK_RECENT"), 'GET', win, parseResponse);

			buttonBarShowHide();
		});

		ButtonWeekViewed.addEventListener('click', function(e){
			titleLabel.text = Titanium.App.Properties.getString("_TITLE_WEEK_VIEWED")
			apiClient.getCollection(Titanium.App.Properties.getString("_LINK_WEEK_VIEWED"), 'GET', win, parseResponse);

			buttonBarShowHide();
		});
		
		/* MINI BUTTONS EVENS */
		
		ButtonMiniContact.addEventListener('click', function(e){

			
			Titanium.App.Properties.setString("_LINK_COMMENTS", Titanium.App.Properties.getString("_LINK_GALLERY")+Titanium.App.Properties.getString("_FOCUSED_PROJECT_URL")+"/comments.xml");
			buttonBarShowHide();
			var commentWindow = Titanium.UI.createWindow({  
			    title:'Comments',
			    backgroundColor:'#fff',
				url: '../comments/index.js'
			});
			commentWindow.open({modal:true});
		});

		ButtonMiniFavorite.addEventListener('click', function(e){
			var success_event_callback = 'add_to_favorite_after_login';
			function _run_link(){
				apiClient.saveFavorite(Titanium.App.Properties.getString("_LINK_REST_FAVORITES"), win, "favorites[proj_url]="+Titanium.App.Properties.getString("_FOCUSED_PROJECT_URL")+"&favorites[behance_user]="+Titanium.App.Properties.getString("_USER_ID")+"");
			};
			buttonBarShowHide();
			if (Titanium.App.Properties.getString("_BEHANCE_SESSIONS")==null) {
				signIn._callbacks(success_event_callback, null);
				signIn._init(win);
				 win.addEventListener(success_event_callback, _run_link);
			} else { 
				_run_link()
			}
			
		});
		
		ButtonMiniProfile.addEventListener('click', function(e){
				buttonBarShowHide();
				var userWindow = Titanium.UI.createWindow({  
			    	title:'User',
			    	backgroundColor:'#fff',
					url: '../users/show.js'
				});
				userWindow.open({modal:true});
		});
		
		/* TOP BUTTONS */
		ButtonTopHand.addEventListener('click', function(e){
			buttonBarShowHide();
		});
		
		ButtonTopFvorite.addEventListener('click', function(e){
			var success_event_callback = 'go_to_favorites_after_login';
			function _run_link() {
				var favoritesWindow = Titanium.UI.createWindow({  
				    	title:'Favorites',
				    	backgroundColor:'#fff',
						url: '../favorites/index.js'
				});
				favoritesWindow.open({modal:true});
				
			}
			if (Titanium.App.Properties.getString("_BEHANCE_SESSIONS")==null) {
				signIn._callbacks(success_event_callback, null);
				signIn._init(win);
				win.addEventListener(success_event_callback, _run_link);
			} else {
				_run_link();
			}
		});
		
		
		ButtonTopComment.addEventListener('click', function(e){
			var success_event_callback = 'show_comment_form';
			function _run_link() { commentFrom._init(win) }
			if (Titanium.App.Properties.getString("_BEHANCE_SESSIONS")==null) {
				signIn._callbacks(success_event_callback, null);
				signIn._init(win);
				win.addEventListener(success_event_callback, _run_link);
			} else {
				_run_link();
			}  
		});
	

	function completeButtonsBar() {
		var lelements = [ButtonFeatured, ButtonRecent, ButtonWeekViewed, search, ButtonMiniFavorite, ButtonMiniContact, ButtonMiniProfile];
		for (var i=0;i<lelements.length;i++) {
			buttonsBar.add(lelements[i]);
		}
		//win.add(loginBar);
	}
	
	function completeMiniButtonsBar(){
		buttonsBar.height = 93;
		buttonsBar.top = 247;
		var lelements = [ButtonMiniFavorite, ButtonMiniContact, ButtonMiniProfile];
		for (var i=0;i<lelements.length;i++) {
			buttonsBar.add(lelements[i]);
		}
	}
	
	function buttonBarShowHide() {
		if (buttonbar_visibility) {
			buttonsBar.hide();
			buttonbar_visibility = false;
		} else {
			buttonsBar.show();
			buttonbar_visibility = true;
		}
	}
	
	return {
		_init: function(titleLine, win, buttons) {
			completeButtonsBar();
			
			for (var i=0;i<buttons.length;i++) {
				titleLine.add(eval(buttons[i]));
			}
			
			win.add(buttonsBar)
		},
		_init_mini_version: function(titleLine, win, buttons) {
			completeMiniButtonsBar();
			
			for (var i=0;i<buttons.length;i++) {
				titleLine.add(eval(buttons[i]));
			}
			
			win.add(buttonsBar)
		},
		_show_hide: function() {
			buttonBarShowHide();
		}
	};
/* END BUTTONS BAR */




/* SHOW CONFIG VIEW */
 



}();