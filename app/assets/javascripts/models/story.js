ArchiveOfOurClone.Models.Story = Backbone.Model.extend({
  urlRoot: 'api/stories',

  initialize: function (attributes) {
    var that = this;

    if (attributes.author) {
      this.set({author_name: [attributes.author.username]});
    }
    if (attributes.fandom) {
      this.set({fandom_name: [attributes.fandom.name]});
    }
    if (attributes.tags) {
      _(attributes.tags).each(function(tag){
        if (!that.get(tag.category)) {
          that.set(tag.category, [tag.label]);
        } else {
          that.get(tag.category).push(tag.label);
        }
      })
    }
  },

})
