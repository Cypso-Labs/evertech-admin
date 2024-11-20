"use client";

import { Provider } from "react-redux";
import { store } from "./store/store";
import AuthWrapper from "../AuthWrapper/authWrapper";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <AuthWrapper>
        {children}
      </AuthWrapper>
    </Provider>
  );
}
