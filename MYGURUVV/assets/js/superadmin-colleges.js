$(document).ready(function () {
    const table = $('#collegeTable').DataTable({
        dom: '<"row justify-content-between align-items-center mb-3 px-2"<"col-auto"l><"col-auto"f>>rt<"row px-2 mt-3"<"col-auto"i><"col text-end"p>>',
    });

    let editingIndex = null;
    let deleteIndex = null;

    function loadColleges() {
        const data = JSON.parse(localStorage.getItem('colleges')) || [];
        data.forEach((college, index) => {
            table.row.add(generateRow(college, index)).draw(false);
        });
    }

    function saveColleges() {
        const data = [];
        table.rows().every(function () {
            const row = this.data();
            data.push({
                name: $(row[1]).text(),
                professors: $(row[2]).text(),
                specializations: $(row[3]).text()
            });
        });
        localStorage.setItem('colleges', JSON.stringify(data));
    }

    function generateRow(college, index) {
        return [
            index + 1,
            `<span>${college.name}</span>`,
            `<span>${college.professors || 0}</span>`,
            `<span>${college.specializations || 0}</span>`,
            `
            <button class="btn btn-sm btn-info me-1 view-btn"><i class="fas fa-eye"></i></button>
            <button class="btn btn-sm btn-danger delete-btn"><i class="fas fa-trash-alt"></i></button>
            `
        ];
    }

    $('#collegeForm').submit(function (e) {
        e.preventDefault();
        const name = $('#collegeName').val().trim();
        const newCollege = { name, professors: 0, specializations: 0 };

        if (editingIndex === null) {
            const index = table.rows().count();
            table.row.add(generateRow(newCollege, index)).draw(false);
        } else {
            table.row(editingIndex).data(generateRow(newCollege, editingIndex)).draw(false);
            editingIndex = null;
        }

        saveColleges();
        $('#addCollegeModal').modal('hide');
        $('#collegeForm')[0].reset();
    });

    $('#collegeTable tbody').on('click', '.view-btn', function () {
        const row = $(this).closest('tr');
        const name = row.find('td:eq(1)').text().trim();
        const encodedName = encodeURIComponent(name);
        window.location.href = `superadmincollegeviewpage.html?college=${encodedName}`;
    });

    $('#collegeTable tbody').on('click', '.delete-btn', function () {
        deleteIndex = table.row($(this).closest('tr')).index();
        $('#confirmDeleteModal').modal('show');
    });

    $('#confirmDeleteBtn').on('click', function () {
        if (deleteIndex !== null) {
            table.row(deleteIndex).remove().draw(false);
            saveColleges();
            deleteIndex = null;
            $('#confirmDeleteModal').modal('hide');
        }
    });

    $('#addCollegeBtn').on('click', function () {
        $('#collegeForm')[0].reset();
        $('#addCollegeModalLabel').text('Add College');
        editingIndex = null;
    });

    $('#addCollegeModal').on('show.bs.modal', function () {
        $('#collegeForm')[0].reset();
        editingIndex = null;
    });

    loadColleges();
});
