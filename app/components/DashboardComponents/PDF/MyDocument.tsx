"use client";
import { Document, Image, Page, Text, View, Font } from "@react-pdf/renderer";
import PDFAdmitCardFrag from "./PDFAdmitCardFrag";
import PDFStudentInfoFrag from "./PDFStudentInfoFrag";
import ExamRulesFragment from "./ExamRulesFragment";
import styles, { TextStyles } from "./styles";
import { Course, Exam, FormDetail, User } from "@/util/types";
import {
  getExamName,
  toAddressString,
  toDD_MM_YYYY,
  toOrdinal,
} from "@/util/Functions";

Font.register({
  family: "NotoBengali",
  format: "truetype",
  src: "https://firebasestorage.googleapis.com/v0/b/serveturtle.appspot.com/o/latex%2FNotoSerifBengali-Regular.ttf?alt=media&token=ead77452-da6f-416a-8b6e-1366a33e9b2d",
  fontStyle: "normal",
  fontWeight: "normal",
});

const MyDocument = ({
  form,
  exam,
  student,
  admitCard,
}: {
  form: FormDetail;
  exam: Exam;
  student: User;
  admitCard?: boolean;
}) => {
  if (!form)
    return (
      <Document title={`Error: Form Not Found`}>
        <Page size="LEGAL" style={styles.page}>
          <View style={styles.title}>
            <Text
              style={[
                TextStyles.h2,
                {
                  marginTop: "8px",
                  marginBottom: "8px",
                },
                styles.bengaliText,
              ]}
            >
              Error: Form not found!
            </Text>
          </View>
        </Page>
      </Document>
    );

  const renderCourses = (item: Course, index: number) => {
    return (
      <View
        key={`selected-course-${index}`}
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          gap: "4px",
        }}
      >
        <Text style={[TextStyles.textXS, { width: "50%", textAlign: "left" }]}>
          {item.course_code}
        </Text>
        <Text style={[TextStyles.textXS, { width: "50%", textAlign: "right" }]}>
          {item.course_title}
        </Text>
      </View>
    );
  };

  if (admitCard)
    return (
      <Document>
        <Page size="LEGAL" style={[styles.page, { padding: "32px" }]}>
          <PDFAdmitCardFrag form={form} exam={exam} student={student} />
        </Page>
      </Document>
    );

  return (
    <Document title={`Form_${form.form_id}`}>
      <Page size="LEGAL" style={styles.page}>
        <View>
          <Text
            style={[
              TextStyles.h2,
              {
                marginTop: "8px",
                marginBottom: "8px",
                textAlign: "center",
                fontWeight: "bold",
              },
              styles.bengaliText,
            ]}
          >
            {`চট্টগ্রাম বিশ্ববিদ্যালয়`}
          </Text>
        </View>

        {/* Student info box */}
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Left Box */}
          <View
            style={{
              flex: 1,
              margin: "0 10px",
            }}
          >
            <View
              style={{
                border: "1px solid black",
                padding: "10px",
                marginBottom: "15px",
              }}
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: "10px",
                }}
              >
                <Text style={[TextStyles.body2, styles.bengaliText]}>হল:</Text>
                <View
                  style={{
                    flex: 1,
                    padding: "5px",
                    marginLeft: "10px",
                    border: "1px solid black",
                  }}
                >
                  <Text style={[TextStyles.body2, styles.bengaliText]}>
                    {student.hall_name}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: "10px",
                }}
              >
                <Text style={[TextStyles.body2, styles.bengaliText]}>
                  শ্রেণী রোল নং:{" "}
                </Text>
                <View
                  style={{
                    flex: 1,
                    padding: "5px",
                    marginLeft: "10px",
                    border: "1px solid black",
                  }}
                >
                  <Text style={[TextStyles.body2, styles.bengaliText]}>
                    {student.student_id}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: "10px",
                }}
              >
                <Text style={[TextStyles.body2, styles.bengaliText]}>
                  শিক্ষাবর্ষ:
                </Text>
                <View
                  style={{
                    flex: 1,
                    padding: "5px",
                    marginLeft: "10px",
                    border: "1px solid black",
                  }}
                >
                  <Text style={[TextStyles.body2, styles.bengaliText]}>
                    {student.session}
                  </Text>
                </View>
              </View>
            </View>
          </View>
          {/* Logo */}
          <Image
            src="/cu_logo.png"
            style={{
              height: "118px",
              width: "100px",
            }}
          />

          {/* Right Box */}
          <View
            style={{
              flex: 1,
              margin: "0 10px",
            }}
          >
            <View
              style={{
                border: "1px solid black",
                padding: "10px",
                marginBottom: "15px",
              }}
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: "10px",
                }}
              >
                <Text style={[TextStyles.body2, styles.bengaliText]}>
                  আইডি নং:
                </Text>
                <View
                  style={{
                    flex: 1,
                    padding: "5px",
                    marginLeft: "10px",
                    border: "1px solid black",
                  }}
                >
                  <Text style={[TextStyles.body2, styles.bengaliText]}>
                    {student.student_id}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: "10px",
                }}
              >
                <Text style={[TextStyles.body2, styles.bengaliText]}>
                  শিক্ষাবর্ষ:
                </Text>
                <View
                  style={{
                    flex: 1,
                    padding: "5px",
                    marginLeft: "10px",
                    border: "1px solid black",
                  }}
                >
                  <Text style={[TextStyles.body2, styles.bengaliText]}>
                    {student.session}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Thank you tim-soft, very cool */}
        {/* Student info box */}
        <View>
          <Text style={[TextStyles.body1, styles.center, styles.bengaliText]}>
            {new Date(exam.exam_start_date).getFullYear()} সালের{" "}
            {getExamName(exam)} পরীক্ষা।
          </Text>
        </View>
        {/* Main application */}
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={[
              TextStyles.h6,
              styles.center,
              styles.bengaliText,
              { fontWeight: "bold", flex: 1, textAlign: "center" },
            ]}
          >
            {`আবেদনপত্র `}
          </Text>

          <View
            style={{
              display: "flex",
              flexDirection: "column",
              flex: 1,
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "column",
                margin: "0 10px",
              }}
            >
              <View
                style={{
                  border: "1px solid black",
                  padding: "10px",
                  marginBottom: "15px",
                }}
              >
                <View>
                  <Text style={[TextStyles.body1, styles.bengaliText]}>
                    চট্টগ্রাম বিশ্ববিদ্যালয়
                  </Text>
                </View>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: "10px",
                  }}
                >
                  <Text style={[TextStyles.body2, styles.bengaliText]}>
                    আই.ডি. নং/রেজি: নং:
                  </Text>
                  <View
                    style={{
                      flex: 1,
                      padding: "5px",
                      marginLeft: "10px",
                      border: "1px solid black",
                    }}
                  >
                    <Text style={[TextStyles.body2, styles.bengaliText]}>
                      {student.student_id}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: "10px",
                  }}
                >
                  <Text style={[TextStyles.body2, styles.bengaliText]}>
                    শিক্ষাবর্ষ:
                  </Text>
                  <View
                    style={{
                      flex: 1,
                      padding: "5px",
                      marginLeft: "10px",
                      border: "1px solid black",
                    }}
                  >
                    <Text style={[TextStyles.body2, styles.bengaliText]}>
                      {student.session}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "column",
                margin: "0 10px",
              }}
            >
              <View
                style={{
                  border: "1px solid black",
                  padding: "10px",
                  marginBottom: "15px",
                }}
              >
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: "10px",
                  }}
                >
                  <Text style={[TextStyles.body2, styles.bengaliText]}>
                    অনার্স বিষয়:
                  </Text>
                  <View
                    style={{
                      flex: 1,
                      padding: "5px",
                      marginLeft: "10px",
                      border: "1px solid black",
                    }}
                  >
                    <Text style={[TextStyles.body2, styles.bengaliText]}>
                      {student.department_name}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
        <View style={[styles.section]}>
          <Text style={[TextStyles.body1, styles.bengaliText]}>
            {`পরীক্ষা নিয়ন্ত্রক `}
          </Text>

          <Text style={[TextStyles.body1, styles.bengaliText]}>
            {`চট্টগ্রাম বিশ্ববিদ্যালয়, চট্টগ্রাম `}
          </Text>

          <Text style={[TextStyles.body1, styles.bengaliText]}>জনাব,</Text>

          <Text style={[TextStyles.body2, styles.bengaliText]}>
            {`আমি আসন্ন ${getExamName(
              exam
            )} পরীক্ষায় অংশ গ্রহণের জন্য অনুমতি প্রার্থনা করছি। আমি অঙ্গীকার করছি যে , আমার অত্র পরীক্ষা সংক্রান্ত ব্যাপারে সিন্ডিকেট বা তদ্কর্তৃক ক্ষমতা প্রদত্ত অফিসার এর সিদ্ধান্ত চূড়ান্ত বলে মেনে নিতে বাধ্য  থাকবো। `}
          </Text>

          {/* <Text style={[TextStyles.body2, styles.bengaliText]}>
            {`আপনার একান্ত অনুগত `}
          </Text>

          <Text style={[TextStyles.body2, styles.bengaliText]}>
            {`${student.first_name_bn} ${student.last_name_bn} `}
          </Text> */}
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: "20px",
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              flex: 1,
              marginRight: "20px",
              textAlign: "left",
            }}
          >
            <Text style={[TextStyles.body1, styles.bengaliText]}>
              অনার্স পত্রের শিরোনাম কোর্স নম্বরঃ-
            </Text>

            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: "5px",
              }}
            >
              <View
                style={{ display: "flex", flexDirection: "column", flex: 1 }}
              >
                <Text style={[TextStyles.body2, styles.bengaliText]}>১/</Text>
                <View
                  style={{
                    border: "1px dashed black",
                    padding: "5px",
                    marginBottom: "10px",
                    width: "100%",
                    height: "30px",
                  }}
                >
                  <Text style={[TextStyles.body2, styles.bengaliText]}>
                    {form.courses.at(0)?.course_code}
                  </Text>
                </View>
              </View>
              <View
                style={{ display: "flex", flexDirection: "column", flex: 1 }}
              >
                <Text style={[TextStyles.body2, styles.bengaliText]}>২/</Text>
                <View
                  style={{
                    border: "1px dashed black",
                    padding: "5px",
                    marginBottom: "10px",
                    width: "100%",
                    height: "30px",
                  }}
                >
                  <Text style={[TextStyles.body2, styles.bengaliText]}>
                    {form.courses.at(1)?.course_code}
                  </Text>
                </View>
              </View>
              <View
                style={{ display: "flex", flexDirection: "column", flex: 1 }}
              >
                <Text style={[TextStyles.body2, styles.bengaliText]}>৩/</Text>
                <View
                  style={{
                    border: "1px dashed black",
                    padding: "5px",
                    marginBottom: "10px",
                    width: "100%",
                    height: "30px",
                  }}
                >
                  <Text style={[TextStyles.body2, styles.bengaliText]}>
                    {form.courses.at(2)?.course_code}
                  </Text>
                </View>
              </View>
              <View
                style={{ display: "flex", flexDirection: "column", flex: 1 }}
              >
                <Text
                  style={[TextStyles.body2, styles.bengaliText]}
                >{`৪/`}</Text>
                <View
                  style={{
                    border: "1px dashed black",
                    padding: "5px",
                    marginBottom: "10px",
                    width: "100%",
                    height: "30px",
                  }}
                >
                  <Text style={[TextStyles.body2, styles.bengaliText]}>
                    {form.courses.at(3)?.course_code}
                  </Text>
                </View>
              </View>
              <View
                style={{ display: "flex", flexDirection: "column", flex: 1 }}
              >
                <Text style={[TextStyles.body2, styles.bengaliText]}>৫/</Text>
                <View
                  style={{
                    border: "1px dashed black",
                    padding: "5px",
                    marginBottom: "10px",
                    width: "100%",
                    height: "30px",
                  }}
                >
                  <Text style={[TextStyles.body2, styles.bengaliText]}>
                    {form.courses.at(4)?.course_code}
                  </Text>
                </View>
              </View>
            </View>

            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: "5px",
              }}
            >
              <View
                style={{ display: "flex", flexDirection: "column", flex: 1 }}
              >
                <Text style={[TextStyles.body2, styles.bengaliText]}>৬/</Text>
                <View
                  style={{
                    border: "1px dashed black",
                    padding: "5px",
                    marginBottom: "10px",
                    width: "100%",
                    height: "30px",
                  }}
                >
                  <Text style={[TextStyles.body2, styles.bengaliText]}>
                    {form.courses.at(5)?.course_code}
                  </Text>
                </View>
              </View>
              <View
                style={{ display: "flex", flexDirection: "column", flex: 1 }}
              >
                <Text style={[TextStyles.body2, styles.bengaliText]}>৭/</Text>
                <View
                  style={{
                    border: "1px dashed black",
                    padding: "5px",
                    marginBottom: "10px",
                    width: "100%",
                    height: "30px",
                  }}
                >
                  <Text style={[TextStyles.body2, styles.bengaliText]}>
                    {form.courses.at(6)?.course_code}
                  </Text>
                </View>
              </View>
              <View
                style={{ display: "flex", flexDirection: "column", flex: 1 }}
              >
                <Text style={[TextStyles.body2, styles.bengaliText]}>৮/</Text>
                <View
                  style={{
                    border: "1px dashed black",
                    padding: "5px",
                    marginBottom: "10px",
                    width: "100%",
                    height: "30px",
                  }}
                >
                  <Text style={[TextStyles.body2, styles.bengaliText]}>
                    {form.courses.at(7)?.course_code}
                  </Text>
                </View>
              </View>
              <View
                style={{ display: "flex", flexDirection: "column", flex: 1 }}
              >
                <Text style={[TextStyles.body2, styles.bengaliText]}>৯/</Text>
                <View
                  style={{
                    border: "1px dashed black",
                    padding: "5px",
                    marginBottom: "10px",
                    width: "100%",
                    height: "30px",
                  }}
                >
                  <Text style={[TextStyles.body2, styles.bengaliText]}>
                    {form.courses.at(8)?.course_code}
                  </Text>
                </View>
              </View>
              <View
                style={{ display: "flex", flexDirection: "column", flex: 1 }}
              >
                <Text style={[TextStyles.body2, styles.bengaliText]}>
                  ১০/ঐচ্ছিক বিষয়ঃ
                </Text>
                <View
                  style={{
                    border: "1px dashed black",
                    padding: "5px",
                    marginBottom: "10px",
                    width: "100%",
                    height: "30px",
                  }}
                >
                  <Text style={[TextStyles.body2, styles.bengaliText]}>
                    {form.courses.at(9)?.course_code}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <View
            style={{
              display: "flex",
              flexDirection: "column",
              flex: 1,
              textAlign: "right",
            }}
          >
            <Text style={[TextStyles.body1, styles.bengaliText]}>
              আপনার একান্ত অনুগত
            </Text>
            <View
              style={{
                display: "flex",
                border: "1px solid black",
                width: "200px",
                height: "30px",
                marginLeft: "5px",
              }}
            >
              <Text style={[TextStyles.body1, styles.bengaliText]}>
                {student.first_name_bn} {student.last_name_bn}
              </Text>
            </View>
            <Text style={[TextStyles.body1, styles.bengaliText]}>
              অনাবাসিক/আবাসিক (কক্ষ নং সহ) হলের নামঃ
            </Text>
            <View
              style={{
                display: "flex",
                border: "1px solid black",
                width: "200px",
                height: "30px",
                marginLeft: "5px",
              }}
            >
              <Text style={[TextStyles.body1, styles.bengaliText]}>
                {student.hall_name}
              </Text>
            </View>
            <Text style={[TextStyles.body1, styles.bengaliText]}>
              স্থানীয় ঠিকানা (অনাবাসিক এর ক্ষেত্রে)
            </Text>
            <View
              style={{
                display: "flex",
                border: "1px solid black",
                width: "200px",
                height: "30px",
                marginLeft: "5px",
              }}
            >
              <Text style={[TextStyles.body1, styles.bengaliText]}>
                {student.present_address?.district},{" "}
                {student.present_address?.division},{" "}
                {student.present_address?.country}
              </Text>
            </View>
          </View>
        </View>

        {/* Selected courses */}
        <View>
          <Text style={[TextStyles.h6, styles.center, styles.bengaliText]}>
            {`নির্বাচিত কোর্সসমূহ `}
          </Text>
        </View>

        <View
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "4px",
            alignItems: "center",
            justifyContent: "center",
            alignSelf: "center",
            width: "90vw",
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              gap: "4px",
            }}
          >
            <Text
              style={[TextStyles.body1, { width: "50%", textAlign: "left" }]}
            >
              Course Code
            </Text>

            <Text
              style={[TextStyles.body1, { width: "50%", textAlign: "right" }]}
            >
              Course Title
            </Text>
          </View>
          {form.courses.map(renderCourses)}
        </View>

        <View
          style={[
            styles.section,
            {
              textAlign: "right",
              width: "40%",
              alignSelf: "flex-end",
              flexWrap: "wrap",
            },
            styles.bengaliText,
          ]}
        >
          <Text style={[TextStyles.body2]}>
            {`পরীক্ষার্থীর পূর্ণ স্বাক্ষর: `}
          </Text>
          <Text
            style={[
              TextStyles.body2,
              { marginTop: "16px", marginBottom: "8px" },
            ]}
          >
            _____________________
          </Text>

          <Text style={[TextStyles.body2, styles.bengaliText]}>
            {`অনাবাসিক / আবাসিক (কক্ষ নম্বর সহ `}
          </Text>

          <Text style={[TextStyles.body2, styles.bengaliText]}>
            {`হলের  নাম `}: {student.hall_name}
          </Text>

          <Text style={[TextStyles.body2]}>
            {`বর্তমান ঠিকানা: `} {toAddressString(student.present_address)}
          </Text>
        </View>

        {/* Application of the department staff */}
        <View style={styles.section}>
          <Text style={[TextStyles.h6, styles.center, styles.bengaliText]}>
            {`সার্টিফিকেট `}
          </Text>

          <Text style={[TextStyles.body2, styles.bengaliText]}>
            {`আমি প্রত্যয়ন করছি যে , উল্লেখিত ছাত্রের পাঠক্রম অনুশীলন সন্তোষজনক এবং আমি তার ....... বর্ষ বিএসসি ইঞ্জিনিয়ারিং  
                        ${toOrdinal(
                          student.semester!
                        )} সেমিস্টার পরীক্ষায় অংশগ্রহণের  অনুমতির জন্য সুপারিশ করছি।  আমি আরো যাচাই করে দেখেছি যে, 
                        অনার্স পরীক্ষার পত্রসমূহ সঠিকভাবে লিখিত আছে। `}
          </Text>
        </View>

        <View style={styles.subsection}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-around" }}
          >
            <View style={{ flexDirection: "column", textAlign: "left" }}>
              <Text style={[TextStyles.body2, styles.bengaliText]}>
                {`পরীক্ষার্থীর ক্লাসে উপস্থিতির হার: `}
              </Text>
              <Text
                style={[
                  TextStyles.body2,
                  { marginTop: "16px", marginBottom: "8px" },
                ]}
              >
                _____________________
              </Text>
            </View>

            <View style={{ flexDirection: "column", textAlign: "right" }}>
              <Text style={[TextStyles.body2, styles.bengaliText]}>
                {`বিভাগীয় সভাপতির স্বাক্ষর ও সিলমোহর: `}
              </Text>
              <Text
                style={[
                  TextStyles.body2,
                  { marginTop: "16px", marginBottom: "8px" },
                ]}
              >
                _____________________
              </Text>
            </View>
          </View>

          <Text
            style={[
              TextStyles.body2,
              { marginTop: "4px", textAlign: "center" },
              styles.bengaliText,
            ]}
          >
            {`(উপস্থিতির হার ৬০% এর কম হলে পরীক্ষায় অংশ গ্রহণের অযোগ্য বিধায় আবেদন গ্রহণ করা যাবেনা।) `}
          </Text>
        </View>
      </Page>

      <Page size="LEGAL" wrap style={styles.page}>
        <View style={styles.section}>
          <Text style={[TextStyles.body2, styles.bengaliText]}>
            {`আমি প্রত্যয়ন করছি যে , পরীক্ষার্থী আবাসের শর্তাবলী পালন করেছে এবং সে সৎ চরিত্রের অধিকারী। 
                        আমার জানামতে দরখাস্তের যাবতীয় বিবরণ সত্য। সে .......... সালের ১ম বর্ষ অনার্স কোর্স এ ভর্তি হয়েছে। 
                        .......... বর্ষ বিএসসি ইঞ্জিনিয়ারিং কোর্স 
                        এ পুনঃভর্তি হয়েছে। দরখাস্তকারীকে ${getExamName(
                          exam
                        )} পরীক্ষায় অংশ গ্রহণের অনুমতির জন্য সুপারিশ করছি। `}
          </Text>
        </View>

        <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
          <View style={{ flexDirection: "column", textAlign: "left" }}>
            <Text style={[TextStyles.body2, styles.bengaliText]}>
              {`তারিখ: `}
            </Text>
            <Text
              style={[
                TextStyles.body2,
                { marginTop: "16px", marginBottom: "8px" },
              ]}
            >
              _____________________
            </Text>
          </View>

          <View style={{ flexDirection: "column", textAlign: "right" }}>
            <Text style={[TextStyles.body2, styles.bengaliText]}>
              {`প্রভোস্ট: `}
            </Text>
            <Text
              style={[
                TextStyles.body2,
                { marginTop: "16px", marginBottom: "8px" },
              ]}
            >
              _____________________
            </Text>
          </View>
        </View>

        <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
          <View style={{ flexDirection: "column", textAlign: "left" }}></View>

          <View
            style={{
              flexDirection: "column",
              textAlign: "right",
              marginLeft: "150px",
            }}
          >
            <Text style={[TextStyles.body2, { marginBottom: "2px" }]}>
              {student.hall_name},
            </Text>
            <Text style={[TextStyles.body1, styles.bengaliText]}>
              {`চট্টগ্রাম বিশ্ববিদ্যালয় `}
            </Text>
          </View>
        </View>

        {/* Student info */}
        {/* TODO: Fix the margin padding and style accordingly */}
        {/* Optional form fields */}
        <PDFStudentInfoFrag student={student} />
      </Page>

      <Page size="LEGAL" wrap>
        {/* This is the exam controller copy */}
        <PDFAdmitCardFrag form={form} exam={exam} student={student} />
      </Page>
      <Page size="LEGAL" wrap>
        {/* This is the student copy */}
        <PDFAdmitCardFrag
          form={form}
          exam={exam}
          student={student}
          isStudentCopy
        />
      </Page>
      <Page size="LEGAL" wrap>
        <ExamRulesFragment />
      </Page>
    </Document>
  );
};

export default MyDocument;
