declare global{
  interface Window {
    Slope?:any
  }
}

async function connect(){
  if(!window?.Slope) return
  try {
    const slope = new window.Slope()
    const { msg, data } = await slope.connect()
    
    if (msg === 'ok') {
      console.log(data.publicKey)
      // EFf1fmV6RL6EC7Z45CtaG1iNCPhxsUzJEWsKJJqjjSm8
    } else {
      console.log(msg)
      // User rejected conenction or is in incorrect chain (Ethereum / Solana)
    }

    //Slope provider has no flag
    slope.isSlope = true
    return slope
  } catch (error) {
    // Slope is not installed or other errors.
  }
}

function disconnect(){
  if(!window?.Slope) return
  const slope = new window.Slope()
  slope.disconnect()
}
export {
  connect,
  disconnect
}


/**
 * Important: user needs to set wallet chain (ethereum or solana) in order to any of the providers to function
 * if the chain does not match with the provider that's trying to communicate it will throw a message to change chain.!
 */

/**
 * Add for solana and ethereum:
 * provider.isSlope = true 
 */