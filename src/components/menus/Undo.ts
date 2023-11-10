import {AbstractMenuButton} from "../AbstractMenuButton.ts";

export class Undo extends AbstractMenuButton {
    constructor() {
        super();
        const template = `
        <div style="height: 16px">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.82843 6.99955L8.36396 9.53509L6.94975 10.9493L2 5.99955L6.94975 1.0498L8.36396 2.46402L5.82843 4.99955H13C17.4183 4.99955 21 8.58127 21 12.9996C21 17.4178 17.4183 20.9996 13 20.9996H4V18.9996H13C16.3137 18.9996 19 16.3133 19 12.9996C19 9.68584 16.3137 6.99955 13 6.99955H5.82843Z"></path></svg>
        </div>
        `;
        this.template = template;
        this.registerClickListener();
    }

    // @ts-ignore
    onClick(commands) {
        commands.undo();
    }

}


