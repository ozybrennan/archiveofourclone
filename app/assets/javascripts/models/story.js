ArchiveOfOurClone.Models.Story = Backbone.Model.extend({
  urlRoot: 'api/stories',

  initialize: function (attributes) {
    if (attributes.author) {
      this.set({author_name: attributes.author.username});
    }
    if (attributes.fandom) {
      this.set({fandom_name: attributes.fandom.name});
    }
  },
})
