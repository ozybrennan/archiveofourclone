ArchiveOfOurClone.Collections.Categories = Backbone.Collection.extend({
  url: 'api/fandoms',

  model: ArchiveOfOurClone.Models.Category,

  parse: function(response){
    return response.categories; 
  }

});
