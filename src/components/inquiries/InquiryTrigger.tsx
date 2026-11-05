
"use client";

import { useState } from "react";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import InquirySheet from "@/components/inquiries/InquirySheet";

type InquiryTriggerProps = {
  listingId: string;
  listingTitle: string;
  fullWidth?: boolean;
};

export default function InquiryTrigger({
  listingId,
  listingTitle,
  fullWidth = false,
}: InquiryTriggerProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        size="lg"
        fullWidth={fullWidth}
        onClick={() => setOpen(true)}
      >
        <MessageCircle size={17} aria-hidden="true" />
        Contact seller
      </Button>

      <InquirySheet
        open={open}
        onClose={() => setOpen(false)}
        listingId={listingId}
        listingTitle={listingTitle}
      />
    </>
  );
}
