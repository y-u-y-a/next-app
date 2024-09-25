"use client"

import { createUserAction } from "@/features/user/actions"
import { type CreateUserFormInput, createUserFormSchema } from "@/features/user/userSchema"
import { Button, Flex, Paper, type PaperProps, Stack, TextInput } from "@mantine/core"
import { useForm, zodResolver } from "@mantine/form"

export const CreateUserForm = (props: PaperProps) => {
  const form = useForm<CreateUserFormInput>({
    validate: zodResolver(createUserFormSchema),
    initialValues: {
      name: "",
      email: "",
    },
  })

  /** 登録する */
  const handleSubmit = async (input: CreateUserFormInput) => {
    try {
      await createUserAction(input)
      console.info({ input, error: form.errors })
    } catch (error) {
      console.error({ error })
    }
  }

  return (
    <>
      <Paper mb={60} p={40} bg="gray.2" radius={0} {...props}>
        <form onSubmit={form.onSubmit(handleSubmit)} noValidate>
          <Stack gap={20}>
            <TextInput {...form.getInputProps("name")} label="ユーザー名" error={form.errors.name} />
            <TextInput {...form.getInputProps("email")} label="メールアドレス" error={form.errors.email} />
          </Stack>
          <Flex mt={40} gap="md" justify="center">
            <Button variant="filled" type="submit" children="Update" />
          </Flex>
        </form>
      </Paper>
    </>
  )
}
