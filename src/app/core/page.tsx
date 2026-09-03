import { redirect } from "next/navigation";

// /core was renamed to /about — keep old links working.
export default function CoreRedirect() {
  redirect("/about");
}
