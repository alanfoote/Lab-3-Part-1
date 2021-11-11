var map = L.map('map').setView([47.25, -122.44], 11);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/256/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 20,
    id: 'mapbox/dark-v10',
    accessToken: 'pk.eyJ1IjoiYWZvb3RlIiwiYSI6ImNrdm85a2NvdjZnNXMyb3Fwa3Nyb3NieGEifQ.z9saZUXAMQZ-OZ7w2iGaSg',
}).addTo(map);

var control = L.Routing.control({
          waypoints: [
              null
              //L.latLng(47.246587, -122.438830),
              //L.latLng(47.318017, -122.542970),
              //L.latLng(47.258024, -122.444725),
          ],
           routeWhileDragging: true,
           router: L.Routing.mapbox('pk.eyJ1IjoiYWZvb3RlIiwiYSI6ImNrdm85a2NvdjZnNXMyb3Fwa3Nyb3NieGEifQ.z9saZUXAMQZ-OZ7w2iGaSg'),
           units:'imperial',
           collapsible: true,
           geocoder: L.Control.Geocoder.photon('pk.eyJ1IjoiYWZvb3RlIiwiYSI6ImNrdm85a2NvdjZnNXMyb3Fwa3Nyb3NieGEifQ.z9saZUXAMQZ-OZ7w2iGaSg'),
}).addTo(map);

function createButton(label, container) {
    var btn = L.DomUtil.create('button', '', container);
    btn.setAttribute('type', 'button');
    btn.innerHTML = label;
    return btn;
}

map.on('click', function(e) {
    var container = L.DomUtil.create('div'),
        startBtn = createButton('Start', container),
        destBtn = createButton('End', container);

    L.popup()
        .setContent(container)
        .setLatLng(e.latlng)
        .openOn(map);
    L.DomEvent.on(startBtn, 'click', function() {
       control.spliceWaypoints(0, 1, e.latlng);
       map.closePopup();
        });
       L.DomEvent.on(destBtn, 'click', function() {
       control.spliceWaypoints(control.getWaypoints().length - 1, 1, e.latlng);
       control.show();
       map.closePopup();
  //Thanks, David//
      });
      L.Control.textbox = L.Control.extend({
		      onAdd: function(map) {

		          var text = L.DomUtil.create('div');
		            text.id = "info_text";
		              text.innerHTML = "<strong>Words on Paper</strong>"
                  return text;
		                },

		        onRemove: function(map) {
			// Nothing to do here
		      }
	       });
	   L.control.textbox = function(opts) { return new L.Control.textbox(opts);}
	    L.control.textbox({ position: 'bottomleft' }).addTo(map);
 });
