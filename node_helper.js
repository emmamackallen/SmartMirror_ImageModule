const NodeHelper = require('node_helper');
const fs = require('fs');
const moment = require('moment');

module.exports = NodeHelper.create({

  start: function() {
    this.images = [];
    this.currentIndex = 0;
    this.config = {};
  },

  socketNotificationReceived: function(notification, payload) {
    if (notification === 'IMAGE_SLIDESHOW_CONFIG') {
      this.config = payload;
      this.loadImages();
    }
  },

  loadImages: function() {
    const self = this;
    fs.readdir(this.config.imagePath, function(err, files) {
      if (err) throw err;
      files.forEach(function(file) {
        const extension = file.split('.').pop();
        if (self.config.validExtensions.indexOf(extension) !== -1) {
          self.images.push(file);
        }
      });
      if (self.images.length > 0) {
        self.sendSocketNotification('IMAGE_SLIDESHOW_START');
        setInterval(function() {
          self.nextImage();
        }, self.config.slideshowSpeed);
      }
    });
  },

  nextImage: function() {
    const payload = {
      image: this.images[this.currentIndex],
      timestamp: moment().format('MMMM Do YYYY, h:mm:ss a')
    };
    this.sendSocketNotification('IMAGE_SLIDESHOW_NEXT_IMAGE', payload);
    this.currentIndex++;
    if (this.currentIndex === this.images.length) {
      this.currentIndex = 0;
    }
  }

});

