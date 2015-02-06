ArchiveOfOurClone.Views.fandomIndexItem = Backbone.View.extend({

  template: JST['fandomIndexItem'],

  className: "index-fandom-box",

  events: {
    'click a.fandom-list-name' : 'showFandom',
    'click a.category-list-name' : 'showCategory'
  },

  initialize: function() {
    this.model.fandom.sort(function(a, b) {
      if (a.story_count > b.story_count) {
        return -1;
      }
      if (a.story_count < b.story_count) {
        return 1;
      }
      return 0;
    })
  },

  render: function(){
    var content = this.template({category: this.model})
    this.$el.html(content);
    return this;
  },

  showFandom: function(event){
    event.preventDefault();
    var url = "#search/created_at/fandom_name/" + $(event.currentTarget).text().trim();
    Backbone.history.navigate(url, {trigger: true});
  },

  showCategory: function(event){
    event.preventDefault();
    var url = "fandoms/" + $(event.currentTarget).text().trim();
    Backbone.history.navigate(url, {trigger: true});
  },

})
