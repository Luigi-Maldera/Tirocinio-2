// script.js

function showSection(sectionId) {
    $('.section').hide();
    $('#' + sectionId).show();
}

// Function to handle common error cases
function handleCommonErrorCases(error) {
    if (error.status === 401) {
        // Redirect to the login page when Unauthorized (401) error occurs
        window.location.href = '/login.html';
    } else {
        console.error('Error:', error.responseText);
    }
}

// Function to get professors
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

// Function to create professor
function createProfessor() {
    const token = localStorage.getItem('token');

    const professorData = {
        nome: prompt('Enter Professor Name:'),
        cognome: prompt('Enter Professor Surname:'),
        eta: prompt('Enter Professor Age:'),
        indirizzo: prompt('Enter Professor Address:'),
        materia: prompt('Enter Professor Subject')
        // Add other professor properties if necessary
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
            console.log('Professor created successfully:', data);
            getProfessors();
        },
        error: function (error) {
            handleCommonErrorCases(error);
        }
    });
}

// Function to update professor
function updateProfessor() {
    const token = localStorage.getItem('token');

    const professorId = prompt('Enter Professor ID to update:');

    if (professorId) {
        const updatedProfessorData = {
            nome: prompt('Enter Updated Professor Name:'),
            cognome: prompt('Enter Updated Professor Surname:'),
            eta: prompt('Enter Updated Professor Age:'),
            indirizzo: prompt('Enter Updated Professor Address:'),
            materia: prompt('Enter Updated Professor Subject')
            // Add other professor properties if necessary
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
                console.log('Professor updated successfully:', data);
                getProfessors();
            },
            error: function (error) {
                handleCommonErrorCases(error);
            }
        });
    }
}

// Function to delete professor
function deleteProfessor() {
    const token = localStorage.getItem('token');

    const professorId = prompt('Enter Professor ID to delete:');

    if (professorId) {
        $.ajax({
            url: `/api/professori/${professorId}`,
            type: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' + token
            },
            success: function () {
                console.log('Professor deleted successfully');
                getProfessors();
            },
            error: function (error) {
                handleCommonErrorCases(error);
            }
        });
    }
}

// Function to display professors
function displayProfessors(professors) {
    const tableBody = $('#professor-table tbody');
    tableBody.empty();

    professors.forEach(professor => {
        tableBody.append(`
            <tr>
                <td>${professor.id}</td>
                <td>${professor.nome}</td>
                <td>${professor.cognome}</td>
                <td>${professor.eta}</td>
                <td>${professor.indirizzo}</td> 
                <td>${professor.materia}</td>
                <!-- Add other columns if necessary -->
            </tr>
        `);
    });
}

// Function to get classes
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

// Function to display classes
function displayClasses(classes) {
    var tableBody = $('#class-table tbody');
    tableBody.empty();

    classes.forEach(function (classe) {
        var row = '<tr>' +
            '<td>' + classe.id + '</td>' +
            '<td>' + classe.nome + '</td>' +
            '<td>' + classe.anno + '</td>' +
            '<td>' + (classe.professori ? classe.professori.map(p => p.nome + ' ' + p.cognome).join(', ') : 'N/D') + '</td>' +
            '<td>' + (classe.studenti ? classe.studenti.map(s => s.nome + ' ' + s.cognome).join(', ') : 'N/D') + '</td>' +
            // Add other columns if necessary
            '</tr>';

        tableBody.append(row);
    });
}

// Function to create a new class
function createClass() {
    const token = localStorage.getItem('token');
    var className = prompt('Enter the class name:');
    var classYear = prompt('Enter the class year:');
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
function updateClass() {
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
    var tableBody = $('#student-table tbody');
    tableBody.empty();

    students.forEach(function (student) {
        var row = '<tr>' +
            '<td>' + student.id + '</td>' +
            '<td>' + student.nome + '</td>' +
            '<td>' + student.cognome + '</td>' +
            '<td>' + student.eta + '</td>' +
            '<td>' + student.indirizzo + '</td>' +
            '<td>' + (student.classe ? student.classe.nome : 'N/D') + '</td>' +
            // Add other columns if necessary
            '</tr>';

        tableBody.append(row);
    });
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
        // Collect professor IDs to be assigned
        var professorIds = [];
        do {
            var professorId = prompt('Enter Professor ID to assign (press Cancel to finish):');
            if (professorId) {
                professorIds.push({ id: parseInt(professorId) });
            }
        } while (professorId);

        // Collect student IDs to be assigned
        var studentIds = [];
        do {
            var studentId = prompt('Enter Student ID to assign (press Cancel to finish):');
            if (studentId) {
                studentIds.push({ id: parseInt(studentId) });
            }
        } while (studentId);

        // Create the updated class object with professors and students
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
