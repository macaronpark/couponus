import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import { trpc } from "@utils/trpc";
import { Route, Routes } from "react-router-dom";
import IndexPage from "@routes/IndexPage";
import LoginPage from "@routes/LoginPage";

const App = () => {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: "http://localhost:5000",
        }),
      ],
    })
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="/" element={<IndexPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </QueryClientProvider>
    </trpc.Provider>
  );
};

export default App;
