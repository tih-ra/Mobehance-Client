var win = Titanium.UI.currentWindow;
Titanium.include("../../shared/signin.js");
Titanium.include("../../shared/api_client.js");
Titanium.include("../../shared/button_panel.js");

win.orientationModes = [
	Titanium.UI.PORTRAIT,
	Titanium.UI.LANDSCAPE_LEFT,
	Titanium.UI.LANDSCAPE_RIGHT,
];
var scrollView = null;

apiClient.getCollection(Titanium.App.Properties.getString("_LINK_SHOW_PROJECT"), 'GET', win, parseResponse);

Titanium.include("../../shared/title_line.js");
setTitleLineStyle("item");


function parseResponse(rxml) {
	
	var composedViews = [];
	//var xml = Ti.XML.parseString(rxml);
	
	/* TITLE LINE TEXT */
	titleLabel.text = rxml.getElementsByTagName("title").item(0).text;
	/* END TITLE LINE TEXT */
	
	for (var i=0;i<rxml.getElementsByTagName("item").length;i++) {
	
		var img_item = rxml.getElementsByTagName("item").item(i);
		Ti.API.info('IMG: ' + img_item.getElementsByTagName("src").item(0).text);
		
		composedViews.push(setComposeView(img_item.getElementsByTagName("src").item(0).text))
	} 
	
	/* OLD */
	
	//ADD TO SCROLL VIWE
	if (scrollView!=null) { win.remove(scrollView) }
		_createScrollableView(composedViews);
		win.add(scrollView);
		
	addPanel();
}

function setComposeView(_image) {
	var newView = Ti.UI.createView({
		backgroundColor:'#000'
	});
	
	
	
	var imageView = Ti.UI.createImageView({
		url:_image,
		backgroundImage:'../../images/loading_image.png'	
	});
	
	newView.add(imageView);
	
	
	return newView;
	//scrollView.addView(newView);
}


function _createScrollableView(views) {
    scrollView = Titanium.UI.createScrollableView({
	views:views,
	showPagingControl:true,
	pagingControlHeight:30,
	maxZoomScale:2.0,
	currentPage:1,
	zIndex:-10});
}

/* Button TOOLBAR */
Titanium.include("../../shared/buttons_left_right.js");

/* END Button TOOLBAR */
function addPanel() {
	win.add(toolbar);
	win.add(titleLine);
	buttonsBar._init(titleLine, win, ["ButtonTopHand", "ButtonTopFvorite"]);

}

win.addEventListener('close', function(e){
	scrollView.remove();
});

/*
// set orientation - landscape 
//
var b1 = Titanium.UI.createButton({
	title:'Set Landscape ',
	width:200,
	height:40,
	top:40
});
win.add(b1);

b1.addEventListener('click', function()
{
	Titanium.UI.orientation = Titanium.UI.LANDSCAPE_LEFT;
});

//
// set orientation - landscape portrait
//
var b2 = Titanium.UI.createButton({
	title:'Set Portrait',
	width:200,
	height:40,
	top:90
});
win.add(b2);

b2.addEventListener('click', function()
{
	Titanium.UI.orientation = Titanium.UI.PORTRAIT;
});
*/