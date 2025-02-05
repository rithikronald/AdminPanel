// Import Dependencies
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router";

// Local Imports
import { AuthProvider } from "app/contexts/auth/Provider";
import { BreakpointProvider } from "app/contexts/breakpoint/Provider";
import { LocaleProvider } from "app/contexts/locale/Provider";
import { SidebarProvider } from "app/contexts/sidebar/Provider";
import { ThemeProvider } from "app/contexts/theme/Provider";
import router from "app/router/router";

// ----------------------------------------------------------------------

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ThemeProvider>
          <LocaleProvider>
            <BreakpointProvider>
              <SidebarProvider>
                <RouterProvider router={router} />
              </SidebarProvider>
            </BreakpointProvider>
          </LocaleProvider>
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
