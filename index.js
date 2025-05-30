// ======== Modelo do Livro ========
class Livro {
  constructor({ id, titulo, autor, categoria, paginas, ano, idioma, disponivel, descricao, capa }) {
    this.id = id;
    this.titulo = titulo;
    this.autor = autor;
    this.categoria = categoria;
    this.paginas = paginas;
    this.ano = ano;
    this.idioma = idioma;
    this.disponivel = disponivel;
    this.descricao = descricao;
    this.capa = capa;
  }

  combinaComBusca(termo) {
    const termoMin = termo.toLowerCase();
    return (
      this.titulo.toLowerCase().includes(termoMin) ||
      this.autor.toLowerCase().includes(termoMin) ||
      this.categoria.toLowerCase().includes(termoMin)
    );
  }
}

// ======== Dados ========
const livros = [
  new Livro({
    id: 1,
    titulo: "1984",
    autor: "George Orwell",
    categoria: "ficção",
    paginas: 328,
    ano: 1949,
    idioma: "Português",
    disponivel: true,
    descricao: "Uma distopia clássica que retrata um futuro totalitário onde o governo controla todos os aspectos da vida. Winston Smith trabalha no Ministério da Verdade, reescrevendo a história conforme as necessidades do Partido. Uma obra atemporal sobre vigilância, controle e resistência.",
    capa: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
  }),
  new Livro({
    id: 2,
    titulo: "Clean Code",
    autor: "Robert C. Martin",
    categoria: "tecnologia",
    paginas: 464,
    ano: 2008,
    idioma: "Português",
    disponivel: true,
    descricao: "Um guia essencial para desenvolvedores que desejam escrever código limpo, legível e manutenível. Martin apresenta princípios fundamentais, técnicas e práticas para criar software de qualidade profissional.",
    capa: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
  }),
  new Livro({
    id: 3,
    titulo: "Sapiens",
    autor: "Yuval Noah Harari",
    categoria: "ciência",
    paginas: 512,
    ano: 2011,
    idioma: "Português",
    disponivel: false,
    descricao: "Uma jornada fascinante através da história da humanidade, desde os primeiros Homo sapiens até os desafios do século XXI. Harari explora como nossa espécie conquistou o mundo através da cooperação em massa.",
    capa: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)"
  }),
  new Livro({
    id: 4,
    titulo: "O Mito de Sísifo",
    autor: "Albert Camus",
    categoria: "filosofia",
    paginas: 192,
    ano: 1942,
    idioma: "Português",
    disponivel: true,
    descricao: "Uma reflexão profunda sobre o absurdo da existência humana e como encontrar significado em um mundo aparentemente sem sentido. Camus argumenta que devemos imaginar Sísifo feliz em sua eterna tarefa.",
    capa: "linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)"
  }),
  new Livro({
    id: 5,
    titulo: "Steve Jobs",
    autor: "Walter Isaacson",
    categoria: "biografia",
    paginas: 656,
    ano: 2011,
    idioma: "Português",
    disponivel: true,
    descricao: "A biografia definitiva do cofundador da Apple, baseada em mais de quarenta entrevistas com Jobs e centenas de entrevistas com familiares, amigos, colegas e concorrentes. Uma história de inovação, obsessão e genialidade.",
    capa: "linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)"
  }),
  new Livro({
    id: 6,
    titulo: "O Senhor dos Anéis",
    autor: "J.R.R. Tolkien",
    categoria: "ficção",
    paginas: 1216,
    ano: 1954,
    idioma: "Português",
    disponivel: true,
    descricao: "A obra-prima da fantasia épica que narra a jornada de Frodo Bolseiro para destruir o Um Anel. Uma história atemporal sobre amizade, coragem e a luta entre o bem e o mal na Terra-média.",
    capa: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)"
  }),
  new Livro({
    id: 7,
    titulo: "Algoritmos",
    autor: "Robert Sedgewick",
    categoria: "tecnologia",
    paginas: 992,
    ano: 2011,
    idioma: "Português",
    disponivel: false,
    descricao: "Um guia completo sobre algoritmos e estruturas de dados, combinando teoria rigorosa com implementações práticas. Essencial para estudantes e profissionais de ciência da computação.",
    capa: "linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)"
  }),
  new Livro({
    id: 8,
    titulo: "Cosmos",
    autor: "Carl Sagan",
    categoria: "ciência",
    paginas: 432,
    ano: 1980,
    idioma: "Português",
    disponivel: true,
    descricao: "Uma jornada épica através do cosmos, desde o Big Bang até a possibilidade de vida extraterrestre. Sagan combina ciência rigorosa com uma prosa poética para explorar nosso lugar no universo.",
    capa: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
  }),
  new Livro({
    id: 9,
    titulo: "Crítica da Razão Pura",
    autor: "Immanuel Kant",
    categoria: "filosofia",
    paginas: 784,
    ano: 1781,
    idioma: "Português",
    disponivel: true,
    descricao: "Uma das obras mais influentes da filosofia ocidental, onde Kant investiga os limites e o escopo da razão humana. Uma análise profunda sobre como conhecemos o mundo ao nosso redor.",
    capa: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)"
  })
];


