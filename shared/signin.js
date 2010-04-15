signIn = function() {
	/*VARIABLES*/
	var win = null,
		android = Ti.Platform.name == 'android',
		
		FieldUsername = Ti.UI.createTextField({
			autocapitalization:Titanium.UI.TEXT_AUTOCAPITALIZATION_NONE,
			width:280,
			top:10,
			height: android ? 45 : 35,
			borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
			hintText:'Behance Username'
		}),

		FieldPassword = Ti.UI.createTextField({
			autocapitalization:Titanium.UI.TEXT_AUTOCAPITALIZATION_NONE,
			width:280,
			top: android ? 65 : 55,
			height: android ? 45 : 35,
			borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
			passwordMask:true,
			hintText:'Behance Password'
		}),

		ButtonLogin = Titanium.UI.createButton({
			top:120,
			image:'../../images/button_pl_blue.png',
			width: 173,
			height: 26,
			title: "Log In",
			color:'#fff',
			font:{fontSize:18,fontWeight:'normal',fontFamily:'Helvetica Neue'}
		}),
		
		ButtonCancel = Titanium.UI.createButton({
			top:156,
			image:'../../images/button_pl_gray.png',
			width: 173,
			height: 26,
			title: "Cancel",
			color:'#000',
			font:{fontSize:18,fontWeight:'normal',fontFamily:'Helvetica Neue'}
		}),

		loginBar = Titanium.UI.createView({
			top: 40,
			borderRadius:10,
			borderColor:'#000',
			opacity:0.7,
			height: 192,
			width: 300,
			visible: false,
			zIndex:200
		})
		
		/* EVENT LISTENERS */
		ButtonCancel.addEventListener('click', function(e){
			loginBar.hide();
			win.remove(loginBar);
		})
		
		ButtonLogin.addEventListener('click', function(e){
			apiClient.goAuth(Titanium.App.Properties.getString("_LINK_AUTH"), win, "login="+FieldUsername.value+"&password="+FieldPassword.value+"", FieldUsername.value);
			loginBar.hide();
			win.remove(loginBar);
		})
		
		/* END EVENT LISTENERS */
		
		/* CLASS METHODS */
		function setCallBacks(_success, _error) {
			apiClient.localizeEvents(_success, _error);
		}
		
		function setWin(_win) {
			win = _win;
		}
		
		
		function completeLoginBar() {
			var lelements = [FieldUsername, FieldPassword, ButtonLogin, ButtonCancel];
			
			for (var i=0;i<lelements.length;i++) {
				loginBar.add(lelements[i]);
			}
			
			win.add(loginBar);
			loginBar.show();
		}
		
		return {
			_callbacks: function(_success, _error){
				setCallBacks(_success, _error)	
			},
			_init: function(_win) {
				setWin(_win);
				completeLoginBar();
			}
		};
}();
