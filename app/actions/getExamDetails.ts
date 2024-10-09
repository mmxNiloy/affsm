"use server";

import { Exam } from "@/util/types";

export async function getExamDetails(exam_id: number): Promise<Exam> {
  const fallback: Exam = {
    academic_session_id: 0,
    committee_created: 0,
    department_abbr: "",
    department_id: 0,
    department_name: "",
    exam_centre: "",
    exam_id: 0,
    exam_name: "",
    exam_session: "",
    exam_start_date: "",
    faculty: "",
    grad_semester_no: 0,
    is_result_submitted: 0,
    program_abbr: "",
    program_id: 0,
    program_name: "",
    semester: 0,
    session: "",
    undergrad_semester_no: 0,
    university_id: 0,
  };

  try {
    const apiRes = await fetch(`${process.env.API_BASE_URL}/exam/${exam_id}`, {
      method: "GET",
    });

    if (apiRes.ok) {
      return (await apiRes.json()) as Exam;
    } else {
      return fallback;
    }
  } catch (err) {
    return fallback;
  }
}
