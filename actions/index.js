export const RECEIVE_ENTRIES = 'RECEIVE_ENTRIES'

export function receiveEntries (entries) {
  return {
    type: RECEIVE_ENTRIES,
    entries,
  }
}