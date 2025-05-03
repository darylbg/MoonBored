import axios from "axios";
import { useGlobalContext } from "../context/GlobalContext";
import CredentialForm from "../components/CredentialForm";
import { UserCredentials } from "@moonbored/types";
import { ErrorMiddleware } from "../Utils/ErrorMiddleware";
import { useState } from "react";

// settings page
// - update user details
//  - update username/networkssid/networkpassword
// - admin
//  - register new user

export default function Settings() {
  const { themeToggle, darkMode } = useGlobalContext();
  const [CF_SubmitMessage, setCF_SubmitMessage] = useState<
    string | undefined
  >(undefined);
  const [CF_isLoading, setCF_isLoading] = useState<boolean>(false);

  const RegisterUser = async (data: UserCredentials) => {
    setCF_isLoading(true);
    try {
      const serverUrl = import.meta.env.VITE_SERVER_URL;
      const response = await axios.post(
        `${serverUrl}/api/database/users/register`,
        data
      );
      console.log(response);
      if (response) {
        setCF_SubmitMessage("User registered successfully");
        console.log(response.data);
      }
    } catch (error: any) {
      const errorResponse = ErrorMiddleware.axiosError(error);
      console.log(errorResponse);
      setCF_SubmitMessage(errorResponse.error.message);
    } finally {
      setCF_isLoading(false);
    }
  };

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-lg font-semibold">Settings</h2>

      <button
        onClick={themeToggle}
        className="p-2 rounded-md bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
      >
        {darkMode ? "light" : "dark"} mode
      </button>

      <CredentialForm
        onSubmit={RegisterUser}
        submitMessage={CF_SubmitMessage}
        setSubmitMessage={setCF_SubmitMessage}
        isLoading={CF_isLoading}
      />
    </div>
  );
}
