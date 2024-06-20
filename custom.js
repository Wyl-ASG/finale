
import { TrackballControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/TrackballControls.js";

class CustomTrackballControls extends TrackballControls {
    constructor(object, domElement) {
        super(object, domElement);

        this.zoomInverted = false;
        this.initialDistance = undefined;

        // Bind custom touch events
        this.domElement.addEventListener('touchstart', (event) => this.handleTouchStart(event), false);
        this.domElement.addEventListener('touchmove', (event) => this.handleTouchMoveDolly(event), false);
        this.domElement.addEventListener('touchend', () => this.handleTouchEnd(), false);
    }

    handleTouchStart(event) {
        if (event.touches.length === 2) {
            const dx = event.touches[0].pageX - event.touches[1].pageX;
            const dy = event.touches[0].pageY - event.touches[1].pageY;
            this.initialDistance = Math.sqrt(dx * dx + dy * dy);
        }
    }

    handleTouchMoveDolly(event) {
        if (this.enabled === false || event.touches.length !== 2) return;

        event.preventDefault();

        const dx = event.touches[0].pageX - event.touches[1].pageX;
        const dy = event.touches[0].pageY - event.touches[1].pageY;
        const currentDistance = Math.sqrt(dx * dx + dy * dy);

        if (this.initialDistance === undefined) {
            this.initialDistance = currentDistance;
        }

        const zoomFactor = 1.0 + (this.initialDistance - currentDistance) * 0.002;
        if (this.zoomInverted) {
            this.object.zoom *= zoomFactor;
        } else {
            this.object.zoom /= zoomFactor;
        }

        this.object.updateProjectionMatrix();
    }

    handleTouchEnd() {
        this.initialDistance = undefined;
    }
}

export { CustomTrackballControls };