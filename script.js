async function buscarLivros() {
    const livro = document.getElementById('livro').value;
    const apiKey = 'AIzaSyBDFh1R9J3sFkAXA7UxddJzH19FgOxsdio'; 
    const url = `https://www.googleapis.com/books/v1/volumes?q=${livro}&key=${apiKey}`;

    if (!livro) {
        throw new Error('Por favor, informe o nome de um livro.');
    }

    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Não foi possível buscar os livros.');
    }

    const data = await response.json();
    return data.items || [];
}

function criarElementoLivro(livro) {
    const containner = document.createElement("div");
    containner.className = "livro-container";

    const card = document.createElement("div");
    card.className = "card";

    const img = document.createElement("img");
    img.src = livro.volumeInfo.imageLinks ? livro.volumeInfo.imageLinks.thumbnail : 'placeholder.jpg'; // URL da imagem do livro


    const link = document.createElement("a");
    // link.href = livro.volumeInfo.previewLink ? livro.volumeInfo.previewLink : '#'; // Link de visualização do livro
    link.className = "butao";
    link.onclick = function(){
        mostrarDetalhe(livro);
    };

    
    const title = document.createElement("h3");
    title.innerText = livro.volumeInfo.title;

    link.appendChild(title);
    card.appendChild(img);
    card.appendChild(link);
    containner.appendChild(card);
    document.body.appendChild(containner);
    return containner;
    
}

async function procurarLivro() {
    const livroInput = document.getElementById('livro');
    const livro = livroInput.value;

    try {
        const livros = await buscarLivros(livro);
        
        const livroContainer = document.getElementById('livro-container');
        livroContainer.innerHTML = ''; // Limpa o conteúdo anterior

        livros.forEach((livro) => {
            const card = criarElementoLivro(livro);
            livroContainer.appendChild(card);
        });
    } catch (error) {
        console.error('Ocorreu um erro:', error);
        alert(error.message);
    }
}

function mostrarDetalhe(livro) {
    const overlay = document.createElement("div");
    overlay.className = "overlay";

    const overlayInner = document.createElement("div");
    overlayInner.className = "overlay-inner";

    const close = document.createElement("button");
    close.className = "close";

    const i = document.createElement("i");
    close.appendChild(i);

    const icon = document.createElement("img");
    icon.src = "assets/icon-close.svg";
    i.appendChild(icon);
    overlayInner.appendChild(close);
    close.addEventListener('click', function() {
        document.body.removeChild(overlay);
    });

    const innerBox = document.createElement("div");
    innerBox.className = "inner-box";

    const img = document.createElement("img");
    img.src = livro.volumeInfo.imageLinks ? livro.volumeInfo.imageLinks.thumbnail : 'placeholder.jpg';
    innerBox.appendChild(img);

    const info = document.createElement("div");
    info.className = "info";

    const title = document.createElement("h1");
    title.innerText = livro.volumeInfo.title;
    info.appendChild(title);

    const autor = document.createElement("h3");
    autor.innerText = livro.volumeInfo.publisher;
    info.appendChild(autor);

    const h4 = document.createElement("h4");
    h4.innerText = livro.volumeInfo.authors;
    info.appendChild(h4);

    const span = document.createElement("span");
    span.innerText = livro.volumeInfo.publishedDate;
    h4.appendChild(span);


    const saibaMais = document.createElement("button");
    saibaMais.innerText = "Saiba Mais";
    // saibaMais.appendChild(link);

    const link = document.createElement("a");
    link.href = livro.volumeInfo.previewLink ? livro.volumeInfo.previewLink : '#';
    link.appendChild(saibaMais);
    info.appendChild(link);
    

    // const favoritar = document.createElement("button");
    // favoritar.className = "favoritar-btn";
    // favoritar.innerText = "Favoritar";
    // info.appendChild(favoritar);

    // const esquecer = document.createElement("button");
    // esquecer.className = "esquece-btn";
    // esquecer.innerText = "Esquecer";
    // info.appendChild(esquecer);

    innerBox.appendChild(info);
    overlayInner.appendChild(innerBox);

    const descricao = document.createElement("h4");
    descricao.innerText = livro.volumeInfo.description;
    descricao.className = "descricao";
    overlayInner.appendChild(descricao);

    overlay.appendChild(overlayInner);
    document.body.appendChild(overlay);

    return overlay;
}
