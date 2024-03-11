// script.js

function showSection(sectionId) {
    $('.section').hide();
    $('#' + sectionId).show();
}

function handleCommonErrorCases(error) {
    if (error.status === 401) {
         // Reindirizza alla pagina di login in caso di errore di autorizzazione (401)
        window.location.href = '/login.html';
    } else {
        console.error('Error:', error.responseText);
    }
}


function getProfessors() {
    const token = localStorage.getItem('token');

    $.ajax({
        url: '/api/professori',
        type: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token
        },
        success: function (data) {
            displayProfessors(data);
        },
        error: function (error) {
            handleCommonErrorCases(error);
        }
    });
}


function displayProfessors(professors) {
    const tableBody = $('#professor-table tbody');
    tableBody.empty();

    professors.forEach(professor => {
		professorImageURL = professor.immagine ? professor.immagine : 'https://as1.ftcdn.net/v2/jpg/01/77/92/30/1000_F_177923094_VqkPl9KoP9cQMlV89zZL7oqjBDegyGAK.jpg';
        tableBody.append(`
            <tr id="professor-table-row-${professor.id}">
                <td>${professor.id}</td>
                <td class="small-on-mobile">${professor.nome}</td>
                <td class="small-on-mobile">${professor.cognome}</td>
                <td class="small-on-mobile d-none d-md-table-cell">${professor.materia}</td>
                <td class="small-on-mobile d-none d-lg-table-cell">
                	<div class="d-flex align-items-center">
	                	<img src="${professorImageURL}" alt="${professor.nome} ${professor.cognome}" class="professor-image d-none d-md-table-cell mr-2">
	                    <button class="btn btn-sm btn-info" onclick="showDetails('professor', ${professor.id})">Dettagli</button>
	                    <button class="btn btn-sm btn-primary mx-1" onclick="showEditForm('professor', ${professor.id})">Modifica</button>
	                    <button class="btn btn-sm btn-danger" onclick="deleteEntity('professor', ${professor.id})">Elimina</button>
	                 </div>
                </td>
            </tr>
            <tr class="small-on-mobile d-lg-none">
                <td colspan="4">
                    <button class="btn btn-sm btn-info" onclick="showDetails('professor', ${professor.id})">Dettagli</button>
                    <button class="btn btn-sm btn-primary mx-1" onclick="showEditForm('professor', ${professor.id})">Modifica</button>
                    <button class="btn btn-sm btn-danger" onclick="deleteEntity('professor', ${professor.id})">Elimina</button>
                </td>
            </tr>
        `);
    });
    $('#professor-table').fadeIn();
}




function getClasses() {
    const token = localStorage.getItem('token');

    $.ajax({
        type: 'GET',
        url: '/api/classi',
        headers: {
            'Authorization': 'Bearer ' + token
        },
        success: function (data) {
            displayClasses(data);
        },
        error: function (error) {
            handleCommonErrorCases(error);
        }
    });
}


function displayClasses(classes) {
    const tableBody = $('#class-table tbody');
    tableBody.empty();

    classes.forEach(classe => {
        tableBody.append(`
            <tr id="class-table-row-${classe.id}"> <!-- Modificato l'ID del record della tabella -->
                <td class="small-on-mobile">${classe.id}</td>
                <td class="small-on-mobile">${classe.nome}</td>
                <td class="small-on-mobile">${classe.anno}</td>
                <td class="small-on-mobile d-none d-lg-table-cell">
                    <button class="btn btn-sm btn-info" onclick="showDetails('class', ${classe.id})">Dettagli</button>
                    <button class="btn btn-sm btn-primary" onclick="showEditForm('class', ${classe.id})">Modifica</button>
                    <button class="btn btn-sm btn-danger" onclick="deleteEntity('class', ${classe.id})">Elimina</button>
                </td>
            </tr>
            <tr class="small-on-mobile d-lg-none">
                <td colspan="4">
                    <button class="btn btn-sm btn-info" onclick="showDetails('class', ${classe.id})">Dettagli</button>
                    <button class="btn btn-sm btn-primary mx-1" onclick="showEditForm('class', ${classe.id})">Modifica</button>
                    <button class="btn btn-sm btn-danger" onclick="deleteEntity('class', ${classe.id})">Elimina</button>
                </td>
            </tr>
        `);
    });
}

function getStudents() {
    const token = localStorage.getItem('token');

    $.ajax({
        type: 'GET',
        url: '/api/studenti',
        headers: {
            'Authorization': 'Bearer ' + token
        },
        success: function (data) {
            displayStudents(data);
        },
        error: function (error) {
            handleCommonErrorCases(error);
        }
    });
}

