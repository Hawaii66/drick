import { STCEvent } from "@/lib/event";
import { useSocketLatestEvent } from "@/lib/socket";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Link } from "@tanstack/react-router";
import { Button } from "./ui/button";

type Props = {
  children: React.ReactNode;
};

export default function BlockError({ children }: Props) {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const event = useSocketLatestEvent<{ message: string }>(
    STCEvent.COMMON.ERROR
  );

  useEffect(() => {
    if (event) {
      setErrorMessage(event.message);
    }
  }, [event]);

  if (errorMessage) {
    return (
      <>
        {children}
        <Dialog open={true}>
          <DialogContent hideClose>
            <DialogHeader>
              <DialogTitle className="text-red-700">Error</DialogTitle>
              <DialogDescription>
                Something went wrong, please try again later
              </DialogDescription>
              <DialogDescription>
                Error message: {errorMessage}
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="flex flex-row justify-center">
              <Link to="/" reloadDocument>
                <Button>Home</Button>
              </Link>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </>
    );
  }

  return children;
}
