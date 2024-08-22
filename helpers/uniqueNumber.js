const generateUnique8DigitNumber = () => {
  const now = Date.now();
  const randomPart = Math.floor(now % 100000000);
  const uniqueNumber = String(randomPart).padStart(8, "0");
  return uniqueNumber;
};

module.exports = generateUnique8DigitNumber;
