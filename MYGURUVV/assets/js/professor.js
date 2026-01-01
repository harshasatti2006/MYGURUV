$(document).ready(function () {
const table = $('#professorTable').DataTable({
  dom: '<"d-flex justify-content-between align-items-center mb-3"lf>t<"d-flex justify-content-between align-items-center mt-3"ip>',
});

  // Toggle specialization dropdown
  $('#specializationDropdown').on('click', function (e) {
    e.stopPropagation();
    $(this).next('.dropdown-menu').toggleClass('show');
  });

  // Close dropdown when clicking outside
  $(document).on('click', function (e) {
    if (!$(e.target).closest('.dropdown').length) {
      $('.dropdown-menu').removeClass('show');
    }
  });

  // Reset dropdown & form when modal opens
  $('#addProfessorModal').on('show.bs.modal', function () {
    $('.dropdown-menu').removeClass('show');
    resetForm();
  });

  // Update dropdown button text when checkboxes change
  $('.specialization-option').on('change', function () {
    const selected = $('.specialization-option:checked').map(function () {
      return $(this).val();
    }).get();
    $('#specializationDropdown').text(selected.length ? selected.join(', ') : 'Choose Specializations');
  });

  // Load professors from localStorage
  function loadProfessors() {
    const data = JSON.parse(localStorage.getItem('professors')) || [];
    data.forEach((prof, index) => {
      table.row.add(generateRow(prof, index)).draw(false);
    });
  }

  // Save to localStorage
  function saveProfessors(data) {
    localStorage.setItem('professors', JSON.stringify(data));
  }

  // Create DataTable row
  function generateRow(prof, index) {
    return [
      index + 1,
      prof.name,
      prof.specializations.join(', '),
      `<div class="d-none" data-index="${index}"></div>
       <button class="btn btn-sm btn-warning me-1 edit-btn"><i class="fas fa-edit"></i></button>
       <button class="btn btn-sm btn-danger delete-btn"><i class="fas fa-trash-alt"></i></button>`
    ];
  }

  // Reset and reload table
  function reloadTable() {
    table.clear().draw();
    loadProfessors();
  }

  // Reset the form fields
  function resetForm() {
    $('#professorForm')[0].reset();
    $('.specialization-option').prop('checked', false);
    $('#specializationDropdown').text('Choose Specializations');
    editingIndex = null;
  }

  // Submit handler for Add/Edit
$('#professorForm').on('submit', function (e) {
  e.preventDefault();

  const name = $('#professorName').val().trim();
  const specializations = $('.specialization-option:checked').map(function () {
    return $(this).val();
  }).get();

  if (!name || specializations.length === 0) {
    alert('Please enter professor name and select at least one specialization.');
    return;
  }

  let professors = JSON.parse(localStorage.getItem('professors')) || [];

  if (editingIndex === null) {
    professors.push({ name, specializations });
  } else {
    professors[editingIndex] = { name, specializations };
  }

  saveProfessors(professors);
  $('#addProfessorModal').modal('hide');
  location.reload(); // 🔁 RELOAD page after saving
});

 // Update dropdown text based on selected checkboxes
function updateDropdownText() {
    const selected = [];
    $('.specialization-option:checked').each(function () {
        selected.push($(this).val());
    });
    const text = selected.length ? selected.join(', ') : 'Choose Specializations';
    $('#specializationDropdown').text(text);
}

// Edit button logic
$('#professorTable tbody').on('click', '.edit-btn', function () {
    const table = $('#professorTable').DataTable();
    const row = $(this).closest('tr');
    const index = table.row(row).index();

    // Extract professor data from table row
    const name = row.find('td:eq(1)').text().trim();
    const specializationText = row.find('td:eq(2)').text().trim();
    const specializationArray = specializationText.split(',').map(item => item.trim());

    // Pre-fill form fields
    $('#professorName').val(name);
    $('.specialization-option').each(function () {
        const val = $(this).val();
        $(this).prop('checked', specializationArray.includes(val));
    });

    // Update dropdown button text to show selected specializations
    updateDropdownText();

    // Show the modal
    $('#addProfessorModal').modal('show');
});


  // Delete button click
  $('#professorTable tbody').on('click', '.delete-btn', function () {
    const index = $(this).siblings('[data-index]').data('index');
    rowToDelete = index;
    $('#confirmDeleteModal').modal('show');
  });

  // Confirm deletion
  $('#confirmDeleteBtn').on('click', function () {
    if (rowToDelete !== null) {
      let professors = JSON.parse(localStorage.getItem('professors')) || [];
      professors.splice(rowToDelete, 1);
      saveProfessors(professors);
      $('#confirmDeleteModal').modal('hide');
      reloadTable();
      rowToDelete = null;
    }
  });
  
 // Edit button logic
    $('#professorTable tbody').on('click', '.edit-btn', function () {
        const row = $(this).closest('tr');
        editingIndex = table.row(row).index();

        const name = row.find('td:eq(1)').text().trim();
        const specializationText = row.find('td:eq(2)').text().trim();
        const specializationArray = specializationText.split(',').map(item => item.trim());

        $('#professorName').val(name);
        $('.specialization-option').each(function () {
            $(this).prop('checked', specializationArray.includes($(this).val()));
        });

        updateDropdownText();
        $('#addProfessorModal').modal('show');
    });

  // Initial load
  loadProfessors();
});
