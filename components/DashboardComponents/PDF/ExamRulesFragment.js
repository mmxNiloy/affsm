import { Document, Image, Page, Text, View } from "@react-pdf/renderer";
import styles from "./styles";
const ExamRulesFragment = () => {
  return (
    <View>
      <View style={{ textAlign: "center", margin: "30px" }}>
        <Text style={styles.text.h6}>: Regulations :</Text>
      </View>
      <View style={{ margin: "10px" }}>
        <Text style={styles.text.body1}>
          Regulations against misconducts in the exams of university:-
        </Text>
        <Text style={styles.text.body1}>
          Belows are considered as misconduct in exam:-
        </Text>
        <Text style={styles.text.body1}>
          Candidate is not allowed to enter exam hall without the admit card
          issued by University of Chittagong.
        </Text>
      </View>
      <View style={{ margin: "10px" }}>
        <Text style={styles.text.body2}>
          (a) Communication with other examinee in the exam hall.
        </Text>
        <Text style={styles.text.body2}>(b) Smoking in the exam hall.</Text>
        <Text style={styles.text.body2}>
          (c) Using mobile phone and other electronic devices with sim such as
          watch,calculator, and pen during exam is completely prohibited.
        </Text>
        <Text style={styles.text.body2}>(d) Possessing cheatsheet.</Text>
        <Text style={styles.text.body2}>
          (e) Copying from possessed cheatsheet or other candidate's paper.
        </Text>
        <Text style={styles.text.body2}>
          (f) Misbehaving or intimidating exam invigilator or any stuff involved
          in exam process.
        </Text>
        <Text style={styles.text.body2}>
          (e) Blocking or creating chaos in exam hall or in peripheral area.
        </Text>
        <Text style={styles.text.body2}>
          (f) Peeking at any cheatsheet or book left in toilet or on the way.
        </Text>
        <Text style={styles.text.body2}>
          (g) Beating or try to beating any stuff involved in exam process in
          exam hall or in peripheral area of the exam hall.
        </Text>
        <Text style={styles.text.body2}>
          (h) Candidate's action that are considered as misconduct by the exam
          invigilator or the pricipal invigilator.
        </Text>
      </View>
      <View style={{ margin: "14px" }}>
        <Text style={styles.text.body2}>
            Offender's, charged with the above charges, exam can be canceled or  cancelation of the exam together with the prohibition of 
            the subsequece exams can be carried on.
        </Text>
      </View>

      <View style={styles.subsection}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "end",
          }}
        >
          <View
            style={{
              flexDirection: "column",
              textAlign: "right",
              marginLeft: "400px",
            }}
          >
            <Text style={[styles.text.body2]}>Exam Controller</Text>
            <Text
              style={[
                styles.text.body2,
                { marginTop: "8px", marginBottom: "8px" },
              ]}
            >
              University of Chittagong
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};
export default ExamRulesFragment;
