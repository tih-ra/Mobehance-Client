var win = Titanium.UI.currentWindow;

Titanium.include("../../shared/signin.js");
Titanium.include("../../shared/api_client.js");
Titanium.include("../../shared/button_panel.js");

win.orientationModes = [
	Titanium.UI.PORTRAIT,
	Titanium.UI.LANDSCAPE_LEFT,
	Titanium.UI.LANDSCAPE_RIGHT,
];

Ti.API.info("LINK_DEFAULT " + Titanium.App.Properties.getString("_LINK_DEFAULT"));

Ti.Gesture.addEventListener('orientationchange',function(e)
{
	var orientation = getOrientation(e.orientation);
});

var scrollView = null;
var projectLinksCollection = []
/* TITLE */

Titanium.include("../../shared/title_line.js");



/* END TITLE */

apiClient.getCollection(Titanium.App.Properties.getString("_LINK_DEFAULT"), 'GET', win, parseResponse);

function parseResponse(rxml) {
	projectLinksCollection = [];
	projectUserLinksCollection = [];
	
	var composedViews = [];
	//var xml = Ti.XML.parseString(rxml);
	
	
	for (var i=0;i<rxml.getElementsByTagName("project").length;i++) {
	
		var project = rxml.getElementsByTagName("project").item(i);
		
		projectLinksCollection.push(project.getElementsByTagName("url").item(0).text);
		projectUserLinksCollection.push(project.getElementsByTagName("user").item(0).getElementsByTagName("url").item(0).text);
		
		composedViews.push(setComposeView(project.getElementsByTagName("cover").item(0).text, 
										  project.getElementsByTagName("title").item(0).text,
										  project.getElementsByTagName("url").item(0).text+".xml",
										  project.getElementsByTagName("user").item(0).getElementsByTagName("name").item(0).text,
										  project.getElementsByTagName("user").item(0).getElementsByTagName("url").item(0).text,
										  project.getElementsByTagName("categories").item(0),
										  project.getElementsByTagName("date").item(0).text))
	}
	
	//ADD TO SCROLL VIWE
	if (scrollView!=null) { win.remove(scrollView); }
		_createScrollableView(composedViews);
		win.add(scrollView);
	
	Titanium.App.Properties.setString("_FOCUSED_USER_URL", projectUserLinksCollection[0]);	
	Titanium.App.Properties.setString("_FOCUSED_PROJECT_URL", projectLinksCollection[0]);
	addPanels();
}


function setComposeView(_image, _project_title, _url, _user_name, _user_url, categories, _date) {
	var newView = Ti.UI.createView({
		backgroundColor:'#fff',
		touchEnabled:true
	});
	
	var project_titleLabel = Ti.UI.createLabel({
		color:'#009cec',
		font:{fontSize:20,fontWeight:'bold',fontFamily:'Helvetica'},
		textAlign: 'center',
		width:300,
		height:'auto',
		top:40
	});
	project_titleLabel.text = _project_title.toUpperCase();
	
	var project_dateLabel = Ti.UI.createLabel({
		color:'#000',
		font:{fontSize:36,fontWeight:'normal',fontFamily:'Helvetica Neue'},
		width:'auto',
		height:'auto',
		top:254
	});
	project_dateLabel.text = _date;
	
	newView.add(project_dateLabel);
	newView.add(project_titleLabel);
	
	var imageView = Ti.UI.createImageView({
		top:90,
		width:202,
		height:158,
		backgroundImage:'../../images/loader_202x158.png'
				
	});
	imageView.url = _image;
	
	imageView.addEventListener('click', function(e){
		Titanium.App.Properties.setString("_LINK_SHOW_PROJECT",Titanium.App.Properties.getString("_LINK_GALLERY")+_url);
		var project_show_window = Titanium.UI.createWindow({  
		    title:'Featured',
		    backgroundColor:'#fff',
			url: 'show.js'
		});
		project_show_window.open({modal:true});
	});
	
	/********/
	newView.addEventListener('touchmove', function(e) {
		Ti.API.info("DIRECTION " + e.x);
		/*switch(e.x)
		{
			case "left":
		  		if (i == 0) return;
				i--;
				scrollView.scrollToView(i);
			break;
			case "right":
				if (i == (scrollView.views.length-1)) return;
				i++;
				scrollView.scrollToView(scrollView.views[i]);
			break;
		}*/
	});
	
	newView.add(imageView);
	
	var user_nameView = Ti.UI.createLabel({
		color:'#000',
		font:{fontSize:18,fontWeight:'normal',fontFamily:'Helvetica Neue'},
		width:'auto',
		height:'auto',
		top: (_project_title.length > 18 ? 30 : 55),
		right:10
	});
	user_nameView.text = "by "+_user_name;
	newView.add(user_nameView);
	newView.add(_collectCategories(categories));
	
	return newView;
	//scrollView.addView(newView);
}

function _collectCategories(categories) {
	/* CATEGORIES CONTAINER */
	var categoriesView = Ti.UI.createView({
		backgroundColor:'#fff',
		top: 305,
		width: 'auto',
		height: 120
	});
	
	if (categories.getElementsByTagName("category").length > 0) {
		var parentTop = 0;
		
		for (var x = 0; x < categories.getElementsByTagName("category").length; x++) {
			
			var category = categories.getElementsByTagName("category").item(x)
			
			
			categoriesView.add(createCategoryButton(category, parentTop));
			parentTop+=36;
		}
		
	}
	return categoriesView;
}
function createCategoryButton(category, parentTop) {
	
	var ButtonCategory = Titanium.UI.createButton({
		top: parentTop,
		image:'../../images/button_pl_blue.png',
		backgroundSelectedImage: '../../images/button_pl_blue_e.png',
		width: 173,
		height: 26,
		title: category.getElementsByTagName("name").item(0).text,
		color:'#fff',
		font:{fontSize:18,fontWeight:'normal',fontFamily:'Helvetica Neue'}
	});
	
	ButtonCategory.addEventListener('click', function(e){
		titleLabel.text = category.getElementsByTagName("name").item(0).text;
	    apiClient.getCollection(Titanium.App.Properties.getString("_LINK_CATEGORIES")+"/"+category.getElementsByTagName("url").item(0).text+".xml", 'GET', win, parseResponse);
	});
	
	return ButtonCategory;
}
function _createScrollableView(views) {
    scrollView = Titanium.UI.createScrollableView({
	views:views,
	showPagingControl:true,
	pagingControlHeight:30,
	maxZoomScale:2.0,
	currentPage:0,
	zIndex:-10});
	scrollView.currentPage = 0;
	scrollView.addEventListener('scroll', function(e){
		//Ti.API.info("ERROR " + e.view.newView);
		Titanium.App.Properties.setString("_FOCUSED_USER_URL", projectUserLinksCollection[e.currentPage]);
		Titanium.App.Properties.setString("_FOCUSED_PROJECT_URL", projectLinksCollection[e.currentPage]);
	});
	
}

Titanium.include("../../shared/buttons_left_right.js");

/* ADD PANELS */
function addPanels() {
	setTitleLineStyle(titleLabel.text.length < 14 ? "default" : "mini");
	win.add(titleLine);
	win.add(toolbar);
	buttonsBar._init(titleLine, win, ["ButtonTopHand", "ButtonTopFvorite"]);
}
