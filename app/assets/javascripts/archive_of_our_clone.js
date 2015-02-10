window.ArchiveOfOurClone = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  Utils: {},
  initialize: function() {
      ArchiveOfOurClone.Collections.baseCollection = new ArchiveOfOurClone.Collections.Stories
      ArchiveOfOurClone.Routers.router = new ArchiveOfOurClone.Routers.Router({$rootEl: $("#main")})
      Backbone.history.start();
  },
}
