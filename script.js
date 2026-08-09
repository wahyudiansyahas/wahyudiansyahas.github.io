/* ============================================================
   HEADER — HAMBURGER MENU
============================================================ */
(function () {
  const icon   = document.getElementById('menuIcon');
  const navbar = document.getElementById('navbar');
  if (!icon || !navbar) return;

  icon.addEventListener('click', () => {
    const open = navbar.classList.toggle('open');
    icon.className = open ? 'bx bx-x menu-icon' : 'bx bx-menu menu-icon';
  });

  navbar.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      navbar.classList.remove('open');
      icon.className = 'bx bx-menu menu-icon';
    });
  });
})();


/* ============================================================
   GLOBAL — SMOOTH SCROLL
============================================================ */
document.querySelectorAll('a.scroll-link').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
  });
});


/* ============================================================
   GLOBAL — ACTIVE NAV LINK ON SCROLL
============================================================ */
(function () {
  const allSections = document.querySelectorAll('section[id]');
  const navLinks    = document.querySelectorAll('.navbar a');
  const NAV_H       = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 68;

  window.addEventListener('scroll', () => {
    const sy = window.scrollY;
    allSections.forEach(sec => {
      const top = sec.offsetTop - NAV_H - 20;
      if (sy >= top && sy < top + sec.offsetHeight) {
        navLinks.forEach(a => a.classList.remove('active'));
        const match = document.querySelector(`.navbar a[href="#${sec.id}"]`);
        if (match) match.classList.add('active');
      }
    });
  }, { passive: true });
})();


/* ============================================================
   GLOBAL — FADE-IN ON SCROLL
============================================================ */
(function () {
  const fadeObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        fadeObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.09 });

  document.querySelectorAll('.fade-in').forEach(el => fadeObs.observe(el));
})();


/* ============================================================
   ABOUT — TAB SWITCHING
============================================================ */
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    btn.classList.add('active');
    const panel = document.getElementById(`tab-${btn.dataset.tab}`);
    if (panel) panel.classList.add('active');
  });
});


/* ============================================================
   PORTFOLIO — DRIVE FILE FILTER
============================================================ */
const portfolioDocumentDataset = [
  { title: "Employee Request Form", category: "recruitment", extension: "pdf", path: "Portofolio/req.pdf" },
  { title: "Job Description", category: "recruitment", extension: "pdf", path: "Portofolio/jd.pdf" },
  { title: "Job Vacancy", category: "recruitment", extension: "png", path: "Portofolio/jobvacancy.png" },
  { title: "Offering Letter", category: "recruitment", extension: "pdf", path: "Portofolio/ol.pdf" },
  { title: "Interview Evaluation", category: "recruitment", extension: "pdf", path: "Portofolio/formwawancara.pdf" },
  { title: "Recruitment Dashboard", category: "recruitment", extension: "xlsx", path: "Portofolio/recruitment.xlsx" },

  { title: "PKWT", category: "operations", extension: "pdf", path: "Portofolio/pkwt.pdf" },
  { title: "SP 1", category: "operations", extension: "pdf", path: "Portofolio/sp.pdf" },
  { title: "Leave Request Form", category: "operations", extension: "pdf", path: "Portofolio/cuti.pdf" },
  { title: "Exit Interview Form", category: "operations", extension: "pdf", path: "Portofolio/exit.pdf" },
  { title: "Contract Renewal Evaluation Form", category: "operations", extension: "pdf", path: "Portofolio/evaluasikontrak.pdf" },
  { title: "BPJS Kesehatan Administrator", category: "operations", extension: "pdf", path: "Portofolio/adminjkn.pdf" },
  { title: "BPJS Ketenagakerjaaan Administrator", category: "operations", extension: "pdf", path: "Portofolio/adminjamsos.pdf" },


  { title: "Payroll Management System", category: "payroll", extension: "xlsx", path: "Portofolio/Payroll.xlsx" },
  { title: "Attendance", category: "payroll", extension: "pdf", path: "Portofolio/absen.pdf" },
  { title: "Overtime Request Form", category: "payroll", extension: "pdf", path: "Portofolio/spkl.pdf" },
  { title: "Overtime", category: "payroll", extension: "pdf", path: "Portofolio/lembur.pdf" },
  { title: "BPJS Calculation", category: "payroll", extension: "pdf", path: "Portofolio/bpjs.pdf" },
  { title: "PPH21", category: "payroll", extension: "pdf", path: "Portofolio/pph21.pdf" },
  { title: "Salary Structure", category: "payroll", extension: "xlsx", path: "Portofolio/ssu.xlsx" },
  { title: "Payslip", category: "payroll", extension: "pdf", path: "Portofolio/Payslip.pdf" },

  { title: "Organization Structure", category: "database", extension: "html", path: "Portofolio/Struktur Organisasi/so.html" },
  { title: "HR Metrics", category: "database", extension: "xlsx", path: "Portofolio/Metric.xlsx" },
  { title: "Wage Calculation SOP", category: "database", extension: "pdf", path: "Portofolio/soppay.pdf" },
  { title: "Employee Master Database", category: "database", extension: "folder", path: "https://drive.google.com/drive/folders/1SpRUAvVVGg0IPZSGJvfCngt0UpQyeIai?usp=drive_link" },
  
];

