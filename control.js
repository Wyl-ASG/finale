import { GUI } from '/node_modules/dat.gui/build/dat.gui.module.js';

function addVisibilityAndTransparencyControls(parentObject, name) {
    const guiContainer = document.createElement('div');
    guiContainer.style.position = 'absolute';
    guiContainer.style.top = '10px'; // Adjust as needed
    guiContainer.style.left = '10px'; // Adjust as needed
    guiContainer.style.width = '300px'; // Fixed width
    guiContainer.style.height = '400px'; // Fixed height
    document.body.appendChild(guiContainer);

    const gui = new GUI({ autoPlace: false });
    guiContainer.appendChild(gui.domElement);
    var customCSS = document.createElement('style');
customCSS.innerHTML = '.dg .main { font-size: 50px; }'; // Adjust font size as needed
document.head.appendChild(customCSS);

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

    // Prevent resizing of the GUI container
    const resizeObserver = new ResizeObserver(entries => {
        for (let entry of entries) {
            const { width, height } = entry.contentRect;
            guiContainer.style.width = width + 'px';
            guiContainer.style.height = height + 'px';
        }
    });

    resizeObserver.observe(guiContainer);
}

export { addVisibilityAndTransparencyControls };
