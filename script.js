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
      documentTitle: "whisper · AI for Weather / Software Engineering",
      documentDescription: "whisper 的个人主页：关注人工智能气象、降水短临预报与时空预测，并探索水文预测。",
      brandHome: "返回首页",
      brandAvatarAlt: "whisper 的头像",
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
      heroEyebrow: "人工智能气象 · 时空预测",
      heroTitle: "人工智能气象，<br /><span>与时空预测。</span>",
      heroIntro: "你好，我是 whisper。<br />近期主要关注人工智能气象、降水短临预报与时空预测，并探索水文预测相关方向。",
      heroViewProjects: "查看我的项目",
      heroArtLabel: "个人研究方向可视化",
      heroBuildingInPublic: "/ building in public",
      heroCardFocus: "Weather · Data · AI",
      heroNowcastingTag: "降水短临预报",
      heroScrollExplore: "滚动探索 <span>↘</span>",
      heroAvailable: "欢迎交流好想法",
      researchKicker: "RESEARCH",
      researchTitle: "近期研究",
      researchNote: "近期围绕人工智能气象开展研究，<br />并探索水文预测相关方向。",
      researchWeatherTitle: "人工智能气象",
      researchWeatherDescription: "关注人工智能与气象科学的交叉，面向天气预测中的现实问题开展研究。",
      researchNowcastingTitle: "降水短临预报",
      researchNowcastingDescription: "关注短时间尺度的降水变化，以及强降水等天气过程的预测。",
      researchSpatiotemporalTitle: "时空预测",
      researchSpatiotemporalDescription: "关注随时间与空间演变的数据，探索其变化规律与预测问题。",
      researchExploringLabel: "探索方向",
      researchExploringValue: "水文预测与气象水文交叉应用",
      experienceKicker: "经历",
      experienceTitle: "在真实项目里，<br /><em>让想法开始工作。</em>",
      experienceNote: "从界面搭建到数据交互，<br />我享受把每一层细节连接起来。",
      experienceRole: "前端开发",
      bitmainTitle: "比特大陆 <span>· 内部员工 OA 系统</span>",
      bitmainSummary: "企业内部办公系统的前端开发与业务协作。",
      energyTitle: "江投集团能源技术研究院 <span>· 能源监测系统</span>",
      energySummary: "能源数据可视化与监测系统的前端开发。",
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
      feiyueTitle: "《飞阅》用户体验<br />分析平台",
      feiyueDescription: "面向网站用户体验评估与行为数据分析的应用。",
      viewProject: "了解这个项目",
      jishuTitle: "《极数》数学<br />问答平台",
      jishuDescription: "面向数学学习与知识问答的 AI 应用。",
      talkProject: "聊聊这个项目",
      aboutKicker: "关于我",
      aboutTitle: "关于我。",
      aboutParagraphOne: "我有软件工程背景，也持续关注交互体验、数据可视化与 AI 应用。",
      aboutFocusLabel: "近期关注",
      aboutFocusNowcasting: "降水短临预报",
      aboutFocusSpatiotemporal: "时空预测",
      aboutFocusWeather: "人工智能气象",
      aboutFocusHydrology: "水文预测 · 探索中",
      aboutEducationLabel: "教育经历",
      aboutUstcName: "中国科学技术大学 · USTC",
      aboutUstcDegree: "直博",
      aboutUestcName: "电子科技大学 · UESTC",
      aboutUstcSchool: "计算机学院",
      aboutUndergraduate: "软件工程 · 本科",
      contactKicker: "一起连接",
      contactTitle: "交流与联系。",
      footerBackTop: "回到顶部 ↑",
      footerBuild: "DESIGNED & BUILT WITH CURIOSITY",
      mailFeiyueSubject: "关于《飞阅》用户体验分析平台",
      mailJishuSubject: "关于《极数》数学问答平台",
      mailHelloSubject: "你好，whisper",
    },
    en: {
      documentTitle: "whisper · AI for Weather / Software Engineering",
      documentDescription: "whisper's personal site: AI for weather, precipitation nowcasting, and spatiotemporal forecasting; exploring hydrological forecasting.",
      brandHome: "Back to home",
      brandAvatarAlt: "whisper's avatar",
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
      heroEyebrow: "AI for Weather · Spatiotemporal Forecasting",
      heroTitle: "AI for Weather.<br /><span>Spatiotemporal AI.</span>",
      heroIntro: "Hi, I'm whisper.<br />My current interests are AI for weather, precipitation nowcasting, and spatiotemporal forecasting. I am also exploring hydrological forecasting.",
      heroViewProjects: "View my projects",
      heroArtLabel: "A visualization of my research interests",
      heroBuildingInPublic: "/ building in public",
      heroCardFocus: "Weather · Data · AI",
      heroNowcastingTag: "Nowcasting",
      heroScrollExplore: "SCROLL TO EXPLORE <span>↘</span>",
      heroAvailable: "OPEN TO GOOD IDEAS",
      researchKicker: "RESEARCH",
      researchTitle: "Current research",
      researchNote: "Researching AI for weather,<br />and exploring hydrological forecasting.",
      researchWeatherTitle: "AI for Weather",
      researchWeatherDescription: "I explore the intersection of AI and atmospheric science, focusing on practical questions in weather forecasting.",
      researchNowcastingTitle: "Precipitation Nowcasting",
      researchNowcastingDescription: "I study precipitation over short time scales and the prediction of weather events such as heavy rainfall.",
      researchSpatiotemporalTitle: "Spatiotemporal Forecasting",
      researchSpatiotemporalDescription: "I study data that evolves across time and space, exploring patterns of change and forecasting questions.",
      researchExploringLabel: "Exploring",
      researchExploringValue: "Hydrological forecasting and its connections with weather",
      experienceKicker: "Experience",
      experienceTitle: "Make ideas work<br /><em>in real products.</em>",
      experienceNote: "From interface systems to data flows,<br />I enjoy connecting every layer.",
      experienceRole: "Frontend Developer",
      bitmainTitle: "Bitmain <span>· Internal Employee OA</span>",
      bitmainSummary: "Frontend development and business collaboration for an internal office system.",
      energyTitle: "Jiangtou Energy Technology Research Institute <span>· Energy Monitoring System</span>",
      energySummary: "Frontend development for energy data visualization and monitoring.",
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
      feiyueTitle: "Feiyue · User Experience<br />Analytics Platform",
      feiyueDescription: "An application for website user experience evaluation and behavior data analysis.",
      viewProject: "See the project",
      jishuTitle: "Jishu · Math<br />Q&A Platform",
      jishuDescription: "An AI application for learning mathematics and answering questions.",
      talkProject: "Talk about this project",
      aboutKicker: "About me",
      aboutTitle: "About me.",
      aboutParagraphOne: "I have a background in software engineering and an ongoing interest in interaction design, data visualization, and AI applications.",
      aboutFocusLabel: "Current interests",
      aboutFocusNowcasting: "Precipitation Nowcasting",
      aboutFocusSpatiotemporal: "Spatiotemporal Forecasting",
      aboutFocusWeather: "AI for Weather",
      aboutFocusHydrology: "Hydrology · Exploring",
      aboutEducationLabel: "Education",
      aboutUstcName: "University of Science and Technology of China · USTC",
      aboutUstcDegree: "Direct PhD",
      aboutUestcName: "University of Electronic Science and Technology of China · UESTC",
      aboutUstcSchool: "School of Computer Science",
      aboutUndergraduate: "Software Engineering · Bachelor's degree",
      contactKicker: "Let's connect",
      contactTitle: "Let's connect.",
      footerBackTop: "Back to top ↑",
      footerBuild: "DESIGNED & BUILT WITH CURIOSITY",
      mailFeiyueSubject: "About the Feiyue user experience analytics platform",
      mailJishuSubject: "About the Jishu math QA platform",
      mailHelloSubject: "Hello, whisper",
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
    document.querySelector('meta[property="og:title"]')?.setAttribute("content", dict.documentTitle);
    document.querySelector('meta[property="og:description"]')?.setAttribute("content", dict.documentDescription);

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
