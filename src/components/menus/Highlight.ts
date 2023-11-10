import {AbstractColorsMenuButton} from "../AbstractColorsMenuButton.ts";
import {Editor} from "@tiptap/core";


export class Highlight extends AbstractColorsMenuButton {

    constructor() {
        super();
        this.iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M15.2427 4.51138L8.50547 11.2486L7.79836 13.3699L6.7574 14.4109L9.58583 17.2393L10.6268 16.1983L12.7481 15.4912L19.4853 8.75402L15.2427 4.51138ZM21.6066 8.04692C21.9972 8.43744 21.9972 9.0706 21.6066 9.46113L13.8285 17.2393L11.7071 17.9464L10.2929 19.3606C9.90241 19.7511 9.26925 19.7511 8.87872 19.3606L4.63608 15.118C4.24556 14.7275 4.24556 14.0943 4.63608 13.7038L6.0503 12.2896L6.7574 10.1682L14.5356 2.39006C14.9261 1.99954 15.5593 1.99954 15.9498 2.39006L21.6066 8.04692ZM15.2427 7.33981L16.6569 8.75402L11.7071 13.7038L10.2929 12.2896L15.2427 7.33981ZM4.28253 16.8858L7.11096 19.7142L5.69674 21.1284L1.4541 19.7142L4.28253 16.8858Z"></path></svg>`

       this.onDefaultColorClick = ()=>{
           this.editor?.chain().focus().unsetHighlight().run()
       }
        this.onColorItemClick = (color) => {
            this.editor?.chain().focus().setHighlight({color}).run()
        }
    }

    onActive(editor: Editor): boolean {
        return editor.isActive("highlight");
    }

}


