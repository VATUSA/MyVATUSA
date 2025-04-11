export default function FormatNanoseconds(input: number | bigint): string {
  const nanoseconds = typeof input === "number" ? BigInt(input) : input;

  const NS_IN_MINUTE = 60n * 1_000_000_000n;
  const NS_IN_HOUR = 60n * NS_IN_MINUTE;

  const hours = nanoseconds / NS_IN_HOUR;
  const minutes = (nanoseconds % NS_IN_HOUR) / NS_IN_MINUTE;

  const result: string[] = [];
  if (hours > 0n) result.push(`${hours}h`);
  if (minutes > 0n || hours === 0n) result.push(`${minutes}m`);

  return result.join(" ");
}
