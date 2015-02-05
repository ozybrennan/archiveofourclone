ArchiveOfOurClone.Views.searchSidebar = Backbone.SearchView.extend({

  template: JST['searchSidebar'],

  tagName: 'form',

  events: {
    'submit': 'submit'
  },

  render: function(){
    var content = this.template({search_default: this.collection.find_comparator()})
    this.$el.html(content);
    return this;
  },

  submit: function(){
    event.preventDefault();
    var attributes = $(event.currentTarget).serializeJSON();

    var comparator = attributes.sort_criterion

    var tags = ""
    _(attributes.tags).each(function(tag, type){
      tags = tags + "/" + tag + "/" + "type"
    }.bind(this));

    var url = "search/" + comparator + "/" + tags
    Backbone.navigate(url, {trigger: true})
  },

})
