// storage-adapter-import-placeholder
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import Posts from './collections/Posts'
import { Faqs } from './collections/Faqs'
import { Articles } from './collections/Artcles'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Posts, Faqs, Articles],
  // onInit: async (payload) => {
  //   // 檢查是否已經有使用者
  //   const existingUsers = await payload.find({
  //     collection: 'users',
  //     limit: 1, // 只需要檢查是否存在至少一個用戶
  //   })

  //   if (existingUsers.docs.length === 0) {
  //     // 創建預設帳號
  //     await payload.create({
  //       collection: 'users',
  //       data: {
  //         email: 'admin@payload.com',
  //         password: '1234',
  //         firstName: 'Payload',
  //         lastName: 'CMS',
  //         roles: ['admin'], // 根據你的設計，賦予適當的角色
  //       },
  //     })
  //     console.log('✅ 預設用戶已創建：admin@payload.com / 1234')
  //   } else {
  //     console.log('✅ 已有用戶，未創建新帳號')
  //   }
  // },
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
  sharp,
  plugins: [
    // storage-adapter-placeholder
  ],
})
