// resetButton.js
export function addResetButton(camera, controls,initalposition) {
    // Create the reset button
    const resetButton = document.createElement('button');
    resetButton.textContent = 'Reset Camera';
    resetButton.id = 'reset-button';
    resetButton.style.position = 'fixed';
    resetButton.style.top = '10px';
    resetButton.style.left = '10px';
    resetButton.style.zIndex = '1000'; // Ensure it's above other elements
    resetButton.style.backgroundColor = '#fff';
    resetButton.style.border = '1px solid #ccc';
    resetButton.style.padding = '5px 10px';
    resetButton.style.borderRadius = '5px';
    resetButton.style.fontFamily = 'Arial, sans-serif';
    resetButton.style.fontSize = '14px';
    resetButton.style.cursor = 'pointer';

    // Append the reset button to the body
    document.body.appendChild(resetButton);

    // Define the reset function
    function resetCameraPosition() {
        // Reset the camera position

        // If you're using OrbitControls, reset the controls as well
        console.log(initalposition);
        camera.position.copy(initalposition);
        controls.reset();
    }

    // Add a listener to the reset button
    resetButton.addEventListener('click', resetCameraPosition);
}
