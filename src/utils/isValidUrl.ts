export default function stringIsValidURL(value: string) {
  try {
    new URL(value);
    return true;
  } catch (err) {
    try {
      new URL("http://" + value);
      return true;
    } catch (err) {
      return false;
    }
  }
}
