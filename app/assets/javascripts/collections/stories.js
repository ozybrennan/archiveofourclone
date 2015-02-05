ArchiveOfOurClone.Collections.Stories = Backbone.Collection.extend({
  url: 'api/stories',

  model: ArchiveOfOurClone.Models.Story,

  initialize: function(models, options) {
    if (options && options.tags) {
      this.tags = this.parseTags(options.tags);
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

  filterByTag: function(tags, type){
    var iteration_collection = this.clone();
    var that = this;
    iteration_collection.each(function(model){
      _(tags).each(function(tag){
        if (model.get(type) !== tag) {
          that.remove(model);
        }
      });
    });
  },

  parseTags: function(tags_string){
    var tags_arr = tags_string.split("/");
    var tags = {}
    for (var i = 0; i < tags_arr.length; i += 2) {
      var type = tags_arr[i]
      var tag = tags_arr[i + 1]
      if (tags[type]) {
        tags[type].push(tag)
      } else {
        tags[type] = [tag]
      }
    }
    return tags;
  },

  filterCollection: function () {
    _(this.tags).each(function(tags, type){
      this.filterByTag(tags, type);
    }.bind(this));
  },

});
