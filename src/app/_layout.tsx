import { Stack } from "expo-router";
import {AppHeader} from "@/layout/Header";

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        header: (props) => <AppHeader {...props} />,
      }}
    />
  );
}