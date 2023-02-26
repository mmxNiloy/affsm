import dynamic from "next/dynamic"
import Box from "@mui/material/Box"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import axios from "axios"
import MyCircularProgress from "../../components/DashboardComponents/MyCircularProgress"
import EmptyList from "../../components/DashboardComponents/EmptyList"
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
        fetchData()
    }, [form_id])

    if(loading || !Boolean(form_id)) return <MyCircularProgress/>
    if(isEmpty) return <EmptyList/>

    return (
        <Box sx={{
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <DynamicPDFViewer data={formData}/>
        </Box>
    )
}

export default PDFDoc