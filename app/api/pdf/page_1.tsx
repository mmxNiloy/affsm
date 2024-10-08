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
    padding: 20,
    backgroundColor: "#f4f4f4",
  },
  container: {
    width: "90%",
    maxWidth: "800px",
    margin: "20px auto",
    padding: 20,
    backgroundColor: "white",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
  },
  header: {
    textAlign: "center",
    marginBottom: 20,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  leftBox: {
    flex: 1,
    marginRight: 10,
  },
  rightBox: {
    flex: 1,
    marginLeft: 10,
  },
  box: {
    border: "1px solid black",
    padding: 10,
  },
  formGroup: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  formInput: {
    flex: 1,
    padding: 5,
    marginLeft: 10,
    border: "1px solid black",
  },
  signature: {
    textAlign: "right",
    marginTop: 30,
  },
  centeredLogo: {
    width: 100,
    margin: "0 20px",
  },
  formTitle: {
    textAlign: "center",
    flex: 1,
  },
  dashedInput: {
    borderBottom: "1px dashed black",
    width: "100%",
    height: 30,
  },
  signatureBox: {
    textAlign: "center",
    border: "1px solid black",
    marginTop: 5,
  },
  sectionTitle: {
    marginRight: 20,
    textAlign: "center",
    flex: 1,
  },
});

// Create the document
const PdfFormPage1 = () => (
  <Document>
    <Page style={styles.body} size={"LEGAL"}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text>চট্টগ্রাম বিশ্ববিদ্যালয়</Text>
      </View>

      {/* Main Row with Boxes and Logo */}
      <View style={styles.row}>
        <View style={styles.leftBox}>
          <View style={styles.box}>
            <View style={styles.formGroup}>
              <Text>হল:</Text>
              <Text style={styles.formInput}></Text>
            </View>
            <View style={styles.formGroup}>
              <Text>শ্রেণী রোল নং:</Text>
              <Text style={styles.formInput}></Text>
            </View>
            <View style={styles.formGroup}>
              <Text>শিক্ষাবর্ষ:</Text>
              <Text style={styles.formInput}></Text>
            </View>
          </View>
        </View>

        {/* Logo in the center */}
        <Image style={styles.centeredLogo} src="./public/cu_logo.png" />

        <View style={styles.rightBox}>
          <View style={styles.box}>
            <View style={styles.formGroup}>
              <Text>আইডি নং:</Text>
              <Text style={styles.formInput}></Text>
            </View>
            <View style={styles.formGroup}>
              <Text>শিক্ষাবর্ষ:</Text>
              <Text style={styles.formInput}></Text>
            </View>
          </View>
        </View>
      </View>

      {/* Paragraph and Signature Section */}
      <Text>
        ২০<Text style={styles.formInput}></Text> সালের{" "}
        <Text style={styles.formInput}></Text> সেমিস্টার বি.এসসি. ইঞ্জিনিয়ারিং
        পরীক্ষা।
      </Text>

      {/* Centered Title */}
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          marginVertical: 20,
        }}
      >
        <Text style={styles.sectionTitle}>আবেদনপত্র</Text>
      </View>

      {/* Certificate Section */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 20,
        }}
      >
        <View style={{ textAlign: "left", flex: 1 }}>
          <Text>অনার্স পত্রের শিরোনাম কোর্স নম্বরঃ-</Text>
          {[...Array(10)].map((_, i) => (
            <View key={i} style={{ marginBottom: 10 }}>
              <Text>{i + 1}/</Text>
              <Text style={styles.dashedInput}></Text>
            </View>
          ))}
        </View>

        <View style={{ textAlign: "right", flex: 1 }}>
          <Text>আপনার একান্ত অনুগত</Text>
          <View style={{ marginTop: 20 }}>
            <Text style={styles.signatureBox}></Text>
            <Text>পরীক্ষার্থীর পূর্ণ স্বাক্ষর</Text>
          </View>
        </View>
      </View>
    </Page>
  </Document>
);

export default PdfFormPage1;
