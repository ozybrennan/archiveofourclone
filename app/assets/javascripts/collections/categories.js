ArchiveOfOurClone.Collections.Categories = Backbone.Collection.extend({
  url: 'api/fandoms',

  model: ArchiveOfOurClone.Models.Category,

  parse: function(response){
    this.current_user = response.current_user;
    return response.categories;
  }

});
