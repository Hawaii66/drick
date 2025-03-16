import { useSocketData } from "@/lib/socket";

type Props = {
  children: React.ReactNode;
};

export default function BlockDisconnected({ children }: Props) {
  const { isConnected } = useSocketData();

  if (!isConnected) {
    return <p className="px-4 py-2">Connect to the server</p>;
  }

  return children;
}
