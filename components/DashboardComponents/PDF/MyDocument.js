import { Document, Image, Page, Text, View, Font } from "@react-pdf/renderer"
import { useEffect, useState } from "react";
import PDFAdmitCardFrag from "./PDFAdmitCardFrag";
import PDFStudentInfoFrag from "./PDFStudentInfoFrag";
import ExamRulesFragment from "./ExamRulesFragment";
import styles from './styles'

Font.register({
    family: 'NotoBengali', 
    format: 'truetype',
    src: 'https://firebasestorage.googleapis.com/v0/b/serveturtle.appspot.com/o/latex%2FNotoSerifBengali-Regular.ttf?alt=media&token=ead77452-da6f-416a-8b6e-1366a33e9b2d',
    fontStyle: 'normal', 
    fontWeight: 'normal'
})

const MyDocument = ({data, admitCard}) => {
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
                <View style={{ flexDirection: 'column',marginRight:"50px"}} >
                    <Text style={[styles.text.body2, {textAlign: 'center'}]}>
                        {item.course_code}
                    </Text>
                </View>
                
                <View style={{ flexDirection: 'column',marginLeft:"50px"}} >
                    <Text style={[styles.text.body2, {width: '150ch', textAlign: 'center'},]} wrap>
                        {item.course_title}
                    </Text>
                </View>
            </View>
        )
    }

    if(admitCard) 
        return(
            <Document>
                <Page size='A4' style={[styles.page, {padding: '32px'}]}>
                    <PDFAdmitCardFrag data={data} student/>
                </Page>
            </Document>
        )

    return (
        <Document title={`Form_${data.form_id}`}>
            <Page size="A4" style={styles.page}>
                <View style={styles.title}>
                    <Image src='/cu_logo.png' style={{
                        height: '128px',
                        width: '86px',
                    }}/>
                    
                    <Text style={[
                        styles.text.h2,
                        {
                            marginTop: '8px',
                            marginBottom: '8px'
                        },
                        styles.bengaliText
                    ]}>
                        {`চট্টগ্রাম বিশ্ববিদ্যালয়`}
                    </Text>
                    
                    <Text style={styles.text.h5}>
                        {toCardinal(data.semester)} Semester, BSc Engineering Exam, {new Date(data.time_stamp).getFullYear()}
                    </Text>
                </View>
                
                {/* Thank you tim-soft, very cool */}
                {/* Student info box */}
                <View style={{ flexDirection: 'row', justifyContent: 'space-around', }}>
                    <View style={{ flexDirection: 'column', border: '1px solid black', padding: '8px' }}>
                        <Text style={[
                            styles.text.body1,
                            styles.bengaliText
                        ]
                            
                        }>
                            {`আইডি নম্বর : ${data.student_id}`}
                        </Text>

                        <Text style={[
                            styles.text.body1,
                            styles.bengaliText
                        ]
                            
                        }>
                            {`শিক্ষার্থীর নাম : ${data.first_name} ${data.last_name}`}
                        </Text>

                        <Text style={[
                            styles.text.body1,
                            styles.bengaliText
                        ]
                            
                        }>
                            {`সেশন : ${Number.parseInt(data.session) - 1}-${Number.parseInt(data.session)}`}
                        </Text>

                        <Text style={[
                            styles.text.body1,
                            styles.bengaliText
                        ]
                            
                        }>
                            {`ডিপার্টমেন্ট : ${data.department_name}`}
                        </Text>
                    </View>
                    
                    <View style={{ flexDirection: 'column', border: '1px solid black', padding: '8px'}}>
                        <Text style={[
                            styles.text.body1,
                            styles.bengaliText
                        ]
                            
                        }>
                            {`হল : ${data.hall_name} Hall`}
                        </Text>

                        <Text style={[
                            styles.text.body1,
                            styles.bengaliText
                        ]
                            
                        }>
                            {`জমা দেওয়ার তারিখ: ${new Date(data.time_stamp).toDateString()}`}
                        </Text>

                        <Text style={[
                            styles.text.body1,
                            styles.bengaliText
                        ]
                            
                        }>
                            {`সেমিস্টার: ${data.semester}`}
                        </Text>

                        <Text style={[
                            styles.text.body1,
                            styles.bengaliText
                        ]
                            
                        }>
                            {`বর্তমান ঠিকানা : ${data.current_address}`}
                        </Text>
                    </View>
                </View>

                {/* Main application */}
                <View style={[styles.section]}>
                    <Text style={[
                        styles.text.h6,
                        styles.center,
                        styles.bengaliText
                    ]}>
                        {`আবেদনপত্র `}
                       
                    </Text>

                    <Text style={[
                        styles.text.body1,
                        styles.bengaliText
                    ]}>
                        {`পরীক্ষা নিয়ন্ত্রক `}
                    </Text>

                    <Text style={[
                        styles.text.body1,
                        styles.bengaliText
                    ]}>
                        {`চট্টগ্রাম বিশ্ববিদ্যালয়, চট্টগ্রাম `}
                    </Text>

                    <Text style={[
                        styles.text.body1,
                        styles.bengaliText
                    ]}>
                        জনাব,
                    </Text>

                    <Text style={[
                        styles.text.body2,
                        styles.bengaliText
                    ]}>
                        {`আমি আসন্ন ${new Date().getFullYear()} সালের বিএসসি ইঞ্জিনিয়ারিং ${data.semester} সেমিস্টার পরীক্ষায় অংশ গ্রহণের জন্য অনুমতি প্রার্থনা করছি। 
                        আমি অঙ্গীকার করছি যে , আমার অত্র পরীক্ষা সংক্রান্ত ব্যাপারে সিন্ডিকেট বা তদ্কর্তৃক ক্ষমতা প্রদত্ত অফিসার এর সিদ্ধান্ত
                        চূড়ান্ত বলে মেনে নিতে বাধ্য  থাকবো। `}
                    </Text>

                    <Text style={[
                        styles.text.body2,
                        styles.bengaliText
                    ]}>
                        {`আপনার একান্ত অনুগত `}
                    </Text>

                    <Text style={{
                        ...styles.text.body2
                    }}>
                        {`${data.first_name} ${data.last_name}`}
                    </Text>
                </View>

                {/* Selected courses */}
                <View>
                    <Text style={[
                        styles.text.h6,
                        styles.center,
                        styles.bengaliText
                        ]}>
                        {`নির্বাচিত কোর্সসমূহ `}
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

                <View style={[styles.section, {textAlign: 'right'}, styles.bengaliText]}>
                    <Text style={[styles.text.body2, ]}>
                        {`পরীক্ষার্থীর পূর্ণ স্বাক্ষর: `}
                    </Text>
                    <Text style={[styles.text.body2, {marginTop: '16px', marginBottom: '8px'}]}>
                        _____________________
                    </Text>

                    <Text style={[styles.text.body2, styles.bengaliText ]}>
                        {`অনাবাসিক / আবাসিক (কক্ষ নম্বর সহ `}
                    </Text>

                    <Text style={[styles.text.body2, styles.bengaliText]}>
                        {`হলের  নাম `}: {data.hall_name}
                    </Text>

                    <Text style={[styles.text.body2, ]}>
                        {`বর্তমান ঠিকানা: `} {data.current_address}
                    </Text>
                </View>
                
                {/* Application of the department staff */}
                <View style={styles.section}>
                    <Text style={[styles.text.h6, styles.center, styles.bengaliText]}>
                        {`সার্টিফিকেট `}
                    </Text>

                    <Text style={[styles.text.body2, styles.bengaliText]}>
                            {/* TODO: Translate the boring part. Assigned to Yakin */}
                        {`আমি প্রত্যয়ন করছি যে , উল্লেখিত ছাত্রের পাঠক্রম অনুশীলন সন্তোষজনক এবং আমি তার ....... বর্ষ বিএসসি ইঞ্জিনিয়ারিং
                        ${data.semester} সেমিস্টার পরীক্ষায় অংশগ্রহণের  অনুমতির জন্য সুপারিশ করছি।  আমি আরো যাচাই করে দেখেছি যে, 
                        অনার্স পরীক্ষার পত্রসমূহ সঠিকভাবে লিখিত আছে। `}

                    </Text>
                </View>

                <View style={styles.subsection}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around' }} >
                        <View style={{ flexDirection: 'column', textAlign: 'left' }} >
                            <Text style={[styles.text.body2, styles.bengaliText]}>
                                {`পরীক্ষার্থীর ক্লাসে উপস্থিতির হার: `}
                            </Text>
                            <Text style={[styles.text.body2, {marginTop: '16px', marginBottom: '8px'}]}>
                                _____________________
                            </Text>
                        </View>
                        
                        <View style={{ flexDirection: 'column', textAlign: 'right' }} >
                            <Text style={[styles.text.body2, styles.bengaliText ]}>
                                {`বিভাগীয় সভাপতির স্বাক্ষর ও সিলমোহর: `}
                            </Text>
                            <Text style={[styles.text.body2, {marginTop: '16px', marginBottom: '8px'}]}>
                                _____________________
                            </Text>
                        </View>
                    </View>

                    <Text style={[styles.text.body2, {marginTop: '4px', textAlign: 'center'}, styles.bengaliText]}>
                        {`(উপস্থিতির হার ৬০% এর কম হলে পরীক্ষায় অংশ গ্রহণের অযোগ্য বিধায় আবেদন গ্রহণ করা যাবেনা।) `}
                    </Text>
                </View>
            </Page>

            <Page size='A4' wrap style={styles.page}>
                <View style={styles.section}>
                    <Text style={[styles.text.body2, styles.bengaliText]}>
                        {/* TODO: gender neutral */}
                        {/* TODO: Translate the boring part. Assigned to Yakin */}
                        {`আমি প্রত্যয়ন করছি যে , পরীক্ষার্থী আবাসের শর্তাবলী পালন করেছে এবং সে সৎ চরিত্রের অধিকারী। 
                        আমার জানামতে দরখাস্তের যাবতীয় বিবরণ সত্য। সে ${parseInt(new Date().getFullYear()/100)}${parseInt(data.student_id/1000000)} সালের ১ম বর্ষ অনার্স কোর্স এ ভর্তি হয়েছে। 
                        ${parseInt(new Date().getFullYear())-1} সালের ${toCardinal(parseInt(new Date().getFullYear()%100)-parseInt(data.student_id/1000000)-1)} বর্ষ বিএসসি ইঞ্জিনিয়ারিং কোর্স 
                        এ পুনঃভর্তি হয়েছে। দরখাস্তকারীকে ${parseInt(new Date().getFullYear())-1} সনের
                        ${toCardinal(data.semester)} সেমিস্টার  পরীক্ষায় অংশ গ্রহণের অনুমতির জন্য সুপারিশ করছি। `}
                    </Text>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-around' }} >
                    <View style={{ flexDirection: 'column', textAlign: 'left' }} >
                        <Text style={[styles.text.body2, styles.bengaliText]}>
                            {`তারিখ: `}
                        </Text>
                        <Text style={[styles.text.body2, {marginTop: '16px', marginBottom: '8px'}]}>
                            _____________________
                        </Text>
                    </View>
                    
                    <View style={{ flexDirection: 'column', textAlign: 'right' }} >
                        <Text style={[styles.text.body2, styles.bengaliText]}>
                            {`প্রভোস্ট: `}
                        </Text>
                        <Text style={[styles.text.body2, {marginTop: '16px', marginBottom: '8px'}]}>
                            _____________________
                        </Text>
                    </View>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-around' }} >
                    <View style={{ flexDirection: 'column', textAlign: 'left' }} >
                        
                    </View>
                    
                    <View style={{ flexDirection: 'column', textAlign: 'right',marginLeft:'150px' }} >
                        <Text style={[styles.text.body2,{marginBottom:'2px'}]}>
                            {data.hall_name} Hall,
                        </Text>
                        <Text style={[styles.text.body1, styles.bengaliText]}>
                            {`চট্টগ্রাম বিশ্ববিদ্যালয় `}
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
            <Page size='A4' wrap>
            <ExamRulesFragment/>
            </Page>
        </Document>
    )
}

export default MyDocument