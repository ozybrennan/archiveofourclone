ArchiveOfOurClone.Collections.Users = Backbone.Collection.extend({
  url: 'users',

  model: ArchiveOfOurClone.Models.User,

  getOrFetch: function(id) {
    var that = this;
    var user = this.get(id);

    if (!user){
      user = new ArchiveOfOurClone.Models.User({id: id})
      user.fetch({
        success: function() {
          that.add(user);
        }
      });
    } else {
      user.fetch();
    }
    return user;
  }
});
