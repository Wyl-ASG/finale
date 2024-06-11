// controls.js
import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
import { GUI } from 'https://github.com/Wyl-ASG/finale/blob/main/node_modules/dat.gui/build/dat.gui.js'



export function addVisibilityAndTransparencyControls(parentObject,name) {
    const gui = new GUI();
    
    parentObject.children.forEach((child, index) => {
        if (child.isMesh) {
            const folder = gui.addFolder(name[index]);

            // Add toggle button for mesh visibility
            folder.add(child, 'visible').name('Visible');

            // Add slider for mesh transparency
            const material = child.material;
            folder.add(material, 'opacity', 0, 1).name('Transparency').onChange((value) => {
                material.transparent = true;
                material.opacity = value;

            });

            folder.open();
        }
    });
}