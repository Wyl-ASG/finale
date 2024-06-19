// resetButton.js
export function addResetButton(camera,clone,controls) {
    // Create the reset button
    console.log(clone);
    const resetButton = document.createElement('button');
    resetButton.textContent = 'Reset Camera';
    resetButton.id = 'reset-button';
    resetButton.style.position = 'fixed';
    resetButton.style.top = '10px';
    resetButton.style.right = '10px';
    resetButton.style.zIndex = '1000'; // Ensure it's above other elements
    resetButton.style.backgroundColor = '#fff';
    resetButton.style.border = '1px solid #ccc';
    resetButton.style.padding = '5px 10px';
    resetButton.style.borderRadius = '5px';
    resetButton.style.fontFamily = 'Arial, sans-serif';
    resetButton.style.fontSize = '20px';
    resetButton.style.cursor = 'pointer';
    resetButton.style.width = '300px';
resetButton.style.height = '35px';

// Optionally, add a media query to adjust size for very small screens


    // Append the reset button to the body
    document.body.appendChild(resetButton);

    // Define the reset function
    function resetCameraPosition() {
        // Reset the camera position

        // If you're using OrbitControls, reset the controls as well


        camera.copy(clone)
        // Reset the camera zoom
        camera.zoom = 7;
        camera.updateProjectionMatrix();
        // Reset controls target and update controls
        controls.target.set(0, 0, 0);
        controls.update();
        console.log('Camera reset:');
        console.log('Position:', camera.position);
        console.log('Rotation:', camera.rotation);
        console.log('Zoom:', camera.zoom);

    }

    // Add a listener to the reset button
    resetButton.addEventListener('click', resetCameraPosition);
}
