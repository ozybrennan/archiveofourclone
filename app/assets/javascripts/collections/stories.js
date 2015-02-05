ArchiveOfOurClone.Collections.Stories = Backbone.Collection.extend({
  url: 'api/stories',

  model: ArchiveOfOurClone.Models.Story,

  initialize: function(models, options) {
    if (options && options.tags) {
      var tags = this.parseTags(options.tags);
      _(attributes.tags).each(function(tag, type){
        this.filterCollection(tag, type);
      }.bind(this));
    }
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

  filterCollection: function(tag, type){
    var iteration_collection = this.clone();
    iteration_collection.each(function(model){
      if (model.get(type) !== tag) {
        this.remove(model);
      }
    }.bind(this));
  },

});