function displayStudents(students) {
    const tableBody = $('#student-table tbody');
    tableBody.empty();

    students.forEach(student => {
		const studentImageURL = student.immagine ? student.immagine : 'https://img.freepik.com/premium-photo/little-man-student-studying-university_532963-962.jpg';
        tableBody.append(`
            <tr id="student-table-row-${student.id}"> 
                <td class="small-on-mobile">${student.id}</td>
                <td class="small-on-mobile">${student.nome}</td>
                <td class="small-on-mobile">${student.cognome}</td>
                <td class="d-none d-md-table-cell">${student.classe ? student.classe.nome : 'N/D'}</td>
                <td class="small-on-mobile d-none d-lg-table-cell">
                	<div class="d-flex align-items-center">
	                	<img src="${studentImageURL}" alt="${student.nome} ${student.cognome}" class="student-image d-none d-md-table-cell mr-2">
                    	<button class="btn btn-sm btn-info" onclick="showDetails('student', ${student.id})">Dettagli</button>
                    	<button class="btn btn-sm btn-primary" onclick="showEditForm('student', ${student.id})">Modifica</button>
                    	<button class="btn btn-sm btn-danger" onclick="deleteEntity('student', ${student.id})">Elimina</button>
                    </div>
                </td>
            </tr>
            <tr class="small-on-mobile d-lg-none">
                <td colspan="4">
                    <button class="btn btn-sm btn-info" onclick="showDetails('student', ${student.id})">Dettagli</button>
                    <button class="btn btn-sm btn-primary mx-1" onclick="showEditForm('student', ${student.id})">Modifica</button>
                    <button class="btn btn-sm btn-danger" onclick="deleteEntity('student', ${student.id})">Elimina</button>
                </td>
            </tr>
        `);
    });
    $('#student-table').fadeIn();
}


// Funzione generica per l'aggiornamento di una classe
function updateClass(classeId, payload) {
	const token = localStorage.getItem('token');
    $.ajax({
        type: "PUT",
        url: "/api/classi/" + classeId,
        contentType: "application/json",
        data: JSON.stringify(payload),
        headers: {
            'Authorization': 'Bearer ' + token
        },
        success: function (data) {
            console.log("Classe aggiornata con successo", data);
            getClasses();
            
        },
        error: function (error) {
            console.error("Errore durante l'aggiornamento della classe", error);
            
        }
    });
}


// Funzione per ottenere la lista degli ID e delle proprietà dei professori
function getProfessorsList(callback) {
    const token = localStorage.getItem('token');

    $.ajax({
        url: '/api/professori',
        type: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token
        },
        success: function (data) {
            const professorList = data.map(professor => ({
                id: professor.id,
                nome: professor.nome,
                cognome: professor.cognome, 
            }));
            callback(professorList);
        },
        error: function (error) {
            handleCommonErrorCases(error);
        }
    });
}

// Funzione per ottenere la lista degli ID e delle proprietà degli studenti
function getStudentsList(callback) {
    const token = localStorage.getItem('token');

    $.ajax({
        url: '/api/studenti',
        type: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token
        },
        success: function (data) {
            const studentList = data.map(student => ({
                id: student.id,
                nome: student.nome,
                cognome: student.cognome,
            }));
            callback(studentList);
        },
        error: function (error) {
            handleCommonErrorCases(error);
        }
    });
}

function getFormattedList(items) {
    return items.map(item => `${item.id}: ${item.nome} ${item.cognome}`).join(', ');
}


function registerAdmin() {
	const token = localStorage.getItem('token');
    
    var nome = $('#nome').val();
    var cognome = $('#cognome').val();
    var eta = $('#eta').val();
    var indirizzo = $('#indirizzo').val();
    var username = $('#username').val();
    var password = $('#password').val();

    
    var adminData = {
        nome: nome,
        cognome: cognome,
        eta: parseInt(eta),
        indirizzo: indirizzo,
        username: username,
        password: password
    };

    
    $.ajax({
        type: 'POST',
        url: '/admin/create',
        headers: {
            'Authorization': 'Bearer ' + token
        },
        contentType: 'application/json',
        data: JSON.stringify(adminData),
        success: function (data) {
            alert('Admin registrato con successo!');
            
        },
        error: function (error) {
            alert('Errore durante la registrazione dell\'admin. Controlla la console per i dettagli.');
            console.error('Errore durante la registrazione dell\'admin:', error);
        }
    });
}


