declare global{
  interface Window {
    glow?: any
  }
}

async function connect(){
  if (!window?.glow) {
    window.open("https://glow.app", "_blank");
    return
  }
  try {
    const provider = window.glow
    const resp = await provider.connect()
    console.log(resp.address)

    provider.on("connect", () => console.log("connected!"));
    provider.on("disconnect", () => console.log("disconnected!"))
    provider.on('accountChanged', (publicKey: any) => {
      if (publicKey) {
          // Set new public key and continue as usual
          console.log(`Switched to account ${publicKey.toBase58()}`);
      } else {
        console.log("account changed no keys??")
      }
    })

    return provider

  } catch (err) {
      console.log("User rejected the connection request")
  }
}

async function init(){
  if (!window?.glow) return
  try {
    const provider = window.glow
    const resp = await provider.connect({ onlyIfTrusted: true });
    console.log(resp.address); // 636Lq2zGQDYZ3i6hahVcFWJkY6Jejndy5Qe4gBdukXDi
    
    provider.on("connect", () => console.log("connected!"));
    provider.on("disconnect", () => console.log("disconnected!"))
    provider.on('accountChanged', (publicKey: any) => {
      if (publicKey) {
          // Set new public key and continue as usual
          console.log(`Switched to account ${publicKey.toBase58()}`);
      } else {
        console.log("account changed no keys??")
      }
    })

    return provider
    
  } catch (err) {
      // User hasn't connected to your site before.
      // No prompt is shown. The request would silently fail.
  }
}

async function disconnect(){
  if (!window?.glow) return
  const resp = await window.glow.disconnect();
}

export {
  init,
  connect,
  disconnect
}