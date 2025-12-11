// Referencias a los controles principales del overlay
const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

// Activa el panel de registro (mueve el contenedor)
signUpButton.addEventListener('click', () => {
    container.classList.add('right-panel-active');
});

// Activa el panel de inicio de sesión (regresa el contenedor)
signInButton.addEventListener('click', () => {
    container.classList.remove('right-panel-active');
});

// Alterna entre paneles (usado en móviles)
function togglePanel() {
    container.classList.toggle('right-panel-active');
}

// Muestra mensajes de éxito/error en cada formulario
function showMessage(elementId, message, isError = false) {
    const messageEl = document.getElementById(elementId);
    messageEl.textContent = message;
    messageEl.className = 'message ' + (isError ? 'error' : 'success');
    messageEl.style.display = 'block';
    // Oculta el mensaje después de 5s
    setTimeout(() => {
        messageEl.style.display = 'none';
    }, 5000);
}

// Envío de registro: POST /auth/register (JSON)
document.getElementById('signupForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('signup-email').value;
    const username = document.getElementById('signup-username').value;
    const password = document.getElementById('signup-password').value;

    try {
        const response = await fetch('http://localhost:8000/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            // El backend solo usa email y password; username se ignora
            body: JSON.stringify({
                email: email,
                password: password
            })
        });

        const data = await response.json();

        if (response.ok) {
            showMessage('signup-message', '¡Registro exitoso! Ahora puedes iniciar sesión.', false);
            document.getElementById('signupForm').reset();
            // Tras registrar, volvemos al panel de inicio de sesión
            setTimeout(() => {
                container.classList.remove('right-panel-active');
            }, 2000);
        } else {
            showMessage('signup-message', data.detail || 'Error en el registro', true);
        }
    } catch (error) {
        showMessage('signup-message', 'Error de conexión con el servidor', true);
    }
});

// Envío de login: POST /auth/login (form-urlencoded)
document.getElementById('signinForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('signin-email').value;
    const password = document.getElementById('signin-password').value;

    try {
        const response = await fetch('http://localhost:8000/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            // Coincide con los parámetros del backend: email y password
            body: new URLSearchParams({
                email: email,
                password: password
            })
        });

        const data = await response.json();

        if (response.ok) {
            showMessage('signin-message', '¡Inicio de sesión exitoso!', false);
            // Guarda el token para usarlo en peticiones protegidas
            localStorage.setItem('access_token', data.access_token);
            document.getElementById('signinForm').reset();
        } else {
            showMessage('signin-message', data.detail || 'Credenciales incorrectas', true);
        }
    } catch (error) {
        console.error('Error:', error);
        showMessage('signin-message', 'Error de conexión con el servidor', true);
    }
});

// En móviles, muestra los enlaces para alternar entre paneles
if (window.innerWidth <= 768) {
    document.querySelectorAll('.toggle-panel').forEach(el => {
        el.style.display = 'block';
    });
}
