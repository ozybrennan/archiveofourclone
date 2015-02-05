Backbone.SearchView = Backbone.View.extend({

  submitSearch: function(event) {
    event.preventDefault();
    var attributes = $(event.currentTarget).serializeJSON();

    var comparator = attributes.sort_criterion

    var models = ArchiveOfOurClone.Collections.baseCollection.models;
    this.collection = new ArchiveOfOurClone.Collections.Stories(models,
      { comparator: comparator })

    _(attributes.tags).each(function(tag, type){
      this.filterCollection(tag, type);
    }.bind(this));

  },

  filterCollection: function(tag, type){
    var iteration_collection = this.collection.clone();
    iteration_collection.each(function(model){
      if (model.get(type) !== tag) {
        this.collection.remove(model);
      }
    }.bind(this));
  },

})
