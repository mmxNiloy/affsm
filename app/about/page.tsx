"use server";

import React from "react";
import LogoDescription from "../components/LoginPageComponents/LogoDescription";
import Link from "next/link";

export default async function About() {
  return (
    <div>
      <div className="flex flex-col gap-1 md:gap-2">
        <Link href="/" passHref>
          <LogoDescription />
        </Link>

        <p className="text-xl font-bold">About</p>

        <p>
          Contemporary form fill-up system with lots of paperwork consumes ample
          time to jam the whole system of regular exams. AFFSM, Academic Form
          Fill-up System Modernized, lay out a methodical solution to address
          those problems of the current one. Our solution is illustrated
          conceptually with ER diagram and logically with UML diagram, and it is
          normalized up to BCNF. AFFSM&apos;s system architecture is of three
          partitions. Database, API, and Client Application. API used MVC and
          Client Application used MVVM software pattern. Although all the
          implementations of AFFSM cannot be illustrated, we visualized some DDL
          implementations of the database here. Thoughts of other users of our
          system are important to you. We have some of them in the Validation
          Section. AFFSM is hosted in the mother server of Next.js. You can know
          how to use AFFSM from the Software Deployment Section. Want to know
          what features are coming ahead? You will find them at. Humans are
          interdependent. So are we. Sources that helped us to bring AFFSM to
          you are mentioned here. Have an exciting journey with us.
        </p>

        <p className="text-xl font-bold">Introduction</p>

        <p>
          This project modernizes the existing form fill-up system from the last
          cen- tury in our university. Students, staff, officers, and others
          involved with the current system will be delighted to be benefited
          from this project. This document will guide you to unearth everything
          you starve to know.
        </p>

        <div className="px-4 flex flex-col gap-1 md:gap-2">
          <p className="text-lg font-semibold">Background and Motivation</p>

          <p>
            Imagine wasting several days filling up your forms just before your
            exams as a student. Imagine sorting and verifying thousands of
            documents manually from dusk to dawn. It is unimaginable how archaic
            the whole debacle is. Not to mention how much paper trail it leaves.
            It is a shame that we did not overcome this inefficiency yet. All
            these motivated us to uproot this problem. AFFSM is a system to
            improve the existing form fill-up system.
          </p>
          <p className="text-lg font-semibold">Problem Statement</p>
          <p>
            &quot;Time is a valuable resource.&quot; The current form fill-up
            system is slow and wastes the time of many students and staff. Paper
            documents are difficult to maintain, expensive, and not
            environmentally friendly. The stages of ap- proval make the whole
            form fill-up process quite lengthy. AFFSM&apos;s vision is to
            optimize the resources remarkably as it digitizes the existing
            system. Stu- dents would not have to stress over filling up and
            submitting forms because Department, Accounts Office, Exam
            Controller Office, and Provosts will do their job very efficiently.
            In essence, AFFSM will help not only the students but also the
            staff.
          </p>

          <p className="text-lg font-semibold">System Definition</p>

          <p>
            AFFSM is a computerized system to fill up, validate and maintain
            exam forms. AFFSM offers an easy-to-use solution to the problems
            related to the existing archaic methods of exam form fill-up. The
            system exhibits an intuitive UI, secure data control and privacy,
            and firm control over data regarding administrative work.
          </p>
        </div>
      </div>
    </div>
  );
}
