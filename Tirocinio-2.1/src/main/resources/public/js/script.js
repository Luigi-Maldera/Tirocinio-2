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


function createProfessor() {
    const token = localStorage.getItem('token');

    const professorData = {
        nome: prompt('Inserisci il nome del professore:'),
        cognome: prompt('Inserisci il cognome del professore:'),
        eta: prompt('Inserisci l\'età del professore:'),
        indirizzo: prompt('Inserisci l\'indirizzo del professore:'),
        materia: prompt('Inserisci la materia del professore')
    };

    $.ajax({
        url: '/api/professori',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(professorData),
        headers: {
            'Authorization': 'Bearer ' + token
        },
        success: function (data) {
            console.log('Professore creato con successo:', data);
            getProfessors();
        },
        error: function (error) {
            handleCommonErrorCases(error);
        }
    });
}

function updateProfessor() {
    const token = localStorage.getItem('token');

    const professorId = prompt('Inserisci l\'ID del professore da aggiornare:');

    if (professorId) {
        const updatedProfessorData = {
            nome: prompt('Inserisci il nuovo nome del professore:'),
            cognome: prompt('Inserisci il nuovo cognome del professore:'),
            eta: prompt('Inserisci la nuova età del professore:'),
            indirizzo: prompt('Inserisci il nuovo indirizzo del professore:'),
            materia: prompt('Inserisci la nuova materia insegnata dal professore')
        };

        $.ajax({
            url: `/api/professori/${professorId}`,
            type: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify(updatedProfessorData),
            headers: {
                'Authorization': 'Bearer ' + token
            },
            success: function (data) {
                console.log('Professore aggiornato con successo:', data);
                getProfessors();
            },
            error: function (error) {
                handleCommonErrorCases(error);
            }
        });
    }
}


function deleteProfessor() {
    const token = localStorage.getItem('token');

    const professorId = prompt('Inserisci l\'ID del professore da eliminare:');

    if (professorId) {
        $.ajax({
            url: `/api/professori/${professorId}`,
            type: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' + token
            },
            success: function () {
                console.log('Professore eliminato con successo');
                getProfessors();
            },
            error: function (error) {
                handleCommonErrorCases(error);
            }
        });
    }
}

function displayProfessors(professors) {
    const tableBody = $('#professor-table tbody');
    tableBody.empty();

    professors.forEach(professor => {
        tableBody.append(`
            <tr id="professor-table-row-${professor.id}"> <!-- Modificato l'ID del record della tabella -->
                <td>${professor.id}</td>
                <td>${professor.nome}</td>
                <td>${professor.cognome}</td>
                <td>${professor.materia}</td>
                <td>
			        <button onclick="showDetails('professor', ${professor.id})">Dettagli</button>
			        <button onclick="showEditForm('professor', ${professor.id})">Modifica</button>
			        <button onclick="deleteEntity('professor', ${professor.id})">Elimina</button>
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
                <td>${classe.id}</td>
                <td>${classe.nome}</td>
                <td>${classe.anno}</td>
                <td>
                    <button onclick="showDetails('class', ${classe.id})">Dettagli</button>
                    <button onclick="showEditForm('class', ${classe.id})">Modifica</button>
                    <button onclick="deleteEntity('class', ${classe.id})">Elimina</button>
                </td>
            </tr>
        `);
    });
    $('#class-table').fadeIn();
}


// Function to create a new class
function createClass() {
    const token = localStorage.getItem('token');
    var className = prompt('Inserisci il nome della classe:');
    var classYear = prompt('Inserisci l\'anno della classe:');
    if (className && classYear) {
        $.ajax({
            type: 'POST',
            url: '/api/classi',
            contentType: 'application/json',
            data: JSON.stringify({ nome: className, anno: classYear }),
            headers: {
                'Authorization': 'Bearer ' + token
            },
            success: function (data) {
                alert('Class created successfully!');
                getClasses();
            },
            error: function (error) {
                handleCommonErrorCases(error);
            }
        });
    }
}

// Function to update an existing class
function updateClass1() {
    const token = localStorage.getItem('token');
    var classId = prompt('Enter the ID of the class to update:');
    var className = prompt('Enter the new name of the class:');
    var classYear = prompt('Enter the new year of the class:');
    if (classId && className && classYear) {
        $.ajax({
            type: 'PUT',
            url: '/api/classi/' + classId,
            contentType: 'application/json',
            data: JSON.stringify({
                nome: className,
                anno: classYear,
                professori: [],
                studenti: []
            }),
            headers: {
                'Authorization': 'Bearer ' + token
            },
            success: function (data) {
                alert('Class updated successfully!');
                getClasses();
            },
            error: function (error) {
                handleCommonErrorCases(error);
            }
        });
    }
}

