window.ArchiveOfOurClone = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  Utils: {},
  initialize: function() {
      ArchiveOfOurClone.navbarInitialize();
      ArchiveOfOurClone.Collections.baseCollection = new ArchiveOfOurClone.Collections.Stories
      ArchiveOfOurClone.Routers.router = new ArchiveOfOurClone.Routers.Router({$rootEl: $("#main")})
      Backbone.history.start();
  },
  navbarInitialize: function() {
    var categories = new ArchiveOfOurClone.Collections.Categories();
    categories.fetch({
      success: function(categories){
        var view = new ArchiveOfOurClone.Views.navbar({collection: categories});
        $("div#navbar").html(view.render().el);
      },
    });
  },
}
