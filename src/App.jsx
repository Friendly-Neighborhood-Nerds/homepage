import styles from './App.module.css';
import Panel from "./panel";
import Flipbook from "./flipbook";
import { Contact, openContact} from "./contact";
import { Modal, useModal} from "./modal";
import { For, createSignal, createEffect } from "solid-js";
import logo from './assets/images/logo.png';
import mascot from './assets/images/mascot.png';
import nerds from "./data/nerds";


const [sections] = createSignal([]);
const addSection = (name, content, id, forward) => sections().push({ name: name, content: content, id: id, forward: forward });


function Header(props) {
  let nav, navLinks, navUl, header;

  const changeVisibility = (toShow) => {
    if (toShow) {
      nav.classList.replace("lg:-translate-y-full", "lg:translate-y-0");
    } else {
      nav.classList.replace("lg:translate-y-0", "lg:-translate-y-full");
    }
  };

  const toggleNav = () => {
    let bars = document.querySelectorAll('.bar');
    let burger = bars[0].parentNode;
    if (window.getComputedStyle(burger).display != "none") {
      bars.forEach(bar => bar.classList.toggle(styles.x));
      if (window.getComputedStyle(navLinks).display === "none") {
        navLinks.classList.remove("hidden");
      } else {
        navLinks.classList.add("hidden");
      } 
    }
  };

  function typewriter(list, last, e) {
    let current = list[0];
    
    if(!last) {
      this.classList.toggle(styles.typewriter);
      this.classList.toggle("border-r-2");
      let textLength = current.textContent.length;
      let duration = textLength * 0.06; // Adjust speed as needed
      current.classList.toggle(styles.typewriter);
      current.style.setProperty("--char-count", textLength);
      current.style.setProperty("--typing-speed", `${duration}s`);
      current.style.setProperty("--typing-delay", `0.17s`);
      current.classList.toggle("hidden");
      current.addEventListener("animationend", typewriter.bind(current, list.slice(1), list.slice(1) < 2));
    } 
    
  }

  createEffect(() => {
    const navObserver = new IntersectionObserver(
      ([e]) => changeVisibility(e.intersectionRatio <= 0),
      { threshold: [0] }
    );
    navObserver.observe(header);


    const animation = document.getElementsByClassName(styles.typewriter)[0];
    const typewriterLines = document.getElementsByClassName("next-code");
    animation.addEventListener("animationend", typewriter.bind(animation, Array.from(typewriterLines), typewriterLines.length < 2));


    sections().forEach((navItem) => {
      var item = document.createElement('li');
      var link = document.createElement('a');
      link.className += "block py-2 px-3 text-gray-200 lg:p-0 text-2xl font-bangers text-shadow";
      link.ariaCurrent = "page";
      link.innerHTML = navItem.id;
      switch (typeof navItem.forward) {
        case 'string':
          link.href = navItem.forward;
          break;
        case 'function':
          link.onclick = navItem.forward;
          link.className += " cursor-pointer"
          break;
        default:
          link.href = `/#${navItem.id}`;
      }

      
      item.appendChild(link);
      navUl.appendChild(item);
    });

  });



  return (<>
    <header ref={header} class="h-dvh overflow-x-hidden overflow-y-auto">
      <div class="-z-10 fixed w-full h-dvh bg-nerd-purple-dark">
        <div class="flex justify-self-center lg:justify-self-auto h-dvh">
          <img class="lg:max-h-full max-h-dvh lg:max-w-[43dvw] self-center" src={mascot} alt="mascot" />
          <div class="w-full xl:mt-[30dvh] lg:mt-[30dvh] lg:block hidden">    
            <h1 class="xl:ml-20 text-white xl:text-6xl lg:text-5xl text-4xl text-shadow font-bangers font-normal">Friendly Neighborhood Nerds</h1>
            <div class="mt-10 xl:ml-20 ml-5 inline-block">
              <h2 class={`${styles.typewriter} border-r-2 border-white overflow-hidden font-code whitespace-nowrap w-full text-white xl:text-3xl lg:text-2xl`}>
                <span class="text-code-keyword">Your</span> <span class="text-code-var">techNerds</span>
              </h2>
              <div class="ml-10">
                <h2 class="next-code hidden border-r-2 border-white overflow-hidden font-code whitespace-nowrap w-full text-white xl:text-3xl lg:text-2xl">
                  .<span class="text-code-func">That</span>()
                </h2>
                <h2 class="next-code hidden border-r-2 border-white overflow-hidden font-code whitespace-nowrap w-full text-white xl:text-3xl lg:text-2xl">
                  .<span class="text-code-func">Solve</span>(<span class="text-code-string">'Business Problems'</span>)
                </h2>
                <h2 class="next-code hidden border-r-2 border-white overflow-hidden font-code whitespace-nowrap w-full text-white xl:text-3xl lg:text-2xl">
                  .<span class="text-code-func">With</span>(<span class="text-code-string">'Innovation & Technology'</span>);
                </h2>
              </div>
            </div> 
          </div>    
        </div>
      </div>
    </header>

    <nav ref={nav} class="items-center lg:fixed lg:-translate-y-full h-17 lg:transition-all lg:ease-in-out lg:duration-1000 lg:overflow-hidden sticky z-40 -top-0.5 w-full bg-nerd-purple-dark">
      <div class="flex flex-wrap items-center justify-between mx-auto h-full">
        <a href="/" class="flex h-full space-x-3 sm:ml-10 ml-5">
          <img src={logo} alt="mascot" class="h-14 self-end" />
        </a>
        <a class="nav-toggle flex flex-col justify-between h-6 w-6 lg:hidden mr-5 hover:cursor-pointer" onClick={toggleNav}>
          <span class="bar h-1 w-full bg-gray-200 transition-all ease-in-out duration-150"></span>
          <span class="bar h-1 w-full bg-gray-200 transition-all ease-in-out duration-150"></span>
          <span class="bar h-1 w-full bg-gray-200 transition-all ease-in-out duration-150"></span>
        </a>
        <div ref={navLinks} class="hidden w-full lg:block lg:w-auto lg:mr-5">
          <ul ref={navUl} onClick={toggleNav} class="font-medium flex flex-col lg:mr-5 lg:flex-row lg:space-x-8 bg-nerd-purple-dark lg:bg-transparent" />
        </div>
      </div>
    </nav>
  </>);
}

