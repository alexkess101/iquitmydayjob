import styles from "./spacer.module.scss";

const Spacer = ({amount}) => {
	return (
		<div className={`${styles.spacer} ${styles["amount" + amount]}`}/>
	)
}

export default Spacer;