// Function to delete a class
function deleteClass() {
    const token = localStorage.getItem('token');
    var classId = prompt('Enter the ID of the class to delete:');
    if (classId) {
        $.ajax({
            type: 'DELETE',
            url: '/api/classi/' + classId,
            headers: {
                'Authorization': 'Bearer ' + token
            },
            success: function (data) {
                alert('Class deleted successfully!');
                getClasses();
            },
            error: function (error) {
                handleCommonErrorCases(error);
            }
        });
    }
}

// Function to get all students
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

// Function to display students
function displayStudents(students) {
    const tableBody = $('#student-table tbody');
    tableBody.empty();

    students.forEach(student => {
        tableBody.append(`
            <tr id="student-table-row-${student.id}"> <!-- Modificato l'ID del record della tabella -->
                <td>${student.id}</td>
                <td>${student.nome}</td>
                <td>${student.cognome}</td>
                <td>${student.classe ? student.classe.nome : 'N/D'}</td>
                <td>
                    <button onclick="showDetails('student', ${student.id})">Dettagli</button>
                    <button onclick="showEditForm('student', ${student.id})">Modifica</button>
                    <button onclick="deleteEntity('student', ${student.id})">Elimina</button>
                </td>
            </tr>
        `);
    });
    $('#student-table').fadeIn();
}

// Function to create a new student
function createStudent() {
    const token = localStorage.getItem('token');
    var studentName = prompt('Enter the student name:');
    var studentSurname = prompt('Enter the student surname:');
    var studentAge = prompt('Enter the student age:');
    var studentAddress = prompt('Enter the student address:');
    if (studentName && studentSurname && studentAge && studentAddress) {
        $.ajax({
            type: 'POST',
            url: '/api/studenti',
            contentType: 'application/json',
            data: JSON.stringify({
                nome: studentName,
                cognome: studentSurname,
                eta: studentAge,
                indirizzo: studentAddress
            }),
            headers: {
                'Authorization': 'Bearer ' + token
            },
            success: function (data) {
                alert('Student created successfully!');
                getStudents();
            },
            error: function (error) {
                handleCommonErrorCases(error);
            }
        });
    }
}

// Function to update an existing student
function updateStudent() {
    const token = localStorage.getItem('token');
    var studentId = prompt('Enter the ID of the student to update:');
    var studentName = prompt('Enter the new name of the student:');
    var studentSurname = prompt('Enter the new surname of the student:');
    var studentAge = prompt('Enter the new age of the student:');
    var studentAddress = prompt('Enter the new address of the student:');
    if (studentId && studentName && studentSurname && studentAge && studentAddress) {
        $.ajax({
            type: 'PUT',
            url: '/api/studenti/' + studentId,
            contentType: 'application/json',
            data: JSON.stringify({
                nome: studentName,
                cognome: studentSurname,
                eta: studentAge,
                indirizzo: studentAddress
            }),
            headers: {
                'Authorization': 'Bearer ' + token
            },
            success: function (data) {
                alert('Student updated successfully!');
                getStudents();
            },
            error: function (error) {
                handleCommonErrorCases(error);
            }
        });
    }
}

// Function to delete a student
function deleteStudent() {
    const token = localStorage.getItem('token');
    var studentId = prompt('Enter the ID of the student to delete:');

    if (studentId) {
        $.ajax({
            type: 'DELETE',
            url: '/api/studenti/' + studentId,
            headers: {
                'Authorization': 'Bearer ' + token
            },
            success: function (data) {
                alert('Student deleted successfully!');
                getStudents();
            },
            error: function (error) {
                handleCommonErrorCases(error);
            }
        });
    }
}


