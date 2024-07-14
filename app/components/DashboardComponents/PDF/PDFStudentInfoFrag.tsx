import { Text, View, Font } from "@react-pdf/renderer";
import styles, { TextStyles } from "./styles";
import { User } from "@/util/types";
import { toAddressString, toDD_MM_YYYY } from "@/util/Functions";

Font.register({
  family: "NotoBengali",
  format: "truetype",
  src: "https://firebasestorage.googleapis.com/v0/b/serveturtle.appspot.com/o/latex%2FNotoSerifBengali-Regular.ttf?alt=media&token=ead77452-da6f-416a-8b6e-1366a33e9b2d",
  fontStyle: "normal",
  fontWeight: "normal",
});

const PDFStudentInfoFrag = ({ student }: { student: User }) => {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "4px",
        width: "50vw",
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <View style={[styles.section]}>
        <Text style={[TextStyles.h6, styles.center, styles.bengaliText]}>
          {`শিক্ষার্থীর তথ্য `}
        </Text>
      </View>

      <View
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          flexWrap: "wrap",
        }}
      >
        <View style={{ textAlign: "left", width: "50%" }}>
          <Text style={[TextStyles.body2, styles.bengaliText]}>
            {`শিক্ষার্থীর নাম: `}
          </Text>
        </View>

        <View style={{ textAlign: "right", width: "50%" }}>
          <Text style={[TextStyles.body2, styles.bengaliText]}>
            {`${student.first_name_bn} ${student.last_name_bn} `}
          </Text>
        </View>
      </View>

      <View
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          flexWrap: "wrap",
        }}
      >
        <View style={{ textAlign: "left", width: "50%" }}>
          <Text style={[TextStyles.body2, styles.bengaliText]}>
            {`পিতার নাম: `}
          </Text>
        </View>

        <View style={{ textAlign: "right", width: "50%" }}>
          <Text style={[TextStyles.body2, styles.bengaliText]}>
            {`${student.fathers_name_bn} `}
          </Text>
        </View>
      </View>

      <View
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          flexWrap: "wrap",
        }}
      >
        <View style={{ textAlign: "left", width: "50%" }}>
          <Text style={[TextStyles.body2, styles.bengaliText]}>
            {`পিতার নাম (ইংরেজীতে): `}
          </Text>
        </View>

        <View style={{ textAlign: "right", width: "50%" }}>
          <Text style={TextStyles.body2}>{student.fathers_name}</Text>
        </View>
      </View>

      <View
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          flexWrap: "wrap",
        }}
      >
        <View style={{ textAlign: "left", width: "50%" }}>
          <Text style={[TextStyles.body2, styles.bengaliText]}>
            {`মাতার নাম: `}
          </Text>
        </View>

        <View style={{ textAlign: "right", width: "50%" }}>
          <Text style={[TextStyles.body2, styles.bengaliText]}>
            {`${student.mothers_name_bn} `}
          </Text>
        </View>
      </View>

      <View
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          flexWrap: "wrap",
        }}
      >
        <View style={{ textAlign: "left", width: "50%" }}>
          <Text style={[TextStyles.body2, styles.bengaliText]}>
            {`মাতার নাম (ইংরেজীতে): `}
          </Text>
        </View>

        <View style={{ textAlign: "right", width: "50%" }}>
          <Text style={TextStyles.body2}>{student.mothers_name}</Text>
        </View>
      </View>

      <View
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          flexWrap: "wrap",
        }}
      >
        <View style={{ textAlign: "left", width: "50%" }}>
          <Text style={[TextStyles.body2, styles.bengaliText]}>
            {`অভিভাবকের নাম: `}
          </Text>
        </View>

        <View style={{ textAlign: "right", width: "50%" }}>
          <Text style={[TextStyles.body2, styles.bengaliText]}>
            {`${student.guardian_name_bn} `}
          </Text>
        </View>
      </View>

      <View
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          flexWrap: "wrap",
        }}
      >
        <View style={{ textAlign: "left", width: "50%" }}>
          <Text style={[TextStyles.body2, styles.bengaliText]}>
            {`অভিভাবকের নাম (ইংরেজীতে): `}
          </Text>
        </View>

        <View style={{ textAlign: "right", width: "50%" }}>
          <Text style={TextStyles.body2}>{student.guardian_name}</Text>
        </View>
      </View>

      <View
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          flexWrap: "wrap",
        }}
      >
        <View style={{ textAlign: "left", width: "50%" }}>
          <Text style={[TextStyles.body2, styles.bengaliText]}>
            {`অভিভাবকের সাথে সম্পর্ক: `}
          </Text>
        </View>

        <View style={{ textAlign: "right", width: "50%" }}>
          <Text style={TextStyles.body2}>{student.guardian_relation}</Text>
        </View>
      </View>

      <View
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          flexWrap: "wrap",
        }}
      >
        <View style={{ textAlign: "left", width: "50%" }}>
          <Text style={[TextStyles.body2, styles.bengaliText]}>
            {`পূর্ণ স্থায়ী ঠিকানা: `}
          </Text>
        </View>

        <View style={{ textAlign: "right", width: "50%" }}>
          <Text style={[TextStyles.body2, styles.bengaliText]}>
            {toAddressString(student.permanent_address)}
          </Text>
        </View>
      </View>

      <View
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          flexWrap: "wrap",
        }}
      >
        <View style={{ textAlign: "left", width: "50%" }}>
          <Text style={[TextStyles.body2, styles.bengaliText]}>
            {`মোবাইল নম্বর: `}
          </Text>
        </View>

        <View style={{ textAlign: "right", width: "50%" }}>
          <Text style={[TextStyles.body2, styles.bengaliText]}>
            {student.phone}
          </Text>
        </View>
      </View>

      <View
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          flexWrap: "wrap",
        }}
      >
        <View style={{ textAlign: "left", width: "50%" }}>
          <Text style={[TextStyles.body2, styles.bengaliText]}>
            {`জন্মতারিখ: `}
          </Text>
        </View>

        <View style={{ textAlign: "right", width: "50%" }}>
          <Text style={TextStyles.body2}>{toDD_MM_YYYY(student.dob)}</Text>
        </View>
      </View>

      <View
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          flexWrap: "wrap",
        }}
      >
        <View style={{ textAlign: "left", width: "50%" }}>
          <Text style={[TextStyles.body2, styles.bengaliText]}>
            {`জাতীয়তা: `}
          </Text>
        </View>

        <View style={{ textAlign: "right", width: "50%" }}>
          <Text style={TextStyles.body2}>{student.nationality}</Text>
        </View>
      </View>

      <View
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          flexWrap: "wrap",
        }}
      >
        <View style={{ textAlign: "left", width: "50%" }}>
          <Text style={[TextStyles.body2, styles.bengaliText]}>{`ধর্ম: `}</Text>
        </View>

        <View style={{ textAlign: "right", width: "50%" }}>
          <Text style={TextStyles.body2}>{student.religion}</Text>
        </View>
      </View>

      <View
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          flexWrap: "wrap",
        }}
      >
        <View style={{ textAlign: "left", width: "50%" }}>
          <Text style={[TextStyles.body2, styles.bengaliText]}>{`বর্ণ: `}</Text>
        </View>

        <View style={{ textAlign: "right", width: "50%" }}>
          <Text style={TextStyles.body2}>{student.ethnicity}</Text>
        </View>
      </View>
    </View>
  );
};

export default PDFStudentInfoFrag;