function showDetails(entityType, entityId) {
    const token = localStorage.getItem('token');
    $(`#${entityType}-table`).fadeOut();
    $.ajax({
        url: `/api/${entityType}i/${entityId}`,
        type: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token
        },
        success: function (data) {
            const editFormContainer = $(`#${entityType}-edit-form-container`);
            editFormContainer.empty();
            const detailsContainer = $(`#${entityType}-details-container`);
            detailsContainer.empty();

            switch (entityType) {
                case 'professor':
                    detailsContainer.append(`<h2>Dettagli Professore</h2>`);
                    detailsContainer.append(`<p>ID: ${data.id}</p>`);
                    detailsContainer.append(`<p>Nome: ${data.nome}</p>`);
                    detailsContainer.append(`<p>Cognome: ${data.cognome}</p>`);
                    detailsContainer.append(`<p>Età: ${data.eta}</p>`);
                    detailsContainer.append(`<p>Indirizzo: ${data.indirizzo}</p>`);
                    detailsContainer.append(`<p>Materia: ${data.materia}</p>`);
                    console.log(data.immagine);
                    if(data.immagine){
                    detailsContainer.append(`<img src="${data.immagine}" alt="${data.nome} ${data.cognome}" class="professor-image">`);}
                    if (data.classi && data.classi.length > 0) {
				        detailsContainer.append(`<p>Classi Assegnate:</p>`);
				        const classiList = $('<ul></ul>');
				        data.classi.forEach(classe => {
				            classiList.append(`<li>${classe.nome} - Anno: ${classe.anno}</li>`);
				        });
				        detailsContainer.append(classiList);
				    } else {
				        detailsContainer.append(`<p>Classi Assegnate: N/D</p>`);
				    }
                    break;

                case 'class':
                    detailsContainer.append(`<h2>Dettagli Classe</h2>`);
                    detailsContainer.append(`<p>ID: ${data.id}</p>`);
                    detailsContainer.append(`<p>Nome: ${data.nome}</p>`);
                    detailsContainer.append(`<p>Professori: ${data.professori ? data.professori.map(p => p.nome + ' ' + p.cognome).join(', ') : 'N/D'}</p>`);
                    detailsContainer.append(`<p>Studenti: ${data.studenti ? data.studenti.map(s => s.nome + ' ' + s.cognome).join(', ') : 'N/D'}</p>`);
                    detailsContainer.append(`<p>Anno: ${data.anno}</p>`);
                    break;

                case 'student':
                    detailsContainer.append(`<h2>Dettagli Studente</h2>`);
                    detailsContainer.append(`<p>ID: ${data.id}</p>`);
                    detailsContainer.append(`<p>Nome: ${data.nome}</p>`);
                    detailsContainer.append(`<p>Cognome: ${data.cognome}</p>`);
                    detailsContainer.append(`<p>Età: ${data.eta}</p>`);
                    detailsContainer.append(`<p>Indirizzo: ${data.indirizzo}</p>`);
                    if(data.immagine){
                    detailsContainer.append(`<img src="${data.immagine}" alt="${data.nome} ${data.cognome}" class="student-image">`);}
                    detailsContainer.append(`<p>Classe Assegnata: ${(data.classe ? data.classe.nome : 'N/D')}</p>`);
                    break;

            }
            detailsContainer.append(`<button onclick="cancelEdit('${entityType}')">Chiudi</button>`);
            detailsContainer.append(`<button onclick="showEditForm('${entityType}', ${data.id})">Modifica</button>`);

        },
        error: function (error) {
            handleCommonErrorCases(error);
        }
    });
}

function getClassDetails(classId, callback) {
    const token = localStorage.getItem('token');

    $.ajax({
        url: '/api/classi/' + classId, 
        type: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token
        },
        success: function (data) {
            callback(data); // Passa i dettagli della classe alla funzione di callback
        },
        error: function (error) {
            handleCommonErrorCases(error);
        }
    });
}


function showAssignmentTables(classId) {
	$('#studentSelection').show();
    $('#professorSelection').show();
    $('#studentTable').show();
    $('#professorTable').show();
    getClassDetails(classId, function(data) {
        // Ottenere la lista dei professori e degli studenti
        const assignedProfessors = data.professori.map(professor => professor.id.toString());
        const assignedStudents = data.studenti.map(student => student.id.toString());

        // Chiamata AJAX per ottenere la lista completa dei professori e degli studenti
        getProfessorsList(function(professorsList) {
            // Costruire la tabella dei professori
            buildProfessorTable(professorsList, assignedProfessors);
        });

        getStudentsList(function(studentsList) {
            // Costruire la tabella degli studenti
            buildStudentTable(studentsList, assignedStudents);
        });
    });
}

function assignOrUnassignClasses(entityId) {
    const token = localStorage.getItem('token');
    const checkedClassIds = $('input[name=classi]:checked').map(function() {
        return $(this).val();
    }).get();

    // Costruisci il payload per l'aggiornamento della classe
    const payload = {
        "professori": [{ "id": entityId }],
        "studenti": []
    };

    // Aggiungi solo le classi selezionate al payload
    payload.professori[0].classi = checkedClassIds.map(classId => ({ "id": classId }));

    // Invia la richiesta di aggiornamento per ogni classe selezionata
    checkedClassIds.forEach(classId => {
        updateClass(classId, payload);
    });

    // Ottieni gli ID delle classi già assegnate al professore
    const assignedClassIds = payload.professori[0].classi.map(classObj => classObj.id);

    // Ottieni gli ID delle classi deselezionate
    const unselectedClassIds = $('input[name=classi]').map(function() {
        const classId = $(this).val();
        return assignedClassIds.includes(classId) ? null : classId;
    }).get().filter(id => id !== null);

    // Costruisci il payload per disassegnare le classi deselezionate
    const unassignPayload = {
        "professori": [{ "id": entityId, "action": "remove" }],
        "studenti": []
    };

    // Disassegna le classi deselezionate
    unselectedClassIds.forEach(classId => {
        updateClass(classId, unassignPayload);
    });

    // Mostra un messaggio di conferma
    alert("Operazione completata con successo!");
}

