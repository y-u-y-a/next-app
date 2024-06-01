"use client"

import { Button, Container, FileInput, Group } from "@mantine/core"
import { type FormEvent, useState } from "react"

export default function RootPage() {
  const [file, setFile] = useState<File | null>(null)

  const handleChange = async (newFile: File | null) => {
    setFile(newFile)
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!file) return

    try {
      const url = "https://upload.com"
      const body = new FormData()
      body.append("file", file)

      const res = await fetch(url, { body, method: "PUT", headers: { "Content-Type": file.type } })
      if (!res.ok) throw Error("アップロードに失敗しました")

      alert("アップロード成功！")
    } catch (error) {
      console.error(error)
      alert("アップロード失敗。。。")
    }
  }

  return (
    <Container py={40}>
      <form onSubmit={handleSubmit} noValidate>
        <Group mb={20}>
          <FileInput miw="400px" onChange={handleChange} />
        </Group>
        <Button type="submit" children="アップロードする" />
      </form>
    </Container>
  )
}
