ArchiveOfOurClone.Views.storyForm = Backbone.View.extend({

  template: JST['storyForm'],

  events: {
    'submit form': 'submit',
    'blur input.freeform-tags': 'addTag',
    'click button.tag-delete': 'deleteTag',
  },

  initialize: function () {
    if (!this.model) {
      this.model = new ArchiveOfOurClone.Models.Story();
    }
    this.listenTo(this.model, "sync", this.render)
  },

  render: function(){
    var content = this.template({story: this.model})
    this.$el.html(content);
    var element = this.$el.find("#filepicker-text")
    element.type="filepicker-dragdrop";
    element.onchange = function(e){
      console.log(JSON.stringify(e.fpfile));
    };
    filepicker.constructWidget(element);
    return this;
  },

  submit: function(event) {
    event.preventDefault();
    var attributes = $(event.currentTarget).serializeJSON();

    attributes["story"]["ratings"] = [attributes["story"]["ratings"]]
    attributes["story"]["categories"] =[attributes["story"]["categories"]]

    var savedTags = $("form .tags-div")
    _(savedTags).each(function(obj){
      var $obj = $(obj)
      var type = $obj.attr("id");
      var tag_array = $obj.text().split(", ");
      attributes["story"][type] = [];
      _(tag_array).each(function(tag){
        if (tag !== "") {
          tag = tag.slice(1, tag.length);
          attributes["story"][type].push(tag);
        }
      });
    });
    debugger

    this.model.save(attributes, {
      success: function(model) {
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
