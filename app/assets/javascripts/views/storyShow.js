ArchiveOfOurClone.Views.storyShow = Backbone.View.extend({

  template: JST['storyShow'],

  events: {
    'click button.top': 'goToTop',
    'click a.search-link': 'showTag',
    'click a.author-link': 'showUser',
    'click button.kudos': 'leaveKudos',
    'click button.unkudos': 'unkudos'
  },

  initialize: function () {
    this.listenTo(this.model, "sync", this.render);

    this.hit = true;

    var text = this.model.escape("text").replace("<p>", "<p>");
    this.model.set("text", text);
  },

  render: function(){
    if (this.model.get("hits") && this.hit) {
        this.hit = false
        var hits = this.model.get("hits") + 1
        this.model.save({hits: hits})
    }
    var content = this.template({story: this.model})
    this.$el.html(content);
    var $section = this.$el.children("section.row")
    $section.prepend(this.factBoxSection("Additional Tag", "Additional"))
    $section.prepend(this.factBoxSection("Character", "Characters"))
    $section.prepend(this.factBoxSection("Relationship", "Relationships"))
    $section.prepend(this.fandomSection())
    $section.prepend(this.factBoxSection("Archive Warning", "Warnings"))
    $section.prepend(this.factBoxSection("Rating", "Ratings"))
    return this;
  },

  goToTop: function() {
    $('html, body').animate({ scrollTop: 0 }, 0);
  },

  leaveKudos: function(event){
    event.preventDefault();
    var that = this;
    var kudos = this.model.get("kudos") + 1;
    var button = $(event.currentTarget)
    button.hide("explode", 500, function(){
      button.removeClass("kudos").addClass("unkudos").html("Remove Kudos");
      button.show("explode", 500, function(){
        that.model.save({kudos_count: kudos});
      })
    })
  },

  unkudos: function(event){
    event.preventDefault();
    var that = this;
    var kudos = this.model.get("kudos") - 1;
    var button = $(event.currentTarget)
    button.hide("explode", 500, function(){
      button.removeClass("unkudos").addClass("kudos").html("Kudos <3");
      button.show("explode", 500, function(){
        that.model.save({kudos_count: kudos});
      })
    })
  },

  showTag: function(event){
    event.preventDefault();
    var $target = $(event.currentTarget)
    var searchClass = $target.attr("class").split(" ")[1];
    var url = "#search/created_at/1/" + searchClass + "/" + $target.text().trim();
    Backbone.history.navigate(url, {trigger: true});
  },

  showUser : function(event) {
    event.preventDefault();
    var url = "#users/" + $(event.currentTarget).data("id")
    Backbone.history.navigate(url, {trigger: true})
  },

  factBoxSection : function(name, type) {
    if (this.model.get(type) && this.model.get(type)[0] !== null) {
      var tags = this.model.get(type);
      if (this.model.get(type).length > 1) {
        name = name + "s"
      }
      var $name = $("<div>").addClass("col-xs-4").html(name)
      var $tags = $("<div>").addClass("col-xs-8")
      _(tags).each(function(tag){
        var $tag = $("<a>").addClass("search-link").addClass(type)
        $tag.attr("href", "javascript:void(0)")
        $tag.html(tag + ", ")
        $tags.append($tag)
      });
      var section = $("<div>").append($name).append($tags);
      return section;
    }
  },

  fandomSection : function(){
    if (this.model.get("fandom_name")) {
      var $name = $("<div>").addClass("col-xs-4").html("Fandom")
      var $tags = $("<div>").addClass("col-xs-8")
      var $tag = $("<a>").addClass("search-link").addClass("fandom")
      $tag.attr("href", "javascript:void(0)")
      $tag.html(this.model.get("fandom_name"))
      $tags.append($tag)
      var section = $("<div>").append($name).append($tags);
      return section;
    }
  }

})
