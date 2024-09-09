import { BadRequestException, Injectable } from '@nestjs/common'
import { LocationDto } from './entities/location.entity'
import { SupabaseService } from '@/common/supabase/supabase.service'
import { PrismaService } from '@/common/prisma/prisma.service'
import { AuthenticatedRequest, UserDto } from '@/user/interfaces/user.interface'
import * as mime from 'mime-types'

@Injectable()
export class LocationService {
    constructor(
        private supabaseService: SupabaseService,
        private prisma: PrismaService,
    ) {}

    public async createEmptyLocation(getUser: AuthenticatedRequest) {
        console.log(getUser.user)
        const { uuid } = getUser.user
        try {
            const newLocation = this.prisma.location.create({
                data: {
                    user_uuid: uuid,
                    name: 'Missing Information',
                    description: 'Missing Description',
                    address: 'Missing Address',
                    latitude: '0',
                    longitude: '0',
                    cityId: null,
                },
            })

            return newLocation
        } catch (error) {
            throw new BadRequestException(`Location cannot be created`)
        }
    }

    public async getAll() {
        return this.prisma.location.findMany({
            include: {
                user: {
                    select: {
                        firstName: true,
                        lastName: true,
                    },
                },
            },
        })
    }

    public async getById(uuid: string): Promise<LocationDto | null> {
        try {
            const location = this.prisma.location.findFirst({
                where: {
                    uuid: uuid,
                },
            })
            return location
        } catch (error) {
            throw new BadRequestException(`Location cannot be found`)
        }
    }

    public async update(uuid: string, updateLocationDto: LocationDto) {
        try {
            await this.prisma.location.update({
                where: {
                    uuid: uuid,
                },
                data: {
                    name: updateLocationDto.name,
                    description: updateLocationDto.description,
                    presentationImage: updateLocationDto.presentationImage,
                    locationImages: updateLocationDto.locationImages,
                    address: updateLocationDto.address,
                    latitude: updateLocationDto.latitude,
                    longitude: updateLocationDto.longitude,
                    cityId: updateLocationDto.cityId,
                    stateId: updateLocationDto.stateId,
                    countryId: updateLocationDto.countryId,
                },
            })
            return { message: 'Location updated successfully' }
        } catch (error) {
            console.log(error)

            throw new BadRequestException('Location cannot be updated')
        }
    }

    public async updateLocationProfile(uuid: string, imageFile: { name: string; base64: string }): Promise<string> {
        const filePath = `locations/${uuid}/profilePhoto`
        const base64 = imageFile.base64

        const base64EncodedImageString = base64.replace(/^data:image\/\w+;base64,/, '')
        const imageBuffer = Buffer.from(base64EncodedImageString, 'base64')

        await this.supabaseService.uploadImage({
            path: filePath,
            file: imageBuffer,
        })

        const fileUrl = await this.supabaseService.getFileUrl({ filePath })

        await this.prisma.location.update({
            where: {
                uuid: uuid,
            },
            data: {
                presentationImage: fileUrl,
            },
        })

        return fileUrl
    }

    public async updateLocationImages(uuid: string, imageFiles: { name: string; base64: string }[]): Promise<string[]> {
        const fileUrls: string[] = []
        for (let i = 0; i < imageFiles.length; i++) {
            const imageFile = imageFiles[i]
            const filePath = `locations/${uuid}/presentation/${i + 1}` // Naming files as 1, 2, 3, etc.
            const base64 = imageFile.base64
            const base64EncodedImageString = base64.replace(/^data:image\/\w+;base64,/, '')
            const imageBuffer = Buffer.from(base64EncodedImageString, 'base64')

            await this.supabaseService.uploadImage({
                path: filePath,
                file: imageBuffer,
            })

            const fileUrl = await this.supabaseService.getFileUrl({ filePath })
            fileUrls.push(fileUrl)
        }

        await this.prisma.location.update({
            where: {
                uuid: uuid,
            },
            data: {
                locationImages: fileUrls,
            },
        })

        return fileUrls
    }

    public async deleteLocationProfile(uuid: string): Promise<{ message: string }> {
        const filePath = `locations/${uuid}/profilePhoto`

        // Use a single match to get the mime type

        await this.supabaseService.deleteImage({
            filePath: filePath,
        })

        await this.prisma.location.update({
            where: {
                uuid: uuid,
            },
            data: {
                presentationImage: '',
            },
        })
        return { message: 'Location profile image delete succesfully' }
    }

    public async deleteLocationImage(uuid: string, body: { fileName: string }): Promise<any> {
        const filePath = `locations/${uuid}/presentation/`
        const fileLocation = filePath + body.fileName

        try {
            // Delete the image file from Supabase
            await this.supabaseService.deleteImages({ filePath: fileLocation })

            // Fetch the current location data
            const location = await this.prisma.location.findUnique({
                where: {
                    uuid: uuid,
                },
                select: {
                    locationImages: true,
                },
            })

            if (!location) {
                throw new Error('Location not found')
            }

            console.log(location)

            // Filter out the deleted file from the locationImages array
            const updatedLocationImages = location.locationImages.filter((url: string) => {
                // Extract the fileName from the URL (e.g., '1', '2', '3')
                const fileNameInUrl = url.split('/').pop()
                return fileNameInUrl !== body.fileName
            })

            // Update the locationImages array in the database
            await this.prisma.location.update({
                where: {
                    uuid: uuid,
                },
                data: {
                    locationImages: updatedLocationImages,
                },
            })

            return { message: 'Location image deleted successfully' }
        } catch (error) {
            throw new BadRequestException('Location images cannot be deleted')
        }
    }

    public async delete(deleteLocationsDto: string[]) {
        try {
            await this.prisma.location.deleteMany({
                where: {
                    uuid: {
                        in: deleteLocationsDto,
                    },
                },
            })
            return { message: 'Sub-Category deleted successfully' }
        } catch (error) {
            throw new BadRequestException('Sub-Category cannot be deleted')
        }
    }
}
