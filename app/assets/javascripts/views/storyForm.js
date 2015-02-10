ArchiveOfOurClone.Views.storyForm = Backbone.View.extend({

  template: JST['storyForm'],

  events: {
    'submit': 'submit',
    'blur input.freeform-tags': 'addTag',
    'click button.tag-delete': 'deleteTag',
  },

  initialize: function () {
    if (!this.model) {
      this.model = new ArchiveOfOurClone.Models.Story();
    }
  },

  render: function(){
    var content = this.template({story: this.model})
    this.$el.html(content);
    return this;
  },

  submit: function(event) {
    event.preventDefault();
    var attributes = $(event.currentTarget).serializeJSON();
    this.model.save(attributes, {
      success: function(model) {
        debugger
        Backbone.history.navigate("#stories/" + model.id, {trigger: true})
      },
      error: function(model, response) {
        debugger
      }
    });
  },

  addTag: function(event) {
    var attributes = $(event.currentTarget).serializeJSON().story;
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
