document.addEventListener('DOMContentLoaded', () => {
    // --- Global Elements ---
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-header nav');
    const logoutButton = document.getElementById('logout-button');
    const usernameDisplay = document.getElementById('username-display');
    const usernameGreeting = document.getElementById('username-greeting');

    // --- Mobile Menu Toggle ---
    if (mobileMenuToggle && mainNav) {
        mobileMenuToggle.addEventListener('click', () => {
            mainNav.classList.toggle('active');
        });
    }

    // --- Simulate User State (Using localStorage - NOT SECURE) ---
    const simulateLogin = (username) => {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('username', username);
        updateUIBasedOnLoginState();
        window.location.href = 'dashboard.html'; // Redirect after login
    };

    const simulateLogout = () => {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('username');
        updateUIBasedOnLoginState();
        window.location.href = 'login.html'; // Redirect after logout
    };

    const isLoggedIn = () => {
        return localStorage.getItem('isLoggedIn') === 'true';
    };

    const getUsername = () => {
        return localStorage.getItem('username') || 'User';
    };

    // --- Update UI based on Login State ---
    const updateUIBasedOnLoginState = () => {
        const user = getUsername();
        if (usernameDisplay) usernameDisplay.textContent = user;
        if (usernameGreeting) usernameGreeting.textContent = user;

        // If on a page that requires login, redirect if not logged in
        // (Exclude login/register pages from this check)
        const protectedPages = ['dashboard.html', 'mock-tests.html', 'test-interface.html', 'discussions.html', 'analytics.html'];
        const currentPage = window.location.pathname.split('/').pop();

        if (!isLoggedIn() && protectedPages.includes(currentPage)) {
            window.location.href = 'login.html';
        }
    };

    // --- Initial UI Update on Page Load ---
    updateUIBasedOnLoginState();


    // --- Logout Button ---
    if (logoutButton) {
        logoutButton.addEventListener('click', simulateLogout);
    }


    // --- Login Form Simulation ---
    const loginForm = document.getElementById('login-form');
    const loginError = document.getElementById('login-error');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevent actual form submission
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            // **VERY BASIC & INSECURE check** - In reality, this needs a backend
            if (email && password) {
                 // Simulate successful login for any non-empty fields
                if (loginError) loginError.textContent = '';
                simulateLogin(email.split('@')[0] || 'DemoUser'); // Use part of email as username
            } else {
                if (loginError) loginError.textContent = 'Please enter email and password.';
            }
        });
    }

    // --- Registration Form Simulation ---
    const registerForm = document.getElementById('register-form');
    const registerError = document.getElementById('register-error');
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const fullname = document.getElementById('fullname').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirm-password').value;

             if (!fullname || !email || !password || !confirmPassword) {
                 if (registerError) registerError.textContent = 'Please fill in all fields.';
                 return;
             }
             if (password.length < 8) {
                  if (registerError) registerError.textContent = 'Password must be at least 8 characters.';
                  return;
             }
            if (password !== confirmPassword) {
                if (registerError) registerError.textContent = 'Passwords do not match.';
                return;
            }

            // Simulate successful registration
            if (registerError) registerError.textContent = '';
            alert('Registration successful! (Simulation) Please log in.'); // Inform user
            window.location.href = 'login.html'; // Redirect to login
        });
    }

    // --- Mock Test Page Filter Simulation ---
    const subjectFilter = document.getElementById('subject-filter');
    const testCards = document.querySelectorAll('.test-card');

    if (subjectFilter && testCards.length > 0) {
        subjectFilter.addEventListener('change', () => {
            const selectedSubject = subjectFilter.value;
            testCards.forEach(card => {
                const cardSubject = card.getAttribute('data-subject');
                if (selectedSubject === 'all' || cardSubject === selectedSubject) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }

     // --- Discussion Upvote Simulation ---
     const upvoteButtons = document.querySelectorAll('.btn-upvote');
     upvoteButtons.forEach(button => {
         button.addEventListener('click', () => {
             const countSpan = button.querySelector('.upvote-count');
             if (countSpan) {
                 let currentCount = parseInt(countSpan.textContent, 10);
                 // Simple toggle effect for simulation
                 if (!button.classList.contains('upvoted')) {
                     countSpan.textContent = currentCount + 1;
                     button.classList.add('upvoted'); // Add visual cue if needed in CSS
                     button.style.fontWeight = 'bold'; // Example cue
                 } else {
                     countSpan.textContent = currentCount - 1;
                      button.classList.remove('upvoted');
                      button.style.fontWeight = 'normal';
                 }
             }
         });
     });

     // --- Test Interface - (Basic nav/timer logic is embedded in test-interface.html for simplicity) ---
     // You could move that logic here if it gets more complex

}); // End DOMContentLoaded