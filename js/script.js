const navLinks = document.querySelectorAll('header nav a');
const sections = document.querySelectorAll('section');
const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('header nav');
const resumeBtns = document.querySelectorAll('.resume-btn');
const logoLink = document.querySelector('.logo');
const form = document.getElementById('contact-form');
console.log(form);

let isTransitioning = false;

menuIcon.addEventListener('click', () => {
  menuIcon.classList.toggle('bx-x');
  navbar.classList.toggle('active');
});

navLinks.forEach((link, idx) => {
  link.addEventListener('click', () => {
    if (link.classList.contains('active') || isTransitioning) return;
    isTransitioning = true;

    navLinks.forEach(l => l.classList.remove('active'));
    link.classList.add('active');

    const currentSection = document.querySelector('section.active');
    const nextSection = sections[idx];

    nextSection.classList.add('active', 'section-enter');

    if (currentSection) {
      currentSection.classList.add('section-exit');

      currentSection.addEventListener('animationend', () => {
        currentSection.classList.remove('active', 'section-exit');
      }, { once: true });
    }

    nextSection.addEventListener('animationend', () => {
      nextSection.classList.remove('section-enter');
      isTransitioning = false;
    }, { once: true });

    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
  });
});

logoLink.addEventListener('click', (e) => {
  e.preventDefault(); // impede que o link recarregue a página

  if (!navLinks[0].classList.contains('active') && !isTransitioning) {
    isTransitioning = true;

    // remove active de todos os links
    navLinks.forEach(link => link.classList.remove('active'));
    navLinks[0].classList.add('active');

    const currentSection = document.querySelector('section.active');
    const nextSection = sections[0]; // HOME sempre é a primeira seção

    nextSection.classList.add('active', 'section-enter');

    if (currentSection) {
      currentSection.classList.add('section-exit');
      currentSection.addEventListener('animationend', () => {
        currentSection.classList.remove('active', 'section-exit');
      }, { once: true });
    }

    nextSection.addEventListener('animationend', () => {
      nextSection.classList.remove('section-enter');
      isTransitioning = false;
    }, { once: true });

    // Fecha o menu se estiver aberto
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
  }
});


resumeBtns.forEach((btn, idx) => {
  btn.addEventListener('click', () => {
    const resumeDetails = document.querySelectorAll('.resume-detail');

    resumeBtns.forEach(btn => btn.classList.remove('active'));
    btn.classList.add('active');

    resumeDetails.forEach(detail => detail.classList.remove('active'));
    resumeDetails[idx].classList.add('active');
  });
});


  emailjs.init("3oWcsC7okXw5fEXeO");

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    e.stopPropagation();

    emailjs.sendForm("service_q5pht8o", "template_q0fl428", form)
      .then(() => {
        alert("Mensagem enviada com sucesso!");
        form.reset();
      }, (error) => {
        alert("Erro ao enviar mensagem: " + JSON.stringify(error));
      });
  });