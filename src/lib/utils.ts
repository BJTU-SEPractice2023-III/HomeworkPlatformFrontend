export function formatDateTime(dateTimeString: string): string {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };

  const dateTime = new Date(dateTimeString);
  const formattedDateTime = new Intl.DateTimeFormat("zh-CN", options).format(dateTime);

  return formattedDateTime;
}

export function capitalizeFirstLetter(input: string): string {
  return input.charAt(0).toUpperCase() + input.slice(1);
}

export function getCurrentYear(): number {
  return new Date().getFullYear()
}

export function isLeapYear(year: number): boolean {
  // 闰年的判断条件：
  // 1. 能被4整除但不能被100整除，或者
  // 2. 能被400整除
  return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}