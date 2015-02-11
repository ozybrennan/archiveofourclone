ArchiveOfOurClone.Views.searchSidebar = Backbone.View.extend({

  template: JST['searchSidebar'],

  tagName: 'form',

  events: {
    'click input.sort-and-filter': "submit",
    'blur input:not(.sort-and-filter)': 'addTag',
    'click button.tag-delete': 'deleteTag',
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
    var savedTags = $("form .tags-div")
    _(savedTags).each(function(obj){
      var $obj = $(obj)
      var type = $obj.attr("id");
      var tag_array = $obj.text().split(", ");
      _(tag_array).each(function(tag){
        if (tag !== "") {
          tag = tag.slice(1, tag.length);
          tags = tags + "/" + type + "/" + tag;
        }
      });
    });

    var url = "search/" + comparator + "/1" + tags
    Backbone.history.navigate(url, {trigger: true})
  },

  addTag: function(event) {
    var attributes = $(event.currentTarget).serializeJSON().tags;
    var key = Object.keys(attributes)[0]
    var divSelector = "div#" + key;
    var inputSelector = "input#" + key;
    var value = attributes[key]
    if (value) {
      var button = "<button class='tag-delete' data-id ='" + value + "'>X</button>"
      var tag = "<div class='" + value + "'>" + button + value + ", </div>"
      $(inputSelector).val('');
      $(divSelector).prepend(tag);
    }
  },

  deleteTag: function(event) {
    event.preventDefault();
    var tagSelector = "div." + $(event.currentTarget).data("id");
    $(tagSelector).remove();
  },

})
