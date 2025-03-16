import { useSocketData } from "@/lib/socket";
import { Separator } from "./ui/separator";

export default function Header() {
  const { isConnected } = useSocketData();

  return (
    <>
      <div className="flex flex-row justify-between items-center px-4 py-2 w-full">
        <h1>Games</h1>
        {isConnected ? "🟢" : "🔴"}
      </div>
      <Separator />
    </>
  );
}
