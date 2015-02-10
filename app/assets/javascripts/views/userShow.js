ArchiveOfOurClone.Views.userShow = Backbone.CompositeView.extend({

  template: JST['userShow'],

  initialize: function(){
    _(this.model.get("stories")).each(function(story){
      var model = new ArchiveOfOurClone.Models.Story(story);
      var indexItem = new ArchiveOfOurClone.Views.storyIndexItem({ model: model, currentUser: this.model.get("current_user")})
      this.addSubview(".works", indexItem);
      this.listenTo(model, "remove", this.render);
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

})
