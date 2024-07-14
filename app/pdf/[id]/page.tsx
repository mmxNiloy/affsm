"use client";

import dynamic from "next/dynamic";
import { useCallback, useContext, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import MyCircularProgress from "../../components/DashboardComponents/MyCircularProgress";
import EmptyList from "../../components/DashboardComponents/EmptyList";
import UserContext from "@/app/providers/UserContex";
import MyLoadingSpinner from "@/app/components/MyLoadingSpinner";
const DynamicPDFViewer = dynamic(
  () => import("../../components/DashboardComponents/PDF/MyPDFViewer"),
  {
    ssr: false,
  }
);

export default function AcademicFormPDF() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [formData, setFormData] = useState([]);
  const [isEmpty, setIsEmpty] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingUser, setLoadingUser] = useState(false);
  const { user } = useContext(UserContext);

  const fetchData = useCallback(async () => {
    if (loading || !Boolean(id)) return;

    setLoading(true);

    try {
      const req = await axios.get("/api/forms/get_form", {
        params: {
          form_id: id,
        },
      });

      const form = req.data.form;
      console.log("Form: ", form);
      if (form.length < 1) setIsEmpty(true);

      setFormData(form);
    } catch (err) {
      console.log("PDF > fetchForm() > ", err);
      setIsEmpty(true);
    }

    setLoading(false);
  }, [id, loading]);

  //   useEffect(() => {
  //     fetchData();
  //   }, [fetchData]);

  if (loading || !id) return <MyLoadingSpinner />;
  if (!user) return <>Access Denied</>;
  //   if (isEmpty) return <EmptyList hidden={undefined} />;

  return (
    <div className="flex items-center justify-center">
      <p>Current user: {user.first_name}</p>
      <p>Form ID: {id}</p>
    </div>
  );
}
