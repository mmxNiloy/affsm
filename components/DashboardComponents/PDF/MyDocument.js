import { Document, Image, Page, Text, View } from "@react-pdf/renderer"
import { useEffect, useState } from "react";
import PDFAdmitCardFrag from "./PDFAdmitCardFrag";
import PDFStudentInfoFrag from "./PDFStudentInfoFrag";
import styles from './styles'

const MyDocument = ({data}) => {
    if(!Boolean(data)) return null

    const toCardinal = (num) => {
        // Limited to 1-9
        switch(num) {
            case 1:
                return '1st'
            case 2:
                return '2nd'
            case 3:
                return '3rd'
            default:
                return num + 'th'
        }
    }

    const renderCourses = (item, index) => {
        return (
            <View key={`selected-course-${index}`} 
            style={{ flexDirection: 'row', justifyContent: 'space-around' }} >
                <View style={{ flexDirection: 'column' }} >
                    <Text style={[styles.text.body2, {textAlign: 'center'}]}>
                        {item.course_code}
                    </Text>
                </View>
                
                <View style={{ flexDirection: 'column' }} >
                    <Text style={[styles.text.body2, {width: '150ch', textAlign: 'center'},]} wrap>
                        {item.course_title}
                    </Text>
                </View>
            </View>
        )
    }

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.title}>
                    <Image src='/cu_logo.png' style={{
                        height: '128px',
                        width: '86px',
                    }}/>
                    
                    <Text style={{
                        ...styles.text.h2,
                        marginTop: '8px',
                        marginBottom: '8px',
                    }}>
                        University of Chittagong
                    </Text>
                    
                    <Text style={styles.text.h5}>
                        {toCardinal(data.semester)} Semester, BSc Engineering Exam, {new Date(data.time_stamp).getFullYear()}
                    </Text>
                </View>
                
                {/* Thank you tim-soft, very cool */}
                {/* Student info box */}
                <View style={{ flexDirection: 'row', justifyContent: 'space-around', }}>
                    <View style={{ flexDirection: 'column', border: '1px solid black', padding: '8px' }}>
                        <Text style={{
                            ...styles.text.body1,
                        }}>
                            {`Student ID: \t${data.student_id}`}
                        </Text>

                        <Text style={{
                            ...styles.text.body1,
                        }}>
                            {`Student's Name: \t${data.first_name} ${data.last_name}`}
                        </Text>

                        <Text style={{
                            ...styles.text.body1,
                        }}>
                            {`Session: \t${Number.parseInt(data.session) - 1}-${Number.parseInt(data.session)}`}
                        </Text>

                        <Text style={{
                            ...styles.text.body1,
                        }}>
                            {`Department: \t${data.department_name}`}
                        </Text>
                    </View>
                    
                    <View style={{ flexDirection: 'column', border: '1px solid black', padding: '8px'}}>
                        <Text style={{
                            ...styles.text.body1,
                        }}>
                            {`Allotted hall: \t${data.hall_name} Hall`}
                        </Text>

                        <Text style={{
                            ...styles.text.body1,
                        }}>
                            {`Submitted at: \t${new Date(data.time_stamp).toDateString()}`}
                        </Text>

                        <Text style={{
                            ...styles.text.body1,
                        }}>
                            {`Semester: \t${data.semester}`}
                        </Text>

                        <Text style={{
                            ...styles.text.body1,
                        }}>
                            {`Current Address: \t${data.current_address}`}
                        </Text>
                    </View>
                </View>

                {/* Main application */}
                <View style={styles.section}>
                    <Text style={{
                        ...styles.text.h6,
                        ...styles.center
                    }}>
                        Application
                    </Text>

                    <Text style={{
                        ...styles.text.body1
                    }}>
                        Exam Controller
                    </Text>

                    <Text style={{
                        ...styles.text.body1
                    }}>
                        University of Chittagong, Chittagong
                    </Text>

                    <Text style={{
                        ...styles.text.body1
                    }}>
                        Sir,
                    </Text>

                    <Text style={{
                        ...styles.text.body2
                    }}>
                        I request your permission to participate in the upcoming {toCardinal(data.semester ? data.semester : 0)} semester BSc Engineering exam of {(new Date(data.time_stamp)).getFullYear()}. 
                        I pledge that I'll oblige to the decisions made by the officials.
                    </Text>

                    <Text style={{
                        ...styles.text.body2
                    }}>
                        Sincerely,
                    </Text>

                    <Text style={{
                        ...styles.text.body2
                    }}>
                        {`${data.first_name} ${data.last_name}`}
                    </Text>
                </View>

                {/* Selected courses */}
                <View>
                    <Text style={[styles.text.h6, styles.center]}>
                        Selected Courses
                    </Text>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-around' }} >
                    <View style={{ flexDirection: 'column' }} >
                        <Text style={styles.text.body1}>
                            Course Code
                        </Text>
                    </View>
                    
                    <View style={{ flexDirection: 'column' }} >
                        <Text style={styles.text.body1}>
                            Course Title
                        </Text>
                    </View>
                </View>
                {data.courses.map(renderCourses)}

                <View style={[styles.section, {textAlign: 'right'}]}>
                    <Text style={[styles.text.body2, ]}>
                        Examinee's Signature:
                    </Text>
                    <Text style={[styles.text.body2, {marginTop: '16px', marginBottom: '8px'}]}>
                        _____________________
                    </Text>

                    <Text style={[styles.text.body2, ]}>
                        Allottment Status: Yes/No
                    </Text>

                    <Text style={[styles.text.body2, ]}>
                        Allotted Hall: {data.hall_name}
                    </Text>

                    <Text style={[styles.text.body2, ]}>
                        Current Address: {data.current_address}
                    </Text>
                </View>
                
                {/* Application of the department staff */}
                <View style={styles.section}>
                    <Text style={[styles.text.h6, styles.center]}>
                        Certificate
                    </Text>

                    <Text style={styles.text.body2}>
                        {/* TODO: Translate the boring part. Assigned to Yakin */}
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                    </Text>
                </View>

                <View style={styles.subsection}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around' }} >
                        <View style={{ flexDirection: 'column', textAlign: 'left' }} >
                            <Text style={[styles.text.body2, ]}>
                                Examinee's Attendance Rate:
                            </Text>
                            <Text style={[styles.text.body2, {marginTop: '16px', marginBottom: '8px'}]}>
                                _____________________
                            </Text>
                        </View>
                        
                        <View style={{ flexDirection: 'column', textAlign: 'right' }} >
                            <Text style={[styles.text.body2, ]}>
                                Chairman's Signature:
                            </Text>
                            <Text style={[styles.text.body2, {marginTop: '16px', marginBottom: '8px'}]}>
                                _____________________
                            </Text>
                        </View>
                    </View>

                    <Text style={[styles.text.body2, {marginTop: '4px', textAlign: 'center'}]}>
                        (If the rate of attandance of the student is less than 60% then the student is not eligable for recommendation.)
                    </Text>
                </View>
            </Page>

            <Page size='A4' wrap style={styles.page}>
                <View style={styles.section}>
                    <Text style={styles.text.body2}>
                        {/* TODO: Translate the boring part. Assigned to Yakin */}
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                    </Text>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-around' }} >
                    <View style={{ flexDirection: 'column', textAlign: 'left' }} >
                        <Text style={[styles.text.body2, ]}>
                            Date:
                        </Text>
                        <Text style={[styles.text.body2, {marginTop: '16px', marginBottom: '8px'}]}>
                            _____________________
                        </Text>
                    </View>
                    
                    <View style={{ flexDirection: 'column', textAlign: 'right' }} >
                        <Text style={[styles.text.body2, ]}>
                            Provost's Signature:
                        </Text>
                        <Text style={[styles.text.body2, {marginTop: '16px', marginBottom: '8px'}]}>
                            _____________________
                        </Text>
                    </View>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-around' }} >
                    <View style={{ flexDirection: 'column', textAlign: 'left' }} >
                        
                    </View>
                    
                    <View style={{ flexDirection: 'column', textAlign: 'right' }} >
                        <Text style={styles.text.body2}>
                            {data.hall_name} Hall,
                        </Text>

                        <Text style={styles.text.body1}>
                            University of Chittagong
                        </Text>
                    </View>
                </View>

                {/* Student info */}
                {/* TODO: Fix the margin padding and style accordingly */}
                {/* Optional form fields */}
                <PDFStudentInfoFrag data={data}/>
            </Page>

            <Page size='A4' wrap>
                {/* This is the exam controller copy */}
                <PDFAdmitCardFrag data={data}/>

                {/* This is the student copy */}
                <PDFAdmitCardFrag data={data} student/>
            </Page>
        </Document>
    )
}

export default MyDocument