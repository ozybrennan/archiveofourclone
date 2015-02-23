window.ArchiveOfOurClone = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  Utils: {},
  initialize: function() {
      var categories = new ArchiveOfOurClone.Collections.Categories();
      categories.fetch({
        success: function(categories){
          var view = new ArchiveOfOurClone.Views.navbar({collection: categories});
          $("div#navbar").html(view.render().el);
        },
      });
      ArchiveOfOurClone.Collections.baseCollection = new ArchiveOfOurClone.Collections.Stories
      ArchiveOfOurClone.Routers.router = new ArchiveOfOurClone.Routers.Router({$rootEl: $("#main")})
      Backbone.history.start();
  },
}