function assignOrUnassignClasses2(initialSelectedClass, entityId) {
    const token = localStorage.getItem('token');
    const selectedClassId = $('input[name=classe]:checked').val();
    // Costruisci il payload per l'aggiornamento della classe
    const payload = {
        "professori": [],
        "studenti": [{ "id": entityId }]
    };

    if (selectedClassId === "none") {
        // Disassegna la classe attualmente assegnata
        const assignedClassId = initialSelectedClass ;
        if (assignedClassId) {
            const unassignPayload = {
                "professori": [],
                "studenti": [{ "id": entityId, "action": "remove" }]
            };
            updateClass(assignedClassId, unassignPayload);
        }
    } else {
        // Assegna la classe selezionata
        payload.studenti[0].classi = [{ "id": selectedClassId }];
        updateClass(selectedClassId, payload);
    }

    // Mostra un messaggio di conferma
    alert("Operazione completata con successo!");
}


function showEditForm(entityType, entityId) {
    const token = localStorage.getItem('token');
    const entityTable = $(`#${entityType}-table`);
    entityTable.fadeOut();
    $.ajax({
        url: `/api/classi`,
        type: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token
        },
        success: function (allClasses) {
            console.log(allClasses);
            $.ajax({
                url: `/api/${entityType}i/${entityId}`,
                type: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + token
                },
                success: function (data) {
                    const detailsContainer = $(`#${entityType}-details-container`);
                    detailsContainer.empty();
                    const editFormContainer = $(`#${entityType}-edit-form-container`);
                    editFormContainer.empty();

                    switch (entityType) {
                        case 'professor':
							const currentProfessorId = data.id;
                            editFormContainer.append(`<h2>Modifica Professore</h2>`);
                            editFormContainer.append(`<input type="hidden" name="id" value="${data.id}">`);
                            // Aggiungi campo di input per caricare una nuova immagine
					        editFormContainer.append(`<label for="immagine">Nuova Immagine:</label> <input type="hidden" name="immagine"> <input type="file" name="nuova-immagine" accept="image/*"><br>`);
					        // Mostra l'immagine attuale del professore
					        if(data.immagine){
					        	editFormContainer.append(`<img alt="Immagine del Professore" src="${data.immagine}" class="preview-image" name="immagine"><br>`);
					        } else {
						        editFormContainer.append(`<img alt="" src="" class="preview-image" name="immagine"><br>`);
						    }
                            editFormContainer.append(`<label for="nome">Nome:</label> <input type="text" name="nome" value="${data.nome}"><br>`);
                            editFormContainer.append(`<label for="cognome">Cognome:</label> <input type="text" name="cognome" value="${data.cognome}"><br>`);
                            editFormContainer.append(`<label for="eta">Età:</label> <input type="text" name="eta" value="${data.eta}"><br>`);
                            editFormContainer.append(`<label for="indirizzo">Indirizzo:</label> <input type="text" name="indirizzo" value="${data.indirizzo}"><br>`);
                            editFormContainer.append(`<label for="materia">Materia:</label> <input type="text" name="materia" value="${data.materia}"><br>`);
                            editFormContainer.append(`Assegna o Disassegna le classi:<br>`);
                            // Aggiungi una checkbox per ogni classe
                            allClasses.forEach(classe => {
                                const isChecked = data.classi && data.classi.find(c => c.id === classe.id);
                                editFormContainer.append(`<input type="checkbox" name="classi" value="${classe.id}" ${isChecked ? 'checked' : ''}>${classe.nome} - Anno: ${classe.anno}<br>`);
                            });
                            editFormContainer.append(`<button onclick="submitEditForm('${entityType}');assignOrUnassignClasses(${currentProfessorId})">Salva le Modifiche</button><br>`);

                            break;

                        case 'class':
							const currentClassId = data.id;
                            editFormContainer.append(`<h2>Modifica Classe</h2>`);
                            editFormContainer.append(`<input type="hidden" name="id" value="${data.id}">`);
                            editFormContainer.append(`<label for="nome">Nome:</label> <input type="text" name="nome" value="${data.nome}"><br>`);
                            editFormContainer.append(`<label for="anno">Anno:</label> <input type="text" name="anno" value="${data.anno}"><br>`);
                            editFormContainer.append(`<button onclick="showAssignmentTables(${currentClassId})">Assegna o Disasegna Studenti e Professori</button>`);
    						editFormContainer.append(`<h3 id="studentSelection" style="display: none;">Seleziona lo Studente</h3>`);
						    const studentTable = $('<table id="studentTable" style="display: none;"></table>');
						    editFormContainer.append(studentTable);
						    editFormContainer.append(`<h3 id="professorSelection" style="display: none;">Seleziona il Professore</h3>`);
						    const professorTable = $('<table id="professorTable" style="display: none;"></table>');
						    editFormContainer.append(professorTable);
						    editFormContainer.append(`<button onclick="submitEditForm('${entityType}');saveClassChanges(${currentClassId})">Salva le Modifiche</button>`);

                            break;

                        case 'student':
						    const currentStudentId = data.id;
						    editFormContainer.append(`<h2>Modifica Studente</h2>`);
						    editFormContainer.append(`<input type="hidden" name="id" value="${data.id}">`);
						    // Aggiungi campo di input per caricare una nuova immagine
						    editFormContainer.append(`<label for="immagine">Nuova Immagine:</label> <input type="hidden" name="immagine"> <input type="file" name="nuova-immagine" accept="image/*"><br>`);
						    // Mostra l'immagine attuale dello studente
						    if(data.immagine){
						        editFormContainer.append(`<img alt="Immagine dello Studente" src="${data.immagine}" class="preview-image" name="immagine"><br>`);
						    } else {
						        editFormContainer.append(`<img alt="" src="" class="preview-image" name="immagine"><br>`);
						    }
						    editFormContainer.append(`<label for="nome">Nome:</label> <input type="text" name="nome" value="${data.nome}"><br>`);
						    editFormContainer.append(`<label for="cognome">Cognome:</label> <input type="text" name="cognome" value="${data.cognome}"><br>`);
						    editFormContainer.append(`<label for="eta">Età:</label> <input type="text" name="eta" value="${data.eta}"><br>`);
						    editFormContainer.append(`<label for="indirizzo">Indirizzo:</label> <input type="text" name="indirizzo" value="${data.indirizzo}"><br>`);
						    editFormContainer.append(`<label>Seleziona una classe:</label><br>`);
						    const initialSelectedClass = data.classe && data.classe.id;
						    allClasses.forEach(classe => {
						        // Verifica se lo studente è già assegnato a questa classe
						        const isAssigned = data.classe && data.classe.id === classe.id;
						        editFormContainer.append(`<input type="radio" name="classe" value="${classe.id}" ${isAssigned ? 'checked' : ''}> ${classe.nome} - Anno: ${classe.anno}<br>`);
						    });
						    editFormContainer.append(`<input type="radio" name="classe" value="none" ${!data.classe ? 'checked' : ''}> Nessuna Classe<br>`);
						    editFormContainer.append(`<button onclick="submitEditForm('${entityType}');assignOrUnassignClasses2(${initialSelectedClass}, ${currentStudentId})">Salva le Modifiche</button><br>`);
						    break;

                    }
					editFormContainer.append(`<button onclick="cancelEdit('${entityType}')">Annulla</button>`);

                    
                    
                    // Aggiungi un evento change all'input file nel form di creazione
				    $('input[name=nuova-immagine]').on('change', async function(event) {
				        const imageFile = event.target.files[0];
				        const immagine = await convertImageToBase64(imageFile);
				        // Inserisci la stringa Base64 nell'immagine del form
				        $(this).siblings('img[name=immagine]').attr('src', immagine);
				        $(this).siblings('input[name=immagine]').attr('src', immagine);
				        $(this).siblings('input[name=immagine]').attr('value', immagine);
				        $(this).attr('src', immagine);
				    });

                },
                error: function (error) {
                    handleCommonErrorCases(error);
                }
            });
        },
        error: function (error) {
            handleCommonErrorCases(error);
        }
    });
}

