"use client"

import { APP_TITLE, Paths } from "@/config/consts"
import { Anchor, Box, type BoxProps, Burger, Container, Drawer, Flex, Group, Stack, Title } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import Link from "next/link"

export const Header = (props: BoxProps) => {
  const [showMenu, { toggle: toggleMenu }] = useDisclosure()

  return (
    <Box style={{ zIndex: 99, backdropFilter: "blur(20px)" }} {...props}>
      <Container py={8}>
        <Flex justify="space-between">
          <Anchor c="white" underline="never" component={Link} href={Paths.HOME}>
            <Title children={APP_TITLE} size="h2" />
          </Anchor>
          <Group gap="md">
            <Group visibleFrom="md" gap="lg">
              <Anchor mt={3} c="white" fw="bold" underline="never" component={Link} href={Paths.POKEMONS} children="ポケモン一覧" />
              <Anchor mt={3} c="white" fw="bold" underline="never" component={Link} href={Paths.COMPANIES} children="企業情報" />
            </Group>

            <Burger color="#fff" opened={showMenu} onClick={toggleMenu} />
            <Drawer position="right" opened={showMenu} onClose={toggleMenu}>
              <Stack gap="lg">
                <Anchor underline="never" href={Paths.POKEMONS} fw="bold" children="ポケモン一覧" />
                <Anchor underline="never" href={Paths.COMPANIES} fw="bold" children="企業情報" />
              </Stack>
            </Drawer>
          </Group>
        </Flex>
      </Container>
    </Box>
  )
}
