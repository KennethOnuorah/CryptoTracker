export function subtractHours(date: Date, hours: number): Date {
  const newDate = new Date(date)
  newDate.setHours(newDate.getHours() - hours)
  return newDate
}