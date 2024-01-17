import validUrl from "valid-url";

export default function stringIsValidURL(value: string) {
  if (!validUrl.isUri(value)) return false;
  return true;
}
