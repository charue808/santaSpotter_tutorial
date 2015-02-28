Template.santaMap.rendered = function() {
  var setSantaLocation = function(latitude, longitude) {
    var location = L.latLng(latitude, longitude);
    
    map.panTo(location);
    
    marker.setLatLng(location)
  }
  
  var loadDefaultData = function() {
    Tracker.autorun(function() {
      var currentLocation = Stops.findOne({"current": true}, {fields: {"longitude": 1, "latitude": 1}});
        if (currentLocation) {
          Meteor.setTimeout(function() {
            setSantaLocation(currentLocation.latitude, currentLocation.longitude);
          }, 500);
        }
    });
  }
  
  L.mapbox.accessToken = "pk.eyJ1IjoiY2hhcnVlODA4IiwiYSI6Imc4bEFXckUifQ.u2cNDMALN7keLePhGmPvFg";
  
  var map = L.mapbox.map('map', 'charue808.l8o58dnb', {
    zoom: 3,
    minZoom: 3,
    maxZoom: 6
  }).on('ready', loadDefaultData());
  
  var santaIcon = L.icon({
    iconUrl: '/santa-marker.svg',
    iconSize: [48, 48]
  });
  
  var marker = L.marker([0, 0], {
    icon: santaIcon
  }).addTo(map);
  
}


Template.santaMap.helpers({
  isNorthPole: function() {
    var getLocation = Stops.findOne({"current": true}, {fields: {"name": 1, "current":1, "order":1}});
    if (getLocation.name === "The North Pole" && getLocation.order === 1) {
      Session.set('isSantaFinished', false);
      return true;
    } else if (getLocation.name === "The North Pole" && getLocation.order === 333) {
      Session.set('isSantaFinished', true);
      return true;
    } else {
      return false;
    }
  },
  
  isSantaFinished: function() {
    return Session.get('isSantaFinished');
  }
});