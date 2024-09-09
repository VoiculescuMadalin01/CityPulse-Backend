import { Injectable } from '@nestjs/common'
import { createClient } from '@supabase/supabase-js'
import { IBucketDeleteFiles, IBucketGetFile, IBucketUpload } from './types/supabase.types'

@Injectable()
export class SupabaseService {
    private supabase

    constructor() {
        this.supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY)
    }

    async uploadImage({ bucket = 'city-pulse-bucket', path, file }: IBucketUpload) {
        const { data, error } = await this.supabase.storage.from(bucket).upload(path, file, {
            upsert: true,
            contentType: 'image/jpeg',
        })

        if (error) {
            throw new Error(`Image upload failed: ${error.message}`)
        }

        return data
    }

    async getFileUrl({ bucket = 'city-pulse-bucket', filePath }: IBucketGetFile) {
        const {
            data: { publicUrl },
        } = this.supabase.storage.from(bucket).getPublicUrl(filePath)

        return publicUrl
    }

    async deleteImage({ bucket = 'city-pulse-bucket', filePath }: IBucketGetFile) {
        const { error } = await this.supabase.storage.from(bucket).remove([filePath])

        if (error) {
            throw new Error(`Image deletion failed: ${error.message}`)
        }

        return true
    }
    async deleteImages({ bucket = 'city-pulse-bucket', filePath }: IBucketDeleteFiles) {
        const { error } = await this.supabase.storage.from(bucket).remove([filePath])
        if (error) {
            throw new Error(`Image deletion failed: ${error.message}`)
        }

        return true
    }
}
