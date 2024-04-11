export async function wait5SecondsAsync() {
  console.log("Start wait timer.")

  await new Promise<void>((resolve) => {
    setTimeout(() => {
      console.log("Passed 5 seconds.")
      resolve()
    }, 5000)
  })
  return true
}
