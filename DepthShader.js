// DepthShader.js
import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";

export class DepthShader {
    constructor() {
        this.vertexShader = `
            varying vec4 vPosition;

            void main() {
                vPosition = modelViewMatrix * vec4(position, 1.0);
                gl_Position = projectionMatrix * vPosition;
            }
        `;

        this.fragmentShader = `
            varying vec4 vPosition;

            void main() {
                float depth = gl_FragCoord.z / gl_FragCoord.w;
                
                // Check if the fragment is in shadow
                if (depth == 1.0) {
                    // If in shadow, set color to red
                    gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0); // Red color
                } else {
                    // If not in shadow, retain original color
                    gl_FragColor = vec4(1.0); // Original color (white)
                }
            }
        `;
    }

    createDepthShaderMaterial() {
        return new THREE.ShaderMaterial({
            vertexShader: this.vertexShader,
            fragmentShader: this.fragmentShader
        });
    }
}
