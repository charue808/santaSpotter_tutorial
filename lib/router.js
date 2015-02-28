Router.configure({
  notFoundTemplate: 'notFound',
  layoutTemplate: 'layoutDefault'
});

Router.route('index', {
  path: '/',
  template: 'santaTracker',
  waitOn: function() {
    return Meteor.subscribe('santaStops');
  }
});