Meteor.startup(function() {
  var stops = SANTA_STOPS;
  for(i=0; i < stops.length; i++) {
    var stop = stops[i],
    checkStop = Stops.findOne({"order": stop.order});
    if(!checkStop) {
      Stops.insert(stop);
    }
  }
  
  SyncedCron.options = {
    log: true,
    collectionName: 'santaSchedule',
    utc: true
  }
  
  SyncedCron.add({
    name: 'start_santa_present_delivery',
    schedule: function(parser) {
      return parser.recur().on(2).month().on(22).dayOfMonth().on('08:30:00').time();
    },
    job: function() {
      Meteor.call('startPresentDelivery');
    }
  });
  
  SyncedCron.start();
});