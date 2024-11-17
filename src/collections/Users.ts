import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  // 設定 admin 頁面的呈現
  admin: {
    // 選擇哪一個資料欄位 fields，作為顯示在編輯頁的標題
    useAsTitle: 'email',
    // 在 dashabord 與 nav 上顯示群組標題
    group: '群組名稱',
    // 資料列表頁(Collection's List View)的說明
    description: '這是一段描述說明怎麼新增使用者。',
    // 不知為什麼沒有效果ＱＱ
    defaultColumns: ['test', 'id'],
    // components: {
    //   views: {
    //     list: {
    //       Component: '@/app/components/CustomListView', // 客製化自己要的資料列表頁
    //     },
    //   },
    // },
  },
  auth: true,
  fields: [
    // Email added by default
    // Add more fields as needed
    {
      name: '測試一個元件',
      type: 'ui',
      admin: {
        components: {
          Field: '@/app/components/TestComponent',
        },
      },
    },
  ],
}
