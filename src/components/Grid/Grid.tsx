import type { Children } from "../../types/children";

export default function Grid({ children }: Children) {
  return (
    <ul
      style={{
        display: "flex",
        gap: 20,
        flexWrap: "wrap",
        padding: "20px 50px",
      }}
    >
      {children}
    </ul>
  );
}
