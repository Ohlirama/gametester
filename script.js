document.addEventListener('DOMContentLoaded', function() {
    // Carrega anotações do Local Storage
    loadNotes();

    // Adiciona listeners para salvar anotações ao sair de uma seção
    addSectionListeners();
});

function addSectionListeners() {
    const sections = document.querySelectorAll('section');

    sections.forEach(section => {
        const editableDiv = section.querySelector('.editable');
        
        editableDiv.addEventListener('blur', function() {
            saveNotes(section.id, editableDiv.innerHTML);
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
        const editableDiv = section.querySelector('.editable');
        const savedNotes = localStorage.getItem(section.id);

        if (savedNotes) {
            editableDiv.innerHTML = savedNotes;
        }
    });
}
