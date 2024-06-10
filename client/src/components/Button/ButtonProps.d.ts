import { ButtonHTMLAttributes } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
    skin? : 'primary' | 'type1' | 'type2',
    label: string,
    size?: 'base' | 'small'
    hasNextSpace?: boolean
}
