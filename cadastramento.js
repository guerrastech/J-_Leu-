var video = document.querySelector('video');
var cameraAberta = false;

navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
        video.srcObject = stream;
        video.play();
        cameraAberta = true;
        atualizarTextoBotao();
    })
    .catch(error => {
        console.log(error);
    });

document.querySelector('#button').addEventListener('click', () => {
    if (!cameraAberta) {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(stream => {
                video.srcObject = stream;
                video.play();
                cameraAberta = true;
                atualizarTextoBotao();
            })
            .catch(error => {
                console.log(error);
            });
    } else {
        // Aqui você pode adicionar lógica para fechar a câmera, se necessário
        cameraAberta = false;
        video.srcObject.getTracks().forEach(track => {
            track.stop();
        });
        video.srcObject = null;
        atualizarTextoBotao();
    }
});

function atualizarTextoBotao() {
    var button = document.querySelector('#button');
    if (cameraAberta) {
        button.textContent = 'Fechar câmera';
    } else {
        button.textContent = 'Abrir câmera';
    }
}