// Function to update an existing class with professors and students
function updateClassWithAssignments() {
    const token = localStorage.getItem('token');
    var classId = prompt('Enter the ID of the class to update:');
    var className = prompt('Enter the new name of the class:');
    var classYear = prompt('Enter the new year of the class:');

    if (classId && className && classYear) {
        
        var professorIds = [];
        do {
            var professorId = prompt('Enter Professor ID to assign (press Cancel to finish):');
            if (professorId) {
                professorIds.push({ id: parseInt(professorId) });
            }
        } while (professorId);

        
        var studentIds = [];
        do {
            var studentId = prompt('Enter Student ID to assign (press Cancel to finish):');
            if (studentId) {
                studentIds.push({ id: parseInt(studentId) });
            }
        } while (studentId);

        
        const updatedClassData = {
            nome: className,
            anno: classYear,
            professori: professorIds,
            studenti: studentIds
        };

        $.ajax({
            type: 'PUT',
            url: `/api/classi/${classId}`,
            contentType: 'application/json',
            data: JSON.stringify(updatedClassData),
            headers: {
                'Authorization': 'Bearer ' + token
            },
            success: function (data) {
                alert('Class updated successfully with assignments!');
                getClasses();
            },
            error: function (error) {
                handleCommonErrorCases(error);
            }
        });
    }
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
// Funzione per assegnare un professore a una classe
function assignProfessorToClass() {
    var classeId = prompt('Enter the ID of the class to assign:'); 

    getProfessorsList(function (professorsList) {
        var orderedList = professorsList.map(professor => `• ${professor.id}: ${professor.nome} ${professor.cognome}`);

        alert('Select Professor ID to assign:\n' + orderedList.join('\n'));

        var professorIndex = prompt('Enter the ID of the professor to assign:');

        var selectedProfessor = professorsList.find(professor => professor.id === parseInt(professorIndex));

        if (professorIndex && selectedProfessor) {
            var payload = {
                "professori": [
                    {
                        "id": selectedProfessor.id
                    }
                ],
                "studenti": []
            };

            updateClass(classeId, payload);
        } else {
            alert('Invalid selection. Please select a valid professor.');
        }
    });
}

// Funzione per disassegnare un professore da una classe
function unassignProfessorFromClass() {
    var classeId = prompt('Enter the ID of the class to unassign:');

    getProfessorsList(function (professorsList) {
        var orderedList = professorsList.map(professor => `• ${professor.id}: ${professor.nome} ${professor.cognome}`);

        alert('Select Professor ID to unassign:\n' + orderedList.join('\n'));

        var professorIndex = prompt('Enter the ID of the professor to unassign:');

        var selectedProfessor = professorsList.find(professor => professor.id === parseInt(professorIndex));

        if (professorIndex && selectedProfessor) {
            var payload = {
                "professori": [
                    {
                        "id": selectedProfessor.id,
                        "action": "remove"
                    }
                ],
                "studenti": []
            };

            updateClass(classeId, payload);
        } else {
            alert('Invalid selection. Please select a valid professor.');
        }
    });
}

// Funzione per assegnare uno studente a una classe
function assignStudentToClass() {
    var classeId = prompt('Enter the ID of the class to assign:'); 

    getStudentsList(function (studentsList) {
        var orderedList = studentsList.map(student => `• ${student.id}: ${student.nome} ${student.cognome}`);

        alert('Select Student ID to assign:\n' + orderedList.join('\n'));

        var studentIndex = prompt('Enter the ID of the student to assign:');

        var selectedStudent = studentsList.find(student => student.id === parseInt(studentIndex));

        if (studentIndex && selectedStudent) {
            var payload = {
                "professori": [],
                "studenti": [
                    {
                        "id": selectedStudent.id
                    }
                ]
            };

            updateClass(classeId, payload);
        } else {
            alert('Invalid selection. Please select a valid student.');
        }
    });
}

// Funzione per disassegnare uno studente da una classe
function unassignStudentFromClass() {
    var classeId = prompt('Enter the ID of the class to unassign:');

    getStudentsList(function (studentsList) {
        
        var orderedList = studentsList.map(student => `• ${student.id}: ${student.nome} ${student.cognome}`);

        alert('Select Student ID to unassign:\n' + orderedList.join('\n'));

        var studentIndex = prompt('Enter the ID of the student to unassign:');

        var selectedStudent = studentsList.find(student => student.id === parseInt(studentIndex));

        if (studentIndex && selectedStudent) {
            var payload = {
                "professori": [],
                "studenti": [
                    {
                        "id": selectedStudent.id,
                        "action": "remove"
                    }
                ]
            };

            updateClass(classeId, payload);
        } else {
            alert('Invalid selection. Please select a valid student.');
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
                    detailsContainer.append(`<p>Classe Assegnata: ${(data.classe ? data.classe.nome : 'N/D')}</p>`);
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
                    detailsContainer.append(`<p>Classe Assegnata: ${(data.classe ? data.classe.nome : 'N/D')}</p>`);
                    break;

            }
            detailsContainer.append(`<button onclick="cancelEdit('${entityType}')">Chiudi</button>`);
        },
        error: function (error) {
            handleCommonErrorCases(error);
        }
    });
}

