"use client"

import { APP_TITLE, Routes } from "@/config/consts"
import { Anchor, Box, type BoxProps, Burger, Container, Drawer, Flex, Group, Stack, Title } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import Link from "next/link"

export function Header(props: BoxProps) {
  const [showMenu, { toggle: toggleMenu }] = useDisclosure()

  return (
    <Box style={{ zIndex: 99, backdropFilter: "blur(20px)" }} {...props}>
      <Container py={8}>
        <Flex justify="space-between">
          <Anchor c="white" underline="never" component={Link} href={Routes.HOME}>
            <Title children={APP_TITLE} size="h2" />
          </Anchor>
          <Group gap="md">
            <Group visibleFrom="md" gap="lg">
              <Anchor mt={3} c="white" fw="bold" underline="never" component={Link} href={Routes.POKEMONS} children="ポケモン一覧" />
              <Anchor mt={3} c="white" fw="bold" underline="never" component={Link} href={Routes.COMPANIES} children="企業情報" />
            </Group>

            <Burger color="#fff" opened={showMenu} onClick={toggleMenu} />
            <Drawer position="right" opened={showMenu} onClose={toggleMenu}>
              <Stack gap="lg">
                <Anchor underline="never" href={Routes.POKEMONS} fw="bold" children="ポケモン一覧" />
                <Anchor underline="never" href={Routes.COMPANIES} fw="bold" children="企業情報" />
              </Stack>
            </Drawer>
          </Group>
        </Flex>
      </Container>
    </Box>
  )
}
