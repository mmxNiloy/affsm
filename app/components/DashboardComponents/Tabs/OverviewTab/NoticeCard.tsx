import Icons from "@/app/components/Icons";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import React from "react";
import { Notice } from "@/util/types";

type Props = {
  notice: Notice;
};

export default function NoticeCard({ notice }: Props) {
  return (
    <Card className="from-fuchsia-200/60 to-blue-500/60 bg-gradient-to-br flex flex-col justify-between">
      <CardHeader>
        <CardTitle>{notice.notice_title}</CardTitle>
        <CardDescription className="flex flex-col text-secondary-foreground font-bold lg:flex-row items-start lg:items-center lg:justify-between gap-1 md:gap-2">
          Autor: {notice.first_name} {notice.last_name}
          <br />
          Posted at:{" "}
          {new Date(notice.notice_uploaded_time).toLocaleDateString("en-GB")}
          <br />
        </CardDescription>
      </CardHeader>
      <CardContent className="text-sm text-pretty">
        {notice.notice_description}
      </CardContent>
      <CardFooter className="mt-4 flex flex-row items-start justify-between gap-1 md:gap-2">
        <p className="rounded-full text-white bg-blue-700 flex px-2 py-1">
          {notice.notice_type.length > 0 ? notice.notice_type : "N/A"}
        </p>
        <a
          className="min-w-0 whitespace-nowrap text-nowrap text-ellipsis overflow-hidden"
          target="_blank"
          href={`http://api.bike-csecu.com/upload/${
            !notice.notice_attachment || notice.notice_attachment.length === 0
              ? "test.webp"
              : notice.notice_attachment
          }`}
        >
          <Button
            type="button"
            variant={"link"}
            className="gap-1 md:gap-2 items-center"
          >
            <Icons.download />
            <p className="min-w-0 whitespace-nowrap text-nowrap text-ellipsis overflow-hidden">
              {!notice.notice_attachment ||
              notice.notice_attachment.length === 0
                ? "test.webp"
                : notice.notice_attachment}
            </p>
          </Button>
        </a>
      </CardFooter>
    </Card>
  );
}