function showEditForm(entityType, entityId) {
    const token = localStorage.getItem('token');
	$(`#${entityType}-table`).fadeOut();
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
                    editFormContainer.append(`<h2>Modifica Professore</h2>`);
                    editFormContainer.append(`<input type="hidden" name="id" value="${data.id}">`);
                    editFormContainer.append(`<label for="nome">Nome:</label> <input type="text" name="nome" value="${data.nome}"><br>`);
                    editFormContainer.append(`<label for="cognome">Cognome:</label> <input type="text" name="cognome" value="${data.cognome}"><br>`);
                    editFormContainer.append(`<label for="eta">Età:</label> <input type="text" name="eta" value="${data.eta}"><br>`);
                    editFormContainer.append(`<label for="indirizzo">Indirizzo:</label> <input type="text" name="indirizzo" value="${data.indirizzo}"><br>`);
                    editFormContainer.append(`<label for="materia">Materia:</label> <input type="text" name="materia" value="${data.materia}"><br>`);
                    break;

                case 'class':
                    editFormContainer.append(`<h2>Modifica Classe</h2>`);
                    editFormContainer.append(`<input type="hidden" name="id" value="${data.id}">`);
                    editFormContainer.append(`<label for="nome">Nome:</label> <input type="text" name="nome" value="${data.nome}"><br>`);
                    editFormContainer.append(`<label for="anno">Anno:</label> <input type="text" name="anno" value="${data.anno}"><br>`);
                    break;

                case 'student':
                    editFormContainer.append(`<h2>Modifica Studente</h2>`);
                    editFormContainer.append(`<input type="hidden" name="id" value="${data.id}">`);
                    editFormContainer.append(`<label for="nome">Nome:</label> <input type="text" name="nome" value="${data.nome}"><br>`);
                    editFormContainer.append(`<label for="cognome">Cognome:</label> <input type="text" name="cognome" value="${data.cognome}"><br>`);
                    editFormContainer.append(`<label for="eta">Età:</label> <input type="text" name="eta" value="${data.eta}"><br>`);
                    editFormContainer.append(`<label for="indirizzo">Indirizzo:</label> <input type="text" name="indirizzo" value="${data.indirizzo}"><br>`);
                    break;

            }
            
            editFormContainer.append(`<button onclick="submitEditForm('${entityType}')">Salva Modifiche</button>`);
            editFormContainer.append(`<button onclick="cancelEdit('${entityType}')">Annulla</button>`);

        },
        error: function (error) {
            handleCommonErrorCases(error);
        }
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
                    // Animazione di dissolvenza sul record della tabella
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

    // Nascondi le tabelle all'inizio
	$(`#${entityType}-table`).fadeOut();

    switch (entityType) {
        case 'professor':
            editFormContainer.append(`<h2>Crea Professore</h2>`);
            editFormContainer.append(`<label for="nome">Nome:</label> <input type="text" name="nome"><br>`);
            editFormContainer.append(`<label for="cognome">Cognome:</label> <input type="text" name="cognome"><br>`);
            editFormContainer.append(`<label for="eta">Età:</label> <input type="text" name="eta"><br>`);
            editFormContainer.append(`<label for="indirizzo">Indirizzo:</label> <input type="text" name="indirizzo"><br>`);
            editFormContainer.append(`<label for="materia">Materia:</label> <input type="text" name="materia"><br>`);
            break;

        case 'class':
            editFormContainer.append(`<h2>Crea Classe</h2>`);
            editFormContainer.append(`<label for="nome">Nome:</label> <input type="text" name="nome"><br>`);
            editFormContainer.append(`<label for="anno">Anno:</label> <input type="text" name="anno"><br>`);
            break;

        case 'student':
            editFormContainer.append(`<h2>Crea Studente</h2>`);
            editFormContainer.append(`<label for="nome">Nome:</label> <input type="text" name="nome"><br>`);
            editFormContainer.append(`<label for="cognome">Cognome:</label> <input type="text" name="cognome"><br>`);
            editFormContainer.append(`<label for="eta">Età:</label> <input type="text" name="eta"><br>`);
            editFormContainer.append(`<label for="indirizzo">Indirizzo:</label> <input type="text" name="indirizzo"><br>`);
            break;
    }

    editFormContainer.append(`<button onclick="submitCreateForm('${entityType}')">Crea</button>`);
    editFormContainer.append(`<button onclick="cancelCreate('${entityType}')">Annulla</button>`);
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
            $('#professor-table').show();
            $('#class-table').show();
            $('#student-table').show();
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


