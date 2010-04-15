// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.include("defines.js");
Defines._init();

Titanium.UI.setBackgroundColor('#fff');

var project_index_window = Titanium.UI.createWindow({  
    title:'Featured',
    backgroundImage:'images/bg.png',
	url: 'controllers/projects/index.js'
});



project_index_window.open();