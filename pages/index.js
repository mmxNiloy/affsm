import Head from 'next/head'
import Grid from '@mui/material/Grid'
import LoginForm from '../components/LoginPageComponents/LoginForm'
import Footer from '../components/LoginPageComponents/Footer'
import LogoDescription from '../components/LoginPageComponents/LogoDescription'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import axios from 'axios'

export default function Home({toggleTheme}) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleSuccess = (isAdmin) => {
    console.log('Success listener', isAdmin)
    var url = '/'
    if(Boolean(isAdmin)) url = 'admin/'
    url += 'dashboard'

    router.push(url)
  }

  const getUser = async () => {
    if(loading) return
    
    setLoading(true)
    var user
    try {
      const req = await axios.get('/api/auth/verify')
      user = req.data.user
    } catch (ignored) {
    }

    if(Boolean(user)) {
      if(Boolean(user.isAdmin)) router.push('/admin/dashboard')
      else router.push('/dashboard')
      return;
    }

    setLoading(false)
  }

  useEffect(() => {
    getUser()
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
