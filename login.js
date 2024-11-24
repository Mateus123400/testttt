// Elementos do DOM
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const loginBox = document.querySelector('.login-box');
const registerBox = document.querySelector('.register-box');
const registerBtn = document.getElementById('registerBtn');
const loginBtn = document.getElementById('loginBtn');

// Função para alternar entre login e registro
function toggleForms() {
    loginBox.style.display = loginBox.style.display === 'none' ? 'block' : 'none';
    registerBox.style.display = registerBox.style.display === 'none' ? 'block' : 'none';
}

// Event listeners para os botões de alternar
registerBtn.addEventListener('click', (e) => {
    e.preventDefault();
    toggleForms();
});

loginBtn.addEventListener('click', (e) => {
    e.preventDefault();
    toggleForms();
});

// Função para salvar usuários no localStorage
function saveUser(user) {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
}

// Event listener para o formulário de registro
registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('regName').value;
    const email = document.getElementById('regEmail').value;
    const password = document.getElementById('regPassword').value;
    const confirmPassword = document.getElementById('regConfirmPassword').value;

    if (password !== confirmPassword) {
        alert('As senhas não coincidem!');
        return;
    }

    const user = {
        name,
        email,
        password // Em uma aplicação real, a senha deve ser criptografada
    };

    saveUser(user);
    alert('Registro realizado com sucesso!');
    toggleForms();
    registerForm.reset();
});

// Event listener para o formulário de login
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        window.location.href = 'index.html'; // Redireciona para a página principal
    } else {
        alert('Email ou senha incorretos!');
    }
});
