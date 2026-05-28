function cleanText(value) {
  return value
    .toLowerCase()
    .replace(/https?:\/\//g, "")
    .replace(/^www\./, "")
    .replace(/[^a-z0-9]/g, "");
}

function cleanText(value) {
  return value
    .toLowerCase()
    .replace(/https?:\/\//g, "")
    .replace(/^www\./, "")
    .replace(/[^a-z0-9]/g, "");
}

function getCompanyWords(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter(word => word.length > 2);
}

function checkCompanyDomain() {
  const company = document.getElementById("companyName").value.trim();
  const domain = document.getElementById("emailDomain").value.trim();
  const result = document.getElementById("domainResult");

  if (!company || !domain) {
    result.textContent = "Enter both a company name and email domain.";
    result.className = "result-box neutral";
    return;
  }

  const cleanCompany = cleanText(company);
  const cleanDomain = cleanText(domain.split(".")[0]);
  const companyWords = getCompanyWords(company);

  const matchingWords = companyWords.filter(word =>
    cleanDomain.includes(cleanText(word))
  );

  console.log({
    company,
    domain,
    cleanCompany,
    cleanDomain,
    companyWords,
    matchingWords
  });

  const strongMatch = cleanDomain.includes(cleanCompany);

  const looseMatch =
    cleanDomain.includes(cleanCompany) ||
    cleanCompany.includes(cleanDomain);

  const moderateWordMatch = matchingWords.length >= 2;
  const weakWordMatch = matchingWords.length === 1;

  if (strongMatch) {
    result.textContent =
      "Strong match: the full company name appears in the email domain.";

    result.className = "result-box positive";
  }
  else if (moderateWordMatch) {
    result.textContent =
      "Moderate match: multiple company name elements appear in the email domain.";

    result.className = "result-box neutral";
  }
  else if (looseMatch || weakWordMatch) {
    result.textContent =
      "Loose match: there is some overlap between the company name and email domain, but it is not a strong match.";

    result.className = "result-box neutral";
  }
  else {
    result.textContent =
      "Likely mismatch: the company name and email domain do not clearly align.";

    result.className = "result-box warning";
  }
}

function toggleRequestField() {
  const hasRequest = document.getElementById("hasRequest").checked;
  const section = document.getElementById("requestSection");

  section.classList.toggle("hidden", !hasRequest);
}

function evaluateSpamSignals() {
  const company = document.getElementById("companyName").value;
  const domain = document.getElementById("emailDomain").value;
  const hasRequest = document.getElementById("hasRequest").checked;
  const requestText = document.getElementById("requestText").value;
  const relatedToFansly = document.getElementById("relatedToFansly").checked;
  const result = document.getElementById("finalResult");

  let signals = [];

  if (!company || !domain) {
    signals.push("Missing company or domain information.");
  }

  if (!hasRequest) {
    signals.push("No specific, actionable request was identified.");
  }

  if (hasRequest && !requestText.trim()) {
    signals.push("The request checkbox was selected, but no request was summarized.");
  }

  if (hasRequest && !relatedToFansly) {
    signals.push("The request may not be related to Fansly or the industry.");
  }

  if (signals.length === 0) {
    result.innerHTML = `
      <strong>Lower spam concern.</strong><br>
      The outreach has a clear sender, a specific request, and appears relevant.
    `;
    result.className = "result-box positive";
  } else {
    result.innerHTML = `
      <strong>Review carefully.</strong><br>
      ${signals.map(signal => `• ${signal}`).join("<br>")}
    `;
    result.className = "result-box warning";
  }
}