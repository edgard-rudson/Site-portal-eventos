
let eventos = [
    {
        id: 1,
        titulo: "Workshop de Git e GitHub",
        tipo: "Workshop",
        data: "2026-09-25",
        local: "Laboratório 2",
        descricao: "Atividade prática sobre versionamento de código.",
        status: "Agendado"
    },
    {
        id: 2,
        titulo: "Palestra sobre Inteligência Artificial",
        tipo: "Palestra",
        data: "2026-10-02",
        local: "Auditório Principal",
        descricao: "Palestra sobre aplicações da inteligência artificial.",
        status: "Agendado"
    },
    {
        id: 3,
        titulo: "Minicurso de Desenvolvimento Web",
        tipo: "Minicurso",
        data: "2026-08-20",
        local: "Laboratório 1",
        descricao: "Introdução ao desenvolvimento de aplicações web.",
        status: "Realizado"
    }
];



const app = document.querySelector("#app");



const linksMenu = document.querySelectorAll("[data-view]");


linksMenu.forEach(link => {
    link.addEventListener("click", function (event) {
        event.preventDefault();

        const view = this.dataset.view;

        mostrarTela(view);
    });
});



function mostrarTela(view) {
    switch (view) {
        case "dashboard":
            renderDashboard();
            break;

        case "novo":
            renderNovoEvento();
            break;

        case "eventos":
            renderEventos();
            break;

        default:
            renderDashboard();
    }
}



function renderDashboard() {
    const total = eventos.length;

    const agendados = eventos.filter(
        evento => evento.status === "Agendado"
    ).length;

    const realizados = eventos.filter(
        evento => evento.status === "Realizado"
    ).length;

    app.innerHTML = `
        <div class="mb-4">
            <h1>Dashboard</h1>
            <p class="text-muted">
                Resumo dos eventos acadêmicos cadastrados.
            </p>
        </div>

        <div class="row g-4">

            <div class="col-md-4">
                <div class="card dashboard-card shadow-sm border-0">
                    <div class="card-body text-center">
                        <h5 class="card-title">Total de eventos</h5>
                        <div class="numero-card text-primary">
                            ${total}
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-md-4">
                <div class="card dashboard-card shadow-sm border-0">
                    <div class="card-body text-center">
                        <h5 class="card-title">Eventos agendados</h5>
                        <div class="numero-card text-warning">
                            ${agendados}
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-md-4">
                <div class="card dashboard-card shadow-sm border-0">
                    <div class="card-body text-center">
                        <h5 class="card-title">Eventos realizados</h5>
                        <div class="numero-card text-success">
                            ${realizados}
                        </div>
                    </div>
                </div>
            </div>

        </div>
    `;
}



function renderNovoEvento() {
    app.innerHTML = `
        <div class="mb-4">
            <h1>Novo Evento</h1>
            <p class="text-muted">
                Cadastre uma nova atividade acadêmica.
            </p>
        </div>

        <div id="mensagem"></div>

        <form id="formEvento" class="card shadow-sm p-4">

            <div class="mb-3">
                <label for="titulo" class="form-label">
                    Título
                </label>

                <input
                    type="text"
                    id="titulo"
                    class="form-control"
                    placeholder="Digite o título do evento"
                    required
                >
            </div>

            <div class="mb-3">
                <label for="tipo" class="form-label">
                    Tipo
                </label>

                <select id="tipo" class="form-select" required>
                    <option value="">Selecione o tipo</option>
                    <option value="Palestra">Palestra</option>
                    <option value="Workshop">Workshop</option>
                    <option value="Minicurso">Minicurso</option>
                    <option value="Visita Técnica">Visita Técnica</option>
                </select>
            </div>

            <div class="mb-3">
                <label for="data" class="form-label">
                    Data
                </label>

                <input
                    type="date"
                    id="data"
                    class="form-control"
                    required
                >
            </div>

            <div class="mb-3">
                <label for="local" class="form-label">
                    Local
                </label>

                <input
                    type="text"
                    id="local"
                    class="form-control"
                    placeholder="Digite o local"
                    required
                >
            </div>

            <div class="mb-3">
                <label for="descricao" class="form-label">
                    Descrição
                </label>

                <textarea
                    id="descricao"
                    class="form-control"
                    rows="4"
                    placeholder="Digite a descrição do evento"
                    required
                ></textarea>
            </div>

            <button type="submit" class="btn btn-primary">
                Cadastrar Evento
            </button>

        </form>
    `;

    const formulario = document.querySelector("#formEvento");

    formulario.addEventListener("submit", cadastrarEvento);
}



