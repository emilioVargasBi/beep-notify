import { containerPosition } from "./container";

export type BeepType = "success" | "error" | "info" | "warning" | "danger";

export interface ToastOptions {
    message: string;
    type?: BeepType;
    position?: containerPosition;
    duration?: number | null;
    sound?: boolean;
    options?: {
        html?: boolean;
        closeButton?: boolean;
        stopOnHover?: boolean;
        showProgressBar?: boolean;
    };
}

export interface ActionOptions {
    message: string;
    type?: BeepType;
    position?: containerPosition;
    acceptText?: string;
    rejectText?: string;
    duration?: number | null;
    html?: boolean;
    options?: {
        reverseButtons?: boolean;
    };
    onAccept?: () => void;
    onReject?: () => void;
    onTimeout?: () => void;
}