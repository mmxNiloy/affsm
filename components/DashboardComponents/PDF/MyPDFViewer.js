import { PDFViewer } from "@react-pdf/renderer"
import { useEffect, useState } from "react"
import EmptyList from "../EmptyList"
import MyDocument from "./MyDocument"

const MyPDFViewer = ({data, admitCard}) => {
    
    useEffect(() => {}, [])
    
    if(!Boolean(data)) return <EmptyList/>

    if(admitCard) 
        return (
            <PDFViewer style={{ 
                display: 'flex',
                alignSelf: 'center',
                justifySelf: 'center',
                width: '100vw', 
                height: '100vh',
                }}>
                <MyDocument data={data} admitCard/>
            </PDFViewer>
        )
    
    return (
        <PDFViewer style={{ 
            display: 'flex',
            alignSelf: 'center',
            justifySelf: 'center',
            width: '100vw', 
            height: '100vh' 
            }}>
            <MyDocument data={data}/>
        </PDFViewer>
    )
}

export default MyPDFViewer