window.ArchiveOfOurClone = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  Utils: {},
  initialize: function() {
    ArchiveOfOurClone.Collections.baseCollection = new ArchiveOfOurClone.Collections.Stories()
    ArchiveOfOurClone.Collections.baseCollection.fetch({
      success: function(collection) {
        ArchiveOfOurClone.Routers.router = new ArchiveOfOurClone.Routers.Router({$rootEl: $("#main"), collection: collection})
        Backbone.history.start();
      }
    });
  },
}
