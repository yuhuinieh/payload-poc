import { CollectionConfig } from 'payload'

const generateDefaultValue = ({ user }: { user: any }) => {
  //   console.log('generateDefaultValue', user)
  return `written by user: ${user.email}`
}

const Posts: CollectionConfig = {
  slug: 'posts', // Collection 的 url 路徑
  labels: {
    singular: 'Post', // 單數形式的名稱
    plural: 'Posts', // 複數形式的名稱
  },
  fields: [
    // Array 標籤
    {
      // name 必填，資料庫存的 field name，禁止使用： __v, salt, hash, file
      name: 'tags',
      type: 'array', // 支援重複內容的數組
      label: 'Tags',
      fields: [
        {
          name: 'tag',
          type: 'text',
          label: 'Tag Name',
        },
      ],
    },

    // Blocks

    // Checkbox 是否發布 - 勾選框（布爾值）

    {
      name: 'isPublished',
      type: 'checkbox', // 布爾值
      label: '是否發布',
      required: true,
    },

    // Code 省略

    // Date
    {
      name: 'publishedAt',
      type: 'date', // 日期
      label: 'Published At',
      required: false, // 非必填
    },

    // Email - 電子郵件字段
    {
      name: 'contactEmail',
      type: 'email', // 確保輸入的是有效的電子郵件地址
      label: 'Contact Email',
      required: false,
    },

    // Group - 群組字段
    {
      name: 'userGroup',
      type: 'group', // 群組字段，將多個字段嵌套在一個對象中
      label: 'Group - 群組字段',
      fields: [
        {
          name: 'name',
          type: 'text',
          label: 'Group Name',
        },
        {
          name: 'members',
          type: 'array', // 陣列字段，支持多個成員
          label: 'Members',
          fields: [
            {
              name: 'email',
              type: 'email',
              label: 'Member Email',
            },
          ],
        },
      ],
    },
    // JSON 省略

    // Number
    {
      name: 'likes',
      type: 'number',
      label: '分享數',
      required: false,
      defaultValue: 0,
    },

    // Point 省略 - 用來記錄地理資訊(geometric coordinates)的

    // Radio 類型 - 單選
    {
      name: 'type',
      type: 'radio', // 單選
      label: 'Type',
      options: [
        {
          label: 'Blog Post',
          value: 'blog',
        },
        {
          label: 'News Article',
          value: 'news',
        },
      ],
      required: true,
    },

    // Relationship - 關聯到其他 collection
    {
      name: 'author',
      type: 'relationship', // 關聯字段
      label: 'Author 作者',
      relationTo: 'users', // 假設我們有一個名為 `users` 的集合
      required: true,
    },

    // Rich text 豐富文字 - 相對於純文字 (plain text) 具有風格、排版等資訊，如顏色、樣式等等
    {
      name: 'richContent',
      type: 'richText',
      label: 'Rich Content',
      required: false,
    },

    // Select 類別 - 選擇下拉框
    {
      name: 'category',
      type: 'select', // 下拉選擇框
      label: 'Category',
      options: [
        { label: 'Technology', value: 'tech' },
        { label: 'Lifestyle', value: 'lifestyle' },
        { label: 'Health', value: 'health' },
      ],
      required: true,
    },

    // Text
    {
      name: 'title',
      type: 'text',
      label: 'Title',
      required: true,
      defaultValue: '請填入文章的標題',
    },

    // Textarea
    {
      name: 'content',
      type: 'textarea',
      label: 'Content',
      required: true,
      defaultValue: generateDefaultValue, // 可以用function
    },

    // Upload - 上傳檔案
    {
      name: 'image',
      type: 'upload', // 上傳
      label: '圖片', // 圖片的標籤
      relationTo: 'media', // 指定該字段關聯到的集合，這裡我們會用到 `media` collection 來儲存圖片
      required: false, // 非必填
    },

    // 巢狀結構
    {
      name: 'translations',
      type: 'array', // 重複欄位，支援多語言翻譯
      label: '多國語系翻譯',
      fields: [
        {
          name: 'language',
          type: 'select', // 下拉選擇語言
          label: 'Language',
          options: [
            { label: 'English', value: 'en' },
            { label: '中文', value: 'zh' },
          ],
        },
        {
          name: 'translatedTitle',
          type: 'text',
          label: 'Translated Title',
        },
        {
          name: 'translatedContent',
          type: 'textarea',
          label: 'Translated Content',
        },
      ],
    },
    // Tab 多個嵌套字段分組並以標籤頁（Tabbed Layout）的方式呈現
    {
      type: 'tabs', // 設置為 Tabs 類型
      label: 'Content Tabs',
      tabs: [
        {
          label: 'Main Content', // 第一個標籤頁
          fields: [
            {
              name: 'tabTitle',
              type: 'text',
              label: 'Title',
              required: true,
            },
            {
              name: 'body',
              type: 'textarea',
              label: 'Body',
              required: true,
            },
          ],
        },
        {
          label: 'Metadata', // 第二個標籤頁
          fields: [
            {
              name: 'tabAuthor',
              type: 'text',
              label: 'Author',
            },
            {
              name: 'tabTags',
              type: 'array',
              label: 'Tags',
              fields: [
                {
                  name: 'tag',
                  type: 'text',
                  label: 'Tag',
                },
              ],
            },
          ],
        },
        {
          label: 'SEO Settings', // 第三個標籤頁
          fields: [
            {
              name: 'metaTitle',
              type: 'text',
              label: 'Meta Title',
            },
            {
              name: 'metaDescription',
              type: 'textarea',
              label: 'Meta Description',
            },
            {
              name: 'keywords',
              type: 'array',
              label: 'Keywords',
              fields: [
                {
                  name: 'keyword',
                  type: 'text',
                  label: 'Keyword',
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}

export default Posts
