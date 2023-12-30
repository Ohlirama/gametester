document.addEventListener('DOMContentLoaded', function() {
    // Carrega anotações do Local Storage
    loadNotes();

    // Adiciona listeners para salvar anotações ao sair de uma seção
    addSectionListeners();

    // Calcula a média e define a cor do texto com base na média
    calculateAndSetAverage();
});

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
