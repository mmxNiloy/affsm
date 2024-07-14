import { Image, Text, View, Font } from "@react-pdf/renderer";
import styles, { TextStyles } from "./styles";
import { Exam, FormDetail, User } from "@/util/types";
import { getExamName, toDD_MM_YYYY } from "@/util/Functions";

Font.register({
  family: "NotoBengali",
  format: "truetype",
  src: "https://firebasestorage.googleapis.com/v0/b/serveturtle.appspot.com/o/latex%2FNotoSerifBengali-Regular.ttf?alt=media&token=ead77452-da6f-416a-8b6e-1366a33e9b2d",
  fontStyle: "normal",
  fontWeight: "normal",
});

const PDFAdmitCardFrag = ({
  form,
  exam,
  student,
  isStudentCopy,
}: {
  form: FormDetail;
  exam: Exam;
  student: User;
  admitCard?: boolean;
  isStudentCopy?: boolean;
}) => {
  const renderFootNote = () => {
    if (!isStudentCopy) return null;
    return (
      <View
        style={[
          styles.section,
          { alignItems: "flex-start", textAlign: "left" },
        ]}
      >
        <Text style={[TextStyles.body1, styles.bengaliText]}>{`বি:দ্র: `}</Text>
        <Text style={[TextStyles.body2, styles.bengaliText]}>
          {`১। পরীক্ষার্থী স্বহস্তে উপরের তথ্যগুলো পূরণ করবে। `}
        </Text>
        <Text style={[TextStyles.body2, styles.bengaliText]}>
          {`২। প্রভোস্ট পরীক্ষার্থীর ফটো সিলমোহরদানে সত্যায়িত করবেন। `}
        </Text>
        <Text style={[TextStyles.body2, styles.bengaliText]}>
          {`৩। প্রভোস্ট কর্তৃক পরীক্ষাকৃত তথ্যাবলী চূড়ান্ত বলে বিবেচিত হবে। `}
        </Text>
        <Text style={[TextStyles.body2, styles.bengaliText]}>
          {`৪। প্রবেশপত্রের লিখিত বিবরণের কোন ক্ষেত্রে কাটাকাটি বা বা ঘষামাজা থাকলে গ্রহণযোগ্য হবে না। `}
        </Text>
      </View>
    );
  };

  return (
    <View
      style={[
        {
          border: student && "1px solid black",
          marginVertical: "2px",
          marginHorizontal: "16px",
        },
      ]}
    >
      <View style={styles.title}>
        <Text
          style={[
            TextStyles.h6,
            {
              marginTop: "8px",
              marginBottom: "8px",
            },
            styles.bengaliText,
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

        <Text style={[TextStyles.h6, styles.bengaliText]}>{`প্রবেশপত্র (${
          !isStudentCopy ? `ডিপার্টমেন্ট কপি` : `স্টুডেন্ট কপি`
        }) `}</Text>

        <View style={{ margin: "8px" }}>
          <Text style={TextStyles.body2}>{getExamName(exam)}</Text>
        </View>

        <View style={{ marginBottom: "8px" }}>
          <Text style={[TextStyles.body2, styles.center]}>
            {student.department_name}
          </Text>
        </View>

        <View
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "4px",
            width: "70vw",
            alignSelf: "center",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View
            style={{
              display: "flex",
              width: "100%",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View style={styles.textViewLeftAdmitCard}>
              <Text
                style={[TextStyles.body2, styles.bengaliText]}
              >{`পরীক্ষারম্ভের তারিখ: `}</Text>
            </View>

            <View style={styles.textViewRightAdmitCard}>
              <Text style={TextStyles.body2}>
                {toDD_MM_YYYY(exam.exam_start_date)}
              </Text>
            </View>
          </View>

          {form.student_status === "Improvement" && (
            <View
              style={{
                display: "flex",
                width: "100%",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <View style={styles.textViewLeftAdmitCard}>
                <Text style={[TextStyles.body2, styles.bengaliText]}>
                  {`কোর্স নং: \n(কেবলমাত্র মানউন্নয়ন ও পুনঃ পরীক্ষার্থীর বেলায় প্রযোজ্য) `}
                </Text>
              </View>

              <View style={styles.textViewRightAdmitCard}>
                {form.courses.map((course) => (
                  <Text
                    key={`improvement-course-${course.course_id}`}
                    style={TextStyles.body2}
                  >{`${course.course_code} - ${course.course_title}`}</Text>
                ))}
              </View>
            </View>
          )}

          <View
            style={{
              display: "flex",
              width: "100%",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View style={styles.textViewLeftAdmitCard}>
              <Text
                style={[TextStyles.body2, styles.bengaliText]}
              >{`আই.ডি. নং:`}</Text>
            </View>

            <View style={styles.textViewRightAdmitCard}>
              <Text style={TextStyles.body2}>{student.student_id}</Text>
            </View>
          </View>

          <View
            style={{
              display: "flex",
              width: "100%",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View style={styles.textViewLeftAdmitCard}>
              <Text
                style={[TextStyles.body2, styles.bengaliText]}
              >{`শিক্ষাবর্ষ: `}</Text>
            </View>

            <View style={styles.textViewRightAdmitCard}>
              <Text style={TextStyles.body2}>{student.session}</Text>
            </View>
          </View>

          <View
            style={{
              display: "flex",
              width: "100%",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View style={styles.textViewLeftAdmitCard}>
              <Text
                style={[TextStyles.body2, styles.bengaliText]}
              >{`পরীক্ষার্থীর নাম:`}</Text>
            </View>

            <View style={styles.textViewRightAdmitCard}>
              <Text style={[TextStyles.body2, styles.bengaliText]}>
                {`${student.first_name_bn} ${student.last_name_bn} `}
              </Text>
            </View>
          </View>

          <View
            style={{
              display: "flex",
              width: "100%",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View style={styles.textViewLeftAdmitCard}>
              <Text
                style={[TextStyles.body2, styles.bengaliText]}
              >{`পিতার নাম: `}</Text>
            </View>

            <View style={styles.textViewRightAdmitCard}>
              <Text style={[TextStyles.body2, styles.bengaliText]}>
                {`${student.fathers_name_bn} `}
              </Text>
            </View>
          </View>

          <View
            style={{
              display: "flex",
              width: "100%",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View style={styles.textViewLeftAdmitCard}>
              <Text
                style={[TextStyles.body2, styles.bengaliText]}
              >{`পিতার নাম (ইংরেজীতে): `}</Text>
            </View>

            <View style={styles.textViewRightAdmitCard}>
              <Text style={TextStyles.body2}>{student.fathers_name}</Text>
            </View>
          </View>

          <View
            style={{
              display: "flex",
              width: "100%",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View style={styles.textViewLeftAdmitCard}>
              <Text
                style={[TextStyles.body2, styles.bengaliText]}
              >{`মাতার নাম: `}</Text>
            </View>

            <View style={styles.textViewRightAdmitCard}>
              <Text style={[TextStyles.body2, styles.bengaliText]}>
                {`${student.mothers_name_bn} `}
              </Text>
            </View>
          </View>

          <View
            style={{
              display: "flex",
              width: "100%",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View style={styles.textViewLeftAdmitCard}>
              <Text
                style={[TextStyles.body2, styles.bengaliText]}
              >{`মাতার নাম (ইংরেজীতে): `}</Text>
            </View>

            <View style={styles.textViewRightAdmitCard}>
              <Text style={TextStyles.body2}>{student.mothers_name}</Text>
            </View>
          </View>

          <View
            style={{
              display: "flex",
              width: "100%",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View style={styles.textViewLeftAdmitCard}>
              <Text
                style={[TextStyles.body2, styles.bengaliText]}
              >{`হলের নাম: `}</Text>
            </View>

            <View style={styles.textViewRightAdmitCard}>
              <Text style={TextStyles.body2}>{student.hall_name}</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[TextStyles.body2, { textAlign: "right" }]}>
          _____________________
        </Text>
        <Text
          style={[
            TextStyles.body2,
            { marginTop: "16px", textAlign: "right" },
            styles.bengaliText,
          ]}
        >
          {` পরীক্ষা নিয়ন্ত্রক`}
        </Text>
      </View>

      {renderFootNote()}
    </View>
  );
};

export default PDFAdmitCardFrag;
