import { apiHost } from '../config'

export function mapBaseUrl(url: string | null) {
  if (url == null) {
    return url
  }

  return new URL(url, apiHost).toString()
}
