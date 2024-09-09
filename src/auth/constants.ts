export const jwtConstants: {
    secret: string | undefined
} = {
    secret: process.env.JWT_TOKEN,
}
