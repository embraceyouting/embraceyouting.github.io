(() => {
  const root = document.documentElement;
  const body = document.body;
  const header = document.querySelector("[data-header]");
  const themeToggle = document.querySelector("[data-theme-toggle]");
  const langToggle = document.querySelector("[data-lang-toggle]");
  const menuToggle = document.querySelector("[data-menu-toggle]");
  const mobileMenu = document.querySelector("[data-mobile-menu]");
  const year = document.querySelector("[data-year]");
  const progress = document.querySelector("[data-scroll-progress]");
  const cursorDot = document.querySelector("[data-cursor-dot]");
  const cursorRing = document.querySelector("[data-cursor-ring]");
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const hasFinePointer = window.matchMedia("(pointer: fine) and (min-width: 901px)").matches;

  const translations = {
    zh: {
      documentTitle: "embraceyouting · Frontend / AI Applications",
      documentDescription: "embraceyouting 的个人主页：软件工程、前端开发、数据可视化与 AI 应用实践。",
      brandHome: "返回首页",
      brandAvatarAlt: "embraceyouting 的头像",
      navLabel: "主导航",
      navHome: "首页",
      navExperience: "经历",
      navProjects: "项目",
      navAbout: "关于",
      navContact: "联系我",
      navSendEmail: "发送邮件",
      menuOpen: "打开菜单",
      menuClose: "关闭菜单",
      accessibilitySkip: "跳到主要内容",
      themeLight: "切换为浅色主题",
      themeDark: "切换为深色主题",
      langToEnglish: "Switch to English",
      langToChinese: "切换到中文",
      heroEyebrow: "软件工程 · 前端 / AI",
      heroTitle: "把复杂的系统，<br /><span>做成清晰的体验。</span>",
      heroIntro: "你好，我是 embraceyouting，一名软件工程专业的前端开发者。<br />我关注界面、数据与智能能力之间自然流动的可能。",
      heroViewProjects: "查看我的项目",
      heroNextLabel: "接下来",
      heroNextValue: "USTC · 计算机学院 · 直博生",
      heroFocusLabel: "关注方向",
      heroFocusValue: "前端工程 · 数据可视化 · RAG / LLM",
      heroArtLabel: "个人技术方向可视化",
      heroBuildingInPublic: "/ building in public",
      heroCardFocus: "Frontend · Data · AI",
      heroScrollExplore: "滚动探索 <span>↘</span>",
      heroAvailable: "欢迎交流好想法",
      statsRank: "专业排名",
      statsGpa: "本科 GPA",
      statsProjects: "核心项目",
      statsAwardsLabel: "奖项",
      statsOverviewLabel: "个人概览",
      statsAwards: "蓝桥杯国家二等奖 · 服创国家三等奖（第十五届、第十六届） · 四川省计算机设计大赛一等奖",
      experienceKicker: "经历",
      experienceTitle: "在真实项目里，<br /><em>让想法开始工作。</em>",
      experienceNote: "从界面搭建到数据交互，<br />我享受把每一层细节连接起来。",
      experienceRole: "前端开发",
      bitmainTitle: "比特大陆 <span>· 内部员工 OA 系统</span>",
      bitmainOne: "使用 React 与 Ant Design 搭建内部 OA 系统的基础架构，建立清晰、易用的页面体验。",
      bitmainTwo: "负责考勤管理、请假审批、项目进度、文件共享、内部通讯等业务模块的前端逻辑。",
      bitmainThree: "与后端团队协作完成 API 对接与数据交互，保障前后端数据同步流畅。",
      energyTitle: "江投集团能源技术研究院 <span>· 能源监测系统</span>",
      energyOne: "利用 ECharts 实现数据动态可视化，帮助用户直观看到能源产量和消耗情况。",
      energyTwo: "使用 Element Plus 完成组件库设计与开发，提升系统的用户体验和交互性。",
      energyThree: "在大屏展示中集成动画效果，增强视觉吸引力与使用体验。",
      projectsKicker: "精选项目",
      projectsTitle: "做过的事，<br /><em>应该自己说明问题。</em>",
      projectsNote: "两个项目，两个方向：<br />理解用户，也理解系统。",
      behaviorScore: "用户行为评分",
      uxReport: "+ 用户体验分析报告",
      webApplication: "网页应用",
      aiApplication: "AI 应用",
      knowledgeNode: "文",
      answerNode: "答",
      knowledgeAnswer: "知识 → 答案",
      chartLabel: "用户行为趋势示意图",
      feiyueTitle: "《飞阅》用户体验<br />评分算法网站",
      feiyueDescription: "以用户行为数据为基础，结合算法模型，为网站提供全面、准确的用户体验分析报告。",
      viewProject: "了解这个项目",
      jishuTitle: "《极数》基于 RAG 与大模型的<br />算术与数学问题解答平台",
      jishuDescription: "检索知识库并调用语言模型，为用户提供覆盖小学至大学全阶段数学题目的解答与步骤讲解。",
      talkProject: "聊聊这个项目",
      aboutKicker: "关于我",
      aboutTitle: "保持好奇，<br /><em>也保持动手。</em>",
      aboutParagraphOne: "我喜欢从一个具体的问题出发：如何让信息更容易被理解，让操作更自然，让技术真正参与到体验里。前端是我最熟悉的入口，也因此不断向数据、服务端和 AI 应用探索。",
      aboutParagraphTwo: "最近的关注点是前端工程、数据可视化、Node.js 服务协作，以及 RAG / 大模型应用。接下来，我将进入中国科学技术大学（USTC）计算机学院攻读直博，继续探索基础性和关键性软件开发。我正在把这里变成一个长期记录的空间，分享工程实践、项目复盘和那些值得反复思考的小问题。",
      aboutStackLabel: "我的技术栈",
      aboutFocusLabel: "近期关注",
      aboutFocusFrontend: "前端系统",
      aboutFocusData: "数据可视化",
      aboutEducationLabel: "教育经历",
      aboutUstcName: "中国科学技术大学 · USTC",
      aboutUestcName: "电子科技大学",
      aboutUstcSchool: "计算机学院",
      aboutUndergraduate: "软件工程 · 本科 · 专业排名 31/155 · 均分 90.1",
      aboutRecognitionLabel: "奖项与荣誉",
      aboutAwardLanqiao: "蓝桥杯国家二等奖",
      aboutAwardService: "服务外包创新创业大赛国家三等奖（第十五届、第十六届）",
      aboutAwardSichuan: "四川省计算机设计大赛一等奖",
      aboutAwardStudent: "优秀学生奖学金",
      aboutAwardModel: "学习标兵奖学金",
      notesKicker: "即将更新 / NOTES",
      notesTitle: "下一篇，写点什么？",
      notesDescription: "这里会记录前端工程、数据可视化和 AI 应用实践。博客正在搭建中，欢迎带着问题来找我。",
      notesEmail: "发一封邮件",
      contactKicker: "一起连接",
      contactTitle: "有一个想法？<br /><em>我们聊聊。</em>",
      contactLocation: "成都 · 中国",
      contactAvailability: "欢迎交流好想法",
      footerBackTop: "回到顶部 ↑",
      footerBuild: "DESIGNED & BUILT WITH CURIOSITY",
      mailFeiyueSubject: "关于《飞阅》用户体验评分算法网站",
      mailJishuSubject: "关于《极数》数学问答平台",
      mailHelloSubject: "你好，embraceyouting",
    },
    en: {
      documentTitle: "embraceyouting · Frontend / AI Applications",
      documentDescription: "embraceyouting's personal site: software engineering, frontend development, data visualization, and AI applications.",
      brandHome: "Back to home",
      brandAvatarAlt: "embraceyouting's avatar",
      navLabel: "Primary navigation",
      navHome: "Home",
      navExperience: "Experience",
      navProjects: "Projects",
      navAbout: "About",
      navContact: "Contact",
      navSendEmail: "Send an email",
      menuOpen: "Open menu",
      menuClose: "Close menu",
      accessibilitySkip: "Skip to main content",
      themeLight: "Switch to light theme",
      themeDark: "Switch to dark theme",
      langToEnglish: "Switch to English",
      langToChinese: "Switch to Chinese",
      heroEyebrow: "Software Engineering · Frontend / AI",
      heroTitle: "Make complex systems,<br /><span>feel clear.</span>",
      heroIntro: "Hi, I'm embraceyouting — a software engineering student and frontend developer.<br />I care about the flow between interfaces, data, and intelligence.",
      heroViewProjects: "View my projects",
      heroNextLabel: "NEXT",
      heroNextValue: "USTC · School of Computer Science · Direct PhD",
      heroFocusLabel: "FOCUS",
      heroFocusValue: "Frontend Engineering · Data Viz · RAG / LLM",
      heroArtLabel: "A visualization of my technical focus",
      heroBuildingInPublic: "/ building in public",
      heroCardFocus: "Frontend · Data · AI",
      heroScrollExplore: "SCROLL TO EXPLORE <span>↘</span>",
      heroAvailable: "OPEN TO GOOD IDEAS",
      statsRank: "Major rank",
      statsGpa: "Undergrad GPA",
      statsProjects: "Core projects",
      statsAwardsLabel: "AWARDS",
      statsOverviewLabel: "Profile overview",
      statsAwards: "Lanqiao Cup · National Second Prize · Service Outsourcing Innovation & Entrepreneurship Competition · National Third Prize (15th & 16th) · Sichuan Computer Design Contest · First Prize",
      experienceKicker: "Experience",
      experienceTitle: "Make ideas work<br /><em>in real products.</em>",
      experienceNote: "From interface systems to data flows,<br />I enjoy connecting every layer.",
      experienceRole: "Frontend Developer",
      bitmainTitle: "Bitmain <span>· Internal Employee OA</span>",
      bitmainOne: "Built the foundation of an internal OA system with React and Ant Design, shaping a clear and easy-to-use interface.",
      bitmainTwo: "Implemented frontend logic for attendance, leave approval, project tracking, file sharing, and internal communication.",
      bitmainThree: "Worked with the backend team on API integration and data exchange to keep the product's data flow consistent.",
      energyTitle: "Jiangtou Energy Technology Research Institute <span>· Energy Monitoring System</span>",
      energyOne: "Built dynamic energy data visualizations with ECharts so users could see production and consumption at a glance.",
      energyTwo: "Designed and developed interfaces with Element Plus to improve usability and interaction quality.",
      energyThree: "Integrated motion into the large-screen display to make data presentation more engaging and memorable.",
      projectsKicker: "Selected work",
      projectsTitle: "Let the work<br /><em>speak for itself.</em>",
      projectsNote: "Two projects, two directions:<br />understand the user, understand the system.",
      behaviorScore: "USER BEHAVIOR SCORE",
      uxReport: "+ UX analysis report",
      webApplication: "WEB APPLICATION",
      aiApplication: "AI APPLICATION",
      knowledgeNode: "K",
      answerNode: "A",
      knowledgeAnswer: "KNOWLEDGE → ANSWER",
      chartLabel: "User behavior trend illustration",
      feiyueTitle: "Feiyue · User Experience<br />Scoring Algorithm Website",
      feiyueDescription: "A user-experience scoring website that combines behavior data and algorithmic models to produce clear, actionable reports.",
      viewProject: "See the project",
      jishuTitle: "Jishu · RAG & LLM<br />Arithmetic and Math QA Platform",
      jishuDescription: "A knowledge-retrieval and language-model platform for step-by-step math answers, from elementary school through university level.",
      talkProject: "Talk about this project",
      aboutKicker: "About me",
      aboutTitle: "Stay curious,<br /><em>keep building.</em>",
      aboutParagraphOne: "I like to start with a concrete question: how can information become easier to understand, interactions more natural, and technology more present in the experience? Frontend is my closest entry point, and it keeps leading me toward data, backend systems, and AI applications.",
      aboutParagraphTwo: "My current focus is frontend engineering, data visualization, Node.js service integration, and RAG / LLM applications. I will soon join the School of Computer Science at USTC as a direct PhD student, exploring foundational and critical software systems. This site is a place to document engineering practice, project retrospectives, and questions worth revisiting.",
      aboutStackLabel: "What I work with",
      aboutFocusLabel: "Now exploring",
      aboutFocusFrontend: "Frontend systems",
      aboutFocusData: "Data visualization",
      aboutEducationLabel: "Education",
      aboutUstcName: "University of Science and Technology of China · USTC",
      aboutUestcName: "University of Electronic Science and Technology of China",
      aboutUstcSchool: "School of Computer Science",
      aboutUndergraduate: "Software Engineering · Undergraduate · Major rank 31/155 · Average 90.1",
      aboutRecognitionLabel: "Recognition",
      aboutAwardLanqiao: "Lanqiao Cup · National Second Prize",
      aboutAwardService: "Service Outsourcing Innovation & Entrepreneurship Competition · National Third Prize (15th & 16th)",
      aboutAwardSichuan: "Sichuan Computer Design Contest · First Prize",
      aboutAwardStudent: "Outstanding Student Scholarship",
      aboutAwardModel: "Learning Model Scholarship",
      notesKicker: "Coming soon / Notes",
      notesTitle: "What should I write next?",
      notesDescription: "A space for frontend engineering, data visualization, and AI application practice. The blog is taking shape — bring a question.",
      notesEmail: "Send an email",
      contactKicker: "Let's connect",
      contactTitle: "Have an idea?<br /><em>Let's talk.</em>",
      contactLocation: "Chengdu · China",
      contactAvailability: "OPEN TO GOOD IDEAS",
      footerBackTop: "Back to top ↑",
      footerBuild: "DESIGNED & BUILT WITH CURIOSITY",
      mailFeiyueSubject: "About the Feiyue user experience scoring website",
      mailJishuSubject: "About the Jishu math QA platform",
      mailHelloSubject: "Hello, embraceyouting",
    },
  };

  const storage = {
    get(key) {
      try { return window.localStorage.getItem(key); } catch { return null; }
    },
    set(key, value) {
      try { window.localStorage.setItem(key, value); } catch { /* Storage can be unavailable on file URLs. */ }
    },
  };

  let language = storage.get("lr-language") === "en" ? "en" : "zh";
  const dictionaryKeys = (key) => {
    const parts = key.split(".");
    const compact = parts.map((part, index) => index === 0 ? part : part.charAt(0).toUpperCase() + part.slice(1)).join("");
    const withoutSection = parts.slice(1).map((part, index) => index === 0 ? part : part.charAt(0).toUpperCase() + part.slice(1)).join("");
    return [...new Set([compact, withoutSection, parts[parts.length - 1]])];
  };
  const translate = (dict, key) => dictionaryKeys(key).map((candidate) => dict[candidate]).find((value) => value != null);

  const setThemeLabel = () => {
    if (!themeToggle) return;
    const isLight = root.dataset.theme === "light";
    themeToggle.setAttribute("aria-label", isLight ? translations[language].themeDark : translations[language].themeLight);
  };

  const applyLanguage = (nextLanguage) => {
    language = nextLanguage === "en" ? "en" : "zh";
    const dict = translations[language];
    root.lang = language === "en" ? "en" : "zh-CN";
    root.dataset.lang = language;
    document.title = dict.documentTitle;
    document.querySelector('meta[name="description"]')?.setAttribute("content", dict.documentDescription);
    document.querySelector('meta[property="og:description"]')?.setAttribute("content", language === "en" ? "Make complex systems, feel clear." : "把复杂的系统，做成清晰的体验。");

    document.querySelectorAll("[data-i18n]").forEach((element) => {
      const value = translate(dict, element.dataset.i18n);
      if (value == null) return;
      if (element.dataset.i18nHtml === "true") element.innerHTML = value;
      else element.textContent = value;
    });
    document.querySelectorAll("[data-i18n-aria]").forEach((element) => {
      const value = translate(dict, element.dataset.i18nAria);
      if (value != null) element.setAttribute("aria-label", value);
    });
    document.querySelectorAll("[data-i18n-alt]").forEach((element) => {
      const value = translate(dict, element.dataset.i18nAlt);
      if (value != null) element.setAttribute("alt", value);
    });

    const currentLanguage = document.querySelector("[data-lang-current]");
    const otherLanguage = document.querySelector("[data-lang-other]");
    if (currentLanguage) currentLanguage.textContent = language === "en" ? "EN" : "中";
    if (otherLanguage) otherLanguage.textContent = language === "en" ? "ZH" : "EN";
    langToggle?.setAttribute("aria-label", language === "en" ? dict.langToChinese : dict.langToEnglish);
    document.querySelectorAll("[data-i18n-subject]").forEach((element) => {
      const value = translate(dict, element.dataset.i18nSubject);
      if (value == null) return;
      const address = element.getAttribute("href")?.split("?")[0];
      if (address) element.setAttribute("href", `${address}?subject=${encodeURIComponent(value)}`);
    });
    setThemeLabel();
    storage.set("lr-language", language);
  };

  const savedTheme = storage.get("lr-theme");
  if (savedTheme === "light") root.dataset.theme = "light";
  applyLanguage(language);

  themeToggle?.addEventListener("click", () => {
    const nextTheme = root.dataset.theme === "light" ? "dark" : "light";
    if (nextTheme === "light") root.dataset.theme = "light";
    else delete root.dataset.theme;
    storage.set("lr-theme", nextTheme);
    setThemeLabel();
  });

  langToggle?.addEventListener("click", () => applyLanguage(language === "en" ? "zh" : "en"));

  const closeMenu = () => {
    header?.classList.remove("menu-open");
    menuToggle?.setAttribute("aria-expanded", "false");
    if (menuToggle) menuToggle.setAttribute("aria-label", translations[language].menuOpen);
  };

  menuToggle?.addEventListener("click", () => {
    const isOpen = header.classList.toggle("menu-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? translations[language].menuClose : translations[language].menuOpen);
  });
  mobileMenu?.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));

  if (year) year.textContent = String(new Date().getFullYear());

  const sections = [...document.querySelectorAll("main section[id]")];
  const navLinks = [...document.querySelectorAll(".desktop-nav .nav-link")];
  const setActiveLink = () => {
    const marker = window.scrollY + window.innerHeight * 0.35;
    let current = "top";
    sections.forEach((section) => {
      if (section.offsetTop <= marker) current = section.id;
    });
    navLinks.forEach((link) => link.classList.toggle("is-active", link.getAttribute("href") === `#${current}`));
  };

  let scrollTick = false;
  const updateScrollUI = () => {
    if (scrollTick) return;
    scrollTick = true;
    window.requestAnimationFrame(() => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (progress) progress.style.width = `${maxScroll > 0 ? (window.scrollY / maxScroll) * 100 : 0}%`;
      header?.classList.toggle("is-scrolled", window.scrollY > 12);
      setActiveLink();
      scrollTick = false;
    });
  };
  updateScrollUI();
  window.addEventListener("scroll", updateScrollUI, { passive: true });

  const revealItems = document.querySelectorAll(".reveal");
  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  } else {
    const observer = new IntersectionObserver((entries, instance) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          instance.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealItems.forEach((item) => observer.observe(item));
  }

  const canvas = document.querySelector("[data-particle-canvas]");
  const hero = canvas?.closest(".hero");
  if (canvas && hero && !prefersReducedMotion) {
    const context = canvas.getContext("2d");
    let width = 0;
    let height = 0;
    let devicePixelRatio = 1;
    let particles = [];
    const pointer = { x: -1000, y: -1000 };

    const resizeCanvas = () => {
      const bounds = hero.getBoundingClientRect();
      width = bounds.width;
      height = bounds.height;
      devicePixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * devicePixelRatio);
      canvas.height = Math.round(height * devicePixelRatio);
      context.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
      const count = Math.min(76, Math.max(28, Math.round((width * height) / 22000)));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.18,
        radius: Math.random() * 1.4 + 0.45,
      }));
    };

    const drawParticles = () => {
      context.clearRect(0, 0, width, height);
      particles.forEach((particle) => {
        const dx = pointer.x - particle.x;
        const dy = pointer.y - particle.y;
        const distance = Math.hypot(dx, dy);
        if (distance < 150) {
          particle.x += dx * 0.0008;
          particle.y += dy * 0.0008;
        }
        particle.x += particle.vx;
        particle.y += particle.vy;
        if (particle.x < -10) particle.x = width + 10;
        if (particle.x > width + 10) particle.x = -10;
        if (particle.y < -10) particle.y = height + 10;
        if (particle.y > height + 10) particle.y = -10;
      });

      for (let i = 0; i < particles.length; i += 1) {
        for (let j = i + 1; j < particles.length; j += 1) {
          const a = particles[i];
          const b = particles[j];
          const distance = Math.hypot(a.x - b.x, a.y - b.y);
          if (distance < 125) {
            context.strokeStyle = `rgba(183, 243, 107, ${0.15 * (1 - distance / 125)})`;
            context.lineWidth = 0.65;
            context.beginPath();
            context.moveTo(a.x, a.y);
            context.lineTo(b.x, b.y);
            context.stroke();
          }
        }
      }
      particles.forEach((particle) => {
        context.fillStyle = "rgba(183, 243, 107, .72)";
        context.beginPath();
        context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        context.fill();
      });
      window.requestAnimationFrame(drawParticles);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas, { passive: true });
    hero.addEventListener("pointermove", (event) => {
      const bounds = hero.getBoundingClientRect();
      pointer.x = event.clientX - bounds.left;
      pointer.y = event.clientY - bounds.top;
      hero.style.setProperty("--hero-pointer-x", `${pointer.x}px`);
      hero.style.setProperty("--hero-pointer-y", `${pointer.y}px`);
      hero.classList.add("is-pointer-active");
    });
    hero.addEventListener("pointerleave", () => {
      pointer.x = -1000;
      pointer.y = -1000;
      hero.classList.remove("is-pointer-active");
    });
    window.requestAnimationFrame(drawParticles);
  }

  if (!prefersReducedMotion && hasFinePointer) {
    body.classList.add("has-custom-cursor");
    const cursor = { x: -100, y: -100, ringX: -100, ringY: -100 };
    let cursorTick = false;
    document.addEventListener("pointermove", (event) => {
      cursor.x = event.clientX;
      cursor.y = event.clientY;
      if (cursorTick) return;
      cursorTick = true;
      window.requestAnimationFrame(() => {
        cursor.ringX += (cursor.x - cursor.ringX) * 0.2;
        cursor.ringY += (cursor.y - cursor.ringY) * 0.2;
        if (cursorDot) cursorDot.style.transform = `translate(${cursor.x}px, ${cursor.y}px) translate(-50%, -50%)`;
        if (cursorRing) cursorRing.style.transform = `translate(${cursor.ringX}px, ${cursor.ringY}px) translate(-50%, -50%)`;
        cursorTick = false;
      });
    });
    document.addEventListener("pointerover", (event) => {
      if (event.target.closest("a, button, [data-tilt]")) cursorRing?.classList.add("is-hover");
    });
    document.addEventListener("pointerout", (event) => {
      if (!event.relatedTarget || !event.relatedTarget.closest?.("a, button, [data-tilt]")) cursorRing?.classList.remove("is-hover");
    });
  }

  if (!prefersReducedMotion && hasFinePointer) {
    document.querySelectorAll("[data-tilt]").forEach((element) => {
      element.addEventListener("pointermove", (event) => {
        const bounds = element.getBoundingClientRect();
        const pointerX = (event.clientX - bounds.left) / bounds.width;
        const pointerY = (event.clientY - bounds.top) / bounds.height;
        const rotateX = (pointerY - 0.5) * -4;
        const rotateY = (pointerX - 0.5) * 5;
        element.style.transform = `perspective(1100px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        element.style.setProperty("--pointer-x", `${pointerX * 100}%`);
        element.style.setProperty("--pointer-y", `${pointerY * 100}%`);
      });
      element.addEventListener("pointerleave", () => {
        element.style.transform = "";
        element.style.removeProperty("--pointer-x");
        element.style.removeProperty("--pointer-y");
      });
    });

    document.querySelectorAll("[data-magnetic]").forEach((element) => {
      element.addEventListener("pointermove", (event) => {
        const bounds = element.getBoundingClientRect();
        const x = (event.clientX - (bounds.left + bounds.width / 2)) * 0.16;
        const y = (event.clientY - (bounds.top + bounds.height / 2)) * 0.16;
        element.style.setProperty("--magnetic-x", `${x}px`);
        element.style.setProperty("--magnetic-y", `${y}px`);
      });
      element.addEventListener("pointerleave", () => {
        element.style.removeProperty("--magnetic-x");
        element.style.removeProperty("--magnetic-y");
      });
    });
  }
})();
