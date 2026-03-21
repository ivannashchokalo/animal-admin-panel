import { Link, useLocation } from "react-router";
import styles from "./Breadcrumbs.module.scss";
import Icon from "../Icon/Icon";
import clsx from "clsx";

type BreadcrumbItem = {
  title: string;
  path?: string;
};

type Props = {
  items: BreadcrumbItem[];
  className?: string;
};

export default function Breadcrumbs({ items, className }: Props) {
  const location = useLocation();
  return (
    <div className={clsx(styles.breadcrumb, className)}>
      {items.map((item, index) => (
        <p
          className={clsx(
            index === items.length - 1 ? styles.lastElement : styles.element,
          )}
          key={index}
        >
          {item.path ? (
            <Link
              className={clsx(index === 0 && styles.firstLink)}
              to={item.path}
              state={location.state}
            >
              {index === 0 && (
                <Icon
                  name="go-back"
                  size={16}
                  className={styles.breadcrumbIcon}
                />
              )}
              {item.title}
            </Link>
          ) : (
            item.title
          )}

          {index < items.length - 1 && " / "}
        </p>
      ))}
    </div>
  );
}