function cadastrarEvento(event) {
    event.preventDefault();

  
    const titulo = document.querySelector("#titulo").value.trim();
    const tipo = document.querySelector("#tipo").value;
    const data = document.querySelector("#data").value;
    const local = document.querySelector("#local").value.trim();
    const descricao = document.querySelector("#descricao").value.trim();

    const mensagem = document.querySelector("#mensagem");

    
    if (!titulo || !tipo || !data || !local || !descricao) {
        mensagem.innerHTML = `
            <div class="alert alert-danger">
                Preencha todos os campos obrigatórios.
            </div>
        `;

        return;
    }

    
    const novoId = eventos.length > 0
        ? Math.max(...eventos.map(evento => evento.id)) + 1
        : 1;

    const novoEvento = {
        id: novoId,
        titulo: titulo,
        tipo: tipo,
        data: data,
        local: local,
        descricao: descricao,
        status: "Agendado"
    };

    
    eventos.push(novoEvento);

    
    document.querySelector("#formEvento").reset();

   
    mensagem.innerHTML = `
        <div class="alert alert-success">
            Evento cadastrado com sucesso!
        </div>
    `;
}

function renderEventos() {
    app.innerHTML = `
        <div class="mb-4">
            <h1>Eventos</h1>
            <p class="text-muted">
                Consulte, filtre e gerencie os eventos cadastrados.
            </p>
        </div>

        <!-- Filtros -->
        <div class="card shadow-sm mb-4">
            <div class="card-body">

                <div class="row g-3">

                    <div class="col-md-8">
                        <label for="pesquisa" class="form-label">
                            Pesquisar por título
                        </label>

                        <input
                            type="text"
                            id="pesquisa"
                            class="form-control"
                            placeholder="Digite o título do evento..."
                        >
                    </div>

                    <div class="col-md-4">
                        <label for="filtroStatus" class="form-label">
                            Filtrar por status
                        </label>

                        <select id="filtroStatus" class="form-select">
                            <option value="Todos">Todos</option>
                            <option value="Agendado">Agendado</option>
                            <option value="Realizado">Realizado</option>
                        </select>
                    </div>

                </div>

            </div>
        </div>

        <!-- Área onde os eventos serão criados -->
        <div id="listaEventos" class="row g-4"></div>
    `;

    const campoPesquisa = document.querySelector("#pesquisa");
    const filtroStatus = document.querySelector("#filtroStatus");

    campoPesquisa.addEventListener("input", atualizarLista);

   
    filtroStatus.addEventListener("change", atualizarLista);

    atualizarLista();
}

function atualizarLista() {
    const campoPesquisa = document.querySelector("#pesquisa");
    const filtroStatus = document.querySelector("#filtroStatus");
    const listaEventos = document.querySelector("#listaEventos");

    if (!campoPesquisa || !filtroStatus || !listaEventos) {
        return;
    }

    const textoPesquisa = campoPesquisa.value.toLowerCase().trim();
    const statusSelecionado = filtroStatus.value;

   
    const eventosFiltrados = eventos.filter(evento => {

        const correspondeTexto = evento.titulo
            .toLowerCase()
            .includes(textoPesquisa);

        const correspondeStatus =
            statusSelecionado === "Todos" ||
            evento.status === statusSelecionado;

        return correspondeTexto && correspondeStatus;
    });

    
    listaEventos.innerHTML = "";

    if (eventosFiltrados.length === 0) {
        listaEventos.innerHTML = `
            <div class="col-12">
                <div class="alert alert-info">
                    Nenhum evento encontrado.
                </div>
            </div>
        `;

        return;
    }

    
    eventosFiltrados.forEach(evento => {
        criarCardEvento(evento, listaEventos);
    });
}


