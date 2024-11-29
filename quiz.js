const perguntas = document.querySelectorAll('.listaPerguntas__item');
const resultadoDiv = document.querySelector('.resultado');
const article = document.querySelector('article')
const dicaDiv = document.querySelectorAll('.dica__titulo')
let perguntasRespondidas = 0
let respostasCorretas = 0

document.addEventListener('DOMContentLoaded', function() {
    let lastScrollTop = 0;
    const header = document.querySelector('header');
    const hideThreshold = 80;
    const showThreshold = 40;
    let isHeaderHidden = false;
  
    window.addEventListener('scroll', function() {
      let currentScroll = window.scrollY || document.documentElement.scrollTop;
  
      if (currentScroll > hideThreshold) {
        if (currentScroll > lastScrollTop && !isHeaderHidden) {
          header.style.top = "-100px";
          isHeaderHidden = true;
      } else if (currentScroll < lastScrollTop && isHeaderHidden && (lastScrollTop - currentScroll) >= showThreshold) {
          header.style.top = "0";
          isHeaderHidden = false;
      }
  } else {
      header.style.top = "0";
      isHeaderHidden = false;
  }
      lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
    });
  });

perguntas.forEach(pergunta => {
    const botoes = pergunta.querySelectorAll('.botao');
    botoes.forEach(botao => {
        botao.addEventListener('click', () => {
            pergunta.classList.add('respondida');
            perguntasRespondidas++
            console.log("perguntas respondidas:",perguntasRespondidas);
            
            const resposta = pergunta.querySelector('.resposta');
            resposta.style.display = 'block';
            resposta.querySelector('.mensagem').textContent = botao.value === 'v' ? 'Resposta certa!' : 'Resposta errada!';

            const explicacao = resposta.querySelector('.resposta--explicacao');
            explicacao.style.display = 'block';

            const isCorreta = botao.value === 'v';
            resposta.querySelector('.mensagem').textContent = isCorreta ? 'Resposta certa!' : 'Resposta errada!';

            if (isCorreta) {
                botao.classList.add('botao--correto');
                respostasCorretas++
                console.log("respostas corretas:",respostasCorretas)
            } else {
                botao.classList.add('botao--incorreto');
            }
            
            botoes.forEach(b => {
                b.disabled = true;
                b.classList.remove('ativo');
            });

            const acertos = document.getElementById('acertos');
            if (perguntasRespondidas==10) {
                resultadoDiv.style.display = 'block';
                acertos.innerHTML = `(${respostasCorretas}/10)`;
                article.style.filter = "blur(3px)";
            }
        });
    });
});

const fechar = document.getElementById('fechar')
    fechar.addEventListener('click', () => {
        resultadoDiv.style.display = 'none';
            article.style.filter = "blur(0)";
    });
            
dicaDiv.forEach(dica => {
    dica.addEventListener('click', () => {
        dica.style.borderRadius = dica.style.borderRadius === '8px 8px 0px 0px' ? '8px 8px 8px 8px' : '8px 8px 0px 0px';
        const dicaTexto = dica.nextElementSibling;
        dicaTexto.style.display = dicaTexto.style.display === 'block' ? 'none' : 'block';
    });
});
