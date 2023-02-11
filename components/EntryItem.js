import styles from "./entryItem.module.scss";

const EntryItem = ({content}) => {
	return (
		<a href={`/${content.slug}`} className={styles.wrapper}>
			<div className={styles.titleWrapper}>
				<div className={styles.title}>{content.title}</div>
				<div className={styles.subTitle}>{content.subTitle}</div>
			</div>

			<div className={styles.date}>{content.datePublished}</div>
		</a>
	)
}

export default EntryItem;