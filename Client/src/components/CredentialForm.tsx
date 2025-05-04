import { UserCredentials } from "@moonbored/types";
import { useForm } from "react-hook-form";

export default function CredentialForm({
  onSubmit,
  submitMessage,
//   setSubmitMessage,
  isLoading,
}: {
  onSubmit: (data: UserCredentials) => void;
  submitMessage?: string;
//   setSubmitMessage: (message: string) => void;
  isLoading: boolean;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm<UserCredentials>();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
      <input
        {...register("networkSsid", { required: "Network SSID is required" })}
        className="border-2 border-gray-300 rounded-md p-2"
        placeholder="Network SSID"
      />
      {formErrors.networkSsid && <p>{formErrors.networkSsid.message}</p>}
      <input
        {...register("networkPassword", {
          required: "Network password is required",
        })}
        className="border-2 border-gray-300 rounded-md p-2"
        placeholder="Network Password"
        type="password"
      />
      <input
        {...register("role")}
        className="border-2 border-gray-300 rounded-md p-2"
        placeholder="Role"
        type="text"
      />
      {formErrors.networkPassword && (
        <p>{formErrors.networkPassword.message}</p>
      )}

      <button
        type="submit"
        className="bg-blue-500 text-white p-2 rounded-md"
        disabled={isLoading}
      >
        {isLoading ? "Submitting..." : "Submit"}
      </button>
      {submitMessage && <p>{submitMessage}</p>}
    </form>
  );
}
