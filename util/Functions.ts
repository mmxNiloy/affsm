import { Address, Exam, Form, User } from "./types";

export function toOrdinal(n: number): string {
  if (n % 10 === 1 && n !== 11) return `${n}st`;
  if (n % 10 === 2 && n !== 12) return `${n}nd`;
  if (n % 10 === 3 && n != 13) return `${n}rd`;
  return `${n}th`;
}

export function toDD_MM_YYYY(date: string | number | Date | undefined): string {
  if (!date) return new Date().toLocaleDateString("en-GB");
  return new Date(date).toLocaleDateString("en-GB");
}

export function getExamName(examInfo: Exam): string {
  const timing =
    (examInfo.exam_name.toUpperCase().startsWith("B") &&
      examInfo.undergrad_semester_no === 4) ||
    (examInfo.exam_name.toUpperCase().startsWith("M") &&
      examInfo.grad_semester_no === 2)
      ? "Year"
      : "Semester";

  return `${toOrdinal(
    examInfo.semester
  )} ${timing} ${examInfo.exam_name.toUpperCase()} Exam ${
    examInfo.exam_session
  }`;
}

export function toAddressString(address?: Address) {
  if (!address) return "N/A";

  return `${address.postal_code ? `${address.postal_code}, ` : ""}${
    address.post_office
  }, ${address.union_name}, ${address.thana}, ${address.district}, ${
    address.division
  }, ${address.country}`;
}

function hasClearanceLevel1(user: User): boolean {
  if (user.teacher_id) return true;
  if (user.roles)
    return (
      user.roles.filter((role) => /chairman|professor|teacher/i.test(role.role))
        .length > 0
    );

  return false;
}

function hasClearanceLevel2(user: User): boolean {
  if (user.roles)
    return user.roles.filter((role) => /provost/i.test(role.role)).length > 0;

  return false;
}

function hasClearanceLevel3(user: User): boolean {
  if (user.roles)
    return (
      user.roles.filter((role) => /exam_controller/i.test(role.role)).length > 0
    );

  return false;
}

function hasClearanceLevel4(user: User): boolean {
  if (user.roles)
    return (
      user.roles.filter(
        (role) =>
          /accounts|accountant|accountants/i.test(role.role) ||
          /accounts_office|accounts|accountant|accountants/i.test(role.factor)
      ).length > 0
    );

  return false;
}

function hasClearanceLevel5(user: User): boolean {
  if (user.roles)
    return (
      user.roles.filter(
        (role) =>
          /bank|banks|banking/i.test(role.role) ||
          /bank|banks|banking/i.test(role.factor)
      ).length > 0
    );

  return false;
}

export function getClearanceLevel(user: User): number {
  if (hasClearanceLevel1(user)) return 1;
  if (hasClearanceLevel2(user)) return 2;
  if (hasClearanceLevel3(user)) return 3;
  if (hasClearanceLevel4(user)) return 4;
  if (hasClearanceLevel5(user)) return 5;
  return 0;
}

export function isFormRejected(form: Form): boolean {
  return form.clearance_level === 0;
}

export function isFormApproved(form: Form): boolean {
  return form.clearance_level === 6;
}
