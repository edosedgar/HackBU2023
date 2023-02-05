import React, { FC, Suspense, lazy } from "react";
import { Route, Navigate, Routes as RouterRoutes } from "react-router-dom";
import { Loading } from "@/modules/shared";

const RegistrationPage = lazy(() => import("@/pages/auth/registration"));
const LoginPage = lazy(() => import("@/pages/auth/login"));
const SamplesPage = lazy(() => import("@/pages/samples"));

const Routes: FC = () => {
  return (
    <RouterRoutes>
      <Route
        path="/auth/register"
        element={
          <Suspense fallback={<Loading />}>
            <RegistrationPage />
          </Suspense>
        }
      />
      <Route
        path="/auth/login"
        element={
          <Suspense fallback={<Loading />}>
            <LoginPage />
          </Suspense>
        }
      />
      <Route
        path="/"
        element={
          <Suspense fallback={<Loading />}>
            <SamplesPage />
          </Suspense>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </RouterRoutes>
  );
};

export default Routes;
