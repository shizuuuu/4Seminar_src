var map;
var currentInfoWindow = null;
var markers = [];

// cafe
xlist = shinjuku_cafe.results;
var place_cafe = [];
for (let i=0; i<xlist.length; i++) {
  x = shinjuku_cafe.results[i].geometry.location;
  y = shinjuku_cafe.results[i].name;
  z = shinjuku_cafe.results[i].price_level;
  x["name"] = y;
  x["price"] = z;
  place_cafe.push(x);
  /*
  price_cafe:
  {
    i:
      lat: xxx
      lng: yyy
      name: "zzz"
      price: 0
  }
  */
}

function cafe(map) {
  for (var i=0; i<place_cafe.length; i++) {
    createMarker(map, i)
  }
}

function createMarker(map, i) {
  var marker = new google.maps.Marker({
    position: { lat:place_cafe[i].lat, lng:place_cafe[i].lng },
    map: map,
    title: place_cafe[i].name,
  });

  markers.push(marker);

  var infoWindow = new google.maps.InfoWindow({
    content: place_cafe[i].name,
  });

  google.maps.event.addListener(marker, 'click', function(){
    if(currentInfoWindow != null) {
      currentInfoWindow.close();
    }
    infoWindow.open(map, marker);
    currentInfoWindow = infoWindow;
  });
}

function initMap() {
  var target = document.getElementById('map');  
  var latlng = { lat: 35.69092, lng: 139.7002579 };
  map = new google.maps.Map(document.getElementById('map'), {
    center: latlng,
    zoom: 16
  });
  cafe(map);
  console.log(markers);
}