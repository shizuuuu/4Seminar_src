var map;
var currentInfoWindow = null;

var place_cafe = [], place_famires = [];
var markers_cafe = [], markers_famires = []; 

function createData(place, results) {
  for (let i=0; i<results.length; i++) {
    x = results[i].geometry.location;
    y = results[i].name;
    z = results[i].price_level;
    x["name"] = y;
    x["price"] = z;
    place.push(x);
  } 
  /*
  price:
  {
    i:
      lat: xxx
      lng: yyy
      name: "zzz"
      price: 0
  }
  */
}

function createMarker(map, i, place, markers) {
  var marker = new google.maps.Marker({
    position: { lat:place[i].lat, lng:place[i].lng },
    map: map,
    title: place[i].name,
  });

  markers.push(marker);

  var infoWindow = new google.maps.InfoWindow({
    content: place[i].name,
  });

  google.maps.event.addListener(marker, 'click', function(){
    if(currentInfoWindow != null) {
      currentInfoWindow.close();
    }
    infoWindow.open(map, marker);
    currentInfoWindow = infoWindow;
  });
}

function cafe(map) {
  for (var i=0; i<place_cafe.length; i++) {
    createMarker(map, i, place_cafe, markers_cafe);
  }
}

function famires(map) {
  for (var i=0; i<place_famires.length; i++) {
    createMarker(map, i, place_famires, markers_famires);
  }
}

function initMap() {
  var target = document.getElementById('map');  
  var latlng = { lat: 35.69092, lng: 139.7002579 };
  map = new google.maps.Map(document.getElementById('map'), {
    center: latlng,
    zoom: 16
  });
  createData(place_cafe, shinjuku_cafe.results);
  createData(place_famires, shinjuku_famires.results);
  cafe(map);
  famires(map);
}