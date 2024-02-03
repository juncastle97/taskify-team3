import clsx from "clsx";
import styles from "./LandingCard.module.scss";

interface LandingCardProps {
  image: string;
  title: string;
  description: string;
}

const LandingCard: React.FC<LandingCardProps> = ({
  image,

  title,
  description,
}) => {
  return (
    <div className={clsx(styles.configCards)}>
      <div className={clsx(styles.configContainer)}>
        <div className={clsx(styles.configCard)}>
          <div className={clsx(styles.configCardImageContainer)}>
            <img src={image} width={300} alt={title} />
          </div>
          <div className={clsx(styles.configDescriptionContainer)}>
            <div className={clsx(styles.configSubTitle)}>{title}</div>
            <div className={clsx(styles.configDescription)}>{description}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingCard;
