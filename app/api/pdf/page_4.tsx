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
import { Bold, MoveRight } from "lucide-react";
import { start } from "repl";

Font.register({
  family: "NotoBengali",
  format: "truetype",
  src: "https://firebasestorage.googleapis.com/v0/b/serveturtle.appspot.com/o/latex%2FNotoSerifBengali-Regular.ttf?alt=media&token=ead77452-da6f-416a-8b6e-1366a33e9b2d",
  fontStyle: "normal",
  fontWeight: "normal",
});
const styles = StyleSheet.create({
    page: {
      flexDirection: 'column',
      padding: 0,
      height: '100vh',
      margin: 0,
    },
    blankSpace: {
      height: '50%', // Top half of the page
    },
    content: {
      height: '50%', // Bottom half of the page
      padding: 20, // Padding for content
      display: 'flex',
      flexDirection: 'column',
    },
    rules: {
      padding: 10,
      border: '1px solid #ccc',
      backgroundColor: '#f5f5f5',
      flexGrow: 1, // Allow rules section to grow
    },
    examController: {
      marginTop: 20, // Space above the signature
      textAlign: 'right', // Align signature to the right
      paddingRight: 20, // Right padding
    },
    h4: {
      marginTop: 20,
      fontSize: 14,
      fontWeight: 'bold',
    },
    list: {
      listStyleType: 'none',
      padding: 0,
      margin: 0,
    },
    body: {
        fontFamily: "NotoBengali",
        fontSize: 9,
        lineHeight: 1.6,
        padding: 5,
      },
  });
  

const PdfFormPage4 = () => (
    <Page style={styles.body} size={"LEGAL"}> 
    <View style={styles.blankSpace} />

<View style={styles.content}>
  <Text style={{ textAlign: 'center', fontSize: 18, marginBottom: 10 }}>
  {":নিয়মাবলীঃ "}
  </Text>

  <View style={styles.rules}>
    <Text>
      {"বিশ্ববিদ্যালয়ের পরীক্ষাসমূহে অসদুপায় অবলম্বনের বিরুদ্ধে শাস্তিমূলক ব্যবস্থা গ্রহণের নিয়মাবলীঃ- "}
    </Text>

    <Text>{"নিম্নলিখিত কার্যাবলী পরীক্ষায় অসদুপায় অবলম্বন বলে গণ্য হবেঃ "}</Text>
    <Text style={styles.h4}>
      {"চট্টগ্রাম বিশ্ববিদ্যালয় হইতে ইস্যুকৃত প্রবেশপত্র ছাড়া কোন পরীক্ষার্থীকে পরীক্ষার হলে প্রবেশ করিতে দেয়া হবে না।    "}
    </Text>
    <View style={styles.list}>
      <Text>{"(ক) অন্য কোন পরীক্ষার্থীর সাথে পরীক্ষাকক্ষে যোগাযোগ স্থাপন।    "}</Text>
      <Text>{"(খ) পরীক্ষাকক্ষে ধূমপান।     "}</Text>
      <Text>{"(গ) পরীক্ষা চলাকালে মোবাইল ফোন ও অন্যান্য ইলেকট্রনিক ডিভাইস যথা সীমযুক্ত ঘড়ি, ক্যালকুলেটর ও কলম প্রভৃতি ব্যবহার সম্পূর্ণ নিষিদ্ধ।     "}</Text>
      <Text>{"(ঘ) দুষণীয় কাগজপত্র দখলে রাখা।     "}</Text>
      <Text>{"(ঙ) দুষণীয় কাগজপত্র অথবা অপরের খাতা থেকে নকল করা।     "}</Text>
      <Text>{"(চ) পরীক্ষায় নিয়োজিত তদারকি কর্মচারীর প্রতি দুর্ব্যবহার অথবা ভীতি প্রদর্শন করা।     "}</Text>
      <Text>{"(ছ) পরীক্ষাকক্ষে অথবা এর পার্শ্ববর্তী এলাকায় কোন প্রকার বাধা প্রদান অথবা গোলযোগ সৃষ্টি করা।     "}</Text>
      <Text>{"(জ) টয়লেটের মধ্যে বা পথিমধ্যে বই বা কোন কাগজপত্র দেখা।     "}</Text>
      <Text>{"(ঝ) পরীক্ষাকক্ষ অথবা এর পার্শ্ববর্তী এলাকায় পরীক্ষার কাজে নিয়োজিত কর্মচারীকে আক্রমণ অথবা আক্রমণের চেষ্টা করা।    "}</Text>
      <Text>{"(ঞ) পরীক্ষা পরিদর্শক বা প্রধান পরিদর্শকের বিবেচনায় পরীক্ষার্থীদের যে সমস্ত কার্যাবলী অপরাধমূলক বলে গণ্য হবে।    "}</Text>
    </View>
    <Text>{"উপরোল্লিখিত অপরাধে অপরাধীদের দেয়া পরীক্ষা বাতিল অথবা পরীক্ষা বাতিলসহ পরবর্তী যে কোন পরীক্ষা হতে বিরত রাখা যেতে পারে।     "}</Text>
  </View>

  <View style={styles.examController}>
    <Text>{"পরীক্ষা নিয়ন্ত্রক "}</Text>
    <Text>{"চট্টগ্রাম বিশ্ববিদ্যালয় "}</Text>
  </View>
</View>
    </Page>
);
export default PdfFormPage4;