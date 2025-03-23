import { useSocketData } from "@/lib/socket";
import { Separator } from "./ui/separator";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

export default function Header() {
  const { isConnected } = useSocketData();

  return (
    <div className="top-0 sticky shadow-md shadow-neutral-300">
      <div className="flex flex-row justify-between items-center bg-white px-4 py-2 w-full">
        <h1 className="font-semibold text-md text-purple-700 tracking-wider">
          PartySpel.com
        </h1>
        <Dialog>
          <DialogTrigger>{isConnected ? "🟢" : "🔴"}</DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Connection Status</DialogTitle>
              <DialogDescription>
                {isConnected
                  ? "🟢 Connected to the server"
                  : "🔴 Disconnected from the server"}
              </DialogDescription>
            </DialogHeader>
            <DialogClose />
          </DialogContent>
        </Dialog>
      </div>
      <Separator />
    </div>
  );
}
