$(document).ready(function () {
  // Initialize DataTable with custom DOM layout
  const table = $('#professorTable').DataTable({
    dom: '<"d-flex justify-content-between align-items-center mb-3"lf>t<"d-flex justify-content-between align-items-center mt-3"ip>'
  });

  let editingIndex = null;

  // Load professors from localStorage
  function loadProfessors() {
    const data = JSON.parse(localStorage.getItem('professors')) || [];
    data.forEach((prof, index) => {
      table.row.add(generateRow(prof, index)).draw(false);
    });
  }

  // Save professors to localStorage
  function saveProfessors(data) {
    localStorage.setItem('professors', JSON.stringify(data));
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

  // Update dropdown label based on selected checkboxes
  $('.specialization-option').on('change', function () {
    const selected = $('.specialization-option:checked').map(function () {
      return $(this).val();
    }).get();
    $('#specializationDropdown').text(selected.length ? selected.join(', ') : 'Choose Specializations');
  });

  // Add/Edit form submission
  $('#professorForm').on('submit', function (e) {
    e.preventDefault();
    const name = $('#professorName').val().trim();
    const specializations = $('.specialization-option:checked').map(function () {
      return $(this).val();
    }).get();

    if (!name || specializations.length === 0) return;

    let professors = JSON.parse(localStorage.getItem('professors')) || [];

    if (editingIndex === null) {
      professors.push({ name, specializations });
    } else {
      professors[editingIndex] = { name, specializations };
    }

    saveProfessors(professors);
    $('#addProfessorModal').modal('hide');
    location.reload(); // Refresh the page to reflect changes
  });

  // Reset form fields
  function resetForm() {
    $('#professorForm')[0].reset();
    $('#specializationDropdown').text('Choose Specializations');
    $('.specialization-option').prop('checked', false);
    editingIndex = null;
  }

  // Edit button click
  $('#professorTable tbody').on('click', '.edit-btn', function () {
    const index = $(this).siblings('[data-index]').data('index');
    const professors = JSON.parse(localStorage.getItem('professors')) || [];

    if (professors[index]) {
      const prof = professors[index];
      editingIndex = index;
      $('#professorName').val(prof.name);
      $('.specialization-option').prop('checked', false);
      prof.specializations.forEach(spec => {
        $(`.specialization-option[value="${spec}"]`).prop('checked', true);
      });
      $('#specializationDropdown').text(prof.specializations.join(', '));
      $('#addProfessorModal').modal('show');
    }
  });

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
