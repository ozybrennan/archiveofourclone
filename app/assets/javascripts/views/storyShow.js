ArchiveOfOurClone.Views.storyShow = Backbone.View.extend({

  template: JST['storyShow'],

  events: {
    'click button.top': 'goToTop',
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
    var kudos = this.model.get("kudos") + 1;
    this.model.save({kudos_count: kudos});
  },

  unkudos: function(event){
    event.preventDefault();
    var kudos = this.model.get("kudos") - 1;
    this.model.save({kudos_count: kudos});
  }

})
