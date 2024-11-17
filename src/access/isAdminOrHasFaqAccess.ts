import { Faq } from '@/payload-types'
import { Access } from 'payload'

export const isAdminOrHasFaqAccess =
  (faqIDFieldName: string = 'faqs'): Access =>
  ({ req: { user } }) => {
    // Need to be logged in
    if (user) {
      // If user has role of 'admin'
      if (user.roles?.includes('admin')) return true

      // If user has role of 'editor' and has access to a faq,
      // return a query constraint to restrict the documents this user can edit
      // to only those that are assigned to a faq, or have no faq assigned
      if (user.roles?.includes('editor') && (user.faqs || []).length > 0) {
        // Otherwise, we can restrict it based on the `faq` field
        return {
          or: [
            {
              [faqIDFieldName]: {
                // 因為我們faqs設計的時候是一個object，所以要多抓一層比對
                in: user.faqs
                  ?.filter((faq) => typeof faq !== 'string') // 過濾掉所有 string 類型的項目
                  .map((faq: Faq) => faq.id),
              },
            },
            {
              [faqIDFieldName]: {
                exists: false,
              },
            },
          ],
        }
      }
    }

    // Reject everyone else
    return false
  }
