import { Box } from "@mantine/core"

/**
 * template.tsx -> layout.tsx -> page.tsx
 */
export default function Template({ children }: { children: React.ReactNode }) {
  console.log("ページビューのログ記録などに使用します")
  return <Box>{children}</Box>
}
