ArchiveOfOurClone.Collections.Stories = Backbone.Collection.extend({
  url: 'api/stories',

  model: ArchiveOfOurClone.Models.Story,

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
  }
});
