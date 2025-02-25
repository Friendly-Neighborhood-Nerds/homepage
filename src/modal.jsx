import { Portal } from "solid-js/web";
import { createSignal, createContext, useContext } from "solid-js";

function uuidv4() {
    return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c =>
        (+c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> +c / 4).toString(16)
    );
}

const ModalContext = createContext();

export function Modal(props) {
    let modal;
    const modalId = props.id ? props.id : uuidv4(),
    closeModal = () => {
        modal.classList.add("hidden");
    },
     openModal = (content) => {
        if (content){
            setContent(content);
        }
        modal.classList.remove("hidden");
    },
     outsideModal = (e) => {
        if (e.target == modal) {
            modal.classList.add("hidden");
        }
    },
    [content, setContent] = createSignal(props.content),
    modalJsx = (
        <Portal>
            <aside ref={modal} id={modalId} onclick={outsideModal} class="hidden fixed flex top-0 left-0 w-full h-full z-50 overflow-auto bg-black/80 items-center">
                <div class="w-6/10 mx-auto bg-nerd-purple-light rounded shadow xs:px-16 px-10 py-10 min-h-1/2 relative">
                    <button type="button" onclick={closeModal} class="text-gray-800 hover:bg-black/25 rounded-lg text-sm w-8 h-8 flex absolute justify-center items-center right-2 top-2 cursor-pointer" data-modal-hide="default-modal">
                        <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                        </svg>
                        <span class="sr-only">Close modal</span>
                    </button>
                    {content()}
                </div>
            </aside>
        </Portal>
    ),
    contextVal = {openModal, closeModal}

    return(
        <ModalContext.Provider value={contextVal}>
            {props.children}
            {modalJsx}
        </ModalContext.Provider>
    )
}

export function useModal() { return useContext(ModalContext); }