import * as THREE from '/node_modules/three/build/three.module.js';

export class OFFLoader {
  constructor(material) {
    this.material = material
  }
/*
  load(url, onLoad) {
    fetch(url)
      .then(response => response.text())
      .then(data => {
        const lines = data.split('\n');
        if (lines[0].trim() !== 'OFF') {
          console.error('Not a valid OFF file');
          return;
        }*/
        parse(data) {
            const lines = data.split('\n').filter(line => line.trim().length > 0);
        
            if (lines[0].trim() !== 'OFF') {
                console.error('Not a valid OFF file');
                return;
            }
        

        const [numVertices, numFaces] = lines[1].trim().split(' ').map(Number);
        const vertices = [];
        const indices = [];

        for (let i = 0; i < numVertices; i++) {
          const vertex = lines[2 + i].trim().split(' ').map(Number);

          vertices.push(...vertex);
        }

        let lineIndex = 2 + numVertices;
        for (let i = 0; i < numFaces; i++) {


          const face = lines[lineIndex+i].trim().split(' ').map(Number);
          const numVerticesInFace = face[0];

          // Ensure that faces are triangles
          if (numVerticesInFace === 3) {
            indices.push(face[2], face[3], face[4]);
          } else {
            console.warn(`Unsupported face with ${numVerticesInFace} vertices.`);
          }
        }

        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
        geometry.setIndex(new THREE.BufferAttribute(new Uint32Array(indices), 1));
        geometry.computeVertexNormals();

        const mesh = new THREE.Mesh(geometry, this.material);
        return mesh;
      }

  }

