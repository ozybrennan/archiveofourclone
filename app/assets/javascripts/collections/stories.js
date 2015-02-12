ArchiveOfOurClone.Collections.Stories = Backbone.Collection.extend({
  url: 'api/stories',

  model: ArchiveOfOurClone.Models.Story,

  initialize: function(models, options) {
    var that = this;

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
          that.topTag = tags[index + 1]
        }
      })
    } else {
      topTag = this.tagURL.split("/")[2];
      this.topTag = topTag.charAt(0).toUpperCase() + topTag.slice(1);
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

  parse: function (response) {
    this.page = parseInt(response.page)
    this.total_works = parseInt(response.total_works)
    this.total_pages = parseInt(response.total_pages)
    return response.models;
  },

  findComparator: function() {
    return this.criterionURL.replace("#search/", "")
  }

});
