import BlockDisconnected from "@/components/BlockDisconnected";
import BlockError from "@/components/BlockError";
import Header from "@/components/Header";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

export const Route = createRootRoute({
  component: () => (
    <div className="flex flex-col justify-start items-start h-screen">
      <Header />
      <BlockError>
        <BlockDisconnected>
          <Outlet />
        </BlockDisconnected>
        <TanStackRouterDevtools />
      </BlockError>
    </div>
  ),
});
