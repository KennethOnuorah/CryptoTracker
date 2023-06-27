const getStandardTime = (time: string): string => {
  const militaryHours = time.split(':')[0] == "00" ? 0 : JSON.parse(time.split(':')[0].replace(/^0+/, ''))
  const standardHours = militaryHours > 12 ? 
    militaryHours - 12 : 
    militaryHours == 0 ?
      12 : 
      militaryHours
  const standardTime = `${standardHours} ${(24 > militaryHours && militaryHours >= 12) ? "PM" : "AM"}`
  return standardTime
}

export { getStandardTime }