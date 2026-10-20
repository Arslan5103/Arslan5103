/* ==========================================================================
   Muhammad Arslan — Fully Animated International SQA Controller
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Theme Management (Dark default + Light mode support)
  const htmlEl = document.documentElement;
  const themeToggle = document.getElementById('themeToggle');
  const savedTheme = localStorage.getItem('arslan-qa-theme');

  if (savedTheme === 'light' || savedTheme === 'dark') {
    htmlEl.setAttribute('data-theme', savedTheme);
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const current = htmlEl.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
      const next = current === 'dark' ? 'light' : 'dark';
      htmlEl.setAttribute('data-theme', next);
      localStorage.setItem('arslan-qa-theme', next);
    });
  }

  // 2. Mobile Navigation Toggle
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

  // 3. Dynamic Rotating Headline Animation
  const dynamicRoleText = document.getElementById('dynamicRoleText');
  const rolePhrases = [
    'Zero-Defect Reliability',
    'Playwright E2E Automation',
    'API & Database Integrity',
    'High-Confidence Releases'
  ];
  let currentPhraseIndex = 0;

  if (dynamicRoleText) {
    setInterval(() => {
      dynamicRoleText.style.opacity = '0';
      dynamicRoleText.style.transform = 'translateY(-10px)';

      setTimeout(() => {
        currentPhraseIndex = (currentPhraseIndex + 1) % rolePhrases.length;
        dynamicRoleText.textContent = rolePhrases[currentPhraseIndex];
        dynamicRoleText.style.opacity = '1';
        dynamicRoleText.style.transform = 'translateY(0)';
      }, 300);
    }, 3600);
  }

  // 4. Scroll Reveal Animations (IntersectionObserver)
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, {
    rootMargin: '0px 0px -40px 0px',
    threshold: 0.15
  });

  revealElements.forEach((el) => revealObserver.observe(el));

  // 5. Animated KPI Counters
  const kpiBanner = document.querySelector('.kpi-banner');
  let countersAnimated = false;

  const animateCounters = () => {
    const counterElements = document.querySelectorAll('[data-counter]');
    counterElements.forEach((el) => {
      const target = parseInt(el.getAttribute('data-counter'), 10);
      const suffix = el.getAttribute('data-suffix') || '';
      let count = 0;
      const duration = 1500;
      const stepTime = Math.max(20, Math.floor(duration / target));

      const timer = setInterval(() => {
        count += 1;
        el.textContent = `${count}${suffix}`;
        if (count >= target) {
          el.textContent = `${target}${suffix}`;
          clearInterval(timer);
        }
      }, stepTime);
    });
  };

  if (kpiBanner) {
    const kpiObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !countersAnimated) {
          countersAnimated = true;
          animateCounters();
          kpiObserver.unobserve(kpiBanner);
        }
      });
    }, { threshold: 0.3 });

    kpiObserver.observe(kpiBanner);
  }

  // 6. Interactive 3D Perspective Tilt on Portrait Frame
  const portraitStage = document.querySelector('.portrait-stage');
  const portraitFrame = document.getElementById('portraitFrame');

  if (portraitStage && portraitFrame && window.matchMedia('(hover: hover)').matches) {
    portraitStage.addEventListener('mousemove', (e) => {
      const rect = portraitStage.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const deltaX = (x - centerX) / centerX;
      const deltaY = (y - centerY) / centerY;

      const rotateX = -deltaY * 7;
      const rotateY = deltaX * 7;

      portraitFrame.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    portraitStage.addEventListener('mouseleave', () => {
      portraitFrame.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });
  }

  // 6.5. 2026 Interactive Spotlight Mouse Tracking (Linear / Raycast Style)
  const spotlightTargets = document.querySelectorAll(
    '.method-card, .case-card, .case-study-showcase, .kpi-block, .skill-category-card, .timeline-card, .edu-card, .tech-card-terminal, .jira-ticket-card, .contact-card-main, .rp-card, .lab-shell'
  );

  spotlightTargets.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });

  // 7. Navbar Active Link Highlighting on Scroll
  const navLinks = document.querySelectorAll('.main-nav .nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    let currentId = '';
    const scrollPos = window.scrollY + 120;

    sections.forEach((section) => {
      if (scrollPos >= section.offsetTop && scrollPos < section.offsetTop + section.offsetHeight) {
        currentId = section.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove('active');
      if (currentId && link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('active');
      }
    });
  }, { passive: true });

  // 8. Recruiter 1-Minute Snapshot Modal
  const recruiterModalBtn = document.getElementById('recruiterModalBtn');
  const recruiterModal = document.getElementById('recruiterModal');
  const recruiterModalCloseBtn = document.getElementById('recruiterModalCloseBtn');

  const openRecruiterModal = () => {
    if (!recruiterModal) return;
    recruiterModal.classList.add('open');
    recruiterModal.setAttribute('aria-hidden', 'false');
  };

  const closeRecruiterModal = () => {
    if (!recruiterModal) return;
    recruiterModal.classList.remove('open');
    recruiterModal.setAttribute('aria-hidden', 'true');
  };

  if (recruiterModalBtn) {
    recruiterModalBtn.addEventListener('click', openRecruiterModal);
  }

  if (recruiterModalCloseBtn) {
    recruiterModalCloseBtn.addEventListener('click', closeRecruiterModal);
  }

  if (recruiterModal) {
    recruiterModal.addEventListener('click', (e) => {
      if (e.target === recruiterModal) closeRecruiterModal();
    });
  }

  // 9. Interactive Live QA Terminal Runner (Animated Test Execution)
  const execTerminalBtn = document.getElementById('execTerminalBtn');
  const terminalOutput = document.getElementById('terminalOutput');
  let isTerminalRunning = false;

  if (execTerminalBtn && terminalOutput) {
    execTerminalBtn.addEventListener('click', () => {
      if (isTerminalRunning) return;
      isTerminalRunning = true;

      const suiteRows = terminalOutput.querySelectorAll('.terminal-suite-row');

      suiteRows.forEach((row) => {
        row.classList.add('running');
        const status = row.querySelector('.ts-status');
        const time = row.querySelector('.ts-time');
        if (status) {
          status.className = 'ts-status running';
          status.textContent = 'RUNNING';
        }
        if (time) time.textContent = '...';
      });

      suiteRows.forEach((row, idx) => {
        setTimeout(() => {
          row.classList.remove('running');
          const status = row.querySelector('.ts-status');
          const time = row.querySelector('.ts-time');
          const ms = Math.floor(95 + Math.random() * 240);
          if (status) {
            status.className = 'ts-status pass';
            status.textContent = 'PASS';
          }
          if (time) time.textContent = `${ms}ms`;

          if (idx === suiteRows.length - 1) {
            isTerminalRunning = false;
            showToast('All 6 Test Suites Verified Passing!');
          }
        }, (idx + 1) * 260);
      });
    });
  }

  // 10. Interactive QA Craft Lab Tab Switching
  const labTabs = document.querySelectorAll('.lab-tab-btn');
  const labPanels = document.querySelectorAll('.lab-panel');

  labTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const targetTab = tab.getAttribute('data-tab');

      labTabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');

      labPanels.forEach((panel) => {
        if (panel.id === `tab-${targetTab}`) {
          panel.classList.add('active');
        } else {
          panel.classList.remove('active');
        }
      });
    });
  });

  // 11. Deep Project Case Study Artifacts (5 Production Platforms)
  const projectArtifacts = {
    dealeriq: {
      domain: 'AUTOMOTIVE DEALERSHIP AI CRM • PRODUCTION AUDIT',
      title: 'DealerIQ AI: QA Architecture & 7-Defect Catch',
      body: `
        <div style="display:flex;flex-direction:column;gap:18px;">
          <p style="color:var(--text-secondary);font-size:0.92rem;line-height:1.6;">
            <strong>System Overview:</strong> Automotive dealership CRM integrating multi-channel AI voice agents, conversational chat, deal contracts, paperwork calculators, and carrier shipment dispatch.
          </p>

          <div class="jt-callout expected" style="margin-bottom:0;">
            <span class="jt-cl-title mono">THE 7 CRITICAL REGRESSIONS PREVENTED</span>
            <ul style="padding-left:18px;font-size:0.86rem;color:var(--text-primary);margin-top:6px;line-height:1.65;">
              <li><strong>Paperwork Desync:</strong> Re-routing between deal tabs caused line-item fee calculations to drop add-ons.</li>
              <li><strong>Shipment Carrier Navigation:</strong> Carrier dispatch view lost context parameters, blocking carrier assignment.</li>
              <li><strong>Chat Filter Race:</strong> Sorting table records stripped the <code>Unread AI Follow-Up</code> filter.</li>
              <li><strong>Duplicate Webhook Dispositions:</strong> Call provider retries caused duplicate follow-up SMS triggers.</li>
              <li><strong>Form Validation Bypass:</strong> Malformed VIN strings were accepted by the vehicle appraisal form.</li>
              <li><strong>Dashboard KPI Desynchronization:</strong> Deal stage movements failed to update appointment counters.</li>
              <li><strong>Role-Based Permission Leak:</strong> Junior sales reps could view restricted dealer margin settings.</li>
            </ul>
          </div>

          <div class="jt-callout impact" style="margin-bottom:0;">
            <span class="jt-cl-title mono">BUSINESS ROI</span>
            <p>100% of issues caught during pre-release regression runs. Protected dealership operational continuity during high-stakes sales executive demonstrations.</p>
          </div>
        </div>
      `
    },
    befer: {
      domain: 'AI APPOINTMENT & LEAD SAAS • PRODUCTION AUDIT',
      title: 'Befer AI: Booking Engine & Boundary Value Analysis',
      body: `
        <div style="display:flex;flex-direction:column;gap:18px;">
          <p style="color:var(--text-secondary);font-size:0.92rem;line-height:1.6;">
            <strong>System Overview:</strong> AI appointment platform embedding iframe booking flows into third-party contractor websites, backed by geospatial radius rules and automated outbound dialers.
          </p>

          <div class="jt-callout expected" style="margin-bottom:0;">
            <span class="jt-cl-title mono">KEY TEST SUITES &amp; DESIGN TECHNIQUES</span>
            <ul style="padding-left:18px;font-size:0.86rem;color:var(--text-primary);margin-top:6px;line-height:1.65;">
              <li><strong>Boundary Value Analysis (BVA):</strong> Validated service zip-code radius boundaries (24.9km, 25.0km exact limit, and 25.1km out-of-zone rejection).</li>
              <li><strong>Iframe Cross-Origin Security:</strong> Audited postMessage communication between booking iframes and parent contractor websites.</li>
              <li><strong>Timezone Normalization:</strong> Asserted appointment locks persist accurately across customer and contractor timezones.</li>
              <li><strong>Dialer State Machine:</strong> Verified status transitions (Ringing, Connected, Busy, Failed, Voicemail) in dialer webhooks.</li>
            </ul>
          </div>
        </div>
      `
    },
    leadly: {
      domain: 'REAL ESTATE CRM • PRODUCTION AUDIT',
      title: 'Leadly.ai: Dynamic Proposals & Responsive Audit',
      body: `
        <div style="display:flex;flex-direction:column;gap:18px;">
          <p style="color:var(--text-secondary);font-size:0.92rem;line-height:1.6;">
            <strong>System Overview:</strong> High-transaction Property CRM managing real estate inventories, multi-stage client proposals, scheduled voice calls, and real-time agent/buyer chat.
          </p>

          <div class="jt-callout expected" style="margin-bottom:0;">
            <span class="jt-cl-title mono">KEY TEST SUITES &amp; ARTIFACTS</span>
            <ul style="padding-left:18px;font-size:0.86rem;color:var(--text-primary);margin-top:6px;line-height:1.65;">
              <li><strong>Dynamic Proposal Calculations:</strong> Validated multi-tiered property add-ons, localized tax rounding, and PDF generator fidelity.</li>
              <li><strong>SQL Lead State Auditing:</strong> Verified that pipeline stage movements update relational database foreign keys without orphan entries.</li>
              <li><strong>Cross-Device Responsive Auditing:</strong> Tested viewport edge cases across desktop Safari, mobile Safari (iOS), and Chrome (Android).</li>
            </ul>
          </div>
        </div>
      `
    },
    brokeros: {
      domain: 'FINANCIAL & BROKERAGE PLATFORM • SECURITY AUDIT',
      title: 'Broker OS: RBAC Permissions & Data Integrity',
      body: `
        <div style="display:flex;flex-direction:column;gap:18px;">
          <p style="color:var(--text-secondary);font-size:0.92rem;line-height:1.6;">
            <strong>System Overview:</strong> Dealership &amp; brokerage platform handling regulatory paperwork, financing approvals, multi-agent commission calculations, and operational metrics.
          </p>

          <div class="jt-callout expected" style="margin-bottom:0;">
            <span class="jt-cl-title mono">SECURITY &amp; PERMISSIONS VERIFICATION</span>
            <ul style="padding-left:18px;font-size:0.86rem;color:var(--text-primary);margin-top:6px;line-height:1.65;">
              <li><strong>Negative RBAC Testing:</strong> Executed REST API calls asserting non-admin tokens receive strict <code>403 Forbidden</code> when attempting fee alterations.</li>
              <li><strong>ACID Transaction Verification:</strong> Tested network dropouts mid-transaction in Postman, verifying SQL rollbacks prevent partial deal states.</li>
            </ul>
          </div>
        </div>
      `
    },
    stephanai: {
      domain: 'CONVERSATIONAL AI SUITE • AI VERIFICATION',
      title: 'StephanAI: Multi-Turn Context & Webhook Testing',
      body: `
        <div style="display:flex;flex-direction:column;gap:18px;">
          <p style="color:var(--text-secondary);font-size:0.92rem;line-height:1.6;">
            <strong>System Overview:</strong> Conversational AI assistant and workflow automation suite integrating LLM prompt engineering, task execution webhooks, and real-time streaming sockets.
          </p>

          <div class="jt-callout expected" style="margin-bottom:0;">
            <span class="jt-cl-title mono">AI CONTEXT &amp; TELEMETRY CHECKS</span>
            <ul style="padding-left:18px;font-size:0.86rem;color:var(--text-primary);margin-top:6px;line-height:1.65;">
              <li><strong>Hallucination &amp; Context Drift:</strong> Evaluated multi-turn conversational trees ensuring AI memory maintains slot integrity.</li>
              <li><strong>Network Latency Tolerance:</strong> Simulated slow 3G network conditions in Chrome DevTools to verify graceful loading skeleton UI.</li>
            </ul>
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

  const openProjectModal = (key) => {
    const data = projectArtifacts[key];
    if (!data || !projectModal) return;

    modalDomainTag.textContent = data.domain;
    modalTitle.textContent = data.title;
    modalBody.innerHTML = data.body;
    projectModal.classList.add('open');
    projectModal.setAttribute('aria-hidden', 'false');
  };

  const closeProjectModal = () => {
    if (!projectModal) return;
    projectModal.classList.remove('open');
    projectModal.setAttribute('aria-hidden', 'true');
  };

  document.querySelectorAll('[data-project]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const key = btn.getAttribute('data-project');
      openProjectModal(key);
    });
  });

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeProjectModal);
  }

  if (projectModal) {
    projectModal.addEventListener('click', (e) => {
      if (e.target === projectModal) closeProjectModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeProjectModal();
      closeRecruiterModal();
    }
  });

  // 12. Toast & Clipboard Copy Utility
  const copyToast = document.getElementById('copyToast');
  let toastTimer = null;

  const showToast = (message) => {
    if (!copyToast) return;
    copyToast.textContent = message;
    copyToast.classList.add('show');
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      copyToast.classList.remove('show');
    }, 2800);
  };

  document.querySelectorAll('.copy-trigger').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const text = btn.getAttribute('data-copy');
      if (!text) return;

      try {
        await navigator.clipboard.writeText(text);
        showToast(`Copied to clipboard!`);
      } catch {
        showToast(`Contact: ${text}`);
      }
    });
  });

  // 13. Contact Form Mailto Handler & Client-side Validation (with Honeypot)
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Check Honeypot for bot prevention
      const honeypot = document.getElementById('website_hp');
      if (honeypot && honeypot.value.trim() !== '') {
        console.warn('Bot submission blocked via honeypot.');
        return;
      }

      const nameEl = document.getElementById('cName');
      const emailEl = document.getElementById('cEmail');
      const subjectEl = document.getElementById('cSubject');
      const scopeEl = document.getElementById('cScope');
      const messageEl = document.getElementById('cMessage');
      const successToast = document.getElementById('contactSuccessMsg');

      let isValid = true;

      const validateField = (el, condition, errorMsg) => {
        if (!el) return true;
        const parent = el.closest('.form-group');
        let errorSpan = parent ? parent.querySelector('.form-field-error') : null;
        if (!condition) {
          isValid = false;
          if (parent) parent.classList.add('has-error');
          if (errorSpan) errorSpan.textContent = errorMsg;
        } else {
          if (parent) parent.classList.remove('has-error');
        }
      };

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (nameEl) validateField(nameEl, nameEl.value.trim().length > 1, 'Please enter your full name');
      if (emailEl) validateField(emailEl, emailRegex.test(emailEl.value.trim()), 'Please enter a valid email address');
      if (subjectEl) validateField(subjectEl, subjectEl.value.trim().length > 2, 'Please enter a subject');
      if (messageEl) validateField(messageEl, messageEl.value.trim().length >= 10, 'Message must be at least 10 characters');

      if (!isValid) return;

      const name = nameEl ? nameEl.value.trim() : 'Recruiter';
      const email = emailEl ? emailEl.value.trim() : '';
      const scope = scopeEl ? scopeEl.value : 'General SQA Inquiry';
      const subject = subjectEl ? subjectEl.value.trim() : `[SQA Inquiry] ${scope}`;
      const message = messageEl ? messageEl.value.trim() : '';

      const mailtoSubject = encodeURIComponent(`[SQA Inquiry] ${subject} (${scope}) — from ${name}`);
      const mailtoBody = encodeURIComponent(
        `Hi Muhammad Arslan,\n\n${message}\n\nBest regards,\n${name}\nEmail: ${email}\nRole Type: ${scope}`
      );

      if (successToast) {
        successToast.style.display = 'block';
        setTimeout(() => {
          window.location.href = `mailto:marslan5103@gmail.com?subject=${mailtoSubject}&body=${mailtoBody}`;
        }, 800);
      } else {
        window.location.href = `mailto:marslan5103@gmail.com?subject=${mailtoSubject}&body=${mailtoBody}`;
      }

      showToast('Opening your email client...');
    });
  }

  // 14. Projects Filter Bar Controller (projects.html)
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-grid-card');

  if (filterBtns.length > 0 && projectCards.length > 0) {
    filterBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        filterBtns.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter') || 'all';

        projectCards.forEach((card) => {
          const category = card.getAttribute('data-category') || '';
          if (filter === 'all' || category.toLowerCase().includes(filter.toLowerCase())) {
            card.style.display = 'flex';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // 15. QA Test Cases Search & Filter Controller (qa-artifacts.html)
  const qaSearchInput = document.getElementById('qaSearchInput');
  const qaFilterSelect = document.getElementById('qaFilterSelect');
  const qaTableRows = document.querySelectorAll('.qa-table tbody tr');

  const filterQATable = () => {
    if (!qaTableRows.length) return;
    const query = (qaSearchInput ? qaSearchInput.value : '').toLowerCase().trim();
    const filter = (qaFilterSelect ? qaFilterSelect.value : 'all').toLowerCase();

    qaTableRows.forEach((row) => {
      const text = row.textContent.toLowerCase();
      const module = (row.getAttribute('data-module') || '').toLowerCase();
      const status = (row.getAttribute('data-status') || '').toLowerCase();

      const matchesQuery = !query || text.includes(query);
      const matchesFilter = filter === 'all' || module.includes(filter) || status.includes(filter);

      if (matchesQuery && matchesFilter) {
        row.style.display = '';
      } else {
        row.style.display = 'none';
      }
    });
  };

  if (qaSearchInput) {
    qaSearchInput.addEventListener('input', filterQATable);
  }
  if (qaFilterSelect) {
    qaFilterSelect.addEventListener('change', filterQATable);
  }
});
