import * as prismic from 'https://cdn.skypack.dev/@prismicio/client'

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
}

const repositoryName = 'biblioteca-mini-curso'
const client = prismic.createClient(repositoryName)
let categoriaAtual = 'todos';

// ======== Elementos do DOM ========
const gridLivros = document.getElementById('booksGrid');
const inputBusca = document.getElementById('searchInput');
const botoesFiltro = document.querySelectorAll('.filter-btn');
const modal = document.getElementById('modalOverlay');
const fecharModal = document.getElementById('modalClose');
const botaoReservar = document.getElementById('reserveBtn');
const botaoFavoritar = document.getElementById('favoriteBtn');

function abrirModal(livro) {
  document.getElementById('modalTitle').textContent = livro.titulo;
  document.getElementById('modalAuthor').textContent = `por ${livro.autor}`;
  document.getElementById('modalCategory').textContent = livro.categoria;
  document.getElementById('modalDescription').textContent = livro.descricao;
  document.getElementById('modalPages').textContent = livro.paginas;
  document.getElementById('modalYear').textContent = livro.ano;
  document.getElementById('modalLanguage').textContent = livro.idioma;
  document.getElementById('modalStatus').textContent = livro.disponivel ? 'Disponível' : 'Emprestado';
  document.getElementById('modalCover').innerHTML = `<img src="${livro.capa}" />`;

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

function renderizarLivros(lista = livrosFiltrados) {
  gridLivros.innerHTML = '';

  lista.forEach(livro => {
    const card = document.createElement('div');
    card.className = 'book-card';
    card.onclick = () => abrirModal(livro);

    card.innerHTML = `
      <div class="book-cover"><img src="${livro.capa}" /></div>
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

async function filtrarPorCategoria(categoria) {
  const response = await client.getAllByType('book', {
    orderings: 'my.book.date desc',
    filters: [
      prismic.predicate.at('my.book.categoria', categoria.trim()),
    ],
    page: 1,
    pageSize: 5,
  })
  const livros = response.map(({ uid, data: livro }) => {
    return new Livro({
      id: uid,
      titulo: prismic.asText(livro.titulo),
      autor: livro.autor,
      categoria: livro.categoria,
      paginas: livro.quantidadepaginas,
      ano: livro.ano,
      idioma: prismic.asText(livro.idioma),
      disponivel: livro.disponivel,
      descricao: prismic.asText(livro.descricao),
      capa: livro.imagem.url
    })
  })

  renderizarLivros(livros);
}

async function buscarLivros() {
  const termoBusca = inputBusca.value.trim();
  const response = await client.getAllByType('book', {
    orderings: 'my.book.date desc',
    filters: [
      prismic.filter.fulltext("document", termoBusca),
    ],
    page: 1,
    pageSize: 5,
  })
  const livros = response.map(({ uid, data: livro }) => {
    return new Livro({
      id: uid,
      titulo: prismic.asText(livro.titulo),
      autor: livro.autor,
      categoria: livro.categoria,
      paginas: livro.quantidadepaginas,
      ano: livro.ano,
      idioma: prismic.asText(livro.idioma),
      disponivel: livro.disponivel,
      descricao: prismic.asText(livro.descricao),
      capa: livro.imagem.url
    })
  })

  renderizarLivros(livros);
}

botoesFiltro.forEach(botao => {
  botao.addEventListener('click', () => {
    botoesFiltro.forEach(btn => btn.classList.remove('active'));
    botao.classList.add('active');
    filtrarPorCategoria(botao.dataset.category);
  });
});

const init = async () => {
  const response = await client.getAllByType('book', {
    orderings: 'my.book.date desc',
    page: 1,
    pageSize: 5,
  })

  const pageResponse = await client.getSingle('home')
  
  const page = {
    title: prismic.asHTML(pageResponse.data.title),
    description: prismic.asHTML(pageResponse.data.subtitle)
  }

  document.querySelector('.hero-content').innerHTML += page.title;
  document.querySelector('.hero-content').innerHTML += page.description;

  const livros = response.map(({ uid, data: livro }) => {
    return new Livro({
      id: uid,
      titulo: prismic.asText(livro.titulo),
      autor: livro.autor,
      categoria: livro.categoria,
      paginas: livro.quantidadepaginas,
      ano: livro.ano,
      idioma: prismic.asText(livro.idioma),
      disponivel: livro.disponivel,
      descricao: prismic.asText(livro.descricao),
      capa: livro.imagem.url
    })
  })

  renderizarLivros(livros)
}
init();

modal.addEventListener('click', e => { if (e.target === modal) fecharModalFunc(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') fecharModalFunc(); });
fecharModal.addEventListener('click', fecharModalFunc);
botaoFavoritar.addEventListener('click', () => {
  alert('Livro adicionado aos favoritos!');
});

inputBusca.addEventListener('input', buscarLivros);