import styles from "./mainTheme.module.scss";

const MainTheme = ({children}) => {
	return (
		<div className={styles.wrapper}>
			<div className={styles.container}>
				{children}
			</div>
		</div>
	)
}

export default MainTheme;