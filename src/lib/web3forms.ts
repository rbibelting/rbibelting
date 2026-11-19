const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";
const WEB3FORMS_ACCESS_KEY = "4768809e-66ea-41e1-be7a-6307ef997a97";

export type Web3FormsFields = Record<string, string>;

type Web3FormsResponse = {
  success?: boolean;
  message?: string;
  body?: { message?: string };
};

export async function submitWeb3Form(fields: Web3FormsFields) {
  const response = await fetch(WEB3FORMS_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      ...fields,
      access_key: WEB3FORMS_ACCESS_KEY,
    }),
  });

  const result = (await response.json().catch(() => ({}))) as Web3FormsResponse;
  if (!response.ok || result.success !== true) {
    throw new Error(
      result.body?.message ?? result.message ?? "We couldn't send your enquiry. Please try again.",
    );
  }
}
