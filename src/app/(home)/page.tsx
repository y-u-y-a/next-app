"use client"

import { Button, Container, FileInput, Group } from "@mantine/core"
import { useState } from "react"

export default function RootPage() {
  const [files, setFiles] = useState<File[]>([])

  const handleChange = async (newFiles: File[]) => {
    setFiles(newFiles)
    const formData = new FormData()
    newFiles.map((file) => formData.append("file", file))

    // const uploadUrl = "https://example.com/upload"
    // await fetch(uploadUrl, { method: "POST", body: formData })
  }

  return (
    <Container py={40}>
      <Group>
        <FileInput miw="400px" value={files} onChange={handleChange} multiple />
        <Button children="アップロードする" />
      </Group>
    </Container>
  )
}
