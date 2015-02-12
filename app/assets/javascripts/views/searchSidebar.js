ArchiveOfOurClone.Views.searchSidebar = Backbone.View.extend({

  template: JST['searchSidebar'],

  tagName: 'form',

  events: {
    'click input.sort-and-filter': "submit",
    'autocompletechange input.add-tag': 'addTag',
    'click button.tag-delete': 'deleteTag',
  },

  initialize: function(){
    this.topTags = {};
    this.calculateTopTags("Characters");
    this.calculateTopTags("Relationships");
    this.calculateTopTags("Additional");
  },

  render: function(){
    var that = this;

    var search_default = this.collection.findComparator();
    var content = this.template({search_default: search_default, topTags: this.topTags});
    this.$el.html(content);

    this.$el.find( "#autocomplete").autocomplete({
      source: function( request, response) {
        var matcher = new RegExp( "^" + $.ui.autocomplete.escapeRegex( request.term ), "i" );
        response( $.grep( that.allTags, function( item ){
          return matcher.test( item );
        }) );
      },
      change: this.addTag
    });

    return this;
  },

  submit: function(){
    event.preventDefault();
    var attributes = $(event.currentTarget).serializeJSON();

    var comparator = attributes.sort_criterion

    var tags = ""
    var $savedTags = $("form .tags-div")
    var tag_array = $savedTags.text().split(", ");
    _(tag_array).each(function(tag){
      if (tag !== "") {
        tag = tag.slice(1, tag.length);
        tags = tags + "/all/" + tag;
      }
    });

    _(attributes.tags).each(function(tag_array, type) {
      _(tag_array).each(function(tag) {
        if (tag !== "all") {
          tags = tags + "/" + type + "/" + tag;
        }
      });
    });

    tags = tags.slice(1)


    this.collection.set({tagURL: tags, criterionURL: "#search/" + comparator})
    this.collection.fetch({
      data: { page: 1, tags: tags, sortCriterion: comparator }
    });
  },

  addTag: function(event) {
    debugger
    var tag = $(event.currentTarget).serializeJSON().otherTags;
    if (tag) {
      var button = "<button class='tag-delete' data-id ='" + tag.replace(/ /g, "-") + "'>X</button>"
      var tag = "<div class='" +  tag.replace(/ /g, "-") + "'>" + button + tag + ", </div>"
      $('input#autocomplete').val('');
      $('div.tags-div').prepend(tag);
    }
  },

  deleteTag: function(event) {
    event.preventDefault();
    var tagSelector = "div." + $(event.currentTarget).data("id");
    $(tagSelector).remove();
  },

  calculateTopTags: function(type) {
    var tags = [];
    var allTags = [];
    _(this.collection.models).each(function(model) {
      _(model.get(type)).each(function (tag) {
        var notPresent = true;
        for (var i = 0; i < tags.length; i++) {
          if (tags[i][0] === tag){
            notPresent = false;
            tags[i][1] += 1;
          }
        };
        if (notPresent) {
          tags.push([tag, 1]);
          allTags.push(tag);
        }
      });
    });

    var sortedTags = tags.sort(function(a, b){
      if (a[1] > b[1]){
        return -1;
      }
      if (a[1] < b[1]){
        return 1;
      }
      return 0;
    });
    this.topTags[type] = sortedTags.slice(0, 5);
    this.allTags = allTags
  },

})
