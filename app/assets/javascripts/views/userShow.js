ArchiveOfOurClone.Views.userShow = Backbone.CompositeView.extend({

  template: JST['userShow'],

  events: {
    'click a.fandom': 'goToFandom',
    'click button.delete-user': 'deleteUser'
  },

  initialize: function(){
    _(this.model.get("stories")).each(function(story){
      var model = new ArchiveOfOurClone.Models.Story(story);
      var indexItem = new ArchiveOfOurClone.Views.storyIndexItem({ model: model, user: this.model})
      this.addSubview(".works", indexItem);
      this.listenTo(model, "destroy", this.removeAndRender);
    }.bind(this));
    this.calculateTopFandoms();
  },

  render: function(){
    var content = this.template({user: this.model, fandoms: this.topFandoms})
    this.$el.html(content);
    this.attachSubviews();
    return this;
  },

  calculateTopFandoms: function() {
    var fandoms = [];
    _(this.model.get("stories")).each(function (story) {
      var notPresent = true;
      for (var i = 0; i < fandoms.length; i++) {
        if (fandoms[i][0] === story.fandom.name){
          notPresent = false
          fandoms[i][1] += 1;
        }
      };
      if (notPresent) {
        fandoms.push([story.fandom.name, 1])
      }
    });
    var sortedFandoms = fandoms.sort(function(a, b){
      if (a[1] > b[1]){
        return -1;
      }
      if (a[1] < b[1]){
        return 1;
      }
      return 0;
    });
    this.topFandoms = sortedFandoms.slice(0, 5);
  },

  removeAndRender: function() {
    Backbone.history.loadUrl();
  },

  goToFandom: function(event) {
    event.preventDefault();
    var url = "#search/created_at/1/fandom_name/" + $(event.currentTarget).text()
    Backbone.history.navigate(url, { trigger: true })
  },

  deleteUser: function(){
    this.model.destroy();
    Backbone.history.navigate("", {trigger: true})
  },

})
