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

const PdfFormPage2 = () => (
  <Page style={styles.body} size={"LEGAL"}>
    <Text>Hello from page 2</Text>
  </Page>
);

export default PdfFormPage2;
