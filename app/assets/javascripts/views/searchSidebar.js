ArchiveOfOurClone.Views.searchSidebar = Backbone.View.extend({

  template: JST['searchSidebar'],

  tagName: 'form',

  events: {
    'submit': 'submit'
  },

  render: function(){
    var content = this.template()
    this.$el.html(content);
    return this;
  },

  submit: function(event) {
    event.preventDefault();
    var attributes = $(event.currentTarget).serializeJSON();
    var url = "search/" + attributes.sort_criterion
    Backbone.history.navigate(url, { trigger: true })
  },

})
