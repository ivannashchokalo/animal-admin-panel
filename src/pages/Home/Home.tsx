import { useCheckAuthQuery } from "../../services/auth";

export default function Home() {
  const { data } = useCheckAuthQuery();
  console.log(data);

  return (
    <div>
      <p>home</p>
      {data && <p>authenticated</p>}
    </div>
  );
}
