ArchiveOfOurClone.Collections.Stories = Backbone.Collection.extend({
  url: 'api/stories',

  model: ArchiveOfOurClone.Models.Story,

  comparator: 'created_at',

  initialize: function(models, options) {
    if (options) {
      this.tagURL = options.tagURL;
      this.criterionURL = options.criterionURL;
    } else {
      this.tagURL = "";
      this.criterionURL = "";
    }

    if (this.tagURL === "") {
      this.topTag = "the Archive";
    } else if (this.tagURL.indexOf("fandom_name") !== -1) {
      tags = this.tagURL.split("/");
      _(tags).each(function(tag, index){
        if (tag === "fandom_name") {
          this.topTag = tags[index + 1]
        }
      })
    } else {
      this.topTag = this.tagURL.split("/")[2];
    }
  },

  getOrFetch: function(id) {
    var that = this;
    var story = this.get(id);

    if (!story){
      story = new ArchiveOfOurClone.Models.Story({id: id})
      story.fetch({
        success: function() {
          that.add(story);
        }
      });
    } else {
      story.fetch();
    }
    return story;
  },

  find_comparator: function(){
    return this.comparator;
  },

  parse: function (response) {
    this.page = parseInt(response.page)
    this.total_works = parseInt(response.total_works)
    this.total_pages = parseInt(response.total_pages)
    return response.models;
  },

});
