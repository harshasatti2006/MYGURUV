  const loginForm = document.getElementById('loginForm');
    const loginMessage = document.getElementById('loginMessage');

    loginForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const email = document.getElementById('adminEmail').value.trim();
      const password = document.getElementById('adminPassword').value.trim();

      if (email === 'admin@college.edu' && password === 'admin123') {
        loginMessage.classList.remove('d-none');
        loginMessage.classList.remove('text-danger');
        loginMessage.classList.add('text-success');
        loginMessage.textContent = 'Login successful! Redirecting...';
        setTimeout(() => {
          window.location.href = 'dashboard.html'; // Replace with your actual path
        }, 1500);
      } else {
        loginMessage.classList.remove('d-none');
        loginMessage.classList.remove('text-success');
        loginMessage.classList.add('text-danger');
        loginMessage.textContent = 'Invalid email or password.';
      }
    });