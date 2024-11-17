import { isAdmin, isAdminFieldLevel } from '@/access/isAdmin'
import { isAdminOrSelf } from '@/access/isAdminOrSelf'
import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  // 設定 admin 頁面的呈現
  admin: {
    // 選擇哪一個資料欄位 fields，作為顯示在編輯頁的標題
    useAsTitle: 'email',
    // 在 dashabord 與 nav 上顯示群組標題
    group: 'Testing of group name',
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
  // 權限設定
  // 設定誰可以對 User collection 做什麼事
  access: {
    create: isAdmin,
    read: isAdminOrSelf,
    update: isAdminOrSelf,
    delete: isAdmin,
  },
  fields: [
    // Email added by default
    // Add more fields as needed
    {
      type: 'row',
      fields: [
        { name: 'firstName', type: 'text' },
        { name: 'lastName', type: 'text' },
      ],
    },

    // 設定角色 roles
    {
      name: 'roles',
      saveToJWT: true, // Save this field to JWT so we can use from `req.user`
      type: 'select',
      hasMany: true,
      defaultValue: ['editor'],
      options: [
        // 管理員
        { label: 'Admin', value: 'admin' },
        // 編輯者
        { label: 'Editor', value: 'editor' },
        // 審核員
        { label: 'Reviewer', value: 'reviewer' },
        // 發布者
        { label: 'Publisher', value: 'publisher' },
      ],
      // 欄位的權限設定
      // 設定誰可以對這個 role field 做事
      access: {
        // Only admins can create or update a value for this field
        create: isAdminFieldLevel,
        update: isAdminFieldLevel,
      },
    },
  ],
}
