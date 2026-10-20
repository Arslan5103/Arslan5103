const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const readJSON = (relPath) => {
  const fullPath = path.resolve(__dirname, '../../', relPath);
  assert.ok(fs.existsSync(fullPath), `File must exist: ${relPath}`);
  const content = fs.readFileSync(fullPath, 'utf8');
  assert.doesNotMatch(content, /\[\[PLACEHOLDER\]\]/i, `File must not contain placeholders: ${relPath}`);
  return JSON.parse(content);
};

test('Content Model — Profile Integrity', () => {
  const profile = readJSON('content/profile.json');
  assert.equal(profile.name, 'Muhammad Arslan');
  assert.equal(profile.title, 'SQA Engineer');
  assert.equal(profile.email, 'marslan5103@gmail.com');
  assert.equal(profile.phone, '+92 309 9731256');
  assert.equal(profile.location, 'Lahore, Pakistan');
  assert.ok(profile.about.length >= 3);
  assert.equal(profile.stats.projectsTested, '5+');
});

test('Content Model — Experience Integrity', () => {
  const experience = readJSON('content/experience.json');
  assert.ok(Array.isArray(experience) && experience.length >= 2);
  const current = experience[0];
  assert.equal(current.company, 'Hatzs Dimensions Pvt. Ltd.');
  assert.equal(current.title, 'Associate Software Quality Assurance Engineer');
  assert.ok(current.highlights.length >= 4);
  assert.ok(current.tools.includes('Jira') && current.tools.includes('Postman'));
});

test('Content Model — Case Studies Integrity', () => {
  const dealeriq = readJSON('content/projects/dealeriq.json');
  assert.equal(dealeriq.slug, 'dealeriq');
  assert.ok(dealeriq.execution.sampleTestCases.length >= 3);
  assert.equal(dealeriq.execution.sampleBug.id, 'BUG-DIQ-418');

  const befer = readJSON('content/projects/befer.json');
  assert.equal(befer.slug, 'befer');
  assert.equal(befer.execution.sampleBug.id, 'BUG-BFR-104');

  const leadly = readJSON('content/projects/leadly.json');
  assert.equal(leadly.slug, 'leadly');
  assert.equal(leadly.execution.sampleBug.id, 'BUG-LDL-209');
});

test('Content Model — QA Artifacts Integrity', () => {
  const testPlan = readJSON('content/artifacts/test-plan.json');
  assert.equal(testPlan.documentId, 'TP-DIQ-2026-Q1');
  assert.ok(testPlan.scope.inScope.length >= 5);

  const testCases = readJSON('content/artifacts/test-cases.json');
  assert.ok(Array.isArray(testCases) && testCases.length >= 7);

  const bugReports = readJSON('content/artifacts/bug-reports.json');
  assert.ok(Array.isArray(bugReports) && bugReports.length >= 4);
});

