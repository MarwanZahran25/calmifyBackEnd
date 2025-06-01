function calculateBurnout(arr) {
  if (arr.length === 0) {
    throw new Error("no sentiment available to calculate burnout");
  }
  let negative = 0;
  let positive = 0;
  let neutral = 0;
  arr.forEach((sentiment) => {
    if (sentiment["sntimentAnalysis"] === "negative") {
      negative++;
    } else if (sentiment["sntimentAnalysis"] === "positive") {
      positive++;
    } else {
      neutral++;
    }
  });
  if (negative === 0) {
    return "Moderate";
  } else if (negative / (negative + positive) >= 0.5) {
    return "High";
  } else if (negative === 0) {
    return "Low";
  }
}
module.exports = { calculateBurnout };
