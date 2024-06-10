import { FC } from "react";
import { ButtonProps } from "./ButtonProps";
import styles from './Button.module.scss';
const Button: FC<ButtonProps> = ({ skin = "primary", label, children, size='base', hasNextSpace, ...props }) =>
    <button className={`${styles.btn} ${styles[skin]} ${styles[size]} ${hasNextSpace ? styles['next-space'] : ''}`} {...props}>
        { label || children}
    </button>
export default Button;