function Main(props) {
  const nerdpanels = (
    <div class="grid xl:grid-cols-2 grid-cols-1 gap-0">
      <For each={nerds}>{(nerd, i) => 
        <Panel {...nerd} side={i()%2 == 0 ? "left" : "right"} />
    }</For>
      </div>
  );
  const flipbook = (
    <div class="flex justify-center flex-col items-center">
      <div class="p-5 border-2 border-solid bg-amber-100 text-2xs sm:text-sm md:text-base w-90 xs:w-130 sm:w-163 md:w-190 lg:w-200">
        <p>We do things differently – even on how we present ourselves on a website. </p>
        <p class="mt-4">Instead of boring the shit out of you by listing icons of technologies and bragging about yearlong expertise over meaningless buzzwords, we would rather encourage you to read our comic.</p>
        <p class="mt-4">This is our way to show you, how we do things differently than our competitors!</p>
      </div>
      <Flipbook {...book()} />
      <div class="p-5 border-2 border-solid text-2xs sm:text-sm md:text-base w-90 xs:w-130 sm:w-163 md:w-190 lg:w-200 bg-amber-100">
        <p>Never be afraid to ask for our help on any (ideally work- or tech- related) topics ...</p>
        <p class="mt-4">... because you will never top the guy that called us for his clogged toilet, and we still miraculously were able to help him solve his private business issue.</p>
      </div>
      
    </div>
  );
  addSection("Super Powers", flipbook, "Powers", null);
  addSection("Friendly Neighborhood Nerds", nerdpanels, "nerds", null);
  addSection("", <Contact />, "contact", openContact);
  // addSection("", <></>, "blog", "https://blog.friendlynerd.ch/"); TODO Enable when first blog entry  
  return(
    <main class={`mx-auto bg-comic bg-nerd-purple-light overflow-hidden`}>
      <For each={sections()}>{(content, i) =>
        <section id={content.id}>
          {content.name ? <div class="sm:mb-10 mb-3 flex justify-center pt-16"><h1 class="font-heroes text-stroke sm:text-8xl text-6xl sm:mx-3 text-transparent bg-clip-text inline-block bg-linear-to-t from-heroes-indigo via-heroes-purple to-white p-6">{content.name}</h1></div> : <></>}
          {content.content}
        </section>
      }
      </For>
    </main>
  )
}

function Footer() {
  const imprint = (
    <div class="font-code self-center">
      <h1 class="font-bold text-3xl mb-5">Imprint</h1>
      <ul class="sm:ml-5 text-sm sm:text-xl">
        <li>Friendly Nerds GmbH</li>
        <li>Lauenenweg 48</li>
        <li>3600 Thun</li>
        <li>Schweiz</li>
        <li><a class="underline text-purple-700 hover:text-nerd-purple-dark" href="mailto:help@friendlynerds.ch">help@friendlynerds.ch</a></li>
      </ul>
    </div>
  ), ModalImprint = () =>  {
    const { openModal } = useModal(); // This needs to be rendered inside the modal to keep context.
    
    return <a class="cursor-pointer self-center underline text-purple-400 hover:text-purple-700" onclick={() => openModal()}>Imprint</a>;
  };
  return (
    <footer class="font-code text-white text-center bg-nerd-purple-dark border-t-3 h-20 border-solid align-middle flex flex-col justify-center">
      <p>© {new Date().getFullYear()} by <span class="font-bold">Friendly Neighborhood Nerds</span></p>
      <Modal content={imprint}>
        <ModalImprint />
      </Modal>
    </footer>
  );
}

export { Header, Main, Footer };

const [book] = createSignal({
  pages:[
    {frontimage: "./images/pages/cover.png",
      backimage:"./images/pages/page0.png"},
    {frontimage: "./images/pages/page01.png",
      backimage:"./images/pages/page02.png"},
      {frontimage: "./images/pages/page1.png",
      backimage:"./images/pages/page2.png"},
    {frontimage: "./images/pages/page3.png",
      backimage:"./images/pages/page4.png"},
    {frontimage: "./images/pages/page5.png",
      backimage:"./images/pages/page6.png"},
    {frontimage: "./images/pages/page7.png",
      backimage:"./images/pages/page8.png"},
      {frontimage: "./images/pages/page9.png",
        backimage:"./images/pages/endpage.png"},
        {frontimage: "./images/pages/endpage2.png",
        backimage:"./images/pages/ad.png"}
  ],
});
