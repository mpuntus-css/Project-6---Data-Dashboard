export const ageToYears = (ageStr) => {
  switch (ageStr) {
    case "Baby": return 0.5;
    case "Young": return 1;
    case "Adult": return 4;
    case "Senior": return 8;
    default: return null;
  }
};
