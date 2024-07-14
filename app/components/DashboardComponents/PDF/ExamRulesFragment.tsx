import { Document, Image, Page, Text, View, Font } from "@react-pdf/renderer";
import styles, { TextStyles } from "./styles";

Font.register({
  family: "NotoBengali",
  format: "truetype",
  src: "https://firebasestorage.googleapis.com/v0/b/serveturtle.appspot.com/o/latex%2FNotoSerifBengali-Regular.ttf?alt=media&token=ead77452-da6f-416a-8b6e-1366a33e9b2d",
  fontStyle: "normal",
  fontWeight: "normal",
});

const ExamRulesFragment = () => {
  return (
    <View>
      <View style={{ textAlign: "center", margin: "30px" }}>
        <Text style={[TextStyles.h6, styles.bengaliText]}>{`নিয়মাবলী `}</Text>
      </View>
      <View style={styles.section}>
        <Text style={[TextStyles.body1, styles.bengaliText]}>
          {`বিশ্ববিদ্যালয়ের পরীক্ষাসমূহে অসদুপায় অবলম্বনের বিরুদ্ধে শাস্তি মূলক ব্যবস্থা গ্রহণের নিয়মাবলী :-`}
        </Text>

        <Text style={[TextStyles.body1, styles.bengaliText]}>
          {`নিম্নলিখিত কার্যাবলী পরীক্ষায় অসদুপায় অবলম্বন বলে গণ্য হবে :-`}
        </Text>

        <Text style={[TextStyles.body1, styles.bengaliText]}>
          {`চট্টগ্রাম বিশ্ববিদ্যালয় হইতে ইস্যুকৃত প্রবেশপত্র ছাড়া পরীক্ষার্থীকে পরীক্ষার হলে
          প্রবেশ করতে দেয়া হবে না। `}
        </Text>
      </View>
      <View style={styles.section}>
        <Text style={[TextStyles.body2, styles.bengaliText]}>
          {`(ক) অন্য কোনো পরীক্ষার্থী পরীক্ষা কক্ষে যোগাযোগ স্থাপন। `}
        </Text>
        <Text
          style={[TextStyles.body2, styles.bengaliText]}
        >{`(খ) পরীক্ষাকক্ষে ধূমপান্‌। `}</Text>
        <Text style={[TextStyles.body2, styles.bengaliText]}>
          {`(গ) পরীক্ষা চলাকালে মোবাইল ফোন ও অন্যান্য ইলেকট্রনিক ডিভাইস যথা
         সিম যুক্ত ঘড়ি ও কলম প্রভৃতি ব্যবহার করা সম্পূর্ণ নিষিদ্ধ। `}
        </Text>
        <Text
          style={[TextStyles.body2, styles.bengaliText]}
        >{`(ঘ) দূষণীয় কাগজপত্র দখলে রাখা। `}</Text>
        <Text style={[TextStyles.body2, styles.bengaliText]}>
          {`(ঙ) দূষণীয় কাগজপত্র অথবা অপরের খাতা নকল করা। `}
        </Text>
        <Text style={[TextStyles.body2, styles.bengaliText]}>
          {`(চ) পরীক্ষায় নিয়োজিত কোন পরিদর্শক / কর্মচারীর প্রতি দুর্ব্যবহার অথবা ভীতি প্রদর্শন করা। `}
        </Text>
        <Text style={[TextStyles.body2, styles.bengaliText]}>
          {`(ছ) পরীক্ষাকক্ষে অথবা এর পার্শ্ববর্তী এলাকায় কোন প্রকার বাধা প্রদান অথবা গোোলযোগ সৃষ্টি করা। `}
        </Text>
        <Text style={[TextStyles.body2, styles.bengaliText]}>
          {`(জ ) টয়লেটের মধ্যে বা পথিমধ্যে বই বা কোন কাগজপত্র দেখা। `}
        </Text>
        <Text style={[TextStyles.body2, styles.bengaliText]}>
          {`(ঝ ) পরীক্ষাকক্ষ অথবা এর পার্শ্ববর্তী এলাকায় পরীক্ষাকার্যে নিয়োজিত কোন কর্মচারীকে মারধর করা অথবা মারার চেষ্টা করা। `}
        </Text>
        <Text style={[TextStyles.body2, styles.bengaliText]}>
          {`(ঞ) পরীক্ষা পরিদর্শক বা প্রধান পরিদর্শকের বিবেচনায় পরীক্ষার্থীদের যে সমস্ত কার্যাবলী অপরাধমূলক বলে গণ্য। `}
        </Text>
      </View>
      <View style={styles.section}>
        <Text style={[TextStyles.body2, styles.bengaliText]}>
          {`উপরোল্লিখিত অপরাধে অপরাধীদের দেয় পরীক্ষা বাতিল অথবা পরীক্ষা বাতিলসহ পরবর্তী যে কোন পরীক্ষা হতে বিরত রাখা যেতে পারে। `}
        </Text>
      </View>

      <View style={styles.subsection}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "flex-end",
          }}
        >
          <View
            style={{
              flexDirection: "column",
              textAlign: "right",
              marginLeft: "400px",
            }}
          >
            <Text
              style={[TextStyles.body2, styles.bengaliText]}
            >{`পরীক্ষা নিয়ন্ত্রক  `}</Text>
            <Text
              style={[
                TextStyles.body2,
                { marginTop: "8px", marginBottom: "8px" },
                styles.bengaliText,
              ]}
            >
              {`চট্টগ্রাম বিশ্ববিদ্যালয় `}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};
export default ExamRulesFragment;
