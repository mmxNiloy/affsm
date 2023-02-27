import { Document, Image, Page, Text, View } from "@react-pdf/renderer";
import styles from "./styles";
const ExamRulesFragment = () => {
  return (
    <View>
      <View style={{ textAlign: "center", margin: "30px" }}>
        <Text style={styles.text.h6}>Regulations</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.text.body1}>
          Regulations against misconducts in the exams of university:-
        </Text>

        <Text style={styles.text.body1}>
          Belows are considered as misconducts in exam:-
        </Text>

        <Text style={styles.text.body1}>
          A candidate is not allowed to enter exam hall without an admit card
          issued by the University of Chittagong.
        </Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.text.body2}>
          (a) Communication with peers in the exam hall.
        </Text>
        <Text style={styles.text.body2}>(b) Smoking in the exam hall.</Text>
        <Text style={styles.text.body2}>
          (c) Using mobile phones and other electronic devices with SIM such as
          watches, calculators, and pen during exam is completely prohibited.
        </Text>
        <Text style={styles.text.body2}>(d) Possessing cheatsheet.</Text>
        <Text style={styles.text.body2}>
          (e) Copying from possessed cheatsheet or other candidate's paper.
        </Text>
        <Text style={styles.text.body2}>
          (f) Misbehaving or intimidating exam invigilator or staff involved
          in exam process.
        </Text>
        <Text style={styles.text.body2}>
          (e) Blocking or creating chaos in exam hall or in peripheral area.
        </Text>
        <Text style={styles.text.body2}>
          (f) Peeking at any cheatsheet or book left in toilet or on the way.
        </Text>
        <Text style={styles.text.body2}>
          (g) Causing a brawl or trying to cause a brawl against staff involved in exam process in
          exam hall or in peripheral area of the exam hall.
        </Text>
        <Text style={styles.text.body2}>
          (h) Candidate's action that are considered as misconduct by the exam
          invigilator or the principal invigilator.
        </Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.text.body2}>
            Offenders charged with the above charges can cause exam to be cancelled or cancelation of the exam together with the prohibition of 
            the subsequent exams to be imposed.
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
