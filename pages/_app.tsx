import React from "react";
import { AppProps } from "next/app";
import { Refine } from "@pankod/refine-core";
import {
  notificationProvider,
  Layout,
  ReadyPage,
  ErrorComponent,
} from "@pankod/refine-antd";
import routerProvider from "@pankod/refine-nextjs-router";
import dataProvider from "@pankod/refine-simple-rest";
import "@pankod/refine-antd/dist/reset.css";
import { AntdInferencer } from "@pankod/refine-inferencer/antd";
import { ColorModeContextProvider } from "@contexts";

const API_URL = "https://api.fake-rest.refine.dev";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <ColorModeContextProvider>
      <Refine
        routerProvider={routerProvider}
        dataProvider={dataProvider(API_URL)}
        notificationProvider={notificationProvider}
        Layout={Layout}
        ReadyPage={ReadyPage}
        catchAll={<ErrorComponent />}
        resources={[
          {
            name: "posts",
            list: AntdInferencer,
            edit: AntdInferencer,
            show: AntdInferencer,
            create: AntdInferencer,
            canDelete: true,
          },
        ]}
      >
        <Component {...pageProps} />
      </Refine>
    </ColorModeContextProvider>
  );
}

export default MyApp;
