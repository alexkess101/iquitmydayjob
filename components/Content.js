import styles from "./content.module.scss";

const Content = ({children, className = "", leftAlign = false}) => {
	return (
		<div className={`${styles.wrapper} ${className}`}>
			<div className={`${styles.container} ${leftAlign ? styles.leftAlign : ""}`}>
				{children}
			</div>
		</div>
	)
}

export default Content;