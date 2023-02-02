import Head from 'next/head'
import Grid from '@mui/material/Grid'
import LoginForm from '../components/LoginPageComponents/LoginForm'
import Container from '@mui/material/Container'
import Footer from '../components/LoginPageComponents/Footer'
import LogoDescription from '../components/LoginPageComponents/LogoDescription'

export default function Home() {
  return (
    <>
      <Head>
        <title>Academic Form Fillup System Modernized | Login</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Grid container columns={10} 
        sx={{
          height: '100vh',
          alignItems: 'center', 
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
            <LoginForm/>
          </Grid>
        </Grid>

        <Footer/>
        
      </main>
    </>
  )
}
