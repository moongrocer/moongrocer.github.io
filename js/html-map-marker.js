/* custom map marker */

const createHTMLMapMarker = ({ OverlayView = google.maps.OverlayView,  ...args }) => {
  class HTMLMapMarker extends OverlayView {

    constructor() {
      super();
      this.latlng = args.latlng;
      this.html = args.html;
      this.customInfo = args.customInfo;
      this.setMap(args.map);
    }

    createDiv() {
      this.div = document.createElement('div');
      this.div.style.position = 'absolute';
      if (this.html) {
        this.div.innerHTML = this.html;
      }
      google.maps.event.addDomListener(this.div, 'click', event => {
        google.maps.event.trigger(this, 'click');
      });
    }

    appendDivToOverlay() {
      const panes = this.getPanes();
      panes.overlayImage.appendChild(this.div);
    }

    positionDiv() {
      const point = this.getProjection().fromLatLngToDivPixel(this.latlng);
      if (point) {
        this.div.style.left = `${point.x}px`;
        this.div.style.top = `${point.y}px`;
      }
    }

    // this method will be used to draw the marker on the map.
    draw() {
      if (!this.div) {
        this.createDiv();
        this.appendDivToOverlay();
      }
      this.positionDiv();
    }

    // this method will be used to remove the marker from the map.
    remove() {
      if (this.div) {
        this.div.parentNode.removeChild(this.div);
        this.div = null;
      }
    }

    getPosition() {
      return this.latlng;
    }
    
    getDraggable() {
      return false;
    }

  }

  return new HTMLMapMarker();
};

export default createHTMLMapMarker;