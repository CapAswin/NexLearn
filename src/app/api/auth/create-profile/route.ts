import { NextResponse } from "next/server";
import { axiosInstance } from "@/lib/axios";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    // Log if formData has any entries
    let count = 0;
    for (const [k, v] of formData.entries()) {
      count++;
      if (v instanceof File) {
        console.log(
          `[create-profile] entry: ${k} => File(${v.name}, ${v.type}, ${v.size})`
        );
      } else {
        console.log(`[create-profile] entry: ${k} =>`, v);
      }
    }
    console.log(`[create-profile] formData entries count: ${count}`);
    const mobile = formData.get("mobile");
    const name = formData.get("name");
    const email = formData.get("email");
    const qualification = formData.get("qualification");
    const profileImage = formData.get("profile_image");

    if (!mobile || !name || !email || !qualification || !profileImage) {
      return NextResponse.json(
        { success: false, message: "All fields are required" },
        { status: 400 }
      );
    }

    // Build a web FormData from received formData and forward using fetch.
    // Using fetch ensures the multipart boundary is set correctly in Node.
    const forwardForm = new FormData();
    forwardForm.append("mobile", String(mobile));
    forwardForm.append("name", String(name));
    forwardForm.append("email", String(email));
    forwardForm.append("qualification", String(qualification));
    // profileImage can be a File
    const file = profileImage as File | null;
    if (file) {
      forwardForm.append(
        "profile_image",
        file,
        (file as File).name || "profile.jpg"
      );
    }

    const backendUrl = `${axiosInstance.defaults.baseURL}/auth/create-profile`;

    const resp = await fetch(backendUrl, {
      method: "POST",
      body: forwardForm,
    });

    const data = await resp.json().catch(() => ({
      success: false,
      message: "Invalid JSON response from backend",
    }));

    return NextResponse.json(data, { status: resp.status });
  } catch (error) {
    console.error("Create profile proxy error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to create profile. Try again." },
      { status: 500 }
    );
  }
}
