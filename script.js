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
    // Pega todas as seções de notas
    const sections = document.querySelectorAll('section');

    // Inicializa variáveis para a soma e contagem de notas
    let total = 0;
    let count = 0;

    // Itera sobre cada seção
    sections.forEach(section => {
        const savedNotes = localStorage.getItem(section.id);

        // Se a nota não for vazia
        if (savedNotes) {
            // Converte a nota para um número
            const note = parseFloat(savedNotes);

            // Se a nota for um número válido
            if (!isNaN(note)) {
                total += note;
                count++;
            }
        }
    });

    // Pega a avaliação de 0 a 10
    const avaliacao = parseFloat(localStorage.getItem('avaliacao')) || 0;

    // Se a avaliação de 0 a 10 for válida, a inclui no cálculo da média
    if (!isNaN(avaliacao)) {
        total += avaliacao;
        count++;
    }

    // Calcula a média
    const average = count === 0 ? 0 : total / count;

    // Seleciona o elemento onde exibir a média
    const averageDisplay = document.getElementById('average-display');

    // Exibe a média com uma casa decimal
    averageDisplay.textContent = `Média: ${average.toFixed(1)}`;

    // Seleciona o elemento onde exibir a cor
    const colorDisplay = document.getElementById('color-display');

    // Define a cor do texto com base na média
    colorDisplay.style.color = average >= 5 ? 'green' : 'red';
}

function saveNotes(sectionId, notes) {
    // Salva as anotações no Local Storage
    localStorage.setItem(sectionId, notes);
}
