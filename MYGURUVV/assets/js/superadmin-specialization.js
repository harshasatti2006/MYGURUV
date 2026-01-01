$(document).ready(function () {
  const table = $('#specializationTable').DataTable();
  let editingIndex = null;

  // Load data from localStorage
  function loadSpecializations() {
    const data = JSON.parse(localStorage.getItem('specializations')) || [];
    data.forEach((name, index) => {
      table.row.add(generateRow(name, index)).draw(false);
    });
  }

  // Save data to localStorage
  function saveSpecializations(data) {
    localStorage.setItem('specializations', JSON.stringify(data));
  }

  // Generate table row
  function generateRow(name, index) {
    return [
      index + 1,
      name,
      `<div class="d-none" data-index="${index}"></div>
       <button class="btn btn-sm btn-warning me-1 edit-btn"><i class="fas fa-edit"></i></button>
       <button class="btn btn-sm btn-danger delete-btn"><i class="fas fa-trash"></i></button>`
    ];
  }

  // Reset form
  function resetForm() {
    $('#specializationForm')[0].reset();
    editingIndex = null;
  }

  // Form submit (add or edit)
  $('#specializationForm').on('submit', function (e) {
    e.preventDefault();
    const name = $('#specializationName').val().trim();
    if (!name) return;

    let data = JSON.parse(localStorage.getItem('specializations')) || [];

    if (editingIndex === null) {
      data.push(name);
    } else {
      data[editingIndex] = name;
    }

    saveSpecializations(data);
    $('#addSpecializationModal').modal('hide');
    resetForm();
    reloadTable();
  });

  // Reload table from localStorage
  function reloadTable() {
    table.clear().draw();
    loadSpecializations();
  }

  // Delete handler with confirmation modal
  $('#specializationTable tbody').on('click', '.delete-btn', function () {
    const index = $(this).siblings('[data-index]').data('index');
    $('#confirmDeleteModal').data('index', index).modal('show');
  });

  // Confirm delete
  $('#confirmDeleteBtn').on('click', function () {
    const index = $('#confirmDeleteModal').data('index');
    let data = JSON.parse(localStorage.getItem('specializations')) || [];
    data.splice(index, 1);
    saveSpecializations(data);
    $('#confirmDeleteModal').modal('hide');
    reloadTable();
  });

  // Edit handler
  $('#specializationTable tbody').on('click', '.edit-btn', function () {
    const index = $(this).siblings('[data-index]').data('index');
    const data = JSON.parse(localStorage.getItem('specializations')) || [];
    if (data[index]) {
      $('#specializationName').val(data[index]);
      editingIndex = index;
      $('#addSpecializationModal').modal('show');
    }
  });

  loadSpecializations();
});
