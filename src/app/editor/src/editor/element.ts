import {EditorMode} from './mode';

export interface CkeditorElement {
    destroyEditor(): void | Promise<void>;
    setMode(mode: EditorMode): void;
}
