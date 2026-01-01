 
 //On Scroll Background to Header
 
 window.addEventListener("scroll", function () {
    const header = document.getElementById("main-header");
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  //JS for menu in moble hamburger


  //what people say
  const track = document.getElementById('testimonialTrack');
  const cards = document.querySelectorAll('.testimonial-card');
  let currentIndex = 0;

  function getVisibleCards() {
    const screenWidth = window.innerWidth;
    if (screenWidth >= 1200) return 4;
    if (screenWidth >= 992) return 3;
    if (screenWidth >= 768) return 2;
    return 1;
  }

  function getCardWidth() {
    if (cards.length === 0) return 0;
    return cards[0].getBoundingClientRect().width;
  }

  function moveSlide(direction) {
    const visibleCards = getVisibleCards();
    const totalCards = cards.length;
    const maxIndex = totalCards - visibleCards;

    currentIndex += direction;
    if (currentIndex < 0) currentIndex = 0;
    if (currentIndex > maxIndex) currentIndex = maxIndex;

    const cardWidth = getCardWidth();
    const newTransform = -currentIndex * cardWidth;
    track.style.transform = `translateX(${newTransform}px)`;
  }

  // Reset transform on resize
  window.addEventListener('resize', () => {
    currentIndex = 0;
    track.style.transform = `translateX(0px)`;
  });


  //multi-step form
// Step 1: Student Info → OTP Verification
function goTootpverification() {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const nameerror = document.getElementById("nameerror");
  const emailerror = document.getElementById("emailerror");

  nameerror.innerHTML = "";
  emailerror.innerHTML = "";

  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i;

  if (!name) {
    nameerror.innerHTML = "Name is required.";
    return;
  }

  if (!email || !emailPattern.test(email)) {
    emailerror.innerHTML = "Please enter a valid email address.";
    return;
  }

  document.getElementById("studentlogin").style.display = "none";
  document.getElementById("otpverification").style.display = "block";
}

// Back: OTP → Student Info
function goBackTostudentlogin() {
  document.getElementById("otpverification").style.display = "none";
  document.getElementById("studentlogin").style.display = "block";
}

// Step 2: OTP Verification → College Selection
function goToselectcollege() {
  const otp = document.getElementById("otp").value.trim();
  const otperror = document.getElementById("otperror");
  otperror.innerHTML = "";

  if (otp.length === 6 && /^\d{6}$/.test(otp)) {
    document.getElementById("otpverification").style.display = "none";
    document.getElementById("selectcollege").style.display = "block";
  } else {
    otperror.innerHTML = "Please enter a valid 6-digit OTP.";
  }
}

// Back: College Selection → OTP
function goBackTootpverification() {
  document.getElementById("selectcollege").style.display = "none";
  document.getElementById("otpverification").style.display = "block";
}

// Step 3: College Selection → Vote
function submitForm() {
  const college = document.getElementById('college');
  const specialization = document.getElementById('specialization');
  const errorcollege = document.getElementById('collegeerror');
  const errorSpecialization = document.getElementById('specializationerror');

  let hasError = false;
  errorcollege.textContent = "";
  errorSpecialization.textContent = "";

  if (college.selectedIndex === 0) {
    errorcollege.textContent = "Please select a college.";
    hasError = true;
  }

  if (specialization.selectedIndex === 0) {
    errorSpecialization.textContent = "Please select a specialization.";
    hasError = true;
  }

  if (!hasError) {
    document.getElementById('selectcollege').style.display = 'none';
    document.getElementById('voteprofessors').style.display = 'block';
  }
}

// Back: Vote → College
function goBackToSelectCollege() {
  document.getElementById("voteprofessors").style.display = "none";
  document.getElementById("selectcollege").style.display = "block";
}

// Final Step: Submit Vote
function submitVote() {
  const selected = document.querySelectorAll('#voteprofessors input[type="checkbox"]:checked');
  if (selected.length === 0) {
    alert("Please select at least one professor.");
    return;
  }

  const votes = Array.from(selected).map(cb => cb.value);
  console.log("You voted for:", votes);

  // Show success modal
  const successModal = new bootstrap.Modal(document.getElementById('voteSuccessModal'));
  successModal.show();

  // After modal closes, reset the form and go to first step
  const modalElement = document.getElementById('voteSuccessModal');
  modalElement.addEventListener('hidden.bs.modal', () => {
    resetForm();
  }, { once: true });
}

// Reset form and show Step 1
function resetForm() {
  document.getElementById('name').value = '';
  document.getElementById('email').value = '';
  document.getElementById('otp').value = '';
  document.getElementById('college').selectedIndex = 0;
  document.getElementById('specialization').selectedIndex = 0;

  const checkboxes = document.querySelectorAll('#voteprofessors input[type="checkbox"]');
  checkboxes.forEach(cb => cb.checked = false);

  const errorSpans = document.querySelectorAll('.error-msg');
  errorSpans.forEach(span => span.textContent = '');

  // Reset views
  document.getElementById("studentlogin").style.display = "block";
  document.getElementById("otpverification").style.display = "none";
  document.getElementById("selectcollege").style.display = "none";
  document.getElementById("voteprofessors").style.display = "none";
}

// Optional: Limit 3 votes max
function limitSelection(checkbox) {
  const checked = document.querySelectorAll('#voteprofessors input[type="checkbox"]:checked');
  if (checked.length > 3) {
    checkbox.checked = false;
    alert("You can vote for up to 3 professors only.");
  }
}

// Reset the form automatically if the page is reloaded or refreshed
window.onload = function () {
  resetForm();
};