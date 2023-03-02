// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const encodeMessage = (message) => {
  // Prime encoding, avoid for better security
  // Uses a permutation of primes to encode the id(message)
  // Only encode valid evaluator id
  const msg = message.toString() + ''
  if(msg.length != 6) {
      return msg
  }

  const encoder = new TextEncoder()
  const data = encoder.encode(msg)
  const positions = [11, 5, 2, 3, 13, 7]
  const bytes = []
  for(let i = 0 ; i < 16 ; i++) bytes.push(Math.floor(Math.random() * 16))
  for(let i = 0 ; i < data.length ; i++) bytes[positions[i]] = data[i]
  console.log('bytes', new Uint8Array(bytes))
  return Array.from(new Uint8Array(bytes)).map(b => b.toString(16).padStart(2, '0')).join('')
}

const decodeMessage = (message) => {
  // Code
  const msg = message.toString() + ''
  if(msg.length != 32) return message
  
  const bytes = []
  for(let i = 0 ; i < msg.length; i += 2) {
    bytes.push(Number.parseInt(msg.substring(i, i + 2), 16))
  }

  const data = []
  const positions = [11, 5, 2, 3, 13, 7]
  for(let i = 0; i < positions.length; i++) data.push(bytes[positions[i]])
  const decoder = new TextDecoder()
  const decoded = decoder.decode(new Uint8Array(data))
  
  return decoded
}

export default function handler(req, res) {
  const { id } = req.query
  const encoded = encodeMessage(id)
  const decoded = decodeMessage(encoded)
  res.status(200).json({ message: 'Hello there' })
}
