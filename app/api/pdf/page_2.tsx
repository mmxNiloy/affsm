import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
  Font,
} from "@react-pdf/renderer";
import { Exam, FormDetail, User } from "@/util/types";
import { MoveRight } from "lucide-react";

Font.register({
  family: "NotoBengali",
  format: "truetype",
  src: "https://firebasestorage.googleapis.com/v0/b/serveturtle.appspot.com/o/latex%2FNotoSerifBengali-Regular.ttf?alt=media&token=ead77452-da6f-416a-8b6e-1366a33e9b2d",
  fontStyle: "normal",
  fontWeight: "normal",
});

// Define the styles
const styles = StyleSheet.create({
  body: {
    fontFamily: "NotoBengali",
    fontSize: 9,
    lineHeight: 1.6,
    padding: 5,
  },
  container: {
    width: "90%",
    maxWidth: 800,
    margin: "20px auto",
    padding: 5,
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
  },
  header: {
    textAlign: "center",
    marginBottom: 20,
  },
  logo: {
    width: 84,
    height: 96,
    margin: "0 20px",
  },
  row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  leftBox: {
    flex: 1,
    margin: "0 10px",
  },
  rightBox: {
    flex: 1,
    margin: "0 10px",
  },
  box: {
    border: "1px solid #000",
    padding: 5,
    marginBottom: 10,
  },
  formGroup: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  formLabel: {
    marginRight: 10,
  },
  formInput: {
    border: "1px solid black",
    padding: 3,
    height: 24,
    flex: 1,
  },
  signature: {
    textAlign: "right",
    marginTop: 10,
  },
  textCenter: {
    textAlign: "center",
  },
  textRight: {
    textAlign: "right",
  },
  dashedInput: {
    border: "1px dashed black",
    width: "80%",
    height: 24,
    marginBottom: 5,
    marginLeft: 10,
  },
  title: {
    textAlign: "center",
    fontSize: 18,
    marginBottom: 30,
  },
  leftMargin: {
    fontWeight: "bold",
    marginLeft: 10,
    marginBottom: 10, // Add desired margin size here
  },
  rightMargin: {
    fontWeight: "bold",
    marginRight: 5,
    marginBottom: 10, // Add desired margin size here
  },
});
const banglaNumbers = ["১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯", "১০"];

