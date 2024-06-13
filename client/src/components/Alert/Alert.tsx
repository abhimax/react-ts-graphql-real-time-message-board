import { FC } from "react";
import { AlertProps } from "./AlertProps";
import styles from './Alert.module.scss';
const Alert: FC<AlertProps> = ({ skin = "error", onClose, message}) =>
    <div className={`alert-msg ${styles.alert} ${styles[skin]}`}>
{message}
{ onClose && <button className={styles.close} onClick={onClose}>Close</button>}
</div>
export default Alert;