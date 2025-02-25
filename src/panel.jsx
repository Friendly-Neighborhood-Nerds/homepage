import { createSignal} from "solid-js";


export default function Panel(props) {
  const [panel] = createSignal(props);
  const textColor = "color" in panel() ? panel().color : "text-pink-500";
  if ("side" in props && props.side == "left") {
    return (
        <article class="w-full flex justify-center my-7">
        <div class="w-40 sm:w-72 -ml-10 relative">
          <img src={`./src/assets/images/nerds/${panel().id}.png`} class="absolute right-0 bottom-8 z-10 sm:max-h-11/10 max-h-75/100 max-w-52 sm:max-w-72" />
          <div class="-skew-x-15 w-full overflow-hidden relative" >
            <div class="skew-x-15 bg-cover bg-center w-full h-60 ml-10 my-3 mr-auto shadow-lg"  style={{ "background-image": `url(./src/assets/images/backgrounds/bg-${textColor.split("-")[1]}.jpg)` }} />
          </div>
        </div>
        <div class="sm:w-96 w-60 overflow-hidden sm:-ml-11 -ml-10 mt-5 z-20">
          <div class="bg-white mr-auto left-40 ml-8 my-3 sm:w-96 w-60 h-60 block -skew-x-15 -l-4 shadow-lg">
            <div class="skew-x-15 sm:ml-14 ml-10 mr-10 sm:mr-20 pt-3">
              <h2 class={`${textColor} sm:text-3xl text-xl text-shadow font-bangers font-normal justify-center text-justify mb-2`} innerHTML={panel().title} />
              <p class="text-justify text-xs sm:text-sm hyphens-auto" lang="en" innerHTML={panel().description}/>
            </div>
          </div>
        </div>
      </article>
        );
  } 
  else{
    return(<article class="w-full flex justify-center mx-5 my-7">
        <div class="sm:w-96 w-60 overflow-hidden mt-5 z-20">
            <div class="bg-white mr-auto left-40 -ml-8 my-3 sm:w-96 w-60 h-60 block -skew-x-15 shadow-lg">
              <div class="skew-x-15 sm:ml-14 ml-10 mr-10 sm:mr-20 pt-3">
                <h2 class={`${textColor} sm:text-3xl text-xl text-shadow font-bangers font-normal justify-center text-justify mb-2`} innerHTML={panel().title}></h2>
                <p class="text-justify text-xs sm:text-sm hyphens-auto" lang="en" innerHTML={panel().description}/>
              </div>
            </div>
          </div>
          <div class="w-40 sm:w-72 sm:-ml-10 -ml-9 relative">
            <img src={`./src/assets/images/nerds/${panel().id}.png`} class="absolute right-0 bottom-8 z-10 sm:max-h-11/10 max-h-75/100 max-w-52 sm:max-w-72"></img>
            <div class="-skew-x-15 overflow-hidden" >
              <div class="skew-x-15 bg-cover bg-center w-full h-60 -ml-10 my-3 mr-auto shadow-lg"  style={{ "background-image": `url(./src/assets/images/backgrounds/bg-${textColor.split("-")[1]}.jpg)` }} />
            </div>
          </div>
          
        </article>)
  }

}