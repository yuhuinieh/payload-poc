import { CollectionConfig } from 'payload'

export const Articles: CollectionConfig = {
  slug: 'articles',
  // 開啟版本控制(草稿 -> 發布)功能
  // 開啟設定後，payload 會自動產生一個 field: _status 到 schema 中
  // 值會是 draft or published
  versions: {
    // === case1 ===
    drafts: true,
    // === case2 ===
    // drafts: {
    //   // autosave: true, // 打開自動儲存
    //   autosave: {
    //     interval: 800, // 設定一個 debounced interval，預設 800 ms
    //   },
    // },
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      access: {
        update: ({ req: { user }, data }) => {
          // 管理者都可以異動
          if (user?.roles?.includes('admin')) return true

          // 編輯者才可以更新
          if (user?.roles?.includes('editor')) {
            return data?.status === 'draft'
          }

          return false
        },
      },
    },
    {
      name: 'content',
      type: 'richText',
      access: {
        update: ({ req: { user }, data }) => {
          // 管理者都可以異動
          if (user?.roles?.includes('admin')) return true

          // 編輯者才可以更新
          if (user?.roles?.includes('editor')) {
            return data?.status === 'draft'
          }

          return false
        },
      },
    },

    // 客製化 status button!
    {
      name: 'status',
      type: 'select',
      options: [
        { label: '草稿', value: 'draft' },
        { label: '審核中', value: 'reviewing' },
        { label: '已發布', value: 'published' },
      ],
      defaultValue: 'draft',
      admin: {
        position: 'sidebar',
      },
      // hidden: true,
    },
    // {
    //   name: 'statusBtn',
    //   type: 'text', // 也可以是 select，但這裡用 text 來顯示按鈕
    //   admin: {
    //     position: 'sidebar',
    //     // 自定義呈現方式，顯示按鈕
    //     components: {
    //       Field: {
    //         path: '@/app/components/StatusButton',
    //       },
    //     },
    //   },
    // },

    // 設定發布日期
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
        position: 'sidebar',
      },
    },

    // // 設定狀態
    // {
    //   name: 'status',
    //   type: 'select',
    //   options: [
    //     { label: '草稿', value: 'draft' },
    //     { label: '審核中', value: 'reviewing' },
    //     { label: '已發布', value: 'published' },
    //   ],
    //   defaultValue: 'draft',
    //   admin: {
    //     position: 'sidebar',
    //   },
    //   access: {
    //     update: ({ req: { user }, data }) => {
    //       // 管理者都可以異動
    //       if (user?.roles?.includes('admin')) return true

    //       // 編輯者才可以更新
    //       // if (user?.roles?.includes('editor')) {
    //       //   return data?.status === 'draft'
    //       // }

    //       // Editor: 可以編輯草稿並將 status 設為 "draft" 或 "reviewing"
    //       if (user?.roles?.includes('editor')) {
    //         return data?.status === 'draft' || data?.status === 'reviewing'
    //       }
    //       // Reviewer: 可以將 status 從 "draft" 改為 "reviewing"
    //       if (user?.roles?.includes('reviewer')) {
    //         return data?.status === 'draft' && data?.status !== 'published' // 只有草稿可以更改為審核中
    //       }
    //       // Publisher: 只有 "reviewing" 可以發佈為 "published"
    //       if (user?.roles?.includes('publisher')) {
    //         return data?.status === 'reviewing' && data?.status !== 'draft' // 只有審核中可以發佈為已發布
    //       }

    //       return false
    //     },
    //   },
    // },

    {
      name: 'reviewerNotes',
      type: 'textarea',
      admin: {
        position: 'sidebar',
        condition: (_, { status }) => status === 'reviewing', // 只有在 "審核中" 時可見
      },
    },

    // 作者欄位
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'users', // 關聯到 'users' collection
      required: true,
      admin: {
        position: 'sidebar',
      },
      access: {
        read: () => true,
        update: () => false,
        create: () => false,
      },
    },
  ],

  hooks: {
    // 建立新資料 (create) , 更新現有資料 (update) 才會觸發
    beforeChange: [
      // operation: create, update

      // 自動設定作者
      ({ data, req, operation }) => {
        if (operation === 'create' && req.user) {
          // 自動將當前登入帳號設為作者
          data.author = req.user.id
        }
      },

      // 根據 _status 的值修改 status field 狀態
      // ({ data, req, operation }) => {
      //   if (operation === 'create') {
      //     if (req.payloadAPI === 'local' && data._status === 'draft') {
      //       data.status = 'draft'
      //     }
      //   }
      // },
      ({ data, operation }) => {
        if (operation === 'create' && data.status === 'draft') {
          console.log('內容編輯中')
        }
      },
      ({ data, operation }) => {
        if (operation === 'update' && data.status === 'reviewing') {
          console.log('內容已進入審核流程')
        }
      },
    ],
    afterChange: [
      async ({ doc }) => {
        if (doc.status === 'published') {
          console.log('內容已發布')
        }
      },
    ],
  },
  access: {
    // 誰可以新增? 所有角色都可以
    create: () => true,
    // 進入編輯頁
    update: () => true,
    // 在列表頁看見
    read: () => true,
    // 刪除
    delete: ({ req: { user } }) => !!user?.roles?.includes('admin'),
  },
}
