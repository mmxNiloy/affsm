import { useRouter } from "next/router"
import { useEffect, useState } from "react"

const Dashboard = () => {
    const router = useRouter()
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if(loading) return

        setLoading(true)
        const mUser = JSON.parse(sessionStorage.getItem('user'))

        // Handle unauthorised access
        if(!Boolean(mUser)) {
            router.replace('/')
            return;
        }

        setUser(mUser)
        setLoading(false)
    }, [])
    return (
        <>
            {loading && <p>Loading...</p>}
            {!loading && 
            <div>
                <p>Full name: {`${user.first_name} ${user.last_name}`}</p>
                <p>Department: {user.department_id}</p>
            </div>}
        </>
    )
}

export default Dashboard