const PdfFormPage2 = ({
  form,
  student,
  exam,
}: {
  form: FormDetail;
  student: User;
  exam: Exam;
}) => (
  <Page style={styles.body} size={"LEGAL"}>
    <Text style={styles.title}>(আবেদনকারী নিজ হাতে পূরন করবে)</Text>
    <View style={[styles.formGroup, { marginLeft: 32, marginRight: 32 }]}>
      <Text style={styles.label}> {"১/ পরীক্ষার্থীর নাম (বাংলায়) "}</Text>
      <Text
        style={[styles.dashedInput, { width: "100%", marginLeft: 14 }]}
      ></Text>
    </View>
    <Text style={[{ marginLeft: 46, marginBottom: 5 }]}>
      {" (মাধ্যমিক সার্টিফিকেট অনুযায়ী) "}
    </Text>
    <View style={[styles.formGroup, { marginLeft: 32, marginRight: 32 }]}>
      <Text style={styles.leftMargin}>{" ইংরেজিতে (বড় অক্ষরে) "}</Text>
      <Text
        style={[styles.dashedInput, { width: "100%", marginLeft: 12 }]}
      ></Text>
    </View>

    <View style={[styles.formGroup, { marginLeft: 32, marginRight: 32 }]}>
      <Text style={styles.label}>২/ পিতা/স্বামীর নাম (বাংলায়):</Text>
      <Text
        style={[styles.dashedInput, { width: "100%", marginLeft: 16 }]}
      ></Text>
    </View>
    <View style={[styles.formGroup, { marginLeft: 32, marginRight: 30 }]}>
      <Text style={styles.leftMargin}>ইংরেজিতে</Text>
      <Text
        style={[styles.dashedInput, { width: "100%", marginLeft: 8 }]}
      ></Text>
    </View>

    <View style={[styles.formGroup, { marginLeft: 32, marginRight: 36 }]}>
      <Text style={styles.label}>{"৩/ মাতার নাম (বাংলায়) "}</Text>
      <Text
        style={[styles.dashedInput, { width: "100%", marginLeft: 18 }]}
      ></Text>
    </View>

    <View style={[styles.formGroup, { marginLeft: 32, marginRight: 32 }]}>
      <Text style={styles.leftMargin}>ইংরেজিতে</Text>
      <Text
        style={[styles.dashedInput, { width: "100%", marginLeft: 4 }]}
      ></Text>
    </View>

    <View style={[styles.formGroup, { marginLeft: 32, marginRight: 32 }]}>
      <Text style={styles.label}>৪/ অভিভাবকের নাম</Text>
      <Text
        style={[styles.dashedInput, { width: "100%", marginLeft: 8 }]}
      ></Text>
    </View>
    <View style={[styles.formGroup, { marginLeft: 32, marginRight: 32 }]}>
      <Text style={styles.label}>৫/ পূর্ণ স্থায়ী ঠিকানা</Text>
      <Text
        style={[styles.dashedInput, { width: "100%", marginLeft: 8 }]}
      ></Text>
    </View>
    <View style={[styles.formGroup, { marginLeft: 32, marginRight: 32 }]}>
      <Text style={styles.rightMargin}>গ্রাম</Text>
      <View style={[styles.dashedInput, styles.leftMargin]}></View>
      <Text style={[styles.leftMargin, styles.rightMargin]}>ডাকঘর</Text>
      <View style={styles.dashedInput}></View>
    </View>

    <View style={[styles.formGroup, { marginLeft: 32, marginRight: 32 }]}>
      <Text style={[styles.rightMargin, { right: 2 }]}>উপজেলা/থানা</Text>
      <View style={[styles.dashedInput, { left: 5 }]}></View>
      <Text style={styles.leftMargin}>জিলা</Text>
      <View style={styles.dashedInput}></View>
    </View>

    <View style={[styles.formGroup, { marginLeft: 32, marginRight: 32 }]}>
      <Text>{"মোবাইল নং "}</Text>
      <Text
        style={[styles.dashedInput, { width: "100%", marginLeft: 8 }]}
      ></Text>
    </View>
    <View style={[styles.formGroup, { marginLeft: 32, marginRight: 32 }]}>
      <Text style={styles.label}>৬/ জন্ম তারিখ:</Text>
      <Text
        style={[styles.dashedInput, { width: "100%", marginLeft: 8 }]}
      ></Text>
    </View>
    <View style={[styles.formGroup, { marginLeft: 32, marginRight: 32 }]}>
      <Text style={styles.label}>৭/ জাতীয়তা:</Text>
      <View style={[styles.dashedInput, { width: 256, left: 8 }]}></View>
      <Text style={[styles.label, styles.leftMargin]}>ধর্ম</Text>
      <View style={[styles.dashedInput, { width: 256 }]}></View>
      <Text style={[styles.label, styles.leftMargin]}>বর্ণ</Text>
      <View style={[styles.dashedInput, { width: 256 }]}></View>
    </View>

    <View style={[styles.formGroup, { marginLeft: 32, marginRight: 32 }]}>
      <Text style={styles.label}>
        {
          "৮/ চট্টগ্রাম বিশ্ববিদ্যালয় কর্তৃক ইস্যুকৃত আই.ডি. কার্ডের সত্যায়িত ফটোকপি সংযুক্ত করিতে হইবে।   "
        }
      </Text>
    </View>
    <View style={[styles.formGroup, { marginLeft: 32, marginRight: 32 }]}>
      <Text style={styles.label}>
        {
          "৯/ উক্ত পরীক্ষায় ইতিপূর্বে অংশগ্রহণ করে থাকলে পরীক্ষার রোল নং /আই.ডি.নং  "
        }
      </Text>
      <View style={[styles.dashedInput, { width: 128 }]}></View>
      <Text style={[styles.label, styles.leftMargin]}>সন</Text>
      <View style={[styles.dashedInput, { width: 128 }]}></View>
    </View>

    <View style={[styles.formGroup, { marginLeft: 32, marginRight: 32 }]}>
      <Text style={styles.label}>
        {"১০/ আবেদিকারী ১ম/ ২য়/ ৩য়/ ৪র্থ বর্ষ অনার্স পরীক্ষা পাশের সন  "}
      </Text>
      <Text
        style={[styles.dashedInput, { width: "100%", marginLeft: 80 }]}
      ></Text>
    </View>
    <View style={[styles.formGroup, { marginLeft: 32, marginRight: 32 }]}>
      <Text style={[styles.label, styles.rightMargin]}>আই ডি নং</Text>
      <View style={[styles.dashedInput, { width: 256 }]}></View>
      <Text style={[styles.label, styles.leftMargin]}>বিষয়</Text>
      <View style={[styles.dashedInput, { width: 256 }]}></View>
      <Text style={[styles.label, styles.leftMargin]}>সন</Text>
      <View style={[styles.dashedInput, { width: 128 }]}></View>
      <Text style={[styles.label, styles.leftMargin]}>জিপিএ</Text>
      <View style={[styles.dashedInput, { width: 128 }]}></View>
    </View>

    <Text style={[styles.label, { marginLeft: 32, marginRight: 32 }]}>
      {
        "১১.চট্টগ্রাম বিশ্ববিদ্যালয় অথবা অন্য কোন বিশ্ববিদ্যালয়/শিক্ষা প্রতিষ্টানের অধীনে পরীক্ষার্থী অন্য কোন পরীক্ষায় /কোর্সে অংশগ্রহণ করছে কিনা,করলে তার পূর্ণ বিবরণ     "
      }
    </Text>
    <View
      style={[styles.dashedInput, { marginLeft: 32, marginRight: 24 }]}
    ></View>

    <Text
      style={[
        { textAlign: "center", marginTop: 20, marginBottom: 20, fontSize: 10 },
      ]}
    >
      {
        "(অন্য কোন কোর্সে ভর্তি হয়ে থাকলে বিশ্ববিদ্যালয় অনুমতি পত্র দাখিল করতে হবে।)  "
      }
    </Text>
    <View style={[styles.formGroup, { marginLeft: 32, marginRight: 32 }]}>
      <Text style={styles.label}>
        {
          "১২. পরীক্ষায় অসদুপায় অবলম্বন অথবা অন্য কোন কারনে সাজাপ্রাপ্ত হয়ে থাকলে তার পূর্ণ বিবরণ:  "
        }
      </Text>
    </View>
    <View
      style={[styles.dashedInput, { marginLeft: 32, marginRight: 24 }]}
    ></View>
    <View style={[styles.rightBox, { alignItems: "flex-end", marginTop: 20 }]}>
      <Text
        style={{
          textAlign: "right",
          paddingTop: 4,
          borderTop: "1px dashed black",
          width: 128,
          marginTop: 16,
        }}
      >{`পরীক্ষার্থীর পূর্ণ স্বাক্ষর `}</Text>
    </View>
  </Page>
);

export default PdfFormPage2;
