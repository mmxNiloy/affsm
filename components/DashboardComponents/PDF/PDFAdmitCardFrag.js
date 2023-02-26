import { Document, Image, Page, Text, View } from "@react-pdf/renderer"
import { useEffect, useState } from "react";
import styles from './styles'

const PDFAdmitCardFrag = ({data, student}) => {
    return (
        <View style={{border: (student && '1px solid black'), margin: '4px'}}>
            <View style={styles.title}>
                <Text style={{
                    ...styles.text.h6,
                    marginTop: '8px',
                    marginBottom: '8px',
                }}>
                    University of Chittagong
                </Text>

                {student && <Image src='/cu_logo.png' style={{
                    height: '64px',
                    width: '43px',
                }}/>}
                
                <Text style={styles.text.body1}>
                    Admit Card
                </Text>
            </View>
        </View>
    )
}

export default PDFAdmitCardFrag