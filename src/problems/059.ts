import { codes } from '../resources/059'
import { range } from 'lib/range'
import { sum } from 'lib/sum'

// XOR decryption
// ==============
// Each character on a computer is assigned a unique code and the preferred
// standard is ASCII (American Standard Code for Information Interchange).
// For example, uppercase A = 65, asterisk (*) = 42, and lowercase k = 107.
//
// A modern encryption method is to take a text file, convert the bytes to
// ASCII, then XOR each byte with a given value, taken from a secret key. The
// advantage with the XOR function is that using the same encryption key on
// the cipher text, restores the plain text; for example, 65 XOR 42 = 107,
// then 107 XOR 42 = 65.
//
// For unbreakable encryption, the key is the same length as the plain text
// message, and the key is made up of random bytes. The user would keep the
// encrypted message and the encryption key in different locations, and
// without both "halves", it is impossible to decrypt the message.
//
// Unfortunately, this method is impractical for most users, so the modified
// method is to use a password as a key. If the password is shorter than the
// message, which is likely, the key is repeated cyclically throughout the
// message. The balance for this method is using a sufficiently long password
// key for security, but short enough to be memorable.
//
// Your task has been made easy, as the encryption key consists of three
// lower case characters. Using cipher1.txt, a file containing the encrypted
// ASCII codes, and the knowledge that the plain text must contain common
// English words, decrypt the message and find the sum of the ASCII values
// in the original text.

const toggleEncryption = (msg: Buffer, key: Buffer) => {
  const len = key.length
  return msg.map((d, i) => d ^ key[i % len])
}

// expect(toggleEncryption('A', '*')).toBe('k')
// expect(toggleEncryption('AkAk', '*')).toBe('kAkA')
// expect(toggleEncryption('enchiridion', '123')).toBe(`T\\PY[AXVZ^\\`)

type FrequencyTable = { [key: number]: number }
const frequencyReducer = (r: any, d: number) => ({ ...r, [d]: (r[d] || 0) + 1 })

const sortByValue = (obj: { [k: string]: number }) =>
  Object.entries(obj)
    .sort((b, a) => a[1] - b[1])
    .map(e => +e[0])

const getFrequency = (b: Buffer) =>
  sortByValue(b.reduce(frequencyReducer, {} as FrequencyTable))

const encryptedMessage = Buffer.from(codes)

const partition = (b: Buffer, n: number) =>
  range(0, n - 1).map(d => Buffer.from(b.filter((_, i) => i % n === d)))

{
  const alphabet = Buffer.from('abcdefghijklmnopqrstuvxyz')
  expect(partition(alphabet, 3).map(b => b.toString())).toEqual([
    'adgjmpsvz',
    'behknqtx',
    'cfiloruy',
  ])
}

const messageFrequencies = partition(encryptedMessage, 3).map(getFrequency)

const key = Buffer.from(messageFrequencies.map(arr => arr[0] ^ 32))

export const solution059 = () => {
  const decrypted = Array.from(toggleEncryption(encryptedMessage, key))
  return sum(decrypted)
}
