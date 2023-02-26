import { textAlign } from "@mui/system";
import { Document, Image, Page, Text, View } from "@react-pdf/renderer";
import { useEffect, useState } from "react";
import styles from "./styles";

const PDFAdmitCardFrag = ({ data, student }) => {
  const toCardinal = (num) => {
    // Limited to 1-9
    switch (num) {
      case 1:
        return "1st";
      case 2:
        return "2nd";
      case 3:
        return "3rd";
      default:
        return num + "th";
    }
  };
  const renderFootNote = () => {
    if (!Boolean(student)) return null;
    return (
      <View style={{alignItems:"left", textAlign:"left",margin:"5px"}}>
        <Text style={styles.text.body1}>
          Foot note:-
        </Text>
        <Text style={styles.text.body2}>
        1. Examine must fill the form himself. 
        </Text>
        <Text style={styles.text.body2}>
          2. Provost will attest the photo of the candidate.
        </Text>
        <Text style={styles.text.body2}>
          3. Provosts verified details will be considered as final.
        </Text>
        <Text style={styles.text.body2}>
          4. Details in admit card must be clear.
        </Text>
        
      </View>
    );
  };

  const renderImprovementCourses = () => {
    let ans = ''
    data.courses.forEach(course => {
      if(course.type !== 'Regular')
        ans += course.course_code + ', '
    });

    if(ans.length < 1) return 'N/A'

    return ans.slice(0, ans.length - 2)
  }
  return (
    <View style={{ border: student && "1px solid black", margin: "4px" }}>
      <View style={styles.title}>
        <Text
          style={{
            ...styles.text.h6,
            marginTop: "8px",
            marginBottom: "8px",
          }}
        >
          University of Chittagong
        </Text>

        {student && (
          <Image
            src="/cu_logo.png"
            style={{
              height: "64px",
              width: "43px",
            }}
          />
        )}
        <View style={{margin:"8px"}}>
        <Text style={styles.text.body2}>
          {new Date(data.time_stamp).getFullYear()} Year's{" "}
          {toCardinal(data.semester)}
          -Semester B.Sc. Engineering Exam
        </Text>
        </View>
       
        <View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-around"}}
          >
            <View style={{ flexDirection: "column", textAlign: "left",marginRight:"50px" }}>
              <Text style={styles.text.body2}>Honour's Subject</Text>
            </View>

            <View style={{ flexDirection: "column", textAlign: "right" ,marginLeft:"50px"}}>
              <Text style={styles.text.body2}>{data.department_name}</Text>
            </View>
          </View>

          <View
            style={{ flexDirection: "row", justifyContent: "space-around" }}
          >
            <View style={{ flexDirection: "column", textAlign: "left",marginRight:"50px" }}>
              <Text style={styles.text.body2}>Exam Starting Date</Text>
            </View>

            <View style={{ flexDirection: "column", textAlign: "right",marginLeft:"50px" }}>
              <Text style={styles.text.body2}>{new Date(data.time_stamp).toLocaleDateString()}</Text>
            </View>
          </View>

          <View
            style={{ flexDirection: "row", justifyContent: "space-around" }}
          >
            {/* TODO: Course Number and Cour id's needed to be fixed. */}
            <View style={{ flexDirection: "column", textAlign: "left",marginRight:"50px",width:"150px" }}>
              <Text style={styles.text.body2}>
                Improvement Courses:
              </Text>
            </View>

            <View style={{ flexDirection: "column", textAlign: "right",marginLeft:"50px" }}>
              <Text style={styles.text.body2}>
                {renderImprovementCourses()}
              </Text>
            </View>
          </View>

          <View
            style={{ flexDirection: "row", justifyContent: "space-around" }}
          >
            <View style={{ flexDirection: "column", textAlign: "left",marginRight:"50px" }}>
              <Text style={styles.text.body2}>Candidate's ID</Text>
            </View>

            <View style={{ flexDirection: "column", textAlign: "right",marginLeft:"50px" }}>
              <Text style={styles.text.body2}>{data.student_id}</Text>
            </View>
          </View>

          <View
            style={{ flexDirection: "row", justifyContent: "space-around" }}
          >
            <View style={{ flexDirection: "column", textAlign: "left",marginRight:"50px" }}>
              <Text style={styles.text.body2}>Session</Text>
            </View>

            <View style={{ flexDirection: "column", textAlign: "right",marginLeft:"50px" }}>
              <Text style={styles.text.body2}>
                {parseInt(data.session) - 1} {"-"} {data.session}
              </Text>
            </View>
          </View>

          <View
            style={{ flexDirection: "row", justifyContent: "space-around" }}
          >
            <View style={{ flexDirection: "column", textAlign: "left" ,marginRight:"50px"}}>
              <Text style={styles.text.body2}>Candidate's Name</Text>
            </View>

            <View style={{ flexDirection: "column", textAlign: "right",marginLeft:"50px" }}>
              <Text style={styles.text.body2}>
                {data.first_name} {data.last_name}
              </Text>
            </View>
          </View>

          <View
            style={{ flexDirection: "row", justifyContent: "space-around" }}
          >
            <View style={{ flexDirection: "column", textAlign: "left",marginRight:"50px" }}>
              <Text style={styles.text.body2}>Father's Name</Text>
            </View>

            <View style={{ flexDirection: "column", textAlign: "right",marginLeft:"50px" }}>
              <Text style={styles.text.body2}>{data.name_of_father}</Text>
            </View>
          </View>

          <View
            style={{ flexDirection: "row", justifyContent: "space-around" }}
          >
            <View style={{ flexDirection: "column", textAlign: "left",marginRight:"50px" }}>
              <Text style={styles.text.body2}>Mother's Name</Text>
            </View>

            <View style={{ flexDirection: "column", textAlign: "right",marginLeft:"50px" }}>
              <Text style={styles.text.body2}>{data.name_of_mother}</Text>
            </View>
          </View>

          <View
            style={{ flexDirection: "row", justifyContent: "space-around" }}
          >
            <View style={{ flexDirection: "column", textAlign: "left",marginRight:"50px" }}>
              <Text style={styles.text.body2}>Hall Name</Text>
            </View>

            <View style={{ flexDirection: "column", textAlign: "right",marginLeft:"50px" }}>
              <Text style={styles.text.body2}>{data.hall_name}{" Hall"}</Text>
            </View>
          </View>
        </View>



        <View style={styles.subsection}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-around",alignItems:"end" }}
          >
            <View style={{ flexDirection: "column", textAlign: "right", marginLeft:"400px"}}>
              <Text style={[styles.text.body2]}> _____________________</Text>
              <Text
                style={[
                  styles.text.body2,
                  { marginTop: "16px", marginBottom: "8px" },
                ]}
              >
               Exam Controller
              </Text>
            </View>
          </View>
        </View>


      </View>
      {renderFootNote()}
    </View>
  );
};

export default PDFAdmitCardFrag;
