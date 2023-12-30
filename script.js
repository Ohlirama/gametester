document.addEventListener('DOMContentLoaded', function() {
    // Carrega anotações do Local Storage
    loadNotes();

    // Adiciona listeners para salvar anotações ao sair de uma seção
    addSectionListeners();
});

function addSectionListeners() {
    const sections = document.querySelectorAll('section');

    sections.forEach(section => {
        const textarea = section.querySelector('textarea');
        
        textarea.addEventListener('blur', function() {
            saveNotes(section.id, textarea.value);
        });
    });
}

function saveNotes(sectionId, notes) {
    // Salva as anotações no Local Storage
    localStorage.setItem(sectionId, notes);
}

function loadNotes() {
    // Carrega as anotações do Local Storage
    const sections = document.querySelectorAll('section');

    sections.forEach(section => {
        const textarea = section.querySelector('textarea');
        const savedNotes = localStorage.getItem(section.id);

        if (savedNotes) {
            textarea.value = savedNotes;
        }
    });
}
