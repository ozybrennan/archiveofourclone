window.ArchiveOfOurClone = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  Utils: {},
  initialize: function() {
    new ArchiveOfOurClone.Collections.Stories().fetch({
      success: function(collection) {
        new ArchiveOfOurClone.Routers.Router({$rootEl: $("#main"), collection: collection})
        Backbone.history.start();
      }
    });
  },
}
