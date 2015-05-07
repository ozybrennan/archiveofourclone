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

})