function saveClassChanges(classId) {
    var selectedProfessors = $("#professorTable input[type='checkbox']:checked").map(function() {
        return this.value;
    }).get();

    var selectedStudents = $("#studentTable input[type='checkbox']:checked").map(function() {
        return this.value;
    }).get();

    var unselectedProfessors = $("#professorTable input[type='checkbox']:not(:checked)").map(function() {
        return this.value;
    }).get();

    var unselectedStudents = $("#studentTable input[type='checkbox']:not(:checked)").map(function() {
        return this.value;
    }).get();

    // Ottenere la lista degli studenti assegnati utilizzando la chiamata AJAX
    getClassDetails(classId, function(data) {
        const assignedStudents = data.studenti.map(student => student.id.toString());

        var payload = {
            "professori": [],
            "studenti": assignedStudents.map(id => ({ "id": parseInt(id) })) // Aggiungi tutti gli studenti già assegnati alla classe
        };

        selectedProfessors.forEach(function (id) {
            payload.professori.push({ "id": parseInt(id) });
        });

        selectedStudents.forEach(function (id) {
            if (!assignedStudents.includes(id)) {
                payload.studenti.push({ "id": parseInt(id) });
            }
        });

        unselectedProfessors.forEach(function (id) {
            payload.professori.push({ "id": parseInt(id), "action": "remove" });
        });

        // Aggiungi solo gli studenti deselezionati per la disassegnazione
        unselectedStudents.forEach(function (id) {
            if (assignedStudents.includes(id)) {
                payload.studenti.push({ "id": parseInt(id), "action": "remove" });
            }
        });

        updateClass(classId, payload);
        alert("Modifiche salvate con successo!");
    });
}


