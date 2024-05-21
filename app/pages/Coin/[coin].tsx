import { useParams } from "next/navigation";

export default function CoinDetails() {
  const { id } = useParams();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>{id}</h1>
    </main>
  );
}
