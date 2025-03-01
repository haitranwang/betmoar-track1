import Image from "next/image";
import TakerTransactionCard from "../components/TakerTransactionCard"

export default function Home() {

  return (
    <div className="p-4 flex justify-center">
      <TakerTransactionCard />
    </div>
  );
}
