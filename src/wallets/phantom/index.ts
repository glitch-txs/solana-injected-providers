declare global{
  interface Window {
      phantom?:any
  }
}

const getProvider = () => {
  if ('phantom' in window) {
    const provider = window.phantom?.solana;

    if (provider?.isPhantom) {
      return provider;
    }
  }

  window.open('https://phantom.app/', '_blank');
};


const connect = async()=>{
  const provider = getProvider(); // see "Detecting the Provider"
  try {
    const resp = await provider.connect();
    console.log(resp.publicKey.toString());
    // 26qv4GCcx98RihuK3c4T6ozB3J7L6VwCuFVc7Ta2A3Uo

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
    // { code: 4001, message: 'User rejected the request.' }
  }
}

function init(){
  const provider = getProvider();
  provider.connect({ onlyIfTrusted: true })
  .then(({ publicKey }: any) => {
    console.log(publicKey.toString());
    
    provider.on("connect", () => console.log("connected!"))
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

  })
  .catch(() => {
      // Handle connection failure as usual
  })
}

function disconnect(){
  const provider = getProvider();
  provider.disconnect();
}

export {
  disconnect,
  connect,
  init
}