(function () {
  const filesList = document.getElementById('driveFilesList');
  if (!filesList) return;

  function getExtensionSpecs(ext) {
    const fmt = ext.toLowerCase();
    if (fmt === 'html') return { icon: 'bx bx-globe', color: 'html' };
    if (fmt === 'pdf') return { icon: 'bx bxs-file-pdf', color: 'pdf' };
    if (['docx', 'doc'].includes(fmt)) return { icon: 'bx bxs-file-doc', color: 'docx' };
    if (['xlsx', 'xls'].includes(fmt)) return { icon: 'bx bxs-file-export', color: 'xlsx' };
    if (fmt === 'csv') return { icon: 'bx bx-file-blank', color: 'csv' };
    if (fmt === 'txt') return { icon: 'bx bx-file-txt', color: 'txt' };
    return { icon: 'bx bx-file', color: 'misc' };
  }

  window.executeDriveViewRender = function(targetCategory) {
    filesList.innerHTML = '';
    let filtered = [];

    if (targetCategory === 'all') {
      filtered = [...portfolioDocumentDataset];
    } else {
      filtered = portfolioDocumentDataset.filter(d => d.category === targetCategory);
    }

    if (filtered.length === 0) {
      filesList.innerHTML = `
        <div class="drive-empty-state">
          <i class="bx bx-folder-open"></i>
          <h4>No Documents Found</h4>
          <p>There are currently no files uploaded in this category.</p>
        </div>`;
      return;
    }

    filtered.forEach(item => {
      const specs = getExtensionSpecs(item.extension);
      const row = document.createElement('div');
      row.className = 'file-row';
      row.setAttribute('data-file', item.path);
      row.setAttribute('data-title', item.title);

      row.innerHTML = `
        <div class="file-icon ${specs.color}">
          <i class="${specs.icon}"></i>
        </div>
        <div class="file-meta">
          <span class="file-name" title="${item.title}">${item.title}</span>
        </div>
      `;
      filesList.appendChild(row);
    });
  };

  window.executeDriveViewRender('all');

  document.querySelectorAll('[data-drive-target]').forEach(tab => {
    tab.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelectorAll('[data-drive-target]').forEach(t => t.classList.remove('active'));
      this.classList.add('active');

      const target = this.getAttribute('data-drive-target');
      window.executeDriveViewRender(target);
    });
  });
})();


/* ============================================================
   REFERENCE REQUEST MODAL
============================================================ */
(function () {
  const refTriggers = document.querySelectorAll('.btn-ref-trigger');
  const refModal    = document.getElementById('refModal');
  const closeRefBtn = document.getElementById('closeRefModalBtn');
  const companySpan = document.getElementById('modalCompanyName');
  const waLink      = document.getElementById('waRefLink');

  if (!refTriggers.length || !refModal || !closeRefBtn || !companySpan || !waLink) return;

  refTriggers.forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      e.stopImmediatePropagation();

      const company = btn.getAttribute('data-company');
      companySpan.textContent = company;

      const phone = '6281294916066';
      const text  = encodeURIComponent(`Hello Wahyudiansyah, I would like to request the supervisor reference details for your previous role at ${company}.`);
      waLink.href = `https://wa.me/${phone}?text=${text}`;

      refModal.classList.add('open');
    });
  });

  closeRefBtn.addEventListener('click', () => refModal.classList.remove('open'));

  refModal.addEventListener('click', e => {
    if (e.target === refModal) refModal.classList.remove('open');
  });
})();


