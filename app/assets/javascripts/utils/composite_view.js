Backbone.CompositeView = Backbone.View.extend({
  addSubview: function (selector, subview) {
    this.subviews(selector).push(subview);
    this.attachSubview(selector, subview.render());
  },

  attachSubview: function (selector, subview) {
    this.$(selector).append(subview.render().$el)
    subview.delegateEvents();

    if (subview.attachSubviews){
      subview.attachSubviews();
    }
  },

  attachSubviews: function() {
    var view = this;
    _(this.subviews()).each(function (subviews, selector){
      view.$(selector).empty();
      _(subviews).each(function(subview){
        view.attachSubview(selector, subview);
      });
    });
  },

  attachSelectorSubviews: function(selector) {
    var view = this;
    this.$(selector).empty();
    _(this.subviews(selector)).each(function(subview){
      view.attachSubview(selector, subview);
    });
  },

  removeSelectorSubviews: function(selector){
    _(this.subviews(selector)).each(function(subview){
      subview.remove();
    }.bind(this));
    this._subviews[selector] = []
  },

  remove: function() {
    var view = this;
    Backbone.View.prototype.remove.call(this);
    _(this.subviews()).each(function(subviews){
      _(subviews).each(function(subview){
        subview.remove();
      });
    });
  },

  removeSubview: function(selector, subview) {
    subview.remove();

    var subviews = this.subviews(selector);
    subviews.splice(subviews.indexOf(subview), 1);
  },

  subviews: function(selector) {
    this._subviews = this._subviews || {};
    if (!selector) {
      return this._subviews;
    } else {
      this._subviews[selector] = this._subviews[selector] || [];
      return this._subviews[selector];
    }
  },

})
