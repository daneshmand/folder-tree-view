export function generateRandomId(): string {
  return 'node' + Math.floor(Math.random() * 10000000);
}
