/**
 * Returns the URL for the communication with the Whatsapp API
 * @param businessPhoneNumberId
 */
export function getUrl(businessPhoneNumberId) {
  return `https://graph.facebook.com/v21.0/${businessPhoneNumberId}/messages`
}
