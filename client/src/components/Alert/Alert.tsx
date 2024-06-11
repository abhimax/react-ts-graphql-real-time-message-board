import { FC } from "react";
import { AlertProps } from "./AlertProps";
import styles from './Alert.module.scss';
const Alert: FC<AlertProps> = ({ skin = "error", onClose, message}) =>
    <span className={`${styles.alert} ${styles[skin]}`}>
{message}
<button className={styles.close} onClick={onClose}>Close</button>
</span>
export default Alert;