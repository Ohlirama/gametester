document.addEventListener('DOMContentLoaded', function() {
    // Carrega anotações do Local Storage
    loadNotes();

    // Adiciona listeners para salvar anotações ao sair de uma seção
    addSectionListeners();

    // Adiciona listener para a avaliação de 0 a 10
    const avaliacaoInput = document.getElementById('avaliacao-input');
    avaliacaoInput.addEventListener('blur', function() {
        saveNotes('avaliacao', avaliacaoInput.value);
        calculateAndSetAverage();
    });

    // Adiciona listener para o botão de Avaliação Final
    const finalButton = document.getElementById('final-button');
    finalButton.addEventListener('click', avaliacaoFinal);
});

function addSectionListeners() {
    const sections = document.querySelectorAll('section');

    sections.forEach(section => {
        const editableDiv = section.querySelector('.editable');
        
        editableDiv.addEventListener('blur', function() {
            saveNotes(section.id, editableDiv.innerHTML);
            calculateAndSetAverage();
        });
    });
}

function calculateAndSetAverage() {
    // ... (mesmo código)

    // Define a cor do texto com base na média
    const colorDisplay = document.getElementById('color-display');
    colorDisplay.style.color = getTextColor(average);

    // Atualiza o texto do botão de Avaliação Final
    const finalButton = document.getElementById('final-button');
    finalButton.style.backgroundColor = getBackgroundColor(average);
}

function getTextColor(average) {
    return average > 5 ? 'green' : (average < 5 ? 'red' : 'black');
}

function getBackgroundColor(average) {
    return average > 5 ? 'green' : (average < 5 ? 'red' : 'yellow');
}

function avaliacaoFinal() {
    const avaliacao = parseFloat(localStorage.getItem('avaliacao')) || 0;
    const mensagemFinalElement = document.getElementById('mensagem-final');

    // Remove o botão
    const finalButton = document.getElementById('final-button');
    finalButton.remove();

    // Adiciona a mensagem final com base na avaliação
    if (avaliacao > 5) {
        mensagemFinalElement.innerHTML = '<p>Jogo bom! 👍</p>';
    } else if (avaliacao < 5) {
        mensagemFinalElement.innerHTML = '<p>Jogo ruim! 👎</p>';
    } else {
        mensagemFinalElement.innerHTML = '<p>Jogo mais ou menos! 🤏</p>';
    }
}
