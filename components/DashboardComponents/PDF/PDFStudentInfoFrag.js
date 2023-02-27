import { Text, View } from "@react-pdf/renderer"
import styles from './styles'

const PDFStudentInfoFrag = ({data}) => {
    return (
        <View>
            <View style={[styles.section,]}>
                <Text style={[styles.text.h6, styles.center]}>
                    Student's Information
                </Text>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }} >
                <View style={styles.textViewLeft}>
                    <Text style={styles.text.body2}>
                        Student's Name: 
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
                    <Text style={styles.text.body2}>
                        Father's Name:
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
                    <Text style={styles.text.body2}>
                        Mother's Name: 
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
                    <Text style={styles.text.body2}>
                        Guardian's Name:
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
                    <Text style={styles.text.body2}>
                        Permanent Address: 
                    </Text>
                </View>
                
                <View style={styles.textViewRight} >
                    <Text style={styles.text.body2}>
                        {data.permanent_address}
                    </Text>
                </View>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }} >
                <View style={styles.textViewLeft} >
                    <Text style={styles.text.body2}>
                        Contact: 
                    </Text>
                </View>
                
                <View style={styles.textViewRight} >
                    <Text style={styles.text.body2}>
                        {data.contact}
                    </Text>
                </View>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }} >
                <View style={styles.textViewLeft}>
                    <Text style={styles.text.body2}>
                        Date of Birth: 
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
                    <Text style={styles.text.body2}>
                        Nationality:
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
                    <Text style={styles.text.body2}>
                        Religion: 
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
                    <Text style={styles.text.body2}>
                        Ethnicity:
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