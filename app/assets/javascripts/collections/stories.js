ArchiveOfOurClone.Collections.Stories = Backbone.Collection.extend({
  url: 'api/stories',

  model: ArchiveOfOurClone.Models.Story,

  comparator: 'created_at',

  initialize: function(models, options) {
  },

  getOrFetch: function(id) {
    var that = this;
    var story = this.get(id);

    if (!story){
      story = new ArchiveOfOurClone.Models.Story({id: id})
      story.fetch({
        success: function() {
          that.add(story);
        }
      });
    } else {
      story.fetch();
    }
    return story;
  },

  find_comparator: function(){
    return this.comparator;
  },

  parse: function (response) {
    this.page = response.page
    this.total_pages = response.total_pages
    return response.models;
  },

});
