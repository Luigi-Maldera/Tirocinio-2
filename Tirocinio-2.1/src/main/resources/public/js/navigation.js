// Aggiungi questo script per la navigazione tra le pagine
$(document).ready(function () {
    showSection('admin-panel-container');

    // Aggiungi il pulsante "Crea Nuovo" in alto
    $('#admin-panel-container').prepend('<button onclick="showCreateForm()">Crea Nuovo</button>');
});

// Aggiungi questa funzione per mostrare il form di creazione quando clicchi su "Crea Nuovo"
function showCreateForm() {
    // Nascondi la sezione dei dettagli
    $('#details-container').hide();
    
    // Ottieni l'ID della sezione attualmente visualizzata
    const currentSectionId = $('.section:visible').attr('id');

    // Modifica l'ID del form di creazione in base alla sezione attualmente visualizzata
    const createFormId = `create-${currentSectionId.substring(0, currentSectionId.indexOf('-section'))}`;

    // Resetta i campi del form
    $(`#${createFormId} input`).val('');

    // Mostra la sezione del form di creazione
    showSection(createFormId);
}
