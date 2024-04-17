var video =  document.querySelector('video');

navigator.mediaDevices.getUserMedia({video:true})
.then(stream => {
    video.srcObject = stream;
    video.play();
})
.catch(error => {
    console.log(error);
})

document.querySelector('#button').addEventListener('click', () => {
    var canvas = document.querySelector('canvas');
    canvas.height = video.videoHeight;
    canvas.width = video.videoWidth;
    var context = canvas.getContext('2d');

    // Captura a imagem do vídeo
    var captureImage = new Promise((resolve, reject) => {
        // Aguarda um pequeno atraso para garantir que a imagem seja capturada
        setTimeout(() => {
            resolve();
        }, 100);
    });

    // Desenha a imagem capturada no canvas
    captureImage.then(() => {
        context.drawImage(video, 0, 0);
    });
});
