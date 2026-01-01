$(document).ready(function () {
  
    // Dummy rows already present, so initialize DataTable AFTER page loads
    const professorTable = $('#professorTable').DataTable();
    const specializationTable = $('#specializationTable').DataTable();

    // Update counts
    $('#professorCount').text(`Professor Count: ${professorTable.rows().count()}`);
    $('#specializationCount').text(`Specialization Count: ${specializationTable.rows().count()}`);

    // Delete Professor Row
    $('#professorTable').on('click', '.delete-professor-btn', function () {
        professorTable
            .row($(this).closest('tr'))
            .remove()
            .draw(false);
        $('#professorCount').text(`Professor Count: ${professorTable.rows().count()}`);
    });

    // Delete Specialization Row
    $('#specializationTable').on('click', '.delete-specialization-btn', function () {
        specializationTable
            .row($(this).closest('tr'))
            .remove()
            .draw(false);
        $('#specializationCount').text(`Specialization Count: ${specializationTable.rows().count()}`);
    });
 
});