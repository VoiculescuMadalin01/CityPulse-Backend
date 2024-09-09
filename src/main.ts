import { NestFactory } from '@nestjs/core'
import { SwaggerModule, DocumentBuilder, OpenAPIObject } from '@nestjs/swagger'
import { AppModule } from './app/app.module'
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface'
import { json, urlencoded } from 'express'

async function bootstrap(): Promise<void> {
    // eslint-disable-next-line @typescript-eslint/typedef
    const app = await NestFactory.create(AppModule, {
        bufferLogs: true,
        rawBody: true,
    })

    const corsOptions: CorsOptions = {
        credentials: true,
        allowedHeaders: ['sessionId', 'Content-Type', 'Authorization'],
        exposedHeaders: ['sessionId'],
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    }

    // eslint-disable-next-line @typescript-eslint/typedef
    const config = new DocumentBuilder()
        .setTitle('CityPulse')
        .setDescription('The CityPulse API description')
        .setVersion('0.1')
        .build()

    const document: OpenAPIObject = SwaggerModule.createDocument(app, config)
    SwaggerModule.setup('api', app, document)

    app.enableCors(corsOptions)
    app.use(json({ limit: '50mb' }))
    app.use(urlencoded({ extended: true, limit: '10mb' }))
    await app.listen(5174)
}
bootstrap()
