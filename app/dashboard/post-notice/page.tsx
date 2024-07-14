"use client";
import Icons from "@/app/components/Icons";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { POST_Notice_Body, UploadResponse } from "@/util/types";
import { useRouter } from "next/navigation";
import React, { useCallback, useState } from "react";

export default function PostNoticePage() {
  const [loading, setLoading] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [attachment, setAttachment] = useState<File>();
  const [description, setDescription] = useState<string>("");
  const { toast } = useToast();

  const router = useRouter();

  const uploadNotice = useCallback(async () => {
    if (title.length <= 0) {
      toast({
        title: "Title too short!",
        description:
          "Title cannot be empty. Enter a short and meaningful title.",
        variant: "destructive",
      });
      return;
    }

    if (type.length <= 0) {
      toast({
        title: "Notice type too short!",
        description:
          "Notice type cannot be empty. Enter a short and meaningful notice type.",
        variant: "destructive",
      });
      return;
    }

    if (description.length <= 0) {
      toast({
        title: "Notice description too short!",
        description:
          "Notice description cannot be empty. Let your readers comprehend the notice.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    var notice_attachment = "";
    // Upload the attachment first (if exists)
    if (attachment) {
      const fd: FormData = new FormData();
      fd.append("items", attachment);

      const apiRes = await fetch("/api/upload", {
        method: "POST",
        body: fd,
      });

      if (apiRes.ok) {
        toast({
          title: "Upload complete",
          description: "Successfully uploaded the attachment",
        });

        const data = (await apiRes.json()) as UploadResponse;
        notice_attachment = data.files.at(0)!.filename;
      } else {
        toast({
          title: "Upload failed",
          description: "Failed to upload the attachment! Try again later.",
          variant: "destructive",
        });

        setLoading(false);

        return;
      }
    }

    const reqBody: POST_Notice_Body = {
      notice_type: type,
      notice_title: title,
      notice_description: description,
      notice_attachment,
    };
    // Upload the notice
    const apiResponse = await fetch("/api/notice", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reqBody),
    });

    if (apiResponse.ok) {
      // redirect to /dashboard/notice
      toast({
        title: "Notice posted!",
        description: "Successfully posted the notice.",
      });

      router.replace("/dashboard/notice");
    } else {
      toast({
        title: "Post failed",
        description: "Failed to post the notice",
        variant: "destructive",
      });
    }

    setLoading(false);
  }, [description, title, toast, type, attachment, router]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex gap-1 md:gap-2">
          <Icons.send />
          Post a Notice
        </CardTitle>
        <CardDescription>
          Create a notice and notify all of the students and staff in the
          university.
        </CardDescription>
      </CardHeader>

      <CardContent className="grid gap-1 md:gap-2 grid-cols-12">
        <div className="col-span-full">
          <Label htmlFor="title-input">Title</Label>
          <Input
            id="title-input"
            maxLength={256}
            placeholder="Title"
            type="text"
            defaultValue={title}
            onChange={(e) => setTitle(e.currentTarget.value.trim())}
          />
        </div>

        <div className="col-span-full lg:col-span-6">
          <Label htmlFor="type-input">Notice Type</Label>
          <Input
            id="type-input"
            maxLength={100}
            placeholder="Notice Type"
            type="text"
            defaultValue={type}
            onChange={(e) => setType(e.currentTarget.value.trim())}
          />
        </div>

        <div className="col-span-full lg:col-span-6">
          <Label htmlFor="attachment-input">Attachment</Label>
          <Input
            id="attachment-input"
            type="file"
            className="cursor-pointer"
            placeholder="Add attachment"
            onChange={(e) => {
              if (e.currentTarget.files && e.currentTarget.files.item(0))
                setAttachment(e.currentTarget.files.item(0)!);
            }}
          />
        </div>

        <div className="col-span-full">
          <Label htmlFor="description-input">Notice Description</Label>
          <Textarea
            id="description-input"
            placeholder="Write your notice description here..."
            className="resize-none"
            rows={8}
            onChange={(e) => setDescription(e.currentTarget.value.trim())}
          />
        </div>
      </CardContent>

      <CardFooter>
        <Button
          onClick={uploadNotice}
          disabled={loading}
          className="gap-1 md:gap-2 items-center"
        >
          {loading ? (
            <Icons.spinner className="animate-spin ease-in-out" />
          ) : (
            <Icons.send />
          )}
          Submit
        </Button>
      </CardFooter>
    </Card>
  );
}
