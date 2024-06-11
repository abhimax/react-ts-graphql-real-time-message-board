import { ButtonHTMLAttributes } from "react";

export interface AlertProps{
    skin? : 'error' | 'success' | 'info',
    onClose?: () => void, 
    message: string
}
