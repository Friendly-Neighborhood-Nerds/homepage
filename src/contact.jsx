import { Modal } from "./modal"

const api = import.meta.env.VITE_API_URL + "/contact";
const modalId = "contact-modal";

export function Contact(props) {
  let rawform;
  const putContact = async (e) => {
    e.preventDefault();
    const form = new FormData(rawform),
      body = {};
    for (const pair of form.entries()) {
      const key = pair[0].charAt(0).toUpperCase() + pair[0].slice(1);
      body[key] = pair[1]
    }
    body["Datetime"] = Date.now();
    try {
      const res = await fetch(api, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body)
      });
      if (res.status == 200) {
        rawform.reset();
        const modal = document.getElementById(modalId);
        modal.classList.add("hidden");
        return true;
      }
      console.error(`Error code from HTTP - ${res.status}`);
      return false;

    } catch (err) {
      console.error(err);
      return false;
    }
  }
  const form = (
    <>
      <h2 class="text-pink-500 text-2xl sm:text-3xl text-shadow font-bangers font-normal justify-center text-center mb-2">Call a Supernerd</h2>
      <form ref={rawform}>
        <div class="relative z-0 w-full mb-5 group">
          <input type="email" name="email" id="email" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-nerd-purple-focus peer" placeholder=" " required />
          <label for="email" class="peer-focus:font-medium absolute text-gray-500 text-sm duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-nerd-purple-focus peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address*</label>
        </div>
        <div class="grid md:grid-cols-2 md:gap-6">
          <div class="relative z-0 w-full mb-5 group">
            <input type="text" name="firstName" id="firstName" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-nerd-purple-focus peer" placeholder=" " required />
            <label for="firstName" class="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-nerd-purple-focus peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">First name*</label>
          </div>
          <div class="relative z-0 w-full mb-5 group">
            <input type="text" name="name" id="name" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-nerd-purple-focus peer" placeholder=" " required />
            <label for="name" class="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-nerd-purple-focus peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Last name*</label>
          </div>
        </div>
        <div class="grid md:grid-cols-2 md:gap-6">
          <div class="relative z-0 w-full mb-5 group">
            <input type="tel" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" name="phone" id="phone" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-nerd-purple-focus peer" placeholder=" " />
            <label for="phone" class="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-nerd-purple-focus peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone number</label>
          </div>
          <div class="relative z-0 w-full mb-5 group">
            <input type="text" name="company" id="company" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-nerd-purple-focus peer" placeholder=" " />
            <label for="company" class="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-nerd-purple-focus peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Company</label>
          </div>
        </div>
        <div class="relative z-0 w-full mb-5 group">
          <textarea rows="5" name="message" id="message" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-nerd-purple-focus peer" placeholder=" " required />
          <label for="message" class="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-nerd-purple-focus peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Message*</label>
        </div>
        <input type="button" onclick={putContact} class="cursor-pointer font-bangers text-xl text-white bg-nerd-purple-dark hover:bg-nerd-purple-focus focus:ring-4 focus:outline-none focus:ring-purple-400 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center" value="Submit" />
      </form>
    </>
  )

  return (
    <Modal content={form} id={modalId}>
      {props.childern}
      <putContact></putContact>
    </Modal>
  )
}

export function openContact() {
  const modal = document.getElementById(modalId);
  modal.classList.remove("hidden");
}