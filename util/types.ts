interface Role {
  role: string;
  user_id: string;
  factor: string;
  start_date: Date;
  end_date?: Date;
  university_id: number;
}

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
  roles?: Role[];
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
  hall_name?: string;
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

  department_name?: string;
  faculty?: string;
  undergrad_semester_no?: number;
  grad_semester_no?: number;
  department_abbr?: string;
  session?: string;
  semester?: number;

  permanent_address?: Address;
  present_address?: Address;
  guardian_address?: Address;
}

interface Course {
  course_id: number;
  department_id: number;
  course_code: string;
  course_title: string;
  credit: number;
  course_type: string;
  exam_minutes: number;
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

interface Department {
  department_id: number;
  department_name: string;
  university_id: number;
  faculty: string;
  undergrad_semester_no: number;
  grad_semester_no: number;
  department_abbr: string;
}

interface Form {
  student_id?: number;
  permanent_address_id?: number;
  clearance_level: number;
  current_address_id?: number;
  description_of_other_programs?: string;
  form_id: number;
  form_submission_time?: Date;
  previous_charges?: string;
  exam_id: number;
  student_status: "Regular" | "Improvement" | "Irregular";
}

interface PaginatedForms extends PaginatedResult {
  data: Form[];
}

/// Request body structure for inserting new form
interface POST_Form_Body {
  courses: number[]; // Non-empty array of numbers
  current_address_id: number;
  permanent_address_id?: number;
  previous_charges?: string;
  description_of_other_programs?: string;
  student_status?: "Regular" | "Improvement" | "Irregular";
  exam_id: number;
}

interface Notice {
  notice_id: number;
  notice_type: string;
  notice_title: string;
  notice_description: string;
  notice_created_by: string;
  notice_uploaded_time: string;
  notice_attachment?: string;
  first_name: string;
  last_name: string;
  first_name_bn: string;
  last_name_bn: string;
  email: string;
  phone?: string | null;
}

interface PaginatedNotice extends PaginatedResult {
  data: Notice[];
}

interface Exam {
  exam_id: number;
  department_id: number;
  academic_session_id: number;
  exam_name: string;
  exam_centre: string;
  exam_session: string;
  exam_end_date?: string | null;
  exam_start_date: string;
  is_result_submitted: number;
  result_submit_date?: string | null;
  committee_created: number;
  department_name: string;
  university_id: number;
  faculty: string;
  undergrad_semester_no: number;
  grad_semester_no: number;
  department_abbr: string;
  session: string;
  semester: number;
  program_id: number;
  program_name: string;
  program_abbr: string;
}

interface ExamCourse extends Exam, Course {
  result_status: string;
  is_catm_submitted: number;
  catm_submit_date?: string | null;
  is_decoded: number;
}

interface PaginatedExam extends PaginatedResult {
  data: Exam[];
}

interface AcknowledgementsForm {
  exam: Exam;
  tncChecked: boolean;
}

type FormType = "Regular" | "Improvement";

interface CourseSelectionForm {
  courses: ExamCourse[];
  formType?: FormType;
  tncChecked: boolean;
}

interface InformationForm {
  // TODO: Add fields for information form context
}

interface ConfirmationForm {
  // TODO: Add fields for confirmation form context
}

interface Evaluation {
  form_id?: number | null;
  end_time?: string | Date | null;
  evaluation_id: number;
  evaluator_id?: string | null;
  start_time?: string | Date | null;
}

interface FormDetail extends Form {
  evaluation: Evaluation[];
  courses: Course[];
}

interface Address {
  address_id: number;
  country: string;
  division: string;
  district: string;
  upazilla: string;
  union_name: string;
  post_office: string;
  village: string;
  postal_code?: number;
  thana: string;
  address_type: string;
}

interface UserAddress {
  permanent_address: Address;
  present_address: Address;
}

interface StudentAddress extends UserAddress {
  guardian_address: Address;
}

interface POST_Notice_Body {
  notice_type: string;
  notice_title: string;
  notice_description: string;
  notice_attachment: string;
}

interface FileInfo {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  destination: string;
  filename: string;
  path: string;
  size: number;
}

interface UploadResponse {
  message: string;
  files: FileInfo[];
}

export type {
  Exam,
  PaginatedExam,
  UserSessionCookie,
  User,
  Course,
  PaginatedCourses,
  PaginatedResult,
  Department,
  Form,
  PaginatedForms,
  Role,
  POST_Form_Body,
  Notice,
  PaginatedNotice,
  AcknowledgementsForm,
  CourseSelectionForm,
  InformationForm,
  ConfirmationForm,
  ExamCourse,
  Address,
  UserAddress,
  StudentAddress,
  FormType,
  POST_Notice_Body,
  FileInfo,
  UploadResponse,
  Evaluation,
  FormDetail,
};
