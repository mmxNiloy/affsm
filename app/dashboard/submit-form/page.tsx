"use client";
import Icons from "@/app/components/Icons";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React, { useContext, useState } from "react";
import AcknowledgementsTab from "./AcknowledgementsTab/AcknowledgementsTab";
import Image from "next/image";
import CourseSelectionTab from "./CourseSelectiontab/CourseSelectionTab";
import AcademicFormContext from "@/app/providers/AcademicFormContext";
import InformationTab from "./InformationTab/InformationTab";
import ConfirmationTab from "./ConfirmationTab/ConfirmationTab";
import { POST_Form_Body } from "@/util/types";
import { useToast } from "@/components/ui/use-toast";
import UserContext from "@/app/providers/UserContext";
import { useRouter } from "next/navigation";
import MyLoadingSpinner from "@/app/components/MyLoadingSpinner";

export default function SubmitFormPage() {
  const [submitting, setSubmitting] = useState<boolean>(false);
  const router = useRouter();

  const { toast } = useToast();

  const { user } = useContext(UserContext);

  const {
    isValidAck,
    isValidConfirmation,
    isValidCourseSelection,
    isValidInformation,

    acknowledgementsForm,
    courseSelectionForm,
  } = useContext(AcademicFormContext);

  const [step, setStep] = useState<number>(0);
  const stepValues = [
    "acknowledgements",
    "course-selection",
    "information",
    "confirmation",
  ];

  const disableNextStep = () => {
    if (step >= 0 && !isValidAck) return true;
    if (step >= 1 && !isValidCourseSelection) return true;
    if (step >= 2 && !isValidInformation) return true;
    if (step >= 3 && !isValidConfirmation) return true;

    return false || submitting;
  };

  const submitForm = async () => {
    if (!courseSelectionForm || !acknowledgementsForm || !user) {
      toast({
        title: "Incomplete form",
        description:
          "You did not provide enough information. Please check your form again and provide all the necessary information.",
      });

      return;
    }

    setSubmitting(true);
    // Make api request here
    const reqBody: POST_Form_Body = {
      courses: courseSelectionForm.courses.map((course) => course.course_id),
      current_address_id: user.present_address_id,
      permanent_address_id: user.permanent_address_id,
      exam_id: acknowledgementsForm.exam.exam_id,
      student_status: courseSelectionForm.formType,
      previous_charges: "",
      description_of_other_programs: "",
    };

    const apiRes = await fetch("/api/form", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(reqBody),
    });

    if (apiRes.ok) {
      toast({
        title: "Form submitted successfully",
        description:
          "Your form has been submitted successfully. Track your form in the submissions tab from the dashboard.",
      });

      router.replace("/dashboard");
    } else {
      toast({
        title: "Form submission failed",
        description:
          "Something went wrong while submitting your form. Please try again later",
        variant: "destructive",
      });
    }

    setSubmitting(false);
  };

  if (!user) return <MyLoadingSpinner />;

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Submit a Form</CardTitle>
        </CardHeader>

        <CardContent className="flex flex-col gap-1 md:gap-2">
          <div className="flex flex-col items-center justify-center gap-2">
            <Image
              src="/cu_logo.svg"
              className="dark:invert"
              height={128}
              width={86}
              alt="CU Logo"
            />
            <p className="text-xl font-bold">University of Chittagong</p>
          </div>
          <Tabs
            defaultValue="acknowledgements"
            onValueChange={(val) => setStep(stepValues.indexOf(val))}
            value={stepValues[step]}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="acknowledgements">
                Acknowledgements
              </TabsTrigger>
              <TabsTrigger value="course-selection" disabled={!isValidAck}>
                Course Selection
              </TabsTrigger>
              <TabsTrigger
                value="information"
                disabled={!isValidCourseSelection}
              >
                Information
              </TabsTrigger>
              <TabsTrigger value="confirmation" disabled={!isValidInformation}>
                Confirmation
              </TabsTrigger>
            </TabsList>

            <TabsContent
              forceMount
              hidden={step !== 0}
              value="acknowledgements"
            >
              <AcknowledgementsTab />
            </TabsContent>

            <TabsContent
              value="course-selection"
              forceMount
              hidden={step !== 1}
            >
              <CourseSelectionTab />
            </TabsContent>

            <TabsContent value="information" forceMount hidden={step !== 2}>
              <InformationTab />
            </TabsContent>

            <TabsContent value="confirmation" forceMount hidden={step !== 3}>
              <ConfirmationTab />
            </TabsContent>
          </Tabs>
        </CardContent>

        <CardFooter className="flex flex-row items-center justify-between gap-1 md:gap-2">
          <Button
            disabled={step === 0}
            onClick={() => setStep(step - 1)}
            className="gap-1 md:gap-2 items-center"
          >
            <Icons.chevronLeft />
            Previous
          </Button>

          {step < stepValues.length - 1 ? (
            <Button
              disabled={disableNextStep()}
              onClick={() => setStep(step + 1)}
              className="gap-1 md:gap-2 items-center"
            >
              <p>Next</p> <Icons.chevronRight />
            </Button>
          ) : (
            <Button
              onClick={submitForm}
              disabled={submitting}
              className="gap-1 md:gap-2 items-center bg-green-500 hover:bg-green-400 text-white"
            >
              {submitting ? (
                <Icons.spinner className="animate-spin ease-in-out" />
              ) : (
                <Icons.check />
              )}
              <p>Done</p>
            </Button>
          )}
        </CardFooter>
      </Card>
    </>
  );
}
