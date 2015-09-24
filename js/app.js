$(document).ready(function() {
    initialize();
});


function initialize(){
	L.mapbox.accessToken = 'pk.eyJ1IjoiZW52aXJvcHJlbmV1cnMiLCJhIjoiY2lleWVuOWFtMGdicnM2bTAyZGtmMGd5dSJ9.-4bPr9T-xVLvszLWXEdhaQ';
	
	var map = L.mapbox.map('map', 'enviropreneurs.432d30f2')
		.setView([40, -74.50], 9)	

	var projectsLayers = L.mapbox.featureLayer().addTo(map);

	projectsLayers.setGeoJSON(projectData);

	map.fitBounds(projectsLayers.getBounds());

	projectsLayers.eachLayer(function(layer) {
		console.log(layer.feature.properties);

		var content='<div class="popupHeaderClass"><span>'+layer.feature.properties.firstName+' '+layer.feature.properties.lastName+'<\/span><br>'+
		            '<span>'+layer.feature.properties.name+'<\/span><br>'+
		            '<span>'+layer.feature.properties.type+'<\/span></div><br>';

		if(layer.feature.properties.image.length>1){
			content+='<img src="'+layer.feature.properties.image+'" style="width:50%; height:auto; float:left; margin-right:15px;">'
		}


		content+='<p>'+layer.feature.properties.description+'</p>';		

		if(layer.feature.properties.video.length>1){
			content+='<iframe src="http://www.youtube.com/embed/'+layer.feature.properties.youTubeId+'" width="100%" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>'
		}

		//console.log(content);

		layer.bindPopup(content);
	});



////end init/////
}

/*
featureLayer.eachLayer(function(layer) {

    // here you call `bindPopup` with a string of HTML you create - the feature
    // properties declared above are available under `layer.feature.properties`
    var content = '<h2>A ferry ride!<\/h2>' +
        '<p>From: ' + layer.feature.properties.from + '<br \/>' +
        'to: ' + layer.feature.properties.to + '<\/p>';
    layer.bindPopup(content);
});

*/