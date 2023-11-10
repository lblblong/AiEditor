import {AbstractMenuButton} from "../AbstractMenuButton.ts";

export class Video extends AbstractMenuButton {

    fileInput?: HTMLInputElement;

    constructor() {
        super();
        const template = `
        <div>
        <input type="file" accept="video/*" style="display: none">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M3 3.9934C3 3.44476 3.44495 3 3.9934 3H20.0066C20.5552 3 21 3.44495 21 3.9934V20.0066C21 20.5552 20.5551 21 20.0066 21H3.9934C3.44476 21 3 20.5551 3 20.0066V3.9934ZM5 5V19H19V5H5ZM10.6219 8.41459L15.5008 11.6672C15.6846 11.7897 15.7343 12.0381 15.6117 12.2219C15.5824 12.2658 15.5447 12.3035 15.5008 12.3328L10.6219 15.5854C10.4381 15.708 10.1897 15.6583 10.0672 15.4745C10.0234 15.4088 10 15.3316 10 15.2526V8.74741C10 8.52649 10.1791 8.34741 10.4 8.34741C10.479 8.34741 10.5562 8.37078 10.6219 8.41459Z"></path></svg>
        </div>
        `;
        this.template = template;
        this.registerClickListener();
    }


    connectedCallback() {
        super.connectedCallback();
        if (this.options?.video?.customMenuInvoke) {
            this.querySelector("input")!.remove();
        } else {
            this.fileInput = this.querySelector("input") as HTMLInputElement;
            this.fileInput!.addEventListener("change", () => {
                const files = this.fileInput?.files;
                if (files && files.length > 0) {
                    for (let file of files) {
                        this.editor?.commands.uploadVideo(file);
                    }
                }
                (this.fileInput as any).value = "";
            });
        }
    }


    // @ts-ignore
    onClick(commands) {
        if (this.options?.video?.customMenuInvoke) {
            this.options.video.customMenuInvoke(this.editor!);
        } else {
            this.fileInput?.click();
        }
    }

}