function buildProfessorTable(professors, assignedProfessors) {
    var professorTable = $("#professorTable");
    professorTable.empty(); // Svuota la tabella prima di ricostruirla

    professors.forEach(function(professor) {
        var isChecked = assignedProfessors.includes(professor.id.toString());
        var checkbox = $('<input type="checkbox" name="professorRadio" value="' + professor.id + '" ' + (isChecked ? 'checked' : '') + '>').appendTo('<td>');
        $('<tr>').append($('<td>').text(professor.id)).append($('<td>').text(professor.nome)).append($('<td>').text(professor.cognome)).append($('<td>').text(professor.materia)).append(checkbox).appendTo(professorTable);
    });
}

function buildStudentTable(students, assignedStudents) {
    var studentTable = $("#studentTable");
    studentTable.empty(); // Svuota la tabella prima di ricostruirla

    students.forEach(function(student) {
        var isChecked = assignedStudents.includes(student.id.toString());
        var checkbox = $('<input type="checkbox" name="studentRadio" value="' + student.id + '" ' + (isChecked ? 'checked' : '') + '>').appendTo('<td>');
        $('<tr>').append($('<td>').text(student.id)).append($('<td>').text(student.nome)).append($('<td>').text(student.cognome)).append($('<td>').text((student.classe ? student.classe.nome : 'N/D'))).append(checkbox).appendTo(studentTable);
    });
}

function cancelEdit(entityType) {
    const editFormContainer = $(`#${entityType}-edit-form-container`);
    const detailsContainer = $(`#${entityType}-details-container`);
    
    editFormContainer.empty();
    detailsContainer.empty();

    $(`#${entityType}-table`).fadeIn(1000);
}



function submitEditForm(entityType) {
    const token = localStorage.getItem('token');
    const editFormContainer = $(`#${entityType}-edit-form-container`);
    
    const formData = {};
    editFormContainer.find('input').each(function () {
        formData[$(this).attr('name')] = $(this).val();
    });
    
    // Esclusione delle classi se l'entità è un professore
    if (entityType === 'professor') {
        // Rimuovi le classi dal formData
        delete formData.classi;
    }
    
    if (entityType ==='student') {
		delete formData.classe;
	}

    $.ajax({
        url: `/api/${entityType}i/${formData.id}`,
        type: 'PUT',
        headers: {
            'Authorization': 'Bearer ' + token
        },
        contentType: 'application/json',
        data: JSON.stringify(formData),
        success: function (data) {
            console.log('Dati aggiornati con successo:', data);
            editFormContainer.empty();
            $(`#${entityType}-table`).fadeIn();
            switch (entityType) {
                    case 'professor':
                        getProfessors();
                        break;
                    case 'class':
                        getClasses();
                        break;
                    case 'student':
                        getStudents();
                        break;
                }
        },
        error: function (error) {
            handleCommonErrorCases(error);
        }
    });
}

function deleteEntity(entityType, entityId) {
    const token = localStorage.getItem('token');
    const confirmed = confirm('Sei sicuro di voler eliminare questa entità?');

    if (confirmed) {
        $.ajax({
            url: `/api/${entityType}i/${entityId}`,
            type: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token
            },
            success: function (data) {
                // Verifica se l'entità è associata a una classe
                if (entityType === 'professor' && data.classe) {
                    alert('Impossibile eliminare il professore. È già associato a una classe.');
                } else if (entityType === 'student' && data.classe) {
                    alert('Impossibile eliminare lo studente. È già associato a una classe.');
                } else {
                    $(`#${entityType}-table-row-${entityId}`).fadeOut(500, function() {
                        // Quando l'animazione è completata, esegui la cancellazione effettiva
                        performDelete(entityType, entityId);
                    });
                }
            },
            error: function (error) {
                handleCommonErrorCases(error);
            }
        });
    }
}

function performDelete(entityType, entityId) {
    const token = localStorage.getItem('token');
    $.ajax({
        url: `/api/${entityType}i/${entityId}`,
        type: 'DELETE',
        headers: {
            'Authorization': 'Bearer ' + token
        },
        success: function () {
            console.log(`${entityType} eliminato con successo`);
            switch (entityType) {
                case 'professor':
                    getProfessors();
                    break;
                case 'class':
                    getClasses();
                    break;
                case 'student':
                    getStudents();
                    break;
            }
        },
        error: function (error) {
            handleCommonErrorCases(error);
        }
    });
}