/* ============================================================
   DOCUMENT VIEWER MODAL
============================================================ */
(function () {
  const docModal      = document.getElementById('docModal');
  const docTitle      = document.getElementById('docTitle');
  const docFrame      = document.getElementById('docFrame');
  const docImage      = document.getElementById('docImage');
  const docFallback   = document.getElementById('docFallback');
  const fallbackName  = document.getElementById('fallbackName');
  const fallbackDownloadBtn = document.getElementById('fallbackDownloadBtn');
  const closeDocBtn   = document.getElementById('closeDocModal');
  const fullscreenBtn = document.getElementById('fullscreenBtn');
  const docContainer  = docModal ? docModal.querySelector('.doc-container') : null;

  if (!docModal || !closeDocBtn || !fullscreenBtn || !docContainer) return;

  function openDoc(trigger) {
    const fileUrl   = trigger.getAttribute('data-file');
    const fileTitle = trigger.getAttribute('data-title') || trigger.querySelector('.file-name')?.innerText || 'Document Preview';

    if (!fileUrl) return;

    if (/^https?:\/\//i.test(fileUrl)) {
      window.open(fileUrl, '_blank');
      return;
    }

    if (fileUrl.endsWith('.html')) {
      window.open(fileUrl, '_blank');
      return;
    }

    docTitle.textContent = fileTitle;

    if (docFrame) { docFrame.src = ''; docFrame.style.display = 'none'; }
    if (docImage) { docImage.src = ''; docImage.style.display = 'none'; }
    if (docFallback) { docFallback.style.display = 'none'; }

    const evaluatedExt = fileUrl.split('.').pop().toLowerCase();

    if (['pdf', 'txt'].includes(evaluatedExt) && docFrame) {
      docFrame.src = evaluatedExt === 'pdf' ? `${fileUrl}#view=FitH&scrollbar=0` : fileUrl;
      docFrame.style.display = 'block';
    }
    else if (['xlsx', 'xls', 'docx', 'doc'].includes(evaluatedExt) && docFrame) {
      const absoluteLocation = window.location.origin + window.location.pathname.replace(/\/[^\/]*$/, '/') + fileUrl;
      docFrame.src = `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(absoluteLocation)}`;
      docFrame.style.display = 'block';
    }
    else if (['png', 'jpg', 'jpeg', 'webp', 'svg'].includes(evaluatedExt) && docImage) {
      docImage.src = fileUrl;
      docImage.style.display = 'block';
    }
    else if (docFallback) {
      if (fallbackName) fallbackName.textContent = fileTitle;
      if (fallbackDownloadBtn) fallbackDownloadBtn.href = fileUrl;
      docFallback.style.display = 'block';
    }

    docModal.classList.add('open');
  }

  function closeDoc() {
    docModal.classList.remove('open');
    if (docFrame) docFrame.src = '';
    if (docImage) docImage.src = '';
    if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
  }

  document.body.addEventListener('click', e => {
    const trigger = e.target.closest('[data-modal], .cert-link, .doc-link, .file-row');
    if (!trigger) return;
    if (trigger.classList.contains('btn-ref-trigger')) return;
    if (trigger.id === 'waRefLink') return;
    if (trigger.getAttribute('target') === '_blank') return;

    e.preventDefault();
    e.stopImmediatePropagation();
    openDoc(trigger);
  });

  closeDocBtn.addEventListener('click', closeDoc);
  docModal.addEventListener('click', e => { if (e.target === docModal) closeDoc(); });

  fullscreenBtn.addEventListener('click', () => {
    if (!document.fullscreenElement) {
      docContainer.requestFullscreen()
        .then(() => { fullscreenBtn.innerHTML = "<i class='bx bx-exit-fullscreen'></i>"; })
        .catch(() => {});
    } else {
      document.exitFullscreen()
        .then(() => { fullscreenBtn.innerHTML = "<i class='bx bx-fullscreen'></i>"; });
    }
  });

  document.addEventListener('fullscreenchange', () => {
    if (!document.fullscreenElement) {
      fullscreenBtn.innerHTML = "<i class='bx bx-fullscreen'></i>";
    }
  });
})();


/* ============================================================
   CONTACT — FORM SUBMISSION (AJAX + Auto Hide Success)
============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactForm');
  const button = document.getElementById('formSubmitBtn');
  const successMsg = document.getElementById('formSuccess');

  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    button.textContent = 'Sending...';
    button.disabled = true;

    try {
      const formData = new FormData(form);
      const response = await fetch(form.action, {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        successMsg.classList.add('visible');
        form.reset();

        setTimeout(() => {
          successMsg.classList.remove('visible');
        }, 3000);

        button.textContent = 'Send Message';
        button.disabled = false;
      } else {
        button.textContent = 'Send Message';
        button.disabled = false;
        alert('Failed to send message. Please try again.');
      }
    } catch (error) {
      button.textContent = 'Send Message';
      button.disabled = false;
      alert('Error occurred. Please try again.');
    }
  });
});
