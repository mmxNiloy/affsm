import { useEffect } from "react"
import MyCircularProgress from "../../MyCircularProgress"
const AdminSubmissionsPreviewFragment = ({user}) => {
    const [loadingSubmissions, setLoadingSubmissions] = useState(false)
    const [submissions, setSubmissions] = useState([])
    const [emptySubmissions, setEmptySubmissions] = useState(false)
    const fetchSubmissions = async () => {
        if(loadingSubmissions) return

        setLoadingSubmissions(true)

        // API Call
        try {
            // Code
            const req = await axios.get('/api/forms/get_eval_forms', {
                params: {
                    
                    department: user.department_id,
                    role: user.evaluator_role
                }
            })

            setSubmissions(req.data.forms)

            if(req.data.forms.length < 1) setEmptySubmissions(true)
        } catch(err) {
            console.log("Data retrival error: " + err)
        }

        setLoadingSubmissions(false)
    }

    useEffect( () =>{
        fetchSubmissions()
        
    },[])
    return(
        <>
        ASF
        </>
    )
}