function criarCardEvento(evento, listaEventos) {

    
    const coluna = document.createElement("div");
    coluna.classList.add("col-md-6", "col-lg-4");

    
    const card = document.createElement("div");
    card.classList.add(
        "card",
        "card-evento",
        "shadow-sm",
        "border-0"
    );

    
    const corpo = document.createElement("div");
    corpo.classList.add("card-body");

  
    const titulo = document.createElement("h5");
    titulo.classList.add("card-title");
    titulo.textContent = evento.titulo;

    
    const badgeTipo = document.createElement("span");
    badgeTipo.classList.add(
        "badge",
        "text-bg-primary",
        "badge-tipo",
        "me-2"
    );
    badgeTipo.textContent = evento.tipo;

    
    const badgeStatus = document.createElement("span");
    badgeStatus.classList.add(
        "badge",
        evento.status === "Agendado"
            ? "badge-agendado"
            : "badge-realizado"
    );
    badgeStatus.textContent = evento.status;

    
    const data = document.createElement("p");
    data.classList.add("mt-3", "mb-1");
    data.innerHTML = `<strong>Data:</strong> ${formatarData(evento.data)}`;

    const local = document.createElement("p");
    local.classList.add("mb-1");
    local.innerHTML = `<strong>Local:</strong> ${evento.local}`;

 
    const descricao = document.createElement("p");
    descricao.classList.add("descricao-evento", "text-muted");
    descricao.textContent = evento.descricao;

   
    const areaBotoes = document.createElement("div");
    areaBotoes.classList.add(
        "d-flex",
        "gap-2",
        "mt-3"
    );

    
    const botaoRealizar = document.createElement("button");
    botaoRealizar.classList.add(
        "btn",
        "btn-success",
        "btn-sm"
    );
    botaoRealizar.textContent = "Marcar como Realizado";

   
    if (evento.status === "Realizado") {
        botaoRealizar.disabled = true;
        botaoRealizar.textContent = "Evento Realizado";
    }

    botaoRealizar.addEventListener("click", function () {
        marcarComoRealizado(evento.id);
    });

    
    const botaoExcluir = document.createElement("button");
    botaoExcluir.classList.add(
        "btn",
        "btn-danger",
        "btn-sm"
    );
    botaoExcluir.textContent = "Excluir";

    botaoExcluir.addEventListener("click", function () {
        excluirEvento(evento.id);
    });

    
    corpo.appendChild(titulo);
    corpo.appendChild(badgeTipo);
    corpo.appendChild(badgeStatus);
    corpo.appendChild(data);
    corpo.appendChild(local);
    corpo.appendChild(descricao);

    areaBotoes.appendChild(botaoRealizar);
    areaBotoes.appendChild(botaoExcluir);

    corpo.appendChild(areaBotoes);

    card.appendChild(corpo);
    coluna.appendChild(card);
    listaEventos.appendChild(coluna);
}




function marcarComoRealizado(id) {

    const evento = eventos.find(evento => evento.id === id);

    if (evento) {
        evento.status = "Realizado";

        
        atualizarLista();
    }
}



function excluirEvento(id) {

    const confirmar = confirm(
        "Tem certeza que deseja excluir este evento?"
    );

    if (!confirmar) {
        return;
    }

   
    eventos = eventos.filter(evento => evento.id !== id);

    
    atualizarLista();
}


function formatarData(data) {
    const partes = data.split("-");

    return `${partes[2]}/${partes[1]}/${partes[0]}`;
}



mostrarTela("dashboard");
