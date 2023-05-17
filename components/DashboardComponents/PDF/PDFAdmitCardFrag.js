import { textAlign } from "@mui/system";
import { Document, Image, Page, Text, View, Font } from "@react-pdf/renderer";
import { useEffect, useState } from "react";
import styles from "./styles";

Font.register({
  family: 'NotoBengali', 
  format: 'truetype',
  src: 'https://firebasestorage.googleapis.com/v0/b/serveturtle.appspot.com/o/latex%2FNotoSerifBengali-Regular.ttf?alt=media&token=ead77452-da6f-416a-8b6e-1366a33e9b2d',
  fontStyle: 'normal', 
  fontWeight: 'normal'
})

const PDFAdmitCardFrag = ({ data, student }) => {
  const toCardinal = (num) => {
    // Limited to 1-9
    switch (num) {
      case 1:
        return "1st";
      case 2:
        return "2nd";
      case 3:
        return "3rd";
      default:
        return num + "th";
    }
  };
  const renderFootNote = () => {
    if (!Boolean(student)) return null;
    return (
      <View style={[styles.section, { alignItems: "left", textAlign: "left"}]}>
        <Text style={[styles.text.body1, styles.bengaliText]}>{`বি:দ্র: `}</Text>
        <Text style={[styles.text.body2, styles.bengaliText]}>
          {`১। পরীক্ষার্থী স্বহস্তে উপরের তথ্যগুলো পূরণ করবে। `}
        </Text>
        <Text style={[styles.text.body2, styles.bengaliText]}>
          {`২। প্রভোস্ট পরীক্ষার্থীর ফটো সিলমোহরদানে সত্যায়িত করবেন। `}
        </Text>
        <Text style={[styles.text.body2, styles.bengaliText]}>
          {`৩। প্রভোস্ট কর্তৃক পরীক্ষাকৃত তথ্যাবলী চূড়ান্ত বলে বিবেচিত হবে। `}
        </Text>
        <Text style={[styles.text.body2, styles.bengaliText]}>
          {`৪। প্রবেশপত্রের লিখিত বিবরণের কোন ক্ষেত্রে কাটাকাটি বা বা ঘষামাজা থাকলে গ্রহণযোগ্য হবে না। `}
        </Text>
      </View>
    );
  };

  const renderImprovementCourses = () => {
    let ans = "";
    data.courses.forEach((course) => {
      if (course.type !== "Regular") ans += course.course_code + ", ";
    });

    if (ans.length < 1) return "N/A";
    // A stupid way to unit test but sure gets the job done.
    // ans = ans + ans + ans + ans + ans + ans + ans + ans + ans + ans + ans + ans + ans
    return ans.slice(0, ans.length - 2);
  };
  return (
    <View
      style={[
        { border: student && "1px solid black", marginVertical: "2px", marginHorizontal: '16px' },
      ]}
    >
      <View style={styles.title}>
        <Text
          style={[
            styles.text.h6,
            {
                marginTop: '8px',
                marginBottom: '8px'
            },
            styles.bengaliText
        ]}
        >
          {`চট্টগ্রাম বিশ্ববিদ্যালয় `}
        </Text>

        {student && (
          <Image
            src="/cu_logo.png"
            style={{
              height: "64px",
              width: "43px",
            }}
          />
        )}

        <Text
          style={[
            styles.text.h6,
            
            styles.bengaliText
        ]}
        >
          {`প্রবেশপত্র `}
        </Text>
        
        <View style={{ margin: "8px" }}>
          <Text style={styles.text.body2}>
            {new Date(data.time_stamp).getFullYear()} Year's{" "}
            {toCardinal(data.semester)}
            -Semester B.Sc. Engineering Exam
          </Text>
        </View>

        <View style={{ marginBottom: "8px" }}>
        <Text style={[styles.text.body2, styles.center]}>{data.department_name}</Text>
        </View>

        <View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View style={styles.textViewLeftAdmitCard}>
              <Text style={[styles.text.body2, styles.bengaliText]}>{`পরীক্ষারম্ভের তারিখ: `}</Text>
            </View>

            <View style={styles.textViewRightAdmitCard}>
              <Text style={styles.text.body2}>
                {new Date(data.time_stamp).toLocaleDateString()}
              </Text>
            </View>
          </View>

          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            {/* TODO: Course Number and Cour id's needed to be fixed. */}
            <View style={styles.textViewLeftAdmitCard}>
              <Text style={[styles.text.body2, styles.bengaliText]}>
                {`কোর্স নং: \n(কেবলমাত্র মানউন্নয়ন ও পুনঃ পরীক্ষার্থীর বেলায় প্রযোজ্য) `}
              </Text>
            </View>

            <View style={styles.textViewRightAdmitCard}>
              <Text style={styles.text.body2}>
                {renderImprovementCourses()}
              </Text>
            </View>
          </View>

          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View style={styles.textViewLeftAdmitCard}>
              <Text style={[styles.text.body2, styles.bengaliText]}>{`আই.ডি. নং:`}</Text>
            </View>

            <View
              style={styles.textViewRightAdmitCard}
            >
              <Text style={styles.text.body2}>{data.student_id}</Text>
            </View>
          </View>

          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View style={styles.textViewLeftAdmitCard}>
              <Text style={[styles.text.body2, styles.bengaliText]}>{`শিক্ষাবর্ষ: `}</Text>
            </View>

            <View
              style={styles.textViewRightAdmitCard}
            >
              <Text style={styles.text.body2}>
                {parseInt(data.session) - 1} {"-"} {data.session}
              </Text>
            </View>
          </View>

          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View style={styles.textViewLeftAdmitCard}>
              <Text style={[styles.text.body2, styles.bengaliText]}>{`পরীক্ষার্থীর নাম:` }</Text>
            </View>

            <View
              style={styles.textViewRightAdmitCard}
            >
              <Text style={styles.text.body2}>
                {data.first_name} {data.last_name}
              </Text>
            </View>
          </View>

          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View style={styles.textViewLeftAdmitCard}>
              <Text style={[styles.text.body2, styles.bengaliText]}>{`পিতার নাম: `}</Text>
            </View>

            <View
              style={styles.textViewRightAdmitCard}
            >
              <Text style={styles.text.body2}>{data.name_of_father}</Text>
            </View>
          </View>

          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View style={styles.textViewLeftAdmitCard}>
              <Text style={[styles.text.body2, styles.bengaliText]}>{`মাতার নাম: `}</Text>
            </View>

            <View
              style={styles.textViewRightAdmitCard}
            >
              <Text style={styles.text.body2}>{data.name_of_mother}</Text>
            </View>
          </View>

          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View style={styles.textViewLeftAdmitCard}>
              <Text style={[styles.text.body2, styles.bengaliText]}>{`হলের নাম: `}</Text>
            </View>

            <View
              style={styles.textViewRightAdmitCard}
            >
              <Text style={styles.text.body2}>
                {data.hall_name}
                {" Hall"}
              </Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.text.body2, {textAlign: 'right'}]}>
        _____________________
        </Text>
        <Text
          style={[
            styles.text.body2,
            { marginTop: "16px", textAlign: 'right' },
            styles.bengaliText
          ]}>
          {` পরীক্ষা নিয়ন্ত্রক`}
        </Text>
      </View>

      {renderFootNote()}
    </View>
  );
};

export default PDFAdmitCardFrag;
