import React from "react";
import "./styles.module.css";

export default function FirstFormPage() {
  return (
    <div className="container">
      <div className="header">
        <h2>চট্টগ্রাম বিশ্ববিদ্যালয়</h2>
      </div>
      <div className="row">
        <div className="left-box">
          <div className="box">
            <div className="form-group">
              <label htmlFor="hall_name">হল:</label>
              <input
                type="text"
                name="hall_name"
                className="form-input"
                placeholder=""
              />
            </div>
            <div className="form-group">
              <label htmlFor="class_roll">শ্রেণী রোল নং:</label>
              <input
                type="text"
                name="class_roll"
                className="form-input"
                placeholder=""
              />
            </div>
            <div className="form-group">
              <label htmlFor="session_left">শিক্ষাবর্ষ:</label>
              <input
                type="text"
                name="session_left"
                className="form-input"
                placeholder=""
              />
            </div>
          </div>
        </div>
        {/* Centered Logo */}
        <img
          src="/cu_logo.svg"
          alt="চট্টগ্রাম বিশ্ববিদ্যালয় লোগো"
          className="logo"
        />
        <div className="right-box">
          <div className="box">
            <div className="form-group">
              <label htmlFor="student_id">আইডি নং:</label>
              <input
                type="text"
                name="student_id"
                className="form-input"
                placeholder=""
              />
            </div>
            <div className="form-group">
              <label htmlFor="session_right">শিক্ষাবর্ষ:</label>
              <input
                type="text"
                name="session_right"
                className="form-input"
                placeholder=""
              />
            </div>
          </div>
        </div>
      </div>
      <p>
        ২০
        <input type="text" name="year" placeholder="" /> সালের{" "}
        <input type="text" name="" placeholder="" /> সেমিস্টার বি.এসসি.
        ইঞ্জিনিয়ারিং পরীক্ষা।
      </p>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h3 style={{ marginRight: 20, textAlign: "center", flex: 1 }}>
          আবেদনপত্র
        </h3>
        <div className="right-box">
          {/* First Box */}
          <div className="box" style={{ marginBottom: 20 }}>
            <div className="form-group">
              <p style={{ textAlign: "center", margin: 0 }}>
                চট্টগ্রাম বিশ্ববিদ্যালয়
              </p>
            </div>
            <div className="form-group">
              <label htmlFor="student_id">আই.ডি. নং/রেজি: নং:</label>
              <input
                type="text"
                name="student_id"
                className="form-input"
                placeholder=""
              />
            </div>
            <div className="form-group">
              <label htmlFor="session_right">শিক্ষাবর্ষ:</label>
              <input
                type="text"
                name="session_right"
                className="form-input"
                placeholder=""
              />
            </div>
          </div>
          {/* Second Box */}
          <div className="box">
            <div className="form-group">
              <label htmlFor="honors_subject">অনার্স বিষয়:</label>
              <input
                type="text"
                name="honors_subject"
                className="form-input"
                placeholder=""
              />
            </div>
          </div>
        </div>
      </div>
      <div style={{ margin: 0, paddingLeft: 20 }}>
        {" "}
        {/* Adjust padding as needed */}
        <p style={{ margin: 0 }}>পরীক্ষা নিয়ন্ত্রক</p>
        <p style={{ margin: 0 }}>চট্টগ্রাম বিশ্ববিদ্যালয়, চট্টগ্রাম।</p>
        <p style={{ margin: 0 }}>জনাব,</p>
        <p style={{ margin: 0 }}>
          আমি আসন্ন
          <input
            type="text"
            name="year"
            style={{ width: 50, display: "inline", margin: "0 5px" }}
            placeholder=""
          />
          সালের বি.এসসি.ইঞ্জিনিয়ারিং
          <input
            type="text"
            name="semester"
            style={{ width: 50, display: "inline", margin: "0 5px" }}
            placeholder=""
          />
          সেমিস্টার পরীক্ষায় অংশ গ্রহণের জন্য অনুমতি প্রার্থনা করছি। আমি
          অঙ্গীকার করছি যে, আমার অত্র পরীক্ষা সংক্রান্ত ব্যাপারে সিন্ডিকেট বা
          তদকর্তৃক ক্ষমতা প্রদত্ত অফিসারের সিদ্ধান্ত চূড়ান্ত বলে মেনে নিতে বাধ্য
          থাকব।
        </p>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 20,
          }}
        >
          {/* Left Side: Course Titles */}
          <div style={{ textAlign: "left", flex: 1, marginRight: 20 }}>
            <p style={{ margin: 0 }}>অনার্স পত্রের শিরোনাম কোর্স নম্বরঃ-</p>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: 5,
              }}
            >
              <div style={{ display: "flex", flexDirection: "column" }}>
                <label style={{ marginBottom: 5 }}> ১/</label>
                <input
                  type="text"
                  placeholder=""
                  style={{
                    border: "1px dashed black",
                    width: "100%",
                    height: 30,
                    marginBottom: 10,
                  }}
                />
                <label style={{ marginBottom: 5 }}> ২/</label>
                <input
                  type="text"
                  placeholder=""
                  style={{
                    border: "1px dashed black",
                    width: "100%",
                    height: 30,
                    marginBottom: 10,
                  }}
                />
                <label style={{ marginBottom: 5 }}> ৩/</label>
                <input
                  type="text"
                  placeholder=""
                  style={{
                    border: "1px dashed black",
                    width: "100%",
                    height: 30,
                    marginBottom: 10,
                  }}
                />
                <label style={{ marginBottom: 5 }}> ৪/</label>
                <input
                  type="text"
                  placeholder=""
                  style={{
                    border: "1px dashed black",
                    width: "100%",
                    height: 30,
                    marginBottom: 10,
                  }}
                />
                <label style={{ marginBottom: 5 }}> ৫/</label>
                <input
                  type="text"
                  placeholder=""
                  style={{
                    border: "1px dashed black",
                    width: "100%",
                    height: 30,
                    marginBottom: 10,
                  }}
                />
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <label style={{ marginBottom: 5 }}> ৬/</label>
                <input
                  type="text"
                  placeholder=""
                  style={{
                    border: "1px dashed black",
                    width: "100%",
                    height: 30,
                    marginBottom: 10,
                  }}
                />
                <label style={{ marginBottom: 5 }}> ৭/</label>
                <input
                  type="text"
                  placeholder=""
                  style={{
                    border: "1px dashed black",
                    width: "100%",
                    height: 30,
                    marginBottom: 10,
                  }}
                />
                <label style={{ marginBottom: 5 }}> ৮/</label>
                <input
                  type="text"
                  placeholder=""
                  style={{
                    border: "1px dashed black",
                    width: "100%",
                    height: 30,
                    marginBottom: 10,
                  }}
                />
                <label style={{ marginBottom: 5 }}>৯/</label>
                <input
                  type="text"
                  placeholder=""
                  style={{
                    border: "1px dashed black",
                    width: "100%",
                    height: 30,
                    marginBottom: 10,
                  }}
                />
                <label style={{ marginBottom: 5 }}>১০/ঐচ্ছিক বিষয়ঃ</label>
                <input
                  type="text"
                  placeholder=""
                  style={{
                    border: "1px dashed black",
                    width: "100%",
                    height: 30,
                    marginBottom: 10,
                  }}
                />
              </div>
            </div>
          </div>
          {/* Right Side: Signature and Details */}
          <div style={{ textAlign: "right", flex: 1 }}>
            <div style={{ marginTop: 20 }}>
              <p style={{ margin: 0 }}>আপনার একান্ত অনুগত</p>
            </div>
            <div style={{ marginTop: 20 }}>
              <input
                type="text"
                placeholder=""
                style={{
                  border: "1px solid black",
                  width: 200,
                  height: 30,
                  marginLeft: 5,
                }}
              />{" "}
              {/* Box for signature */}
              <p style={{ margin: 0 }}>পরীক্ষার্থীর পূর্ণ স্বাক্ষর</p>
            </div>
            <div style={{ marginTop: 20 }}>
              <p style={{ margin: 0 }}>
                অনাবাসিক/আবাসিক (কক্ষ নং সহ) হলের নামঃ
              </p>
              <input
                type="text"
                placeholder=""
                style={{
                  border: "1px solid black",
                  width: 200,
                  height: 30,
                  margin: "5px 0",
                }}
              />{" "}
              {/* Box for input */}
            </div>
            <div style={{ marginTop: 20 }}>
              <p style={{ margin: 0 }}>স্থানীয় ঠিকানা (অনাবাসিক এর ক্ষেত্রে)</p>
              <input
                type="text"
                placeholder=""
                style={{
                  border: "1px solid black",
                  width: 200,
                  height: 30,
                  margin: "5px 0",
                }}
              />{" "}
              {/* Box for input */}
            </div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <h3 style={{ marginRight: 20, textAlign: "center", flex: 1 }}>
            সার্টিফিকেট
          </h3>
        </div>
        <div style={{ marginTop: 20, textAlign: "left" }}>
          <p>
            আমি প্রত্যায়ন করছি যে, উল্লেখিত ছাত্রের পাঠক্রম অনুশীলন সন্তোষজনক
            এবং আমি তার
            <input
              type="text"
              placeholder=""
              style={{
                border: "1px dashed black",
                width: 100,
                height: 30,
                margin: "0 5px",
              }}
            />
            বর্ষ বি.এসসি.ইঞ্জিনিয়ারিং
            <input
              type="text"
              placeholder=""
              style={{
                border: "1px dashed black",
                width: 100,
                height: 30,
                margin: "0 5px",
              }}
            />
            সেমিস্টার পরীক্ষায় অংশ গ্রহণের অনুমতির জন্য সুপারিশ করছি। আমি আরও
            যাচাই করে দেখছি যে, অনার্স পরীক্ষার পত্রসমূহ সঠিকভাবে লিখিত আছে।
          </p>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              marginTop: 20,
            }}
          >
            {/* Left Side: Attendance Information */}
            <div style={{ textAlign: "left" }}>
              <p>এই পরীক্ষার্থীর ক্লাসে উপস্থিতির হারঃ</p>
              <div>
                <span>অনার্স বিষয়ঃ</span>
                <input
                  type="text"
                  placeholder=""
                  style={{
                    border: "1px dashed black",
                    width: 100,
                    height: 30,
                    margin: "0 5px",
                  }}
                />
              </div>
              <div>
                <span>উপস্থিতির হারঃ</span>
                <input
                  type="text"
                  placeholder=""
                  style={{
                    border: "1px dashed black",
                    width: 100,
                    height: 30,
                    margin: "0 5px",
                  }}
                />
              </div>
              <br />
              <br />{" "}
              <p>
                (উপস্থিতির হার ৬০% এর কম হলে পরীক্ষায় অংশগ্রহণের অযোগ্য বিধায়
                আবেদনপত্র সুপারিশ করা যাবে না ।)
              </p>
            </div>
            {/* Right Side: Signature Section */}
            <div style={{ textAlign: "right" }}>
              <div className="signature">
                <div style={{ textAlign: "center" }}>
                  <img
                    src="/api/placeholder/150/50"
                    alt="স্বাক্ষর"
                    style={{ border: "1px solid black", marginTop: 5 }}
                  />
                </div>
                <p style={{ margin: 0, whiteSpace: "nowrap" }}>
                  বিভাগীয় প্রধানের স্বাক্ষর ও সীলমোহর
                  <br />
                  <span style={{ display: "block", textAlign: "center" }}>
                    (অনার্স বিষয়)
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <p style={{ margin: 0 }}>
        আমি প্রত্যায়ন করছি যে, পরীক্ষার্থী আবাসের শর্তাবলী পালন করেছে এবং সে সৎ
        চরিত্রের অধিকারী। আমার জানামতে দরখাস্তের যাবতীয় বিবরণ সত্য। সে ২০
        <input
          type="text"
          placeholder=""
          style={{
            border: "1px dashed black",
            width: 30,
            height: 20,
            margin: "0 5px",
          }}
        />{" "}
        সালের ১ম বর্ষ অনার্স কোর্সে ভর্তি হয়েছে। ২০{" "}
        <input
          type="text"
          placeholder=""
          style={{
            border: "1px dashed black",
            width: 30,
            height: 20,
            margin: "0 5px",
          }}
        />{" "}
        সালের
        <input
          type="text"
          placeholder=""
          style={{
            border: "1px dashed black",
            width: 150,
            height: 20,
            margin: "0 5px",
          }}
        />{" "}
        বর্ষ বি.এসসি, ইঞ্জিনিয়ারিং কোর্সে পুনঃ ভর্তি হয়েছে। দরখাস্তকারীকে ২০
        <input
          type="text"
          placeholder=""
          style={{
            border: "1px dashed black",
            width: 30,
            height: 20,
            margin: "0 5px",
          }}
        />
        সনের
        <input
          type="text"
          placeholder=""
          style={{
            border: "1px dashed black",
            width: 100,
            height: 20,
            margin: "0 5px",
          }}
        />{" "}
        সেমিস্টার পরীক্ষায় অংশ গ্রহণের অনুমতির জন্য সুপারিশ করছি।
      </p>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: 20,
        }}
      >
        {/* Left Side: Dash Lines with Placeholders for Name and Date */}
        <div style={{ textAlign: "left" }}>
          <p>
            তারিখঃ{" "}
            <span
              style={{
                borderBottom: "1px dashed black",
                width: 200,
                display: "inline-block",
              }}
            >
              <input
                type="text"
                placeholder=""
                style={{ border: "none", width: "100%", height: 20 }}
              />
            </span>
          </p>
        </div>
        {/* Right Side: Boxes for Provost's Signature and Hall Name */}
        <div style={{ textAlign: "right" }}>
          <div style={{ marginBottom: 10, textAlign: "center" }}>
            {" "}
            {/* Centered container */}
            <p>
              <span
                style={{
                  borderBottom: "1px dashed black",
                  width: 200,
                  display: "inline-block",
                }}
              >
                <input
                  type="text"
                  placeholder=""
                  style={{ border: "none", width: "100%", height: 20 }}
                />
              </span>
              <br /> প্রভোস্ট
            </p>
          </div>
          <div style={{ marginBottom: 10, textAlign: "center" }}>
            {" "}
            {/* Centered container */}
            <p>
              <span
                style={{
                  borderBottom: "1px dashed black",
                  width: 200,
                  display: "inline-block",
                }}
              >
                <input
                  type="text"
                  placeholder=""
                  style={{ border: "none", width: "100%", height: 20 }}
                />
              </span>
              হল
            </p>
            <p>চট্টগ্রাম বিশ্ববিদ্যালয়</p>
          </div>
        </div>
      </div>
    </div>
  );
}
