import icons from "/icons.svg";

interface IconProps {
  name: string;
  size: number;
  className: string;
}

function Icon({ name, size, className }: IconProps) {
  return (
    <svg width={size} height={size} className={className}>
      <use href={`${icons}#${name}`} />
    </svg>
  );
}

export default Icon;
