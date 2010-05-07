var win = Titanium.UI.currentWindow;
Titanium.include("../../shared/api_client.js");
Titanium.include("../../shared/title_line.js");
setTitleLineStyle("default");
titleLabel.text = Titanium.App.Properties.getString("_TITLE_FAVORITES");
var ScrollViewFavoritesContainer = null;

function favorite(top, left, favoriteXML){
	var ViewFavoriteBar = Titanium.UI.createView({
		top: top,
		left: left,
		width:140,
		height: 140
	});
	
	var ImageCover = Ti.UI.createImageView({
		width:140,
		height:140,
		url: favoriteXML.getElementsByTagName("cover_src").item(0).text,
		backgroundImage:'../../images/loader_140x140.png'
	});
	
	var ViewLabelBG = Titanium.UI.createView({
		bottom:0,
		width:140,
		height: 40,
		backgroundColor:'#fff',
		opacity:0.7
	});
	
	var LabelTitle = Ti.UI.createLabel({
		color:'#009cec',
		font:{fontSize:12,fontWeight:'bold',fontFamily:'Helvetica Neue'},
		width:130,
		height:35,
		top:105,
		left:5,
		text: favoriteXML.getElementsByTagName("title").item(0).text
	});
	
	var ButtonDeleteFav = Titanium.UI.createButton({
		top:5,
		right:5,
		image:'../../images/button_pl_del.png',
		backgroundSelectedImage: '../../images/button_pl_del_e.png',
		width: 26,
		height: 16
	});
	
	var lelements = [ImageCover, ViewLabelBG, LabelTitle, ButtonDeleteFav];
	
	for (var i=0;i<lelements.length;i++) {
		ViewFavoriteBar.add(lelements[i]);
	}
	
	ButtonDeleteFav.addEventListener('click', function(e){
		apiClient.localizeEvents('favorite_destroyed', null);
		apiClient.destroyFavorite(Titanium.App.Properties.getString("_LINK_REST_FAVORITES")+"/"+favoriteXML.getElementsByTagName("id").item(0).text+"?behance_user="+Titanium.Platform.macaddress+"", win);
	});
	
	ImageCover.addEventListener('click', function(e){
		Titanium.App.Properties.setString("_LINK_SHOW_PROJECT",Titanium.App.Properties.getString("_LINK_GALLERY")+favoriteXML.getElementsByTagName("url").item(0).text+".xml");
		var project_show_window = Titanium.UI.createWindow({  
		    title:'Featured',
		    backgroundColor:'#fff',
			url: '../projects/show.js'
		});
		project_show_window.open({modal:true});
	});

	return ViewFavoriteBar;
}

var LabelNoFavorites = Ti.UI.createLabel({
	color:'#000',
	font:{fontSize:14,fontWeight:'normal',fontFamily:'Helvetica Neue'},
	height:'auto',
	top:100,
	text: 'No favorites here...'
});
function createScrollViewFavoritesContainer() {

if (ScrollViewFavoritesContainer!=null) {win.remove(ScrollViewFavoritesContainer)}

 	ScrollViewFavoritesContainer = Titanium.UI.createScrollView({
    contentWidth:'auto',
    contentHeight:'auto',
    top:30,
	width:300,
	showVerticalScrollIndicator:false,
    showHorizontalScrollIndicator:false
});
}

function favorites_init() {
	apiClient.getCollection(Titanium.App.Properties.getString("_LINK_REST_FAVORITES")+".xml"+"?behance_user="+Titanium.Platform.macaddress+"", 'GET', win, parseResponse);
}
favorites_init();
win.addEventListener('favorite_destroyed', function(e){
	favorites_init();
});

function parseResponse(rxml) {
	createScrollViewFavoritesContainer()
	
	var _top = 5;
	var _left = 5;
	var composedViews = [];
	var favoriteXML = rxml.getElementsByTagName("favorite");
	
	for (var i=0;i<favoriteXML.length;i++) {
		_left = (i%2==0) ? 5 : 155;
		_top+=(i%2==0 && i > 1) ? 150 : 0;
		//Ti.API.info("LEFT " + _left+"---"+_top);
		var _complete_favorite = favorite(_top, _left, favoriteXML.item(i));
		
		ScrollViewFavoritesContainer.add(_complete_favorite);
		
		
	} 
	
	addPanel();
	
	(favoriteXML.length > 0) ? win.add(ScrollViewFavoritesContainer) : win.add(LabelNoFavorites);
}

function addPanel() {
	win.add(titleLine);
}