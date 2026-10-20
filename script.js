/* ==========================================================================
   Muhammad Arslan — SQA Engineer Portfolio Interactive Controller
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Theme Polarity Toggle (Dark default + Light mode support)
  const htmlEl = document.documentElement;
  const themeToggle = document.getElementById('themeToggle');
  const savedTheme = localStorage.getItem('arslan-portfolio-theme');

  if (savedTheme === 'light' || savedTheme === 'dark') {
    htmlEl.setAttribute('data-theme', savedTheme);
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const current = htmlEl.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
      const next = current === 'dark' ? 'light' : 'dark';
      htmlEl.setAttribute('data-theme', next);
      localStorage.setItem('arslan-portfolio-theme', next);
    });
  }

  // 2. Mobile Navigation Menu
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mainNav = document.getElementById('mainNav');

  if (mobileMenuBtn && mainNav) {
    mobileMenuBtn.addEventListener('click', () => {
      const isOpen = mainNav.classList.toggle('open');
      mobileMenuBtn.setAttribute('aria-expanded', String(isOpen));
    });

    mainNav.querySelectorAll('.nav-link').forEach((link) => {
      link.addEventListener('click', () => {
        mainNav.classList.remove('open');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // 3. Interactive Hero QA Suite Runner Simulation
  const runSuiteBtn = document.getElementById('runSuiteBtn');
  const testCheckList = document.getElementById('testCheckList');
  const suiteGateStatus = document.getElementById('suiteGateStatus');
  const runnerFooterLog = document.getElementById('runnerFooterLog');
  let isSuiteRunning = false;

  if (runSuiteBtn && testCheckList) {
    runSuiteBtn.addEventListener('click', () => {
      if (isSuiteRunning) return;
      isSuiteRunning = true;

      const items = Array.from(testCheckList.querySelectorAll('.test-check-item'));
      suiteGateStatus.textContent = '⟳ EXECUTING...';
      suiteGateStatus.style.color = 'var(--accent-cyan)';
      runnerFooterLog.textContent = 'Running E2E, API, SQL & Load assertions across staging...';

      items.forEach((item) => {
        item.classList.remove('passed');
        item.classList.add('running');
        const icon = item.querySelector('.check-icon');
        const badge = item.querySelector('.check-badge');
        if (icon) icon.textContent = '…';
        if (badge) badge.textContent = 'run';
      });

      items.forEach((item, index) => {
        setTimeout(() => {
          item.classList.remove('running');
          item.classList.add('passed');
          const icon = item.querySelector('.check-icon');
          const badge = item.querySelector('.check-badge');
          const ms = Math.floor(85 + Math.random() * 260);
          if (icon) icon.textContent = '✓';
          if (badge) badge.textContent = `${ms}ms`;

          if (index === items.length - 1) {
            suiteGateStatus.textContent = '● VERIFIED PASS';
            suiteGateStatus.style.color = 'var(--accent-primary)';
            runnerFooterLog.textContent = '6/6 Suites Passing • 0 Critical Defects Open • Ready for Production';
            isSuiteRunning = false;
          }
        }, (index + 1) * 260);
      });
    });
  }

  // 4. Skill Category Filter
  const skillFilterBtns = document.querySelectorAll('[data-skill-filter]');
  const skillCards = document.querySelectorAll('[data-skill-cat]');

  skillFilterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const target = btn.getAttribute('data-skill-filter');

      skillFilterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      skillCards.forEach((card) => {
        const cat = card.getAttribute('data-skill-cat');
        if (target === 'all' || cat === target) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  // 5. Interactive QA Craft Lab Tabs
  const labTabs = document.querySelectorAll('[data-lab-tab]');
  const labPanels = document.querySelectorAll('.lab-panel');

  labTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const targetId = `panel-${tab.getAttribute('data-lab-tab')}`;

      labTabs.forEach((t) => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      labPanels.forEach((panel) => {
        if (panel.id === targetId) {
          panel.classList.add('active');
        } else {
          panel.classList.remove('active');
        }
      });
    });
  });

  // 6. Project QA Artifact Modal
  const projectData = {
    dealeriq: {
      domain: 'AUTOMOTIVE AI CRM • CASE STUDY',
      title: 'DealerIQ AI — End-to-End QA Verification Summary',
      content: `
        <div style="display:flex;flex-direction:column;gap:16px;">
          <p style="color:var(--text-secondary);font-size:0.93rem;">
            <strong>Platform Scope:</strong> Core automotive dealership CRM combining AI outbound/inbound voice calls, conversational AI chat, lead pipelines, and service/sales appointment scheduling.
          </p>
          <div class="result-box expected-box">
            <span class="result-label mono">KEY TEST SCENARIOS EXECUTED</span>
            <ul style="padding-left:18px;font-size:0.88rem;color:var(--text-primary);margin-top:6px;">
              <li><strong>TC-DIQ-01 (AI Voice Disposition):</strong> Verified call status transitions (Connected, Voicemail, No-Answer, Failed) and automatic follow-up workflow triggers.</li>
              <li><strong>TC-DIQ-02 (Conversational AI Chat):</strong> Validated multi-turn AI chat accuracy, appointment slot extraction, and prevention of duplicate message webhook events.</li>
              <li><strong>TC-DIQ-03 (CRM Pipeline &amp; RBAC):</strong> Verified lead filtering, search indexing, dropdown state persistence, role-based access permissions, and dashboard analytics counters.</li>
            </ul>
          </div>
          <div class="result-box impact-box">
            <span class="result-label mono">TESTING STACK APPLIED</span>
            <p>Functional Testing • Regression Suites • Smoke &amp; Sanity • Postman REST API Checks • Chrome DevTools Network/Console Triage • Cross-Browser &amp; Responsive Validation • Jira Defect Lifecycle</p>
          </div>
        </div>
      `
    },
    befer: {
      domain: 'AI LEAD & APPOINTMENT SAAS • CASE STUDY',
      title: 'Befer AI — End-to-End QA Verification Summary',
      content: `
        <div style="display:flex;flex-direction:column;gap:16px;">
          <p style="color:var(--text-secondary);font-size:0.93rem;">
            <strong>Platform Scope:</strong> AI-powered lead and appointment management system featuring customer portals, booking pages, embeddable iframes, subscription billing, AI chat, and integrated dialer workflows.
          </p>
          <div class="result-box expected-box">
            <span class="result-label mono">KEY TEST SCENARIOS EXECUTED</span>
            <ul style="padding-left:18px;font-size:0.88rem;color:var(--text-primary);margin-top:6px;">
              <li><strong>TC-BFR-01 (Embedded Iframe Booking):</strong> Validated cross-origin iframe booking widget rendering, slot locking, and customer record creation in the main CRM.</li>
              <li><strong>TC-BFR-02 (Service Area Boundary Validation):</strong> Applied Boundary Value Analysis (BVA) on service radius / postal code rules to prevent out-of-zone bookings.</li>
              <li><strong>TC-BFR-03 (Dialer &amp; Subscription Sync):</strong> Tested outbound dialer call statuses, AI chat handoffs, and dashboard metric accuracy across subscription tiers.</li>
            </ul>
          </div>
          <div class="result-box impact-box">
            <span class="result-label mono">TESTING STACK APPLIED</span>
            <p>Test Plans &amp; Scenarios • Functional &amp; Regression Testing • Iframe &amp; Cross-Browser Verification • API Payload Validation • Defect Reporting &amp; Retesting</p>
          </div>
        </div>
      `
    },
    leadly: {
      domain: 'REAL ESTATE PROPERTY CRM • CASE STUDY',
      title: 'Leadly.ai — End-to-End QA Verification Summary',
      content: `
        <div style="display:flex;flex-direction:column;gap:16px;">
          <p style="color:var(--text-secondary);font-size:0.93rem;">
            <strong>Platform Scope:</strong> Property CRM designed for real estate operations—covering property listings, lead pipelines, voice calls, scheduled call queues, automated client proposals, and live chat modules.
          </p>
          <div class="result-box expected-box">
            <span class="result-label mono">KEY TEST SCENARIOS EXECUTED</span>
            <ul style="padding-left:18px;font-size:0.88rem;color:var(--text-primary);margin-top:6px;">
              <li><strong>TC-LDL-01 (Lead Pipeline &amp; Multi-Filter Search):</strong> Validated lead creation, stage drag-and-drop transitions, and combined property/status filters.</li>
              <li><strong>TC-LDL-02 (Proposal Generation Engine):</strong> Verified dynamic property pricing calculations, customer details injection, and proposal document rendering.</li>
              <li><strong>TC-LDL-03 (Voice Calls &amp; Scheduled Call History):</strong> Tested live voice call logging, scheduled callback reminders, chat attachments, and mobile-responsive layouts.</li>
            </ul>
          </div>
          <div class="result-box impact-box">
            <span class="result-label mono">TESTING STACK APPLIED</span>
            <p>End-to-End Workflow Testing • UI/UX &amp; Responsive Audits • Regression Documentation • API &amp; SQL Verification • Jira Bug Tracking &amp; Fix Validation</p>
          </div>
        </div>
      `
    }
  };

  const projectModal = document.getElementById('projectModal');
  const modalDomainTag = document.getElementById('modalDomainTag');
  const modalTitle = document.getElementById('modalTitle');
  const modalBody = document.getElementById('modalBody');
  const modalCloseBtn = document.getElementById('modalCloseBtn');

  document.querySelectorAll('[data-project]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const key = btn.getAttribute('data-project');
      const data = projectData[key];
      if (!data || !projectModal) return;

      modalDomainTag.textContent = data.domain;
      modalTitle.textContent = data.title;
      modalBody.innerHTML = data.content;
      projectModal.classList.add('open');
      projectModal.setAttribute('aria-hidden', 'false');
    });
  });

  const closeProjectModal = () => {
    if (!projectModal) return;
    projectModal.classList.remove('open');
    projectModal.setAttribute('aria-hidden', 'true');
  };

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeProjectModal);
  }

  if (projectModal) {
    projectModal.addEventListener('click', (e) => {
      if (e.target === projectModal) closeProjectModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeProjectModal();
  });

  // 7. Clipboard Copy Utility with Toast Notification
  const copyToast = document.getElementById('copyToast');
  let toastTimeout = null;

  const showToast = (msg) => {
    if (!copyToast) return;
    copyToast.textContent = msg;
    copyToast.classList.add('show');
    if (toastTimeout) clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      copyToast.classList.remove('show');
    }, 2600);
  };

  document.querySelectorAll('.copy-trigger').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const textToCopy = btn.getAttribute('data-copy');
      if (!textToCopy) return;
      try {
        await navigator.clipboard.writeText(textToCopy);
        showToast(`Copied: ${textToCopy}`);
      } catch {
        showToast(`Contact: ${textToCopy}`);
      }
    });
  });

  // 8. Contact Form Handler (Mailto + Clipboard Backup)
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('senderName').value.trim();
      const email = document.getElementById('senderEmail').value.trim();
      const inquiry = document.getElementById('inquiryType').value;
      const message = document.getElementById('senderMessage').value.trim();

      const subject = encodeURIComponent(`[Portfolio Inquiry] ${inquiry} — from ${name}`);
      const body = encodeURIComponent(
        `Hi Muhammad Arslan,\n\n${message}\n\nBest regards,\n${name}\nEmail: ${email}`
      );

      window.location.href = `mailto:marslan5103@gmail.com?subject=${subject}&body=${body}`;
      showToast('Opening email client for marslan5103@gmail.com...');
    });
  }
});
