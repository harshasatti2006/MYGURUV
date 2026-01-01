$(document).ready(function () {
  // Initialize DataTable with custom DOM layout
  const table = $('#votetable').DataTable({
    dom: '<"d-flex justify-content-between align-items-center mb-3"lf>t<"d-flex justify-content-between align-items-center mt-3"ip>'
  });


  // Load professors from localStorage
  function loadvotes() {
    const data = JSON.parse(localStorage.getItem('professors')) || [];
    data.forEach((prof, index) => {
      table.row.add(generateRow(prof, index)).draw(false);
    });
  }

  // Save professors to localStorage
  function savevote(data) {
    localStorage.setItem('votes', JSON.stringify(data));
  }

  // Generate table row
  function generateRow(prof, index) {
    return [
      index + 1,
      prof.name,
      prof.specializations.join(', '),
      `<div class="d-none" data-index="${index}"></div>
       <button class="btn btn-sm btn-warning me-1 edit-btn"><i class="fas fa-edit"></i></button>
       <button class="btn btn-sm btn-danger delete-btn"><i class="fas fa-trash"></i></button>`
    ];
  }

  // Refresh table from localStorage
  function reloadTable() {
    table.clear().draw();
    loadProfessors();
  }


  // Delete button click
  $('#professorTable tbody').on('click', '.delete-btn', function () {
    const index = $(this).siblings('[data-index]').data('index');
    $('#confirmDeleteModal').data('index', index).modal('show');
  });

  // Confirm delete
  $('#confirmDeleteBtn').on('click', function () {
    const index = $('#confirmDeleteModal').data('index');
    let professors = JSON.parse(localStorage.getItem('professors')) || [];
    professors.splice(index, 1);
    saveProfessors(professors);
    $('#confirmDeleteModal').modal('hide');
    reloadTable();
  });

  // Load data on page load
  loadProfessors();
});