let livrosFiltrados = [...livros];
let categoriaAtual = 'todos';

// ======== Elementos do DOM ========
const gridLivros = document.getElementById('booksGrid');
const inputBusca = document.getElementById('searchInput');
const botoesFiltro = document.querySelectorAll('.filter-btn');
const modal = document.getElementById('modalOverlay');
const fecharModal = document.getElementById('modalClose');
const botaoReservar = document.getElementById('reserveBtn');
const botaoFavoritar = document.getElementById('favoriteBtn');

// ======== Renderização ========
function renderizarLivros(lista = livrosFiltrados) {
  gridLivros.innerHTML = '';

  lista.forEach(livro => {
    const card = document.createElement('div');
    card.className = 'book-card';
    card.onclick = () => abrirModal(livro);

    card.innerHTML = `
      <div class="book-cover" style="background: ${livro.capa}"></div>
      <div class="book-content">
        <span class="book-category">${livro.categoria}</span>
        <h3 class="book-title">${livro.titulo}</h3>
        <p class="book-author">por ${livro.autor}</p>
        <div class="book-footer">
          <div class="book-status">
            <div class="status-dot ${livro.disponivel ? '' : 'unavailable'}"></div>
            <span>${livro.disponivel ? 'Disponível' : 'Emprestado'}</span>
          </div>
          <span class="book-pages">${livro.paginas} páginas</span>
        </div>
      </div>
    `;

    gridLivros.appendChild(card);
  });
}

// ======== Filtros ========
function filtrarPorCategoria(categoria) {
  categoriaAtual = categoria;
  let base = categoria === 'todos' ? livros : livros.filter(l => l.categoria === categoria);

  const termoBusca = inputBusca.value.trim().toLowerCase();
  livrosFiltrados = termoBusca
    ? base.filter(l => l.combinaComBusca(termoBusca))
    : base;

  renderizarLivros();
}

// ======== Busca ========
function buscarLivros() {
  const termoBusca = inputBusca.value.trim().toLowerCase();
  let base = categoriaAtual === 'todos' ? livros : livros.filter(l => l.categoria === categoriaAtual);

  livrosFiltrados = termoBusca
    ? base.filter(l => l.combinaComBusca(termoBusca))
    : base;

  renderizarLivros();
}

// ======== Modal ========
function abrirModal(livro) {
  document.getElementById('modalTitle').textContent = livro.titulo;
  document.getElementById('modalAuthor').textContent = `por ${livro.autor}`;
  document.getElementById('modalCategory').textContent = livro.categoria;
  document.getElementById('modalDescription').textContent = livro.descricao;
  document.getElementById('modalPages').textContent = livro.paginas;
  document.getElementById('modalYear').textContent = livro.ano;
  document.getElementById('modalLanguage').textContent = livro.idioma;
  document.getElementById('modalStatus').textContent = livro.disponivel ? 'Disponível' : 'Emprestado';
  document.getElementById('modalCover').style.background = livro.capa;

  botaoReservar.textContent = livro.disponivel ? 'Reservar Livro' : 'Indisponível';
  botaoReservar.disabled = !livro.disponivel;
  botaoReservar.className = livro.disponivel ? 'btn btn-primary' : 'btn btn-secondary';

  botaoReservar.onclick = () => {
    alert('Livro reservado com sucesso! Você será notificado quando estiver disponível.');
    fecharModalFunc();
  };

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function fecharModalFunc() {
  modal.classList.remove('active');
  document.body.style.overflow = 'auto';
}

// ======== Eventos ========
inputBusca.addEventListener('input', buscarLivros);

botoesFiltro.forEach(botao => {
  botao.addEventListener('click', () => {
    botoesFiltro.forEach(btn => btn.classList.remove('active'));
    botao.classList.add('active');
    filtrarPorCategoria(botao.dataset.category);
  });
});

fecharModal.addEventListener('click', fecharModalFunc);
modal.addEventListener('click', e => { if (e.target === modal) fecharModalFunc(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') fecharModalFunc(); });

botaoFavoritar.addEventListener('click', () => {
  alert('Livro adicionado aos favoritos!');
});

// ======== Inicialização ========
renderizarLivros();
