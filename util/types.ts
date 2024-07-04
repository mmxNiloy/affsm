interface User {
  user_id: string;
  profile_image_id: number;
  sign_id: number;
  permanent_address_id: number;
  email: string;
  phone: string;
  first_name_bn: string;
  last_name_bn: string;
  first_name: string;
  last_name: string;
  dob: string;
  gender: string;
  blood_group?: string;
  religion: string;
  ethnicity: string;
  nationality: string;
  password?: string;
  present_address_id: number;
  role?: string;
  factor?: string;
  start_date?: string;
  end_date?: string;
  university_id?: number;
  department_id: number;
  teacher_id?: number;
  title?: string;
  designation?: string;
  area_of_interest?: string;

  student_id?: number;
  hall_id?: number;
  program_id?: number;
  fathers_name_bn?: string;
  mothers_name_bn?: string;
  fathers_name?: string;
  mothers_name?: string;
  guardian_name?: string;
  guardian_address_id?: number;
  guardian_name_bn?: string;
  guardian_relation?: string;
  academic_session_id?: number;
}

interface Course {
  course_id: number;
  academic_session_id: number;
  result_status: string;
  result_submit_date: string;
  is_catm_submitted: number;
  catm_submit_date?: string;
  set_a_decoded: number;
  set_b_decoded: number;
  department_id: number;
  course_code: string;
  course_title: string;
  credit: number;
  course_type: string;
  exam_minutes: number;
  session: string;
  semester: number;
  program_id: number;
}

interface PaginatedResult {
  total_records: number;
  total_data: number;
  page_count: number;
  first_page: number;
  next?: {
    page: number;
    limit: number;
  };
  previous?: {
    page: number;
    limit: number;
  };
}

interface PaginatedCourses extends PaginatedResult {
  data: Course[];
}

interface UserSessionCookie {
  session_id: string;
  role: "student" | "evaulator";
}

export type {
  UserSessionCookie,
  User,
  Course,
  PaginatedCourses,
  PaginatedResult,
};