function showCreateForm(entityType) {
    const detailsContainer = $(`#${entityType}-details-container`);
    detailsContainer.empty();
    const editFormContainer = $(`#${entityType}-edit-form-container`);
    editFormContainer.empty();

	$(`#${entityType}-table`).fadeOut();

    switch (entityType) {
        case 'professor':
            editFormContainer.append(`<h2>Crea Professore</h2>`);
            editFormContainer.append(`<label for="nome">Nome:</label> <input type="text" name="nome"><br>`);
            editFormContainer.append(`<label for="cognome">Cognome:</label> <input type="text" name="cognome"><br>`);
            editFormContainer.append(`<label for="eta">Età:</label> <input type="text" name="eta"><br>`);
            editFormContainer.append(`<label for="indirizzo">Indirizzo:</label> <input type="text" name="indirizzo"><br>`);
            editFormContainer.append(`<label for="materia">Materia:</label> <input type="text" name="materia"><br>`);
           	editFormContainer.append(`<label for="immagine">Immagine del Professore:</label> <input type="hidden" name="immagine"> <input type="file" name="immagine1" accept="image/*"><br>`);
            editFormContainer.append(`<img alt="Immagine del Professore" src="" class="preview-image" name="immagine">`);
            editFormContainer.append(`<button onclick="submitCreateForm('${entityType}')">Crea</button>`);
    		editFormContainer.append(`<button onclick="cancelCreate('${entityType}')">Annulla</button>`);
    		console.log(immagine);
            break;

        case 'class':
            editFormContainer.append(`<h2>Crea Classe</h2>`);
            editFormContainer.append(`<label for="nome">Nome:</label> <input type="text" name="nome"><br>`);
            editFormContainer.append(`<label for="anno">Anno:</label> <input type="text" name="anno"><br>`);
            editFormContainer.append(`<button onclick="submitCreateForm('${entityType}')">Crea</button>`);
    		editFormContainer.append(`<button onclick="cancelCreate('${entityType}')">Annulla</button>`);
            break;

        case 'student':
            editFormContainer.append(`<h2>Crea Studente</h2>`);
            editFormContainer.append(`<label for="nome">Nome:</label> <input type="text" name="nome"><br>`);
            editFormContainer.append(`<label for="cognome">Cognome:</label> <input type="text" name="cognome"><br>`);
            editFormContainer.append(`<label for="eta">Età:</label> <input type="text" name="eta"><br>`);
            editFormContainer.append(`<label for="indirizzo">Indirizzo:</label> <input type="text" name="indirizzo"><br>`);
            editFormContainer.append(`<label for="immagine">Immagine dello Studente:</label> <input type="hidden" name="immagine"> <input type="file" name="immagine1" accept="image/*"><br>`);
            editFormContainer.append(`<img alt="Immagine dello Studente" src="" class="preview-image" name="immagine">`);
            editFormContainer.append(`<button onclick="submitCreateForm('${entityType}')">Crea</button>`);
    		editFormContainer.append(`<button onclick="cancelCreate('${entityType}')">Annulla</button>`);
            break;
    }
    // Aggiungi un evento change all'input file nel form di creazione
    $('input[name=immagine1]').on('change', async function(event) {
        const imageFile = event.target.files[0];
        const immagine = await convertImageToBase64(imageFile);
        // Inserisci la stringa Base64 nell'immagine del form
        $(this).siblings('img[name=immagine]').attr('src', immagine);
        $(this).siblings('input[name=immagine]').attr('src', immagine);
        $(this).siblings('input[name=immagine]').attr('value', immagine);
        $(this).attr('src', immagine);
    });
}

// Funzione per convertire un'immagine in Base64
function convertImageToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.onerror = error => {
      reject(error);
    };
  });
}

function cancelCreate(entityType) {
    const editFormContainer = $(`#${entityType}-edit-form-container`);
    const detailsContainer = $(`#${entityType}-details-container`);
    
    editFormContainer.empty();
    detailsContainer.empty();

    $(`#${entityType}-table`).fadeIn(1000);
}


function submitCreateForm(entityType) {
    const token = localStorage.getItem('token');
    const editFormContainer = $(`#${entityType}-edit-form-container`);

    const formData = {};
    editFormContainer.find('input').each(function () {
        formData[$(this).attr('name')] = $(this).val();
    });

    $.ajax({
        url: `/api/${entityType}i`,
        type: 'POST',
        headers: {
            'Authorization': 'Bearer ' + token
        },
        contentType: 'application/json',
        data: JSON.stringify(formData),
        success: function (data) {
            console.log('Dati creati con successo:', data);
            editFormContainer.empty();
            // Se l'entityType è 'class', mostriamo i pulsanti di assegnazione e disassegnazione solo dopo aver creato la classe
            if (entityType === 'class') {
				const currentClassId = data.id;
                editFormContainer.append(`<button id="ass" style="display:none;" onclick="showAssignmentTables(${currentClassId})">Assegna o Disassegna Studenti e Professori</button>`);
                editFormContainer.append(`<button onclick="cancelCreate('${entityType}')">Indietro</button>`);
                editFormContainer.append(`<h3 id="studentSelection" style="display: none;">Seleziona lo Studente</h3>`);
			    const studentTable = $('<table id="studentTable" style="display: none;"></table>');
			    editFormContainer.append(studentTable);
			    editFormContainer.append(`<h3 id="professorSelection" style="display: none;">Seleziona il Professore</h3>`);
			    const professorTable = $('<table id="professorTable" style="display: none;"></table>');
			    editFormContainer.append(professorTable);
			    editFormContainer.append(`<button id="assignButton" style="display:none;" onclick="assignStudentsAndProfessors('both', ${data.id})">Assegna</button>`);
			    editFormContainer.append(`<button onclick="saveClassChanges(${currentClassId})">Salva le Modifiche</button>`);
                // Se l'ID della classe è definito, mostriamo i pulsanti di assegnazione e disassegnazione
                if (data.id) {
                    editFormContainer.find('#ass').show();
                }
            } else {
                $('#professor-table').show();
                $('#student-table').show();
            }
            switch (entityType) {
                case 'professor':
                    getProfessors();
                    break;
                case 'class':
                    getClasses();
                    break;
                case 'student':
                    getStudents();
                    break;
            }
        },
        error: function (error) {
            handleCommonErrorCases(error);
        }
    });
}

