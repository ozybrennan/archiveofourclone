ArchiveOfOurClone.Views.storyForm = Backbone.View.extend({

  template: JST['storyForm'],

  events: {
    'submit form.story-form': 'submit',
    'blur input.freeform-tags': 'addTag',
    'click button.tag-delete': 'deleteTag',
  },

  initialize: function () {
    if (!this.model) {
      this.model = new ArchiveOfOurClone.Models.Story();
    }
    this.listenTo(this.model, "sync", this.render);
    $("#filepicker-text").on("fileLoaded", this.readFile);
  },

  render: function(){
    var that = this;
    var content = this.template({story: this.model})
    this.$el.html(content);
    var element = this.$el.find("#filepicker-text")
    filepicker.constructWidget(element);
    return this;
  },

  submit: function(event) {
    event.preventDefault();
    var attributes = $(event.currentTarget).serializeJSON();

    attributes["story"]["ratings"] = [attributes["story"]["ratings"]]
    attributes["story"]["categories"] =[attributes["story"]["categories"]]

    if (attributes["story"]["filepicker-url"]) {
      filepicker.read(attributes["story"]["filepicker-url"], {asText: true}, function(data) {
        debugger
        attributes["story"]["text"].push(data);
        this.finishSubmit(attributes)
      }.bind(this))
    } else {
      this.finishSubmit(attributes);
    }
  },

  finishSubmit: function(attributes) {
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

    this.model.save(attributes, {
      success: function(model) {
        Backbone.history.navigate("#stories/" + model.id, {trigger: true})
      },
      error: function(model, response) {
        $("div.errors").html("<ul class='errors'></ul>")
        _(response.responseJSON).each(function(error){
          $("ul.errors").append("<li>" + error + "</li>")
        })
      }
    })
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
