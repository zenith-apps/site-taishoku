const form = document.querySelector("form[data-contact]");
if (form) {
  const status = form.querySelector("[data-status]");
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const button = form.querySelector("button");
    button.disabled = true;
    status.textContent = "送信しています。";
    const body = Object.fromEntries(new FormData(form).entries());
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(body),
      });
      const payload = await response.json().catch(() => ({}));
      status.textContent = payload.message || "フォームはまだ保存できません。ページの所在地へ郵便で連絡できます。";
      if (response.ok) form.reset();
    } catch {
      status.textContent = "通信できませんでした。時間をおいてもう一度送ってください。";
    } finally {
      button.disabled = false;
    }
  });
}
