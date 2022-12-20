import Layout from '../components/layouts/layout'

export default function MyApp({ Component, pageProps }) {
    const getLayout = Component.getLayout || ((page) => <Layout>{page}</Layout>)

    return getLayout(<Component {...pageProps} />)
}

// deneme