// Adicione essa função para tirar a foto
function tirarFoto() {
    // Obtenha o elemento <canvas>
    var canvas = document.querySelector('canvas');
    var context = canvas.getContext('2d');
    // Defina o tamanho do canvas para corresponder ao tamanho do vídeo
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    // Desenhe a imagem do vídeo no canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    // Converta o conteúdo do canvas em uma URL de dados
    var dataURL = canvas.toDataURL('image/png');
    // Crie um elemento de imagem para exibir a foto
    var imagem = new Image();
    imagem.src = dataURL;
    // Adicione a imagem à página
    document.body.appendChild(imagem);
}

// Modifique o evento de clique do botão para chamar a função tirarFoto()
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
        tirarFoto(); // Chama a função para tirar a foto
    }
});
