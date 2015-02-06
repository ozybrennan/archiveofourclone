ArchiveOfOurClone.Views.searchSidebar = Backbone.SearchView.extend({

  template: JST['searchSidebar'],

  tagName: 'form',

  events: {
    'submit': 'submit',
    'blur input': 'addTag',
  },

  render: function(){
    var search_default = this.collection.find_comparator();
    var tags = this.collection.tags;
    var content = this.template({search_default: search_default, tags: tags});
    this.$el.html(content);
    return this;
  },

  submit: function(){
    event.preventDefault();
    var attributes = $(event.currentTarget).serializeJSON();

    var comparator = attributes.sort_criterion

    var tags = ""
    var savedTags = $("form div")
    _(savedTags).each(function(obj){
      var $obj = $(obj)
      var type = $obj.attr("id");
      var tag_array = $obj.text().split(", ");
      _(tag_array).each(function(tag){
        if (tag !== "") {
          tags = tags + "/" + type + "/" + tag;
        }
      });
    });

    var url = "search/" + comparator + tags
    Backbone.history.navigate(url, {trigger: true})
  },

  addTag: function(event) {
    var attributes = $(event.currentTarget).serializeJSON().tags;
    var key = Object.keys(attributes)[0]
    var divSelector = "div#" + key;
    var inputSelector = "input#" + key;
    var tag = attributes[key] + ", "
    $(inputSelector).val('');
    $(divSelector).prepend(tag);
  }

})
