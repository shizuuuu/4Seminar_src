var map;
var currentInfoWindow = null;

var place_cafe = [], place_famires = [], place_hamburger = [], place_karaoke = [], place_netcafe = []; place_all = [];
var markers_cafe = [], markers_famires = [], markers_hamburger = [], markers_karaoke = [], markers_netcafe = []; markers_all = [];

function createData(results) {
  for (let i in results) {
    a = {};
    a['name'] = results[i].name;
    a['lat'] = results[i].geometry.location.lat;
    a['lng'] = results[i].geometry.location.lng;
    a['price'] = results[i].price;
    a['url'] = results[i].url;

    place_all.push(a);

    switch(results[i]['shop']) {
      case "cafe":
        place_cafe.push(a);
        break;
      case "famires":
        place_famires.push(a);
        break;
      case "hamburger":
        place_hamburger.push(a);
        break;
      case "karaoke":
        place_karaoke.push(a);
        break;
      case "netcafe":
        place_netcafe.push(a);
        break;
    }
  } 
}

function createMarker(i, place, markers) {
  var marker = new google.maps.Marker({
    position: { lat:place[i].lat, lng:place[i].lng },
    map: map,
    title: place[i].name,
  });

  markers.push(marker);
  markers_all.push(marker);

  var contentStr = '<div>' + place[i].name + '<br><a href=\'' + place[i].url + '\' target="_blank">Google検索</a></div>';

  var infoWindow = new google.maps.InfoWindow({
    content: contentStr,
  });

  google.maps.event.addListener(marker, 'click', function(){
    if(currentInfoWindow != null) {
      currentInfoWindow.close();
    }
    infoWindow.open(map, marker);
    currentInfoWindow = infoWindow;
  });
}



function cafe(n) {
    for (let i in place_cafe) {
      createMarker(i, place_cafe, markers_cafe);
    }
}

function famires() {
  for (let i in place_famires) {
    createMarker(i, place_famires, markers_famires);
  }
}

function hamburger() {
  for (let i in place_hamburger) {
    createMarker(i, place_hamburger, markers_hamburger);
  }
}

function karaoke() {
  for (let i in place_karaoke) {
    createMarker(i, place_karaoke, markers_karaoke);
  }
}

function netcafe() {
  for (let i in place_netcafe) {
    createMarker(i, place_netcafe, markers_netcafe);
  }
}

function initMap() {
  var target = document.getElementById('map');  
  var latlng = { lat: 35.69092, lng: 139.7002579 };
  map = new google.maps.Map(document.getElementById('map'), {
    center: latlng,
    zoom: 16
  });
  createData(shinjuku_data.results);
}
