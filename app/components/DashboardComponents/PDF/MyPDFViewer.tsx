import { PDFViewer } from "@react-pdf/renderer";
import { useEffect, useState } from "react";
import EmptyList from "../EmptyList";
import MyDocument from "./MyDocument";
import Icons from "../../Icons";

const MyPDFViewer = ({
  data,
  admitCard,
}: {
  data: any;
  admitCard?: boolean;
}) => {
  if (!Boolean(data))
    return (
      <div className="flex flex-col gap-1 h-64 w-full">
        <Icons.rabbit size={32} />
        Form not found!
      </div>
    );

  if (admitCard)
    return (
      <PDFViewer
        style={{
          display: "flex",
          alignSelf: "center",
          justifyContent: "center",
          width: "100vw",
          height: "100vh",
        }}
      >
        <MyDocument data={data} admitCard />
      </PDFViewer>
    );

  return (
    <PDFViewer
      style={{
        display: "flex",
        alignSelf: "center",
        justifyContent: "center",
        width: "100vw",
        height: "100vh",
      }}
    >
      <MyDocument data={data} />
    </PDFViewer>
  );
};

export default MyPDFViewer;
