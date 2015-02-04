ArchiveOfOurClone.Views.storyShow = Backbone.View.extend({

  template: JST['storyShow'],

  events: {
    'click button.top': 'goToTop'
  },

  initialize: function () {
    this.listenTo(this.model, "sync", this.render)
  },

  render: function(){
    var content = this.template({story: this.model})
    this.$el.html(content);
    return this;
  },

  goToTop: function() {
    $('html, body').animate({ scrollTop: 0 }, 0);
  },

})
