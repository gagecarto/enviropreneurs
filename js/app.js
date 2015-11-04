$(document).ready(function() {
    mapInit();
    uiInit();
});

var projectsLayer;

function mapInit(){
	L.mapbox.accessToken = 'pk.eyJ1IjoiZW52aXJvcHJlbmV1cnMiLCJhIjoiY2lleWVuOWFtMGdicnM2bTAyZGtmMGd5dSJ9.-4bPr9T-xVLvszLWXEdhaQ';
	
	var map = L.mapbox.map('map', 'enviropreneurs.432d30f2')
		.setView([40, -74.50], 9)	

	projectsLayer = L.mapbox.featureLayer().addTo(map);

	projectsLayer.setGeoJSON(projectData);

	map.fitBounds(projectsLayer.getBounds());

	bindPopups();

	function bindPopups(){
		projectsLayer.eachLayer(function(layer) {
			console.log(layer.feature.properties);

			var content='<div class="popupHeaderClass"><span class="popupMainTitle">'+layer.feature.properties.firstName+' '+layer.feature.properties.lastName+'<\/span><br>'+
			            '<span class="popupSubTitle">'+layer.feature.properties.name+'<\/span><br>'+
			            '<span class="popupHeadText">'+layer.feature.properties.type+'<\/span></div>';

			if(layer.feature.properties.image.length>1){
				content+='<img src="'+layer.feature.properties.image+'" style="width:50%; height:auto; float:left; margin-right:15px;">'
			}			

			content+='<div class="popupText">'+layer.feature.properties.description+'</div>';					

			if(layer.feature.properties.url.length>1){
				content+='<a href="'+layer.feature.properties.url+'" target="_blank" class="linkClass">     VIEW PROJECT PAGE</a><br>'
			}

			if(layer.feature.properties.video.length>1){
				content+='<iframe src="http://www.youtube.com/embed/'+layer.feature.properties.youTubeId+'" width="100%" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>'
			}

			

			//console.log(content);

			layer.bindPopup(content);
		});
	}

	function toggleLayers(layerToToggle){		
		projectsLayer.setFilter(function(feature) {      
	      if(layerToToggle=='all'){
	      	return (feature);
	      }
	      else{
	      	return (feature.properties.type == layerToToggle);
	      }	      
	    });
	    bindPopups();	   	
	}
	/*
	UI INITS
	*/		
	$('#modalCloseButton').click(function() {
	    $('#modalWelcome').fadeOut();
	    $('#modal').fadeOut();
	});

	var toggledButton='all';

	$('.layerToggleButton').click(function() {
	    $('#'+toggledButton+'').removeClass('toggled');      
	    toggledButton=this.id;
	    $(this).addClass('toggled');      
	    toggleLayers(this.id);
	});	
////end init/////
}




