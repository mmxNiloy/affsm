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
    width: "100%",
    height: 24,
    marginBottom: 5,
  },
});

const banglaNumbers = ["১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯", "১০"];

// Create the document
const PdfFormPage1 = () => (
  <Document>
    <Page style={styles.body} size={"LEGAL"}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 16,
            }}
          >
            চট্টগ্রাম বিশ্ববিদ্যালয়
          </Text>
        </View>
        <View style={[styles.row, { alignItems: "center" }]}>
          <View style={styles.leftBox}>
            <View style={styles.box}>
              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>{`হল: `}</Text>
                <Text style={styles.formInput}></Text>
              </View>
              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>{`শ্রেণী রোল নং: `}</Text>
                <Text style={styles.formInput}></Text>
              </View>
              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>{`শিক্ষাবর্ষ: `}</Text>
                <Text style={styles.formInput}></Text>
              </View>
            </View>
          </View>
          <Image style={styles.logo} src="./public/cu_logo.png" />
          <View style={styles.rightBox}>
            <View style={styles.box}>
              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>আইডি নং:</Text>
                <Text style={styles.formInput}></Text>
              </View>
              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>শিক্ষাবর্ষ:</Text>
                <Text style={styles.formInput}></Text>
              </View>
            </View>
          </View>
        </View>

        <Text style={styles.textCenter}>
          ২০<Text>____</Text> সালের <Text>____</Text> সেমিস্টার বি.এসসি.
          ইঞ্জিনিয়ারিং পরীক্ষা।
        </Text>

        <View style={styles.row}>
          <View
            style={[
              styles.textCenter,
              {
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
              },
            ]}
          >
            <Text style={{ fontWeight: "bold", fontSize: 14 }}>আবেদনপত্র</Text>
            <Text
              style={{
                position: "absolute",
                left: 0,
                bottom: 0,
                textAlign: "left",
              }}
            >
              {`পরীক্ষা নিয়ন্ত্রক
        চট্টগ্রাম বিশ্ববিদ্যালয়, চট্টগ্রাম।
        জনাব, `}
            </Text>
          </View>

          <View style={[styles.rightBox, { flex: 1 }]}>
            <View style={styles.box}>
              <View style={styles.formGroup}>
                <Text style={styles.textCenter}>চট্টগ্রাম বিশ্ববিদ্যালয়</Text>
              </View>
              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>আই.ডি. নং/রেজি: নং:</Text>
                <Text style={styles.formInput}></Text>
              </View>
              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>শিক্ষাবর্ষ:</Text>
                <Text style={styles.formInput}></Text>
              </View>
            </View>
            <View style={styles.box}>
              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>অনার্স বিষয়:</Text>
                <Text style={styles.formInput}></Text>
              </View>
            </View>
          </View>
        </View>

        <Text>
          আমি আসন্ন
          <Text>____</Text>
          সালের বি.এসসি. ইঞ্জিনিয়ারিং
          <Text>____</Text>
          সেমিস্টার পরীক্ষায় অংশ গ্রহণের জন্য অনুমতি প্রার্থনা করছি। আমি
          অঙ্গীকার করছি যে, আমার অত্র পরীক্ষা সংক্রান্ত ব্যাপারে সিন্ডিকেট বা
          তদকর্তৃক ক্ষমতা প্রদত্ত অফিসারের সিদ্ধান্ত চূড়ান্ত বলে মেনে নিতে বাধ্য
          থাকব।{" "}
        </Text>

        <Text>{`অনার্স পত্রের শিরোনাম কোর্স নম্বরঃ- `}</Text>
        <View style={styles.row}>
          <View style={[styles.row, { flex: 1 }]}>
            <View style={styles.leftBox}>
              {[...Array(5)].map((_, i) => (
                <View key={i}>
                  <Text>{banglaNumbers[i]}/</Text>
                  <Text style={styles.dashedInput}></Text>
                </View>
              ))}
            </View>
            <View style={styles.rightBox}>
              {[...Array(5)].map((_, i) => (
                <View key={i + 5}>
                  <Text>
                    {banglaNumbers[i + 5]}/{i == 4 ? "ঐচ্ছিক বিষয়ঃ " : ""}
                  </Text>
                  <Text style={styles.dashedInput}></Text>
                </View>
              ))}
            </View>
          </View>

          <View
            style={{
              flex: 1,
              alignItems: "flex-end",
              gap: 8,
            }}
          >
            <View
              style={[styles.signature, { alignItems: "flex-end", gap: 4 }]}
            >
              <Text>{`আপনার একান্ত অনুগত `}</Text>
              <View
                style={{
                  border: "1px solid black",
                  minWidth: 128,
                  minHeight: 24,
                }}
              ></View>
              <Text>পরীক্ষার্থীর পূর্ণ স্বাক্ষর</Text>
            </View>

            <View style={{ alignItems: "flex-end", gap: 4 }}>
              <Text>{`অনাবাসিক/আবাসিক (কক্ষ নং সহ) হলের নামঃ `}</Text>
              <View
                style={{
                  border: "1px solid black",
                  minWidth: 128,
                  minHeight: 24,
                }}
              ></View>

              <Text>{`স্থানীয় ঠিকানা (অনাবাসিক এর ক্ষেত্রে) `}</Text>
              <View
                style={{
                  border: "1px solid black",
                  minWidth: 128,
                  minHeight: 48,
                }}
              ></View>
            </View>
          </View>
        </View>

        <View style={[styles.textCenter, { fontWeight: "bold", fontSize: 13 }]}>
          <Text>সার্টিফিকেট</Text>
        </View>

        <View style={{ display: "flex", flexDirection: "row", gap: 4 }}>
          <Text>
            {`আমি প্রত্যায়ন করছি যে, উল্লেখিত ছাত্রের পাঠক্রম অনুশীলন সন্তোষজনক এবং আমি তার `}
          </Text>

          <View
            style={{ width: 48, height: 20, border: "1px dashed black" }}
          ></View>

          <Text>{"বর্ষ বি.এসসি.ইঞ্জিনিয়ারিং "}</Text>

          <View
            style={{ width: 48, height: 20, border: "1px dashed black" }}
          ></View>

          <Text>{`সেমিস্টার পরীক্ষায় `}</Text>
        </View>
        <Text>{`অংশ গ্রহণের অনুমতির জন্য সুপারিশ করছি। আমি আরও যাচাই করে দেখছি যে, অনার্স পরীক্ষার পত্রসমূহ সঠিকভাবে লিখিত আছে। `}</Text>

        <View style={styles.row}>
          <View style={styles.leftBox}>
            <Text>{`এই পরীক্ষার্থীর ক্লাসে উপস্থিতির হারঃ `}</Text>
            <View
              style={[
                styles.row,
                { alignItems: "center", justifyContent: "flex-start" },
              ]}
            >
              <Text>{`অনার্স বিষয়ঃ `}</Text>
              <View
                style={{
                  border: "1px solid black",
                  minWidth: 128,
                  minHeight: 16,
                }}
              ></View>
            </View>
            <View
              style={[
                styles.row,
                { alignItems: "center", justifyContent: "flex-start" },
              ]}
            >
              <Text>{`উপস্থিতির হারঃ `}</Text>
              <View
                style={{
                  border: "1px solid black",
                  minWidth: 128,
                  minHeight: 16,
                }}
              ></View>
            </View>
          </View>
          <View style={styles.rightBox}>
            <View style={styles.signature}>
              {/* TODO: add digital signature here */}
              {/* <Image src="/api/placeholder/150/50" style={styles.dashedInput} /> */}
              <View
                style={{
                  alignSelf: "flex-end",
                  border: "1px solid black",
                  width: 64,
                  height: 48,
                }}
              ></View>
              <Text>{`বিভাগীয় প্রধানের স্বাক্ষর ও সীলমোহর `}</Text>
              <Text>{`(অনার্স বিষয়) `}</Text>
            </View>
          </View>
        </View>
        <Text style={{ marginLeft: 10, marginBottom: 10 }}>
          {`(উপস্থিতির হার ৬০% এর কম হলে পরীক্ষায় অংশগ্রহণের অযোগ্য বিধায় আবেদনপত্র সুপারিশ করা যাবে না।)   `}
        </Text>

        <View style={styles.row}>
          <Text>
            {`আমি প্রত্যায়ন করছি যে, পরীক্ষার্থী আবাসের শর্তাবলী পালন করেছে এবং সে সৎ চরিত্রের অধিকারী। আমার জানামতে দরখাস্তের যাবতীয় বিবরণ সত্য। সে ২০  `}
          </Text>
          <View
            style={{ width: 32, height: 16, border: "1px dashed black" }}
          ></View>
        </View>
        <View style={[styles.row, { justifyContent: "flex-start", gap: 4 }]}>
          <Text>{`সালের ১ম বর্ষ অনার্স কোর্সে ভর্তি হয়েছে। ২০  `}</Text>
          <View
            style={{ width: 32, height: 16, border: "1px dashed black" }}
          ></View>

          <Text>{`সালের`}</Text>

          <View
            style={{ width: 128, height: 16, border: "1px dashed black" }}
          ></View>
          <Text>{`বর্ষ বি.এসসি, ইঞ্জিনিয়ারিং কোর্সে পুনঃ ভর্তি হয়েছে।   `}</Text>
        </View>

        <View style={[styles.row, { justifyContent: "flex-start", gap: 4 }]}>
          <Text>{`দরখাস্তকারীকে ২০  `}</Text>
          <View
            style={{ width: 32, height: 16, border: "1px dashed black" }}
          ></View>
          <Text>{`সনের `}</Text>

          <View
            style={{ width: 86, height: 16, border: "1px dashed black" }}
          ></View>
          <Text>{`সেমিস্টার পরীক্ষায় অংশ গ্রহণের অনুমতির জন্য সুপারিশ করছি। `}</Text>
        </View>

        <View style={styles.row}>
          <View
            style={[
              styles.leftBox,
              { flexDirection: "row", alignItems: "center" },
            ]}
          >
            <Text style={{ marginTop: 72 }}>তারিখঃ</Text>
            <Text
              style={{
                flex: 1,
                borderBottom: "1px dashed black",
                alignSelf: "flex-end",
                maxWidth: 128,
              }}
            ></Text>
          </View>
          <View style={[styles.rightBox, { alignItems: "flex-end" }]}>
            <Text
              style={{
                textAlign: "right",
                paddingTop: 4,
                borderTop: "1px dashed black",
                width: 128,
                marginTop: 16,
              }}
            >{`প্রভোস্ট `}</Text>
            <Text
              style={{
                textAlign: "right",
                paddingTop: 4,
                borderTop: "1px dashed black",
                width: 128,
                marginTop: 16,
              }}
            >{`হল `}</Text>
            <Text>{`চট্টগ্রাম বিশ্ববিদ্যালয় `}</Text>
            {/* TODO: add digital signature here */}
            {/* <Image src="/api/placeholder/150/50" style={styles.dashedInput} /> */}
          </View>
        </View>
      </View>
    </Page>
  </Document>
);

export default PdfFormPage1;
