import { Link } from "@tanstack/solid-router";
import { Settings, Users, Activity, FileText, ListTree } from "lucide-solid";
import { For, type ParentComponent } from "solid-js";

export const PanelLayout: ParentComponent = (props) => {
  const sidebarItems = [
    { icon: ListTree, to: "/" },
    { icon: Activity, to: "/analytics" },
    { icon: Users, to: "/users" },
    { icon: FileText, to: "/reports" },
    { icon: Settings, to: "/settings" },
  ];

  return (
    <div class="bg-background flex h-screen">
      <div class="flex flex-1 flex-col overflow-hidden">
        <header class="bg-background flex h-14 items-center gap-4 border-b px-4">
          <div class="flex flex-1 items-center gap-4">
            <h1 class="text-lg font-semibold">Page Builder</h1>
          </div>
        </header>
        <aside class="bg-muted/50 w-64 overflow-hidden border border-s-0 transition-all duration-300 ease-in-out">
          <div class="flex h-full flex-col">
            <nav class="flex-1 space-y-1 p-4">
              <For each={sidebarItems}>
                {(item) => (
                  <Link
                    to={item.to}
                    class="hover:bg-accent hover:text-accent-foreground flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors"
                    activeProps={{
                      class: "bg-accent text-accent-foreground",
                    }}
                  >
                    <item.icon class="h-4 w-4" />
                  </Link>
                )}
              </For>
            </nav>
          </div>
        </aside>

        <main class="flex-1 overflow-auto">
          <div class="h-full">{props.children}</div>
        </main>
      </div>
    </div>
  );
};
