
function verificaCookiesAceptos() {
    if (!localStorage.getItem('cookiesAceptos')) {
        document.getElementById('cookies').style.display = 'block';
    }
}


function aceptarCookies() {
    localStorage.setItem('cookiesAceptos', 'true');
    document.getElementById('cookies').style.display = 'none';
}

window.onload = verificaCookiesAceptos;