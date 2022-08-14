const fs = require("fs");

try {
  const data = fs.readFileSync("input.txt", "utf8");
  const array = data.split("\r\n");

  let outputString = "";

  array.forEach((element) => {
    outputString += `"${element}",\n`;
  });

  fs.writeFile("output.txt", outputString, function (err) {
    if (err) return console.log(err);
  });
} catch (e) {
  console.log("Error:", e.stack);
}
