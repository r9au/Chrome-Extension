import "@mantine/core/styles.css";
import {
  MantineProvider,
  Container,
  AppShell,
  Group,
  Avatar,
  Text,
} from "@mantine/core";
import { Routes, Route } from "react-router";
import Prolist from "./components/Projects/Prolist";
import Proinfo from "./components/projectinfo/Proinfo"
import AuthHandler from "./components/Auth/AuthHandler";
import WithAuth from "./components/Auth/WithAuth";
import useAuthStore from "../src/stores/useAuthStore";

function App() {
  const { user } = useAuthStore();

  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      defaultColorScheme="light"
    >
      <div style={{ width: "400px", maxHeight: "600px", overflow: "auto" }}>
        <AppShell padding="xs">
          <AppShell.Header height={20} p="xs">
            <Group position="apart">
              <Text size="md" fw={700}>
                OneStop
              </Text>
              {user && (
                <Group>
                  <Text size="sm" truncate>
                    {user.displayName || user.username}
                  </Text>
                  <Avatar
                    size="sm"
                    color="blue"
                    src={user.profileUrl ? `${user.profileUrl}.png` : null}
                  >
                    {(user.displayName || user.username || "U")[0]}
                  </Avatar>
                </Group>
              )}
              {!user && <AuthHandler />}
            </Group>
          </AppShell.Header>

          <AppShell.Main>
            <Container p="xs">
              <Routes>
                <Route path="/" element={WithAuth(Prolist)()} />
                <Route
                  path="/:proid/info"
                  element={WithAuth(Proinfo)()}
                />
                <Route path="*" element={<div>Not Found</div>} />
              </Routes>
            </Container>
          </AppShell.Main>
        </AppShell>
      </div>
    </MantineProvider>
  );
}

export default App;