"use client";
import UserContext from "@/app/providers/UserContext";
import { Exam } from "@/util/types";
import React, { useCallback, useContext, useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getExamName, toDD_MM_YYYY } from "@/util/Functions";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import AcademicFormContext from "@/app/providers/AcademicFormContext";

export default function AcknowledgementsTab() {
  const { user } = useContext(UserContext);
  const { setAcknowledgementsForm, setIsValidAck } =
    useContext(AcademicFormContext);

  const [loading, setLoading] = useState<boolean>(false);
  const [exams, setExams] = useState<Exam[]>([]);
  const [gotExams, setGotExams] = useState<boolean>(false);

  const [examNames, setExamNames] = useState<string[]>([]);
  const [selectedExam, setSelectedExam] = useState<Exam>();

  const [tncChecked, setTnCChecked] = useState<boolean>(false);

  const getUpcomingExams = useCallback(async () => {
    if (gotExams) return;

    setLoading(true);

    const apiRes = await fetch("/api/exam/upcoming");
    if (apiRes.ok) {
      const data = (await apiRes.json()) as Exam[];
      const examTypes = data.map((e) => e.exam_name);
      setExamNames(
        examTypes.filter((val, idx, arr) => arr.indexOf(val) === idx)
      );
      setExams(data);
      setGotExams(true);
    } else setExams([]);

    setLoading(false);
  }, [gotExams]);

  useEffect(() => {
    getUpcomingExams();

    // Validate form
    if (selectedExam && tncChecked) {
      setIsValidAck(true);
      setAcknowledgementsForm({ exam: selectedExam, tncChecked });
    } else setIsValidAck(false);
  }, [
    getUpcomingExams,
    selectedExam,
    setIsValidAck,
    tncChecked,
    setAcknowledgementsForm,
  ]);

  return (
    <div className="flex flex-col gap-1 md:gap-2">
      <div className="grid gap-1 md:gap-2 grid-cols-12">
        <p className="w-full text-center font-bold text-lg col-span-full">
          Acknowledgements
        </p>
        <Select
          disabled={loading}
          onValueChange={(val) => {
            const idx = Number.parseInt(val);
            setSelectedExam(exams.find((ex) => ex.exam_id === idx));
          }}
        >
          <SelectTrigger className="w-full col-span-full">
            <SelectValue placeholder="Select an exam" />
          </SelectTrigger>

          <SelectContent>
            {examNames.map((e_name, index) => (
              <SelectGroup key={`exam-${e_name}`}>
                <SelectLabel>{e_name.toUpperCase()}</SelectLabel>
                {exams
                  .filter((ex, idx) => ex.exam_name === e_name)
                  .map((exam) => (
                    <SelectItem
                      value={exam.exam_id.toString()}
                      key={`exam-id-${exam.exam_id}`}
                    >
                      {getExamName(exam)}
                    </SelectItem>
                  ))}
              </SelectGroup>
            ))}
          </SelectContent>
        </Select>

        <div className="col-span-full lg:col-span-6">
          <Label htmlFor="sid-input">Student ID</Label>
          <Input disabled value={user?.student_id} />
        </div>

        <div className="col-span-full lg:col-span-6">
          <Label htmlFor="session-input">Session</Label>
          <Input disabled value={user?.session} />
        </div>

        <div className="col-span-full lg:col-span-6">
          <Label htmlFor="alloted-hall-input">Allotted Hall</Label>
          <Input disabled value={user?.hall_name} />
        </div>

        <div className="col-span-full lg:col-span-6">
          <Label htmlFor="department-input">Department</Label>
          <Input disabled value={user?.department_name} />
        </div>
      </div>

      <p className="font-bold text-lg">Application</p>
      <div className="container">
        <p className="font-semibold">Exam Controller</p>
        <p className="font-semibold">University of Chittagong, Chittagong</p>
        <p className="font-semibold">Sir,</p>
        <p>
          I request your permission to participate in the upcoming{" "}
          {selectedExam ? (
            <b>
              {getExamName(selectedExam) +
                ` starting at ${toDD_MM_YYYY(selectedExam.exam_start_date)}`}
            </b>
          ) : (
            <b>
              <i>Please select an exam you want to sit in</i>
            </b>
          )}
          . I pledge that I&apos;ll oblige by the decisions made by the
          officials.
        </p>
      </div>

      <div className="flex items-center gap-1 md:gap-2">
        <Checkbox
          id="tnc-checkbox"
          onCheckedChange={(dataState) => {
            if (dataState) setTnCChecked(true);
            else setTnCChecked(false);
          }}
        />
        <Label htmlFor="tnc-checkbox">
          I confirm the correctness of the data and agree to the T&C set out by
          the academy.
        </Label>
      </div>
    </div>
  );
}
