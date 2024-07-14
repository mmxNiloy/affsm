import { StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  bengaliText: {
    fontFamily: "NotoBengali",
  },
  textViewLeftAdmitCard: {
    marginLeft: "64px",
    flexDirection: "column",
    textAlign: "left",
    marginBottom: "5px",
    marginRight: "32px",
  },
  textViewRightAdmitCard: {
    marginRight: "64px",
    flexDirection: "column",
    textAlign: "right",
    maxWidth: "35%",
    marginBottom: "5px",
    marginLeft: "32px",
  },
  textViewLeft: {
    marginLeft: "128px",
    flexDirection: "column",
    textAlign: "left",
    marginBottom: "5px",
  },
  textViewRight: {
    marginRight: "128px",
    flexDirection: "column",
    textAlign: "right",
    marginBottom: "5px",
  },
  page: {
    display: "flex",
    flexDirection: "column",
  },
  hbox: {
    justifyContent: "space-around",
    flexDirection: "row",
  },
  center: {
    display: "flex",
    alignSelf: "center",
  },
  box: {
    flexDirection: "column",
    border: "1px solid black",
  },
  section: {
    marginVertical: "8px",
    marginHorizontal: "26px",
    padding: 10,
  },
  subsection: {
    margin: 1,
    marginHorizontal: "26px",
    padding: 10,
  },
  textList: {
    width: "",
  },
  title: {
    margin: 6,
    padding: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  table: {
    fontSize: 10,
    width: 550,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignContent: "stretch",
    flexWrap: "nowrap",
    alignItems: "stretch",
  },
  row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignContent: "stretch",
    flexWrap: "nowrap",
    alignItems: "stretch",
    flexGrow: 0,
    flexShrink: 0,
    flexBasis: 35,
  },
  cell: {
    borderColor: "#cc0000",
    borderStyle: "solid",
    borderWidth: 2,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: "auto",
    alignSelf: "stretch",
  },
  header: {
    backgroundColor: "#eee",
  },
  headerText: {
    fontSize: 11,
    fontWeight: 1200,
    color: "#1a245c",
    margin: 8,
  },
  tableText: {
    margin: 10,
    fontSize: 10,
  },
});

export const TextStyles = {
  h0: {
    fontSize: "38pt",
  },
  h1: {
    fontSize: "29pt",
  },
  h2: {
    fontSize: "23pt",
  },
  h3: {
    fontSize: "19pt",
  },
  h4: {
    fontSize: "17pt",
  },
  h5: {
    fontSize: "15pt",
  },
  h6: {
    fontSize: "13pt",
  },
  body1: {
    fontSize: "10pt",
  },
  body2: {
    fontSize: "8pt",
  },
  textXS: {
    fontSize: "7pt",
  },
};

export default styles;
