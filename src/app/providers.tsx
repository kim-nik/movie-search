"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, Suspense, useState } from "react";

interface ProvidersProps {
  children: ReactNode;
}

const Providers = ({ children }: ProvidersProps) => {
  const [queryClient] = useState(() => new QueryClient());

  // FIXME надо ли оборачивать в саспенс все приложение
  return (
    <Suspense>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </Suspense>
  );
};

export default Providers;
