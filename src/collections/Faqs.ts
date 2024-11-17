import { isAdminOrHasFaqAccess } from '@/access/isAdminOrHasFaqAccess'
import { isEditor } from '@/access/isEditor'
import type { CollectionConfig } from 'payload'

export const Faqs: CollectionConfig = {
  slug: 'faqs',
  // 設定 admin 頁面的呈現
  admin: {
    // 選擇哪一個資料欄位 fields，作為顯示在編輯頁的標題
    useAsTitle: 'question',
  },
  // 權限設定
  // 設定誰可以對此 collection 做什麼事
  access: {
    // 只有 editor 可以新增
    create: isEditor,
    // 是 admin 或是 有 faq 權限的人可以看見
    read: isAdminOrHasFaqAccess('id'),
    // 只有 editor 可以更新
    update: isEditor,
    // 只有 editor 可以刪除
    delete: isEditor,
  },
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'question', type: 'text' },
        { name: 'answer', type: 'text' },
      ],
    },
  ],
}
