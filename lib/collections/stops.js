Stops = new Meteor.Collection('stops');

Stops.allow({
  insert: function() {
    return false;
  },
  
  update: function() {
    return false;
  },
  
  remove: function() {
    return false;
  }
});