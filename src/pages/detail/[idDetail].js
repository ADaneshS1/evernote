import { useRouter } from "next/router"
import { useEffect, useState } from "react"

export default function Handler() {
    const router = useRouter()
    const {idDetail} = router.query
    const [showData,setShowData] = useState();

    useEffect(() => {
        if(!idDetail) return;
        fetch(`/api/getDataDetail?id=${idDetail}`)
        .then((res) => res.json())
        .then((data) => {
            setShowData(data.data)
        })
    },[idDetail])

    return(
        <>
            {showData && (
                <>
                    <div>Id: {idDetail}</div>
                    <div>Title: {showData.title}</div>
                    <div>Contain: {showData.contain}</div>
                    <div>upload_at: {showData.upload_at}</div>
                    <div>created_at: {showData.created_at}</div>
                </>
            )}
        </>
    )
}