const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.querySelector('#globo') });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.SphereGeometry(5, 32, 32);
const texture = new THREE.TextureLoader().load('https://i0.wp.com/narceliodesa.com/wp-content/uploads/2013/06/1.jpg');
const material = new THREE.MeshBasicMaterial({ map: texture });
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

camera.position.z = 10;

function animate() {
    requestAnimationFrame(animate);
    sphere.rotation.y += 0.005; // Faz o globo girar continuamente
    renderer.render(scene, camera);
}
animate();

// Ajusta o tamanho do canvas ao redimensionar a janela
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

// Função para alternar a visibilidade das descrições
function toggleDescricao(id) {
    const descriptions = document.querySelectorAll('.description');
    const selectedDescription = document.getElementById(id);

    // Verifica se a descrição selecionada já está ativa
    if (selectedDescription.classList.contains('active')) {
        // Fecha a descrição atual
        selectedDescription.classList.remove('active');
        selectedDescription.style.opacity = 0;
        return; // Sai da função para evitar reabrir
    }

    // Fecha todas as descrições antes de abrir a nova
    descriptions.forEach(desc => {
        desc.classList.remove('active');
        desc.style.opacity = 0;
    });

    // Aguarda o fechamento das descrições para abrir a nova
    setTimeout(() => {
        if (selectedDescription) {
            selectedDescription.classList.add('active');
            selectedDescription.style.opacity = 1;
        }
    }, 300);
}
