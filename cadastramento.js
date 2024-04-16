var video = document.querySelector('video');
var isCameraOpen = false;

function toggleCamera() {
    if (!isCameraOpen) {var video = document.querySelector('video');
    var isCameraOpen = false;
    
    function toggleCamera() {
        if (!isCameraOpen) {
            navigator.mediaDevices.getUserMedia({video:true})
            .then(stream => {
                video.srcObject = stream;
                video.play();
                isCameraOpen = true;
                document.getElementById('button').textContent = "Tirar a foto";
            })
            .catch(error =>{
                console.log(error);
            });
        } else {
            var canvas = document.querySelector('canvas');
            canvas.height = video.videoHeight;
            canvas.width = video.videoWidth;
            var context = canvas.getContext('2d');
            context.drawImage(video, 0, 0, canvas.width, canvas.height);
    
            // Adicionar a lógica para salvar a imagem ou processar conforme necessário
    
            var stream = video.srcObject;
            var tracks = stream.getTracks();
    
            tracks.forEach(function(track) {
                track.stop();
            });
    
            video.srcObject = null;
            isCameraOpen = false;
            document.getElementById('button').textContent = "Cadastrar Livro";
    
            document.getElementById('button').addEventListener('click', () => {
                if (document.getElementById('button').textContent === "Cadastrar Livro") {
                    window.location.href = "index.html";
                }
            });
        }
    
      
    }
    

  
}
}
