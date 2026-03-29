import { components } from "react-select";
import type { DropdownIndicatorProps } from "react-select";
import Icon from "../Icon/Icon";
import styles from "./DropdownIndicator.module.scss";
import type { OptionType } from "../../types/select";

export default function DropdownIndicator(
  props: DropdownIndicatorProps<OptionType, false>,
) {
  return (
    <components.DropdownIndicator {...props}>
      <Icon name="arrow" size={24} className={styles.arrow} />
    </components.DropdownIndicator>
  );
}
