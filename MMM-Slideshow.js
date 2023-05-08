Module.register('MMM-ImageSlideshow', {

    defaults: {
      imagePath: '/path/to/images',
      validExtensions: ['jpg', 'jpeg', 'png', 'gif'],
      slideshowSpeed: 5000
    },
  
    start: function() {
      this.sendSocketNotification('IMAGE_SLIDESHOW_CONFIG', this.config);
    },
  
    socketNotificationReceived: function(notification, payload) {
      if (notification === 'IMAGE_SLIDESHOW_START') {
        this.show();
      } else if (notification === 'IMAGE_SLIDESHOW_NEXT_IMAGE') {
        this.updateImage(payload);
      }
    },
  
    show: function() {
      const wrapper = document.createElement('div');
      wrapper.className = 'slideshow-wrapper';
      const image = document.createElement('img');
      image.className = 'slideshow-image';
      wrapper.appendChild(image);
    }
});
