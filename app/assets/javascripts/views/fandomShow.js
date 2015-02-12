ArchiveOfOurClone.Views.fandomShow = Backbone.View.extend({

  template: JST['fandomShow'],

  events: {
    'click button.top': "goToTop",
    'click a.fandom-list-name': "showFandom",
    'click a.fandom-index-link' : "fandomIndex",
  },

  initialize: function() {
    //this.model is not an instance of backbone model; it's an object
    this.model.fandom.sort(function(a, b){
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    })
    var alphabet = []
    _(this.model.fandom).each(function(fandom){
      alphabet.push(fandom.name[0]);
    });
    this.alphabet = _.uniq(alphabet);
  },

  render: function(){
    var content = this.template({category: this.model, alphabet: this.alphabet});
    this.$el.html(content);
    return this;
  },

  goToTop: function() {
    $('html, body').animate({ scrollTop: 0 }, 0);
  },

  showFandom: function(event){
    event.preventDefault();
    var url = "#search/created_at/1/fandom_name/" + $(event.currentTarget).text().trim();
    Backbone.history.navigate(url, {trigger: true});
  },

  fandomIndex: function(event){
    event.preventDefault();
    Backbone.history.navigate("fandoms", {trigger: true});
  },

})
