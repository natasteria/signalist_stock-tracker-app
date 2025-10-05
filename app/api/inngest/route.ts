import { serve } from "inngest/next";
import { inngest } from "@/lib/inngest/client";
import {sendSignUpEmail} from "@/lib/inngest/function";

// exposing our inngest functions that handle background tasks via a next.js api route that makes function callable within our app.
export const { GET, POST, PUT } = serve({
    client: inngest,
    functions: [sendSignUpEmail],
})