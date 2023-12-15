import { URL } from 'url'
export function getLastParamFromUrl(url: string): string {
  const parsedUrl = new URL(url)
  const pathname = parsedUrl.pathname
  const regex = /\/([^\/]+)\/?$/
  const match = pathname.match(regex)
  return match ? match[1] : ''
}
