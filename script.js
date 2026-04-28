const btnTheme = document.querySelector('#btn-theme-toggle');
btnTheme.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
});