ArchiveOfOurClone.Models.Story = Backbone.Model.extend({
  urlRoot: 'api/stories',

  parse: function(attributes) {

    if (attributes.author) {
      attributes["author_name"] = attributes.author.username;
    }
    if (attributes.fandom) {
      attributes["fandom_name"] = attributes.fandom.name;
    }

    if (attributes.tags) {
      _(attributes.tags).each(function(tag){
        if (!attributes[tag.category]) {
          attributes[tag.category] = [tag.label];
        } else {
          attributes[tag.category].push(tag.label);
        }
      });
    }

    if (attributes.kudos_users) {
      var kudosUsers = []
      _(attributes.kudos_users).each(function(user){
        kudosUsers.push(user.username);
      });
      attributes["kudosUsers"] = kudosUsers;
    }
    return attributes
  },

})
