import { createSignal } from "solid-js";
import arrow from './assets/images/arrow.png';

export default function Flipbook(props) {
  let frontpages = [], backpages = [], arrowImg;
  const flip = (e) => {
    let input = e.target,
    id =  Array.from(input.id)[input.id.length-1],
    frontpage = frontpages[id],
    backpage = backpages[id];
    
    if (input.checked) {
      frontpage.style.transform = `rotateY(-${138 + 2 * frontpages.length-id}deg)`;
      backpage.style.transform = `rotateY(-${138 + 2 * frontpages.length-id}deg)`;
    } else {
      frontpage.style.transform = `rotateY(-${28 - 1 * id}deg)`;
      backpage.style.transform = `rotateY(-${27.98 - 1 * id}deg)`;
    }

    arrowImg.classList.add("hidden");
  }
  const [book] = createSignal(props);
  return (
      <div class={`${styles.book} lg:w-90 lg:h-117 md:h-111 md:w-85 sm:w-70 sm:h-91 xs:h-78 xs:w-60 lg:ml-90 md:ml-85 sm:ml-70 ml-60 my-25 relative perspective-distant transform-3d`}>
        <For each={book().pages}>{(page, i) =>
            <input onchange={flip} type="checkbox" id={`page${i()}`} class={`hidden`} />
          }
        </For>
        <img ref={arrowImg} src={arrow} alt="arrow pointing to flipbook" class="absolute top-30 -left-90 animate-breathing" />
        <div class={`${styles.pages} absolute top-1/100 left-3/100 z-10 transform-3d w-full h-98/100`}>
          <For each={book().pages}>{(page, i) =>
              <>
                <div ref={frontpages[i()]} style={{ "background-image": `url(${page.frontimage})`, transform: `rotateY(-${28 - 1 * i()}deg)` }} class={`w-full bg-white h-full rounded-r-md bg-cover origin-[left_center] transition-transform duration-1000 ease-[ease] duration-500 absolute top-0 left-0 transform-3d hover:shadow-[inset_1px_0px_2px_rgba(50,50,50,0.1),inset_-3px_1px_1px_rgba(150,150,150,0.2)] shadow-[inset_0px_-1px_2px_rgba(50,50,50,0.1),inset_-1px_0px_1px_rgba(150,150,150,0.2)]`}>
                  <label class="absolute bottom-0 right-0 w-full h-full cursor-pointer text-center align-middle" for={`page${i()}`}></label>
                </div>
                <div ref={backpages[i()]} style={{ "background-image": `url(${page.backimage})`, transform: `rotateY(-${27.98 - 1 * i()}deg)` }} class={`w-full bg-white h-full rounded-r-md bg-cover origin-[left_center] transition-transform duration-1000 ease-[ease] duration-500 absolute top-0 left-0 transform-3d hover:shadow-[inset_1px_0px_2px_rgba(50,50,50,0.1),inset_-3px_1px_1px_rgba(150,150,150,0.2)] shadow-[inset_0px_-1px_2px_rgba(50,50,50,0.1),inset_-1px_0px_1px_rgba(150,150,150,0.2)]`}>
                  <label class="absolute bottom-0 right-0 w-full h-full cursor-pointer text-center align-middle" for={`page${i()}`}></label>
                </div>
              </>
            }
          </For>
        </div>
      </div>
  )
}