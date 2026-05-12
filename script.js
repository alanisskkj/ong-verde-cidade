const agroConfig = {
    "Tomate": { ciclo: 90, sementesM2: 5 },
    "Alface": { ciclo: 45, sementesM2: 16 },
    "Rúcula": { ciclo: 30, sementesM2: 25 },
    "Cenoura": { ciclo: 70, sementesM2: 80 }
};

const btnTheme = document.querySelector('#btn-theme-toggle');
if (btnTheme) {
    btnTheme.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
    });
}
                  
function fazerLogin() {
    const user = document.getElementById('user').value;
    const pass = document.getElementById('pass').value;

    if (user === "admin" && pass === "1234") {
        window.location.href = "home.html"; 
    } else {
        alert("Usuário ou senha incorretos!");
    }
}


function mostrarTela(id) {
    const telas = ['tela-home', 'tela-cadastro', 'tela-estoque'];
    telas.forEach(tela => {
        const elemento = document.getElementById(tela);
        if (elemento) elemento.style.display = 'none';
    });

    const target = document.getElementById(`tela-${id}`);
    if (target) target.style.display = 'block';

    if (id === 'estoque') renderizarEstoque();
}

function cadastrar() {
    const cultura = document.getElementById('nome-prod').value;
    const areaInput = document.getElementById('qtd-prod').value;
    const dataPlantioStr = document.getElementById('val-prod').value;

    if (!areaInput || !dataPlantioStr) {
        alert("Por favor, preencha todos os campos.");
        return;
    }
    const area = parseFloat(areaInput);
    const densidadeSementes = agroConfig[cultura].sementesM2;
    const sementesTotais = Math.round(area * densidadeSementes); 
    const dataPlantio = new Date(dataPlantioStr);
    dataPlantio.setMinutes(dataPlantio.getMinutes() + dataPlantio.getTimezoneOffset());
    
    const diasCiclo = agroConfig[cultura].ciclo;
    const dataColheita = new Date(dataPlantio);
    dataColheita.setDate(dataPlantio.getDate() + diasCiclo);

    const lista = document.getElementById('lista-plantios');
    const card = document.createElement('div');
    card.className = 'status-card';

    card.innerHTML = `
        <strong>Cultura:</strong> ${cultura} <br>
        <strong>Área do Canteiro:</strong> ${area} m² <br>
        <strong>Sementes Necessárias:</strong> ${sementesTotais} unidades <br>
        <strong>Data de Plantio:</strong> ${dataPlantio.toLocaleDateString('pt-BR')} <br>
        <strong>Previsão de Colheita:</strong> <span style="color: #28a745; font-weight:bold;">${dataColheita.toLocaleDateString('pt-BR')}</span>
    `;

    lista.prepend(card);

    document.getElementById('qtd-prod').value = "";
    document.getElementById('val-prod').value = "";
}

function renderizarEstoque() {
    const lista = document.querySelector('#lista-produtos');
    if (!lista) return;
    lista.innerHTML = "";

    produtos.forEach(p => {
        const linha = document.createElement('tr');
        const estiloAlerta = p.qtd < 5 ? 'style="color: red; font-weight: bold;"' : '';

        linha.innerHTML = `
            <td>${p.nome}</td>
            <td>${p.validade}</td>
            <td ${estiloAlerta}>${p.qtd}</td>
            <td>
                <div class="acoes-tabela">
                    <button onclick="alterarQtd(${p.id}, 1)">+</button>
                    <button onclick="alterarQtd(${p.id}, -1)">-</button>
                </div>
            </td>
        `;
        lista.appendChild(linha);
    });
}

function alterarQtd(id, mudanca) {
    const produto = produtos.find(p => p.id === id);
    if (produto) {
        produto.qtd += mudanca;
        if (produto.qtd < 0) produto.qtd = 0;
        renderizarEstoque();
    }
}

function logout() {
    location.reload();
}
