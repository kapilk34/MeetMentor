const uploadBtn = document.getElementById("uploadBtn");
const fileInput = document.getElementById("fileInput");
const statusEl = document.getElementById("status");
const outputEl = document.getElementById("output");
const resultEl = document.getElementById("result");

uploadBtn.addEventListener("click", async () => {
  const file = fileInput.files[0];
  if (!file) {
    alert("Please select a file first!");
    return;
  }

  const formData = new FormData();
  formData.append("file", file);

  statusEl.textContent = "⏳ Uploading and processing... This may take a minute.";
  outputEl.classList.add("hidden");

  try {
    const res = await fetch("http://localhost:4000/api/upload", {
      method: "POST",
      body: formData
    });

    const data = await res.json();

    if (data.error) throw new Error(data.error);

    statusEl.textContent = "✅ Summary generated successfully!";
    outputEl.classList.remove("hidden");
    resultEl.textContent = JSON.stringify(data.result, null, 2);
  } catch (err) {
    statusEl.textContent = "❌ Error: " + err.message;
  }
});
