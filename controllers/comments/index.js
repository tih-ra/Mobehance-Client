var win = Titanium.UI.currentWindow;
Titanium.include("../../shared/signin.js");
Titanium.include("../../shared/comment_form.js");
Titanium.include("../../shared/api_client.js");
Titanium.include("../../shared/button_panel.js");

Titanium.include("../../shared/title_line.js");
setTitleLineStyle("mini");
var ScrollViewCommentsContainer = null;


function comment(top, commentXML) {
	var message_text = commentXML.getElementsByTagName("message").item(0).text;
	
	var ViewCommentBar = Titanium.UI.createView({
		top: top,
		borderRadius:10,
		borderColor:'#000',
		opacity:0.7,
		width:300,
		
		height: (message_text.length<82 ? 60 : 60+(((message_text.length-82) / 40)*12))
		
	});
	
	var ImageUserIcon = Ti.UI.createImageView({
		top:5,
		left:5,
		width:50,
		height:50,
		url: commentXML.getElementsByTagName("icon").item(0).text
	});
	
	var LabelDate = Ti.UI.createLabel({
		color:'#000',
		font:{fontSize:12,fontWeight:'normal',fontFamily:'Helvetica Neue'},
		width:50,
		top:5,
		bottom:5,
		left:60,
		text: commentXML.getElementsByTagName("date").item(0).text
	});
	
	var LabelUserName = Ti.UI.createLabel({
		color:'#009cec',
		font:{fontSize:12,fontWeight:'bold',fontFamily:'Helvetica Neue'},
		width:'auto',
		top:5,
		left:115,
		text: commentXML.getElementsByTagName("name").item(0).text
		
	});
	
	var ScrollViewMessageContainer = Titanium.UI.createScrollView({
	    contentWidth:235,
	    contentHeight:35,
	    top:20,
		left: 60,
		showVerticalScrollIndicator:true,
	    showHorizontalScrollIndicator:false
	});
	
	var LabelMessage = Ti.UI.createLabel({
		color:'#fff',
		font:{fontSize:12,fontWeight:'normal',fontFamily:'Helvetica Neue'},
		height:'auto',
		top:23,
		left:60,
		right:5,
		text: message_text
	});
	
	//ScrollViewMessageContainer.add(LabelMessage);
	
	/* ADD DATA TO BAR */
	var lelements = [ImageUserIcon, LabelDate, LabelUserName, LabelMessage];
	
	for (var i=0;i<lelements.length;i++) {
		ViewCommentBar.add(lelements[i]);
	}
	
	return [ViewCommentBar, ViewCommentBar.height];
	
}

var LabelNoComments = Ti.UI.createLabel({
	color:'#fff',
	font:{fontSize:14,fontWeight:'normal',fontFamily:'Helvetica Neue'},
	height:'auto',
	top:23,
	text: 'No comments here...'
});

function _createScrollViewCommentsContainer() {
	if (ScrollViewCommentsContainer!=null) {win.remove(ScrollViewCommentsContainer)}
	
	ScrollViewCommentsContainer = Titanium.UI.createScrollView({
    contentWidth:'auto',
    contentHeight:'auto',
    top:30,
	width:300,
	showVerticalScrollIndicator:false,
    showHorizontalScrollIndicator:false
});
}

function comments_init() {
	apiClient.getCollection(Titanium.App.Properties.getString("_LINK_COMMENTS"), 'GET', win, parseResponse);
}
comments_init();
win.addEventListener('project_commented', function(e){
	comments_init();
});

function parseResponse(rxml) {
	var comments_top = 10;
	var composedViews = [];
	
	var commentXML = rxml.getElementsByTagName("comment");
	
	_createScrollViewCommentsContainer();
	
	for (var i=0;i<commentXML.length;i++) {
		var _complete_comment = comment(comments_top, commentXML.item(i));
		ScrollViewCommentsContainer.add(_complete_comment[0]);
		comments_top+=(_complete_comment[1]+5);
	} 
	Titanium.App.Properties.setString("_LINK_TO_COMMENT", Titanium.App.Properties.getString("_LINK_COMMENT")+"/"+rxml.getElementsByTagName("proj_id").item(0).text)
	
	titleLabel.text = rxml.getElementsByTagName("title").item(0).text+"\ncomments"
	addPanel();
	(commentXML.length > 0) ? win.add(ScrollViewCommentsContainer) : win.add(LabelNoComments);
	
}

function addPanel() {
	win.add(titleLine);
	//buttonsBar._init(titleLine, win, ["ButtonTopComment"]);
}


