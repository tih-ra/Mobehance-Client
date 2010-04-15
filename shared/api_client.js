apiClient = function(){
	var ac_loader = Titanium.UI.createActivityIndicator({
			top:200, 
			height:30,
			width:60,
			message:'Connecting...',
			style:Titanium.UI.iPhone.ActivityIndicatorStyle.PLAIN
		}), 
	
		ac_xhr = null,
		ac_behance_url = null,
		win = null,
		cookie = null,
		_fire_event = null,
		_success_event = null;
		_error_event = null;
		alertDialog = Titanium.UI.createAlertDialog({
			buttonNames: ['OK']
		})
			
	/* EVENTS */
		alertDialog.addEventListener('click', function(e){
			Ti.API.info("EVENT " + _success_event);
			if (_fire_event!=null) {
				win.fireEvent(_fire_event);
				_fire_event = null;
				_success_event = null;
				_error_event = null;
			}
		});
	/* END EVENTS */
	
	function http_result_to_fnc(_response_fnc) {
		ac_xhr.onerror = function(e)
		{
			Ti.API.info("ERROR " + e.error);
			//alert(e.error);
			dialogWarning(Titanium.App.Properties.getString("_MSG_GET_ERROR")+"\n"+"("+e.error+")")
			showACLoader(false);
		};
		
		ac_xhr.ondatastream = function(e)
		{
			//Ti.API.info('ONDATASTREAM - PROGRESS: ' + e.progress);
		};
		
		ac_xhr.onload = function()
		{
			if (this.status == 200) { _response_fnc(this.responseXML); showACLoader(false); }
		};
	}
	
	function post_comment() {
		ac_xhr.onerror = function(e)
		{
			Ti.API.info("ERROR " + e.error);
			//alert(e.error);
			//Titanium.App.Properties.setString("_BEHANCE_SESSIONS");
			showACLoader(false);
			dialogWarning(Titanium.App.Properties.getString("_MSG_COMMENT_ERROR")+"\n"+"("+e.error+")")
			
		};
		
		
		ac_xhr.onload = function()
		{
			showACLoader(false);
			if (this.status == 200) {
				dialogSuccess(Titanium.App.Properties.getString("_MSG_COMMENT_SUCCESSFULLY"), _success_event);
			}
		};
	}
	
	function destroy_favorite() {
		ac_xhr.onerror = function(e)
		{
			showACLoader(false);
			dialogWarning(Titanium.App.Properties.getString("_MSG_FAVORITES_ERROR_ERROR")+"\n"+"("+e.error+")")
			
		};
		
		
		ac_xhr.onload = function()
		{
			showACLoader(false);
			if (this.status == 200) {
				dialogSuccess(Titanium.App.Properties.getString("_MSG_FAVORITES_SUCCESSFULLY_DEL"), _success_event);
			}
		};
	}
	
	
	function save_favorite() {
		ac_xhr.onerror = function(e)
		{
			showACLoader(false);
			dialogWarning(Titanium.App.Properties.getString("_MSG_FAVORITES_ERROR")+"\n"+"("+e.error+")")
			
		};
		
		
		ac_xhr.onload = function()
		{
			showACLoader(false);
			if (this.status == 200) {
				dialogSuccess(Titanium.App.Properties.getString("_MSG_FAVORITES_SUCCESSFULLY"), null);
			}
		};
	}
	
	
	function http_authorize(user_id) {
		ac_xhr.onerror = function(e)
		{
			showACLoader(false);
			Ti.API.info("ERROR " + e.error);
			dialogWarning(Titanium.App.Properties.getString("_MSG_LOGIN_ERROR")+"\n"+"("+e.error+")")
			return false;
		};
		
		ac_xhr.onreadystatechange = function() {
		  /* TODO : Use this if all good */
		
		  if (this.readyState == 4) {
			
		    //cookie = this.getResponseHeader("Set-Cookie");
			//Ti.API.info("COOKIE-1 " + this.getResponseHeader("Set-Cookie"));
			//Titanium.App.Properties.setBool("_LOGGED_IN", true);
		  }
		};
		
		ac_xhr.onload = function()
		{
			showACLoader(false);
			if (this.status == 200) {
				Titanium.App.Properties.setString("_BEHANCE_SESSIONS", this.responseText);
				Titanium.App.Properties.setString("_USER_ID", user_id);
			
				dialogSuccess(Titanium.App.Properties.getString("_MSG_LOGIN_SUCCESSFULLY"), _success_event);
			}
		};
	}
	/* DIALOGS METHODS */
		function dialogSuccess(_msg, d_fire_event) {
			_fire_event = d_fire_event;
			callDialog('Successful', _msg);
		}
		
		function dialogWarning(_msg) {
			 _fire_event = null;
			 callDialog('Warning!', _msg); 
		}
		function callDialog(_title, _msg) {
			alertDialog.title = _title
			alertDialog.message = _msg;
			alertDialog.show();
		}
	/* END DIALOGS METHODS */
	
	function showACLoader(_visible) {
		if (_visible) {
			win.add(ac_loader);
			ac_loader.show();
			
		} else {
			ac_loader.hide();
			win.remove(ac_loader);
		}
	}
	
	function setVars(_url, _win) {
		win = _win;
		ac_behance_url = _url;
		ac_xhr = Titanium.Network.createHTTPClient();
	}
	
	/* HTML METHOD */
	function doConnect(_html_method, _post_data) {
	
		ac_xhr.open(_html_method, ac_behance_url);
		
		if (Titanium.App.Properties.getString("_BEHANCE_SESSIONS")!=null) {
			Ti.API.info("COOKIES " + Titanium.App.Properties.getString("_BEHANCE_SESSIONS"));
			ac_xhr.setRequestHeader("Cookie", Titanium.App.Properties.getString("_BEHANCE_SESSIONS"));
		}
		ac_xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8")
		_post_data==null ? ac_xhr.send() : ac_xhr.send(_post_data);
	}
	
	function _localizeEvents(_success, _error) {
		_success_event = _success;
		_error_event = _error;
	}
	
	return {
		localizeEvents: function(_success, _error) {
			_localizeEvents(_success, _error);
		},
		getCollection: function(_url, _html_method, _win, _response_fnc) {
			setVars(_url, _win);
			
			showACLoader(true);
			http_result_to_fnc(_response_fnc);
			
			doConnect(_html_method, null);
		},
		
		goAuth: function(_url, _win, _post_data, user_id) {
			setVars(_url, _win);
			
			showACLoader(true);
			http_authorize(user_id);
			
			doConnect('POST', _post_data);
		},
		
		postComment: function(_url, _win, _post_data) {
			setVars(_url, _win);
			
			showACLoader(true);
			post_comment();
			
			doConnect('PUT', _post_data);
		},
		
		saveFavorite: function(_url, _win, _post_data) {
			setVars(_url, _win);
			
			showACLoader(true);
			save_favorite();
			
			doConnect('POST', _post_data);
		},
		
		destroyFavorite: function(_url, _win) {
			setVars(_url, _win);
			
			showACLoader(true);
			destroy_favorite();
			
			doConnect('DELETE', null);
		},
		
	};
}();
