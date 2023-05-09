import { Text, View, Font } from "@react-pdf/renderer"
import styles from './styles'

Font.register({
    family: 'NotoBengali', 
    format: 'truetype',
    src: 'https://firebasestorage.googleapis.com/v0/b/serveturtle.appspot.com/o/latex%2FNotoSerifBengali-Regular.ttf?alt=media&token=ead77452-da6f-416a-8b6e-1366a33e9b2d',
    fontStyle: 'normal', 
    fontWeight: 'normal'
})

const PDFStudentInfoFrag = ({data}) => {
    return (
        <View>
            <View style={[styles.section]}>
                <Text style={[styles.text.h6, styles.center, styles.bengaliText]}>
                    {`শিক্ষার্থীর তথ্য `}
                </Text>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }} >
                <View style={styles.textViewLeft}>
                    <Text style={[styles.text.body2, styles.bengaliText]}>
                        {`শিক্ষার্থীর নাম: `} 
                    </Text>
                </View>
                
                <View style={styles.textViewRight} >
                    <Text style={styles.text.body2}>
                        {`${data.first_name} ${data.last_name}`}
                    </Text>
                </View>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }} >
                <View style={styles.textViewLeft}>
                    <Text style={[styles.text.body2, styles.bengaliText]}>
                        {`.পিতার নাম: `}
                    </Text>
                </View>
                
                <View style={styles.textViewRight} >
                    <Text style={styles.text.body2}>
                        {data.name_of_father}
                    </Text>
                </View>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }} >
                <View style={styles.textViewLeft}>
                    <Text style={[styles.text.body2, styles.bengaliText]}>
                        {`মাতার নাম: `} 
                    </Text>
                </View>
                
                <View style={styles.textViewRight} >
                    <Text style={styles.text.body2}>
                        {data.name_of_mother}
                    </Text>
                </View>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }} >
                <View style={styles.textViewLeft}>
                    <Text style={[styles.text.body2, styles.bengaliText]}>
                        {`অভিভাবকের নাম: `}
                    </Text>
                </View>
                
                <View style={styles.textViewRight} >
                    <Text style={styles.text.body2}>
                        {data.name_of_guardian}
                    </Text>
                </View>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }} >
                <View style={styles.textViewLeft} >
                    <Text style={[styles.text.body2, styles.bengaliText]}>
                        {`পূর্ণ স্থায়ী ঠিকানা: `} 
                    </Text>
                </View>
                
                <View style={styles.textViewRight} >
                    <Text style={[styles.text.body2, styles.bengaliText]}>
                        {data.permanent_address}
                    </Text>
                </View>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }} >
                <View style={styles.textViewLeft} >
                    <Text style={[styles.text.body2, styles.bengaliText]}>
                        {`মোবাইল নম্বর: `} 
                    </Text>
                </View>
                
                <View style={styles.textViewRight} >
                    <Text style={[styles.text.body2, styles.bengaliText]}>
                        {data.contact}
                    </Text>
                </View>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }} >
                <View style={styles.textViewLeft}>
                    <Text style={[styles.text.body2, styles.bengaliText]}>
                        {`জন্মতারিখ: `} 
                    </Text>
                </View>
                
                <View style={styles.textViewRight} >
                    <Text style={styles.text.body2}>
                        {data.date_of_birth ? new Date(data.date_of_birth).toDateString() : 'N/A'}
                    </Text>
                </View>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }} >
                <View style={styles.textViewLeft}>
                    <Text style={[styles.text.body2, styles.bengaliText]}>
                        {`জাতীয়তা: `}
                    </Text>
                </View>
                
                <View style={styles.textViewRight} >
                    <Text style={styles.text.body2}>
                        {data.nationality}
                    </Text>
                </View>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }} >
                <View style={styles.textViewLeft}>
                    <Text style={[styles.text.body2, styles.bengaliText]}>
                        {`ধর্ম: `} 
                    </Text>
                </View>
                
                <View style={styles.textViewRight} >
                    <Text style={styles.text.body2}>
                        {data.religion}
                    </Text>
                </View>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', }} >
                <View style={styles.textViewLeft}>
                    <Text style={[[[styles.text.body2, styles.bengaliText], styles.bengaliText], styles.bengaliText]}>
                        {`বর্ণ: `}
                    </Text>
                </View>
                
                <View style={styles.textViewRight} >
                    <Text style={styles.text.body2}>
                        {data.ethnicity}
                    </Text>
                </View>
            </View>
        </View>
    )
}

export default PDFStudentInfoFrag