function assignToClass(classType) {
    // Ottenere il valore selezionato dalla tabella delle classi
    var classId = $("#classTable input[type='radio']:checked").val();

    // Ottenere i valori selezionati dalla tabella dei professori e/o studenti
    var selectedProfessors = $("#professorTable input[type='checkbox']:checked").map(function() {
        return this.value;
    }).get();

    var selectedStudents = $("#studentTable input[type='checkbox']:checked").map(function() {
        return this.value;
    }).get();

    // Verifica se la classe e almeno un professore o studente sono stati selezionati
    if (classId && (selectedProfessors.length > 0 || selectedStudents.length > 0)) {
        var payload = {
            "professori": [],
            "studenti": []
        };

        // Aggiungi professori al payload se la classe è di tipo professore
        if (classType === "professor" || classType === "both") {
            selectedProfessors.forEach(function (id) {
                payload.professori.push({ "id": parseInt(id) });
            });
        }

        // Aggiungi studenti al payload se la classe è di tipo studente
        if (classType === "student" || classType === "both") {
            selectedStudents.forEach(function (id) {
                payload.studenti.push({ "id": parseInt(id) });
            });
        }

        // Chiamare la tua funzione di aggiornamento della classe con l'ID della classe e il payload
        updateClass(classId, payload);

        // Aggiorna la tabella delle classi dopo l'assegnazione
        getClassesList(displayClassesList);
        alert("Assegnazione completata con successo!");
    } else {
        alert('Seleziona una classe e almeno un professore o studente per l\'assegnazione.');
    }
}



function unassignToClass(classType) {
    // Ottenere il valore selezionato dalla tabella delle classi
    var classId = $("#classTableUnassign input[type='radio']:checked").val();

    // Ottenere i valori selezionati dalla tabella dei professori e/o studenti
    var selectedProfessors = $("#professorTableUnassign input[type='checkbox']:checked").map(function() {
        return this.value;
    }).get();

    var selectedStudents = $("#studentTableUnassign input[type='checkbox']:checked").map(function() {
        return this.value;
    }).get();

    // Verifica se la classe e almeno un professore o studente sono stati selezionati
    if (classId && (selectedProfessors.length > 0 || selectedStudents.length > 0)) {
        var payload = {
            "professori": [],
            "studenti": []
        };

        // Aggiungi professori al payload se la classe è di tipo professore
        if (classType === "professor" || classType === "both") {
            selectedProfessors.forEach(function (id) {
                payload.professori.push({ "id": parseInt(id), "action": "remove" });
            });
        }

        // Aggiungi studenti al payload se la classe è di tipo studente
        if (classType === "student" || classType === "both") {
            selectedStudents.forEach(function (id) {
                payload.studenti.push({ "id": parseInt(id), "action": "remove" });
            });
        }

        // Chiamare la tua funzione di aggiornamento della classe con l'ID della classe e il payload
        updateClass(classId, payload);

        // Aggiorna la tabella delle classi dopo l'assegnazione
        getClassesList(displayClassesList);
        alert("Disassegnazione completata con successo!");
    } else {
        alert('Seleziona una classe e almeno un professore o studente per la disassegnazione.');
    }
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
            // Chiama la funzione di callback con l'elenco delle classi
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
            // Chiama la funzione di callback con l'elenco dei professori
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
            // Chiama la funzione di callback con l'elenco dei professori
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
            '<td><input type="radio" name="classRadio" value="' + classe.id + '"></td>' +
            '<td>' + classe.id + '</td>' +
            '<td>' + classe.nome + '</td>' +
            '<td>' + classe.anno + '</td>' +
            '</tr>';

        classTable.append(row);
        classTable2.append(row);
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
            '</tr>';

        studentTable.append(row);
        studentTable2.append(row);
    });
}









