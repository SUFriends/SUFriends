module.exports = {
    async redirects() {
        return [
            {
                source: '/',
                destination: '/proposals',
                permanent: true,
            },
        ]
    },
}