commentFrom = function() {
	/*VARIABLES*/
	var win = null,
	
		TextComment = Ti.UI.createTextArea({
			autocapitalization:Titanium.UI.TEXT_AUTOCAPITALIZATION_NONE,
			width:280,
			top:10,
			height: 70,
			borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
		}),
		
		ButtonComment = Titanium.UI.createButton({
			top:120,
			image:'../../images/button_pl_blue.png',
			backgroundSelectedImage:'../../images/button_pl_blue_e.png',
			width: 173,
			height: 26,
			title: "Comment",
			color:'#fff',
			font:{fontSize:18,fontWeight:'normal',fontFamily:'Helvetica Neue'}
		}),
		
		ButtonCancel = Titanium.UI.createButton({
			top:156,
			image:'../../images/button_pl_gray.png',
			backgroundSelectedImage:'../../images/button_pl_gray_e.png',
			width: 173,
			height: 26,
			title: "Cancel",
			color:'#000',
			font:{fontSize:18,fontWeight:'normal',fontFamily:'Helvetica Neue'}
		}),

		commentBar = Titanium.UI.createView({
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
			commentBar.hide();
			win.remove(commentBar);
		});
		
		ButtonComment.addEventListener('click', function(e){
			apiClient.localizeEvents('project_commented', null);
			apiClient.postComment(Titanium.App.Properties.getString("_LINK_TO_COMMENT"), win, "comment="+TextComment.value+"");
			commentBar.hide();
			win.remove(commentBar);
		});
		
		
		/* END EVENT LISTENERS */
		/* CLASS METHODS */
		function setWin(_win) {
			win = _win;
		}
		
		function completeCommentBar() {
			var lelements = [TextComment, ButtonComment, ButtonCancel];
			
			for (var i=0;i<lelements.length;i++) {
				commentBar.add(lelements[i]);
			}
			
			win.add(commentBar);
			commentBar.show();
		}
		
		return {
			_init: function(_win) {
				setWin(_win);
				completeCommentBar();
			}
		};
}();
