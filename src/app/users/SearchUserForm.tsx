"use client"

import { type SearchUserFormInput, searchUserFormSchema } from "@/features/user/userSchema"
import { useChangeQueryParams } from "@/hooks/useChangeQueryParams"
import { Button, Flex, Group, Paper, Stack, TextInput } from "@mantine/core"
import { useForm, zodResolver } from "@mantine/form"
import { notifications } from "@mantine/notifications"
import { IconCheck, IconX } from "@tabler/icons-react"

export const SearchUserForm = () => {
  const { overwriteQueryParams, clearQueryParams } = useChangeQueryParams()

  const form = useForm<SearchUserFormInput>({
    validate: zodResolver(searchUserFormSchema),
    initialValues: {
      name: "",
      email: "",
    },
  })

  /** 検索する */
  const search = async (input: SearchUserFormInput) => {
    try {
      overwriteQueryParams([`email=${input.email}`, `name=${input.name}`])
      notifications.show({ title: "Success！", message: "", color: "teal", icon: <IconCheck size="1.2rem" /> })
    } catch (error) {
      console.error({ error })
      notifications.show({ title: "Failed！", message: "", color: "pink", icon: <IconX size="1.2rem" /> })
    }
  }

  return (
    <>
      <Paper mb={60} p={40} bg="gray.2" radius={0}>
        <form onSubmit={form.onSubmit(search)} noValidate>
          <Stack gap={24}>
            <Group>
              <TextInput maw={360} {...form.getInputProps("name")} label="Name" />
              <TextInput maw={360} {...form.getInputProps("email")} label="Email" error={!!form.errors.email} />
            </Group>
            <Flex gap="md" align="center">
              <Button children="Search" variant="filled" type="submit" />
              <Button children="Clear" variant="outline" onClick={clearQueryParams} />
            </Flex>
          </Stack>
        </form>
      </Paper>
    </>
  )
}
