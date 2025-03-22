import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/error")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Dialog open={true}>
      <DialogContent hideClose>
        <DialogHeader>
          <DialogTitle className="text-red-700">Error</DialogTitle>
          <DialogDescription>
            Something went wrong, please try again later
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex flex-row justify-center">
          <Link to="/" reloadDocument>
            <Button>Home</Button>
          </Link>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