function getClassesList(callback) {
    const token = localStorage.getItem('token');

    $.ajax({
        type: 'GET',
        url: '/api/classi',
        headers: {
            'Authorization': 'Bearer ' + token
        },
        success: function (classList) {
            callback(classList);
        },
        error: function (error) {
            console.error('Errore durante il recupero dell\'elenco delle classi:', error);
        }
    });
}

function getProfessorsList(callback) {
    const token = localStorage.getItem('token');

    $.ajax({
        type: 'GET',
        url: '/api/professori',
        headers: {
            'Authorization': 'Bearer ' + token
        },
        success: function (professorsList) {
            callback(professorsList);
        },
        error: function (error) {
            console.error('Errore durante il recupero dell\'elenco dei professori:', error);
        }
    });
}

function getStudentsList(callback) {
    const token = localStorage.getItem('token');

    $.ajax({
        type: 'GET',
        url: '/api/studenti',
        headers: {
            'Authorization': 'Bearer ' + token
        },
        success: function (studentsList) {
            callback(studentsList);
        },
        error: function (error) {
            console.error('Errore durante il recupero dell\'elenco dei studenti:', error);
        }
    });
}


// Funzione per popolare dinamicamente la tabella delle classi
function displayClassesList(classesList) {
    var classTable = $('#classTable');
    var classTable2 = $('#classTableUnassign')
    classTable.empty();
    classTable2.empty();

    classesList.forEach(function (classe) {
        var row = '<tr>' +
            '<td><input type="radio" name="classRadio" value="' + classe.nome + '"></td>' +
            '<td>' + classe.id + '</td>' +
            '<td>' + classe.nome + '</td>' +
            '<td>' + classe.anno + '</td>' +
            '</tr>';

        classTable.append(row);
        classTable2.append(row);
    });
    
    // Aggiungi un evento change per rilevare la selezione di una nuova classe
    $('#classTableUnassign input[type="radio"]').change(function() {
        var className = $(this).val();
        console.log(className);
        
        filterTablesByClass(className);
    });
}

// Funzione per filtrare automaticamente le tabelle dei professori e degli studenti in base al nome della classe selezionata
function filterTablesByClass(className) {

    // Mostra solo i professori e gli studenti associati alla classe selezionata
    $('#professorTableUnassign tr, #studentTableUnassign tr').each(function() {
        var classValue;

        // Determina la tabella corrente in base al genitore del tr
        var $parentTable = $(this).closest('table');

        // Verifica se la tabella è quella dei professori o degli studenti e imposta il selettore di colonna appropriato
        if ($parentTable.attr('id') === 'professorTableUnassign') {
            classValue = $(this).find('td:eq(5)').text(); // Colonna corretta per la tabella dei professori
        } else if ($parentTable.attr('id') === 'studentTableUnassign') {
            classValue = $(this).find('td:eq(4)').text(); // Colonna corretta per la tabella degli studenti
        }
        // Controlla se il valore della classe corrisponde al nome della classe selezionata
        if (classValue === className) {
            $(this).show();
        } else {
            $(this).hide();
        }
    });
}


// Funzione per popolare dinamicamente la tabella dei professori
function displayProfessorsList(professorsList) {
    var professorTable = $('#professorTable');
    var professorTable2 = $('#professorTableUnassign');
    professorTable.empty();
    professorTable2.empty();
    
    professorsList.forEach(function (professor) {
        var row = '<tr>' +
            '<td><input type="checkbox" name="professorRadio" value="' + professor.id + '"></td>' +
            '<td>' + professor.id + '</td>' +
            '<td>' + professor.nome + '</td>' +
            '<td>' + professor.cognome + '</td>' +
            '<td>' + professor.materia + '</td>' +
            '</tr>';

        professorTable.append(row);
        professorTable2.append(row);
    });
}

// Funzione per popolare dinamicamente la tabella degli studenti
function displayStudentsList(studentsList) {
    var studentTable = $('#studentTable');
    var studentTable2 = $('#studentTableUnassign');
    studentTable.empty();
    studentTable2.empty();

    studentsList.forEach(function (student) {
        var row = '<tr>' +
            '<td><input type="checkbox" name="studentRadio" value="' + student.id + '"></td>' +
            '<td>' + student.id + '</td>' +
            '<td>' + student.nome + '</td>' +
            '<td>' + student.cognome + '</td>' +
            '<td>' + (student.classe ? student.classe.nome : 'N/D') + '</td>' +
            '</tr>';

        studentTable.append(row);
        studentTable2.append(row);
    });
}












