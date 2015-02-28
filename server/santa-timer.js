Meteor.methods({
  startPresentDelivery: function() {
    SyncedCron.add({
      name: 'Deliver Presents',
      schedule: function(parser) {
        return parser.text('every 5 min');
      },
      job: function() {
        Meteor.call('updateSantaLocation');
      }
    });
  }
});


Meteor.methods({
  updateSantaLocation: function() {
    var currentStop = Stops.findOne({"current": true}),
        csIndex     = currentStop.order,
        nextStop    = Stops.findOne({"order": csIndex + 1});
    
    if (nextStop) {
      Stops.update(currentStop._id, {
        $set: {
          "current": false
        }
      }, function(error) {
        if (error) {
          console.log(error);
        }
      });
      
      Stops.update(nextStop._id, {
        $set: {
          "current": true
        }
      }, function(error) {
        console.log(error);
      });
    } else {
      SyncedCron.remove('Deliver Presents');
    }
  }
});