"use server"
import showMessage from "@/app/_Components/Toast/Toast"
import getUserToken from "@/UserToken/getUserToken"
interface formDataType {
    name: string,
    email: string,
    phone: string,
}
export async function UpdateUser(formData: formDataType){
    const data = await getUserToken()
    const token = data?.tokenApi
    if(!token){
        showMessage("You must Login first", false)
        return
    }
    try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/users/updateMe/`,
          {
            method: "PUT",
            body: JSON.stringify(formData),
            headers: {
              token: token,
              "content-type": "application/json",
            },
          }
        );
        const data = await res.json();
        return data
    } catch (error) {
        showMessage("failed to update user", false);
        throw new Error(`Failed to update user ${error instanceof Error ? error.message : "Unknown error"}`)
    }
}