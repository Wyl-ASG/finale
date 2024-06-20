
import { TrackballControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/TrackballControls.js";

class CustomTrackballControls extends TrackballControls {
    constructor(object, domElement) {
        super(object, domElement);

        this.zoomInverted = false;
        this.prevDistance = undefined;

        // Bind custom touch move dolly function
        this.domElement.addEventListener('touchmove', (event) => {
            if (this.enabled === false) return;
            this.handleTouchMoveDolly(event);
        }, false);

        this.domElement.addEventListener('touchend', () => {
            this.prevDistance = undefined;
        }, false);
    }

    handleTouchMoveDolly(event) {
        if (this.enabled === false) return;

        event.preventDefault();

        const dx = event.touches[0].pageX - event.touches[1].pageX;
        const dy = event.touches[0].pageY - event.touches[1].pageY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (this.prevDistance === undefined) {
            this.prevDistance = distance;
        }

        const zoomFactor = 1.0 + (this.prevDistance - distance) * 0.002;
        if (this.zoomInverted) {
            this.object.zoom *= zoomFactor;
        } else {
            this.object.zoom /= zoomFactor;
        }

        this.object.updateProjectionMatrix();
        this.prevDistance = distance;
    }
}

export { CustomTrackballControls };