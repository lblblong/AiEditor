import {AiMessageListener} from "./AiMessageListener.ts";
import {AiClient} from "./AiClient.ts";
import {Editor} from "@tiptap/core";
import {AiGlobalConfig} from "../AiGlobalConfig.ts";
import {AiModelConfig} from "./AiModelConfig.ts";

export interface ChatController {
    stop: () => void
}


export abstract class AiModel {

    editor: Editor;
    globalConfig: AiGlobalConfig;
    aiModelName: string;
    aiModelConfig: AiModelConfig;


    constructor(editor: Editor, globalConfig: AiGlobalConfig, aiModelName: string) {
        this.editor = editor;
        this.globalConfig = globalConfig;
        this.aiModelName = aiModelName;
        this.aiModelConfig = globalConfig.models[aiModelName];
    }

    chat(selectedText: string, prompt: string, listener: AiMessageListener): void {
        const startFunc = (url: string) => {
            const aiClient = this.createAiClient(url, listener);
            const finalPrompt = prompt.includes("{content}") ? prompt.split('{content}').join(selectedText) : `${selectedText}\n${prompt}`
            const payload = this.wrapPayload(finalPrompt);
            aiClient.start(typeof payload === "string" ? payload : JSON.stringify(payload))
        }

        if (this.globalConfig.onCreateClientUrl) {
            this.globalConfig.onCreateClientUrl(this.aiModelName, this.aiModelConfig, startFunc)
        } else {
            startFunc(this.createAiClientUrl())
        }
    }


    /**
     * 创建客户端链接 URL
     */
    abstract createAiClientUrl(): string;

    /**
     * 创建客户端
     */
    abstract createAiClient(url: string, listener: AiMessageListener): AiClient;

    /**
     * 封装消息，把 prompt 转换为协议需要的格式
     * @param prompt
     */
    abstract wrapPayload(prompt: string): any;


}