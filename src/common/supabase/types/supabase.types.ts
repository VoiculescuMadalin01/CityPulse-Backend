export interface IBucketUpload {
    bucket?: string
    path: string
    file: Buffer
}

export interface IBucketGetFile {
    bucket?: string
    filePath: string
}

export interface IBucketDeleteFiles {
    bucket?: string
    filePath: string
}
