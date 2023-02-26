import dynamic from "next/dynamic"
import Box from "@mui/material/Box"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import axios from "axios"
import MyCircularProgress from "../../components/DashboardComponents/MyCircularProgress"
import EmptyList from "../../components/DashboardComponents/EmptyList"
import Head from "next/head"
const DynamicPDFViewer = dynamic(
    () => import("../../components/DashboardComponents/PDF/MyPDFViewer"), {
    ssr: false,
})

const PDFDoc = () => {
    const router = useRouter()
    const { form_id } = router.query

    const [formData, setFormData] = useState([])
    const [isEmpty, setIsEmpty] = useState(false)
    const [loading, setLoading] = useState(false)
    const [loadingUser, setLoadingUser] = useState(false)
    const [user, setUser] = useState({})

    const verify = async () => {
        if(loadingUser) return
        setLoadingUser(true)

        try {
            const req = await axios.get('/api/auth/verify')
            const u = req.data.user
            setUser(u)
            console.log(u)
            if(!Boolean(u.evaluator_id)) {
                setUser(null)
            } else await fetchData()
        } catch(err) {
            setUser(null)
        }

        setLoadingUser(false)
    }

    const fetchData = async () => {
        if(loading || !Boolean(form_id)) return

        setLoading(true)

        
        try {
            const req = await axios.get('/api/forms/get_form', {
                params: {
                    form_id: form_id
                }
            })

            const form = req.data.form
            console.log('Form: ', form)
            if(form.length < 1) setIsEmpty(true)

            setFormData(form)
        } catch(err) {
            console.log("PDF > fetchForm() > ", err)
            setIsEmpty(true)
        }

        setLoading(false)
    }

    useEffect(() => {
        verify()
    }, [form_id])

    if(loading || !Boolean(form_id)) return <MyCircularProgress/>
    if(!Boolean(user)) return <>Access Denied</>
    if(isEmpty) return <EmptyList/>

    return (
        <>
            <Head>
                <title>
                    AFFSM | Form | PDF
                </title>
                <link rel="icon" href="/cu_icon.ico" />
            </Head>
            <main>
                <Box sx={{
                alignItems: 'center',
                justifyContent: 'center',
                }}>
                    <DynamicPDFViewer data={formData}/>
                </Box>
            </main>
        </>
        
    )
}

export default PDFDoc