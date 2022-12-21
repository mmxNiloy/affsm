import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'
import LoginForm from '../components/LoginForm'
import Container from '@mui/material/Container'

export default function Home() {
  return (
    <>
      <Head>
        <title>Academic Form Fillup System Modernized | Login</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Container 
        sx={{ 
          height: '100vh', 
          width: '100%', 
          justifyContent: 'center', 
          alignItems: 'center',
          display: 'flex'
        }}>
          <LoginForm/>
        </Container>
      </main>
    </>
  )
}
