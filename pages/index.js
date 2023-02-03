import Head from 'next/head'
import Grid from '@mui/material/Grid'
import LoginForm from '../components/LoginPageComponents/LoginForm'
import Container from '@mui/material/Container'
import Footer from '../components/LoginPageComponents/Footer'
import LogoDescription from '../components/LoginPageComponents/LogoDescription'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function Home() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleSuccess = () => {
    router.push('/dashboard')
  }
  useEffect(() => {
    if(loading) return;
    setLoading(true)
    const user = sessionStorage.getItem('user')

    if(Boolean(user)) {
      router.push('/dashboard')
    } else {
      setLoading(false)
    }
  }, [])

  return (
    <>
      <Head>
        <title>Academic Form Fillup System Modernized | Login</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main style={{display: (loading ? 'none' : 'block')}}>
        <Grid container columns={10} 
        sx={{
          height: '100vh',
          alignItems: 'center', 
          justifyContent: 'center',
        }}>
          <Grid item xs={10} sm={10} md={10} lg={5} xl={5}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            {/* Logo and description */}
            <LogoDescription/>
          </Grid>

          <Grid item xs={10} sm={10} md={10} lg={5} xl={5}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            {/* Login form (maybe sign-up options?) */}
            <LoginForm onSuccess={handleSuccess}/>
          </Grid>
        </Grid>

        <Footer/>
        
      </main>
    </>
  )
}
