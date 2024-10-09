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
    margin: "5px auto",
    padding: 5,
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
  },
  header: {
    textAlign: "center",
    
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
    marginBottom: 5,
  },
  formGroup: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  label: {
    fontWeight: 'bold',
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
    height: 16,
    marginBottom: 5,
    marginLeft: 3,
  },
  title: {
    textAlign: 'center',
    fontSize: 18,
    marginBottom: 30,
  },
  list: {
    margin: 0,
    padding: 0,
    fontSize: 12,
  },
  listItem: {
    marginBottom: 5,
  },
  leftMargin: {
    fontWeight: 'bold',
    marginLeft: 10,
    marginBottom: 10, // Add desired margin size here
  },
  rightMargin: {
    fontWeight: 'bold',
    marginRight: 5,
    marginBottom: 10, // Add desired margin size here
  },
  boxAdmitCard: {
    border: '1px solid #000',
    padding: 20,
    marginTop: 5,
  },photoBox: {
    width: 150,
    height: 250,
    border: '1px solid #000',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    position: 'absolute',
    right: 0,
    top: 0,
  },col: {
    width: '48%',
    position: 'relative',
  },inlineForm: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },footer: {
    textAlign: 'right',
    fontSize: 14,
    marginTop: 10,
  },
});
const banglaNumbers = ["১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯", "১০"];
const PdfFormPage3 = () => (
    <Page style={styles.body} size={"LEGAL"}> 
    {/* First Admit Card */}
     <View style={styles.container}>
        <View style={styles.header}>
        <View style={[styles.row, { alignItems: "flex-start" }]}>
          <View style={ [styles.col,{left:128}]}><Text
            style={{
              fontWeight: "bold",
              fontSize: 16,
            }}
          >
            চট্টগ্রাম বিশ্ববিদ্যালয়
          </Text>
          <Text style={[{textAlign: "center", fontSize: 13, fontWeight: "ultrabold"}]}>
              প্রবেশ পত্র
          </Text></View>
          <View style={[styles.rightBox,{alignItems:"center",alignContent:"center"}]}>
            <View style={[styles.box,{left:100,width:110,height:100}]}>
            <View style={ [styles.col,{left:24,top:16}]}>
                <Text>
           {" প্রভোস্ট কর্তৃক  "}
          </Text>
          <Text style={[{textAlign: "center"}]}>
          {"পরীক্ষার্থীর  "}
          </Text>
          <Text style={[{textAlign: "center"}]}>
          {"সত্যায়িত ফটো "}
          </Text></View>
            </View>
         </View>
          </View>
        </View>
        </View>
      
        <View style={[styles.formGroup,{left:128,top:0}]}>
              <View style={[styles.row]}>
                <Text>২০</Text>
                <Text style={[styles.dashedInput,{width:64,marginRight:4}]}></Text>
                <Text>{"সালের"}</Text>
                <Text style={[styles.dashedInput,{width:128,marginRight:4}]}></Text>
                <Text>{"সেমিস্টার বি.এসসি ইঞ্জিনিয়ারিং পরীক্ষা "}</Text>
              </View>
            </View>

            <View style={[styles.formGroup,{marginLeft:32,marginRight:32}]}>
             
               <View style={styles.row}>
               <Text >অনার্স বিষয়</Text>
               <Text style={[styles.dashedInput,{width:216,marginLeft:4,marginRight:4}]}></Text>
                <Text>পরীক্ষারম্ভের তারিখ</Text>
                <Text style={[styles.dashedInput,{width:216,marginLeft:4}]}></Text>
               </View>
            </View>
     

          
            <View style={[styles.formGroup,{marginLeft:32,marginRight:32}]}>
             
              <Text>{"কোর্স নং (কেবলমাত্র মানউন্নয়ন ও পুনঃ পরীক্ষার্থীদের বেলায় প্রযোজ্য) "}</Text>
              <Text style={[styles.dashedInput,{marginLeft:4,width:326}]}></Text>
            </View>
           
            <View style={[styles.formGroup,{marginLeft:32,marginRight:32}]}>
             
             <View style={styles.row}>
             <Text >আই.ডি.নং</Text>
             <Text style={[styles.dashedInput,{width:"50%",marginLeft:6,marginRight:4}]}></Text>
              <Text>শিক্ষাবর্ষ</Text>
              <Text style={[styles.dashedInput,{width:"50%",marginLeft:6}]}></Text>
             </View>
          </View>
   
          

          <View style={[styles.formGroup,{marginLeft:32,marginRight:32}]}>
              <Text>{"পরীক্ষার্থীর নাম (বাংলায়) "}</Text>
              <Text style={[styles.dashedInput,{width:"100%",marginLeft:12}]}></Text>
            </View>
            <View style={[styles.formGroup,{marginLeft:32,marginRight:32}]}>
              <Text>{"পরীক্ষার্থীর নাম (ইংরেজিতে বড় অক্ষরে) "}</Text>
              <Text style={[styles.dashedInput,{width:"100%",marginLeft:32}]}></Text>
            </View>
            <View style={[styles.formGroup,{marginLeft:32,marginRight:32}]}>
              <Text>{"পিতার নাম (বাংলায়) "}</Text>
              <Text style={[styles.dashedInput,{width:"100%",marginLeft:10}]}></Text>
            </View>
            <View style={[styles.formGroup,{marginLeft:32,marginRight:32}]}>
              <Text>{"ইংরেজিতে "}</Text>
              <Text style={[styles.dashedInput,{width:"100%",marginLeft:6}]}></Text>
            </View>
            <View style={[styles.formGroup,{marginLeft:32,marginRight:32}]}>
              <Text>{"মাতার নাম (বাংলায়) "}</Text>
              <Text style={[styles.dashedInput,{width:"100%",marginLeft:8}]}></Text>
            </View>
            <View style={[styles.formGroup,{marginLeft:32,marginRight:32}]}>
              <Text>{"ইংরেজিতে "}</Text>
              <Text style={[styles.dashedInput,{width:"100%",marginLeft:6}]}></Text>
            </View>
            <View style={[styles.formGroup,{marginLeft:32,marginRight:32}]}>
              <Text>{"হলের নাম "}</Text>
              <Text style={[styles.dashedInput,{width:"100%",marginLeft:6}]}></Text>
            </View>
         
            <View style={[styles.rightBox, { alignItems: "flex-end",marginTop:5,marginRight:32 }]}>
            <Text
              style={{
                textAlign: "right",
                paddingTop: 4,
                width: 128,
                marginTop: 5,
                fontSize:11,
                fontWeight:'bold'
              }}
            >{`পরীক্ষা নিয়ন্ত্রক `}</Text>
       </View>

    

      {/* Second Admit Card */}
      <View style={styles.boxAdmitCard}>
      <View style={styles.container}>
        <View style={styles.header}>
        <View style={[styles.row, { alignItems: "flex-start" }]}>
          <View style={ [styles.col,{left:128,alignItems:"center"}]}><Text
            style={{
              fontWeight: "bold",
              fontSize: 16,
            }}
          >
            চট্টগ্রাম বিশ্ববিদ্যালয়
          </Text>
          <Image style={styles.logo} src="./public/cu_logo.png" />
          <Text style={[{textAlign: "center", fontSize: 13, fontWeight: "ultrabold"}]}>
              প্রবেশ পত্র
          </Text></View>
          <View style={[styles.rightBox,{alignItems:"center",alignContent:"center"}]}>
            <View style={[styles.box,{left:100,width:110,height:100}]}>
            <View style={ [styles.col,{left:24,top:16}]}>
                <Text>
           {" প্রভোস্ট কর্তৃক  "}
          </Text>
          <Text style={[{textAlign: "center"}]}>
          {"পরীক্ষার্থীর  "}
          </Text>
          <Text style={[{textAlign: "center"}]}>
          {"সত্যায়িত ফটো "}
          </Text></View>
            </View>
         </View>
          </View>
        </View>
        </View>
      
        <View style={[styles.formGroup,{left:128,top:0}]}>
              <View style={[styles.row]}>
                <Text>২০</Text>
                <Text style={[styles.dashedInput,{width:64,marginRight:4}]}></Text>
                <Text>{"সালের"}</Text>
                <Text style={[styles.dashedInput,{width:128,marginRight:4}]}></Text>
                <Text>{"সেমিস্টার বি.এসসি ইঞ্জিনিয়ারিং পরীক্ষা "}</Text>
              </View>
            </View>
    
          

            <View style={[styles.formGroup,{marginLeft:24,marginRight:24}]}>
             
               <View style={styles.row}>
               <Text >অনার্স বিষয়</Text>
               <Text style={[styles.dashedInput,{width:"100%",marginLeft:28,marginRight:4}]}></Text>
                <Text>পরীক্ষারম্ভের তারিখ</Text>
                <Text style={[styles.dashedInput,{width:"100%",marginLeft:38}]}></Text>
               </View>
            </View>
     

          
            <View style={[styles.formGroup,{marginLeft:24,marginRight:24}]}>
             
              <Text>{"কোর্স নং (কেবলমাত্র মানউন্নয়ন ও পুনঃ পরীক্ষার্থীদের বেলায় প্রযোজ্য)   "}</Text>
              <Text style={[styles.dashedInput,{marginLeft:96,width:"100%"}]}></Text>
            </View>
           
            <View style={[styles.formGroup,{marginLeft:24,marginRight:24}]}>
             <View style={styles.row}>
             <Text >আই.ডি.নং</Text>
             <Text style={[styles.dashedInput,{width:"100%",marginLeft:24,marginRight:4}]}></Text>
              <Text>শিক্ষাবর্ষ</Text>
              <Text style={[styles.dashedInput,{width:"100%",marginLeft:24}]}></Text>
             </View>
          </View>

          <View style={[styles.formGroup,{marginLeft:24,marginRight:24}]}>
              <Text>{"পরীক্ষার্থীর নাম (বাংলায়) "}</Text>
              <Text style={[styles.dashedInput,{width:"100%",marginLeft:12}]}></Text>
            </View>
            <View style={[styles.formGroup,{marginLeft:24,marginRight:24}]}>
              <Text>{"পরীক্ষার্থীর নাম (ইংরেজিতে বড় অক্ষরে) "}</Text>
              <Text style={[styles.dashedInput,{width:"100%",marginLeft:32}]}></Text>
            </View>
            <View style={[styles.formGroup,{marginLeft:24,marginRight:24}]}>
              <Text>{"পিতার নাম (বাংলায়) "}</Text>
              <Text style={[styles.dashedInput,{width:"100%",marginLeft:10}]}></Text>
            </View>
            <View style={[styles.formGroup,{marginLeft:24,marginRight:24}]}>
              <Text>{"ইংরেজিতে "}</Text>
              <Text style={[styles.dashedInput,{width:"100%",marginLeft:6}]}></Text>
            </View>
            <View style={[styles.formGroup,{marginLeft:24,marginRight:24}]}>
              <Text>{"মাতার নাম (বাংলায়) "}</Text>
              <Text style={[styles.dashedInput,{width:"100%",marginLeft:8}]}></Text>
            </View>
            <View style={[styles.formGroup,{marginLeft:24,marginRight:24}]}>
              <Text>{"ইংরেজিতে "}</Text>
              <Text style={[styles.dashedInput,{width:"100%",marginLeft:6}]}></Text>
            </View>
            <View style={[styles.formGroup,{marginLeft:24,marginRight:24}]}>
              <Text>{"হলের নাম "}</Text>
              <Text style={[styles.dashedInput,{width:"100%",marginLeft:6}]}></Text>
            </View>

            <Text>বি.দ্রঃ-</Text>
            <View style={styles.list}>
              <Text style={[styles.listItem,{fontSize:8}]}>১। পরীক্ষার্থী স্বহস্তে উপরে্র তথ্যাবলী পূরণ করবে।</Text>
              <Text style={[styles.listItem,{fontSize:8}]}>২। প্রভোস্ট পরীক্ষার্থীর ফটো সীলমোহরদানে সত্যায়িত করবেন।</Text>
              <Text style={[styles.listItem,{fontSize:8}]}>৩। প্রভোস্ট কর্তৃক নিরীক্ষাকৃত তথ্যাবলী চূড়ান্ত বলে বিবেচিত হবে।</Text>
              <Text style={[styles.listItem,{fontSize:8}]}>৪। প্রবেশপত্রে লিখিত বিবরণের কোন ক্ষেত্রে কাটাক</Text>
              </View>  
              <View style={[styles.rightBox, { alignItems: "flex-end",marginTop:2,marginRight:32 }]}>
            <Text
              style={{
                textAlign: "right",
                paddingTop: 4,
                width: 128,
                marginTop: 2,
                fontSize:11,
                fontWeight:'bold'
              }}
            >{`পরীক্ষা নিয়ন্ত্রক `}</Text>
       </View>  
    </View>
   
     <Text
              style={{
                textAlign: "right",
                paddingTop: 4,
                width: 256,
                marginTop: 1,
                fontSize:6,
                
              }}
            >{`(পরীক্ষার দিন, তারিখ, সময় সংশ্লিষ্ট দপ্তর থেকে জানার দায়-দায়িত্ব অবশ্যই পরীক্ষার্থীর)  `}</Text>
      
    
 </Page>
);
export default PdfFormPage3;