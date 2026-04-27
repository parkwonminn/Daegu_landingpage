/**
 * 대구광역시 봄 홍보 랜딩 — 클라이언트 스크립트
 * - 벚꽃 낙화 파티클 생성·애니메이션
 * - 통계 숫자 카운트업
 * - 스크롤 섹션 페이드인 (IntersectionObserver)
 * - 스티키 헤더 상태 관리
 * - 모바일 내비게이션 토글
 * - 문의 폼 데모 처리
 */

(function () {
  "use strict";

  const SCROLL_THRESHOLD_PX = 8;
  const INTERSECTION_ROOT_MARGIN = "0px 0px -10% 0px";
  const COLOR_THEME_STORAGE_KEY = "daeguLandingColorTheme";

  /**
   * localStorage에 저장된 라이트/다크 선택을 반환한다. 없으면 null.
   * @returns {"light" | "dark" | null}
   */
  function getPersistedColorThemeChoice() {
    const storedValue = localStorage.getItem(COLOR_THEME_STORAGE_KEY);
    if (storedValue === "dark" || storedValue === "light") {
      return storedValue;
    }
    return null;
  }

  /**
   * 문서 루트에 data-theme을 설정해 전역 색 테마를 적용한다.
   * @param {{ themeId: "light" | "dark" }} params
   */
  function applyDocumentColorTheme({ themeId }) {
    document.documentElement.setAttribute("data-theme", themeId);
  }

  /**
   * 테마 토글 버튼의 aria-pressed·aria-label을 현재 테마에 맞춘다.
   * @param {{ toggleButton: HTMLButtonElement, themeId: "light" | "dark" }} params
   */
  function syncColorThemeToggleAccessibility({ toggleButton, themeId }) {
    const isDarkTheme = themeId === "dark";
    toggleButton.setAttribute("aria-pressed", String(isDarkTheme));
    toggleButton.setAttribute(
      "aria-label",
      isDarkTheme ? "라이트 모드로 전환" : "다크 모드로 전환"
    );
  }

  /**
   * head 인라인 스크립트가 설정한 data-theme과 토글 UI를 맞춘다.
   * @param {{ toggleButton: HTMLButtonElement }} params
   */
  function synchronizeColorThemeToggleWithDocument({ toggleButton }) {
    const themeId = document.documentElement.getAttribute("data-theme");
    if (themeId === "light" || themeId === "dark") {
      syncColorThemeToggleAccessibility({ toggleButton, themeId });
    }
  }

  /**
   * 테마 토글 클릭 시 라이트/다크를 바꾸고 선택을 저장한다.
   * @param {{ toggleButton: HTMLButtonElement }} params
   */
  function registerColorThemeToggleClickHandler({ toggleButton }) {
    toggleButton.addEventListener("click", function handleColorThemeToggleClick() {
      const currentThemeId =
        document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
      const nextThemeId = currentThemeId === "dark" ? "light" : "dark";
      applyDocumentColorTheme({ themeId: nextThemeId });
      localStorage.setItem(COLOR_THEME_STORAGE_KEY, nextThemeId);
      syncColorThemeToggleAccessibility({ toggleButton, themeId: nextThemeId });
    });
  }

  /**
   * 사용자가 저장한 테마가 없을 때만 시스템 prefers-color-scheme 변경을 반영한다.
   * @param {{ toggleButton: HTMLButtonElement }} params
   */
  function registerSystemColorSchemeListener({ toggleButton }) {
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", function handleSystemColorSchemeChange(colorSchemeQueryEvent) {
        if (getPersistedColorThemeChoice() !== null) {
          return;
        }
        const nextThemeId = colorSchemeQueryEvent.matches ? "dark" : "light";
        applyDocumentColorTheme({ themeId: nextThemeId });
        syncColorThemeToggleAccessibility({ toggleButton, themeId: nextThemeId });
      });
  }

  /**
   * 헤더 색 테마 토글 초기화 (접근성·저장·시스템 연동).
   * @param {{ toggleButton: HTMLButtonElement | null }} params
   */
  function initializeColorThemeToggle({ toggleButton }) {
    if (!toggleButton) {
      return;
    }
    synchronizeColorThemeToggleWithDocument({ toggleButton });
    registerColorThemeToggleClickHandler({ toggleButton });
    registerSystemColorSchemeListener({ toggleButton });
  }

  /* ── 벚꽃 낙화 파티클 설정 ── */
  const PETAL_COUNT_DESKTOP = 28;
  const PETAL_COUNT_MOBILE  = 14;
  const PETAL_MIN_SIZE_PX   = 8;
  const PETAL_MAX_SIZE_PX   = 16;
  const PETAL_MIN_DURATION_S = 5;
  const PETAL_MAX_DURATION_S = 11;
  const PETAL_MAX_DELAY_S    = 8;

  /* ── 카운트업 이징 ── */
  const COUNT_UP_DURATION_MS = 1800;

  /**
   * [0, max] 사이의 무작위 실수를 반환한다.
   * @param {number} maxValue
   * @returns {number}
   */
  function randomFloatUpTo(maxValue) {
    return Math.random() * maxValue;
  }

  /**
   * [min, max] 사이의 무작위 실수를 반환한다.
   * @param {number} minValue
   * @param {number} maxValue
   * @returns {number}
   */
  function randomFloatBetween(minValue, maxValue) {
    return minValue + Math.random() * (maxValue - minValue);
  }

  /**
   * 단일 벚꽃 꽃잎 DOM 요소를 생성하고 무작위 CSS 속성을 적용한다.
   * @returns {HTMLElement}
   */
  function createSingleCherryPetalElement() {
    const petalElement = document.createElement("div");

    const sizeInPx     = randomFloatBetween(PETAL_MIN_SIZE_PX, PETAL_MAX_SIZE_PX);
    const leftPercent  = randomFloatUpTo(100);
    const durationSecs = randomFloatBetween(PETAL_MIN_DURATION_S, PETAL_MAX_DURATION_S);
    const delaySecs    = randomFloatUpTo(PETAL_MAX_DELAY_S);
    const isAltShape   = Math.random() > 0.5;

    petalElement.className = isAltShape ? "cherry-petal cherry-petal--alt" : "cherry-petal";

    Object.assign(petalElement.style, {
      left:                `${leftPercent}%`,
      width:               `${sizeInPx}px`,
      height:              `${sizeInPx * 0.8}px`,
      animationDuration:   `${durationSecs}s`,
      animationDelay:      `${delaySecs}s`,
      opacity:             "0",
    });

    return petalElement;
  }

  /**
   * 히어로 섹션에 벚꽃 낙화 파티클 샤워를 초기화한다.
   * @param {{ containerElement: HTMLElement }} params
   */
  function initializeCherryBlossomPetalShower({ containerElement }) {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      return;
    }

    const isMobileViewport = window.innerWidth < 720;
    const targetPetalCount = isMobileViewport ? PETAL_COUNT_MOBILE : PETAL_COUNT_DESKTOP;

    /* DocumentFragment으로 한 번에 DOM에 삽입 (리플로우 최소화) */
    const fragmentToInsert = document.createDocumentFragment();

    for (let petalIndex = 0; petalIndex < targetPetalCount; petalIndex++) {
      fragmentToInsert.appendChild(createSingleCherryPetalElement());
    }

    containerElement.appendChild(fragmentToInsert);
  }

  /**
   * easeOutCubic 이징 함수: 빠르게 시작 후 부드럽게 감속.
   * @param {number} progressRatio 0~1
   * @returns {number}
   */
  function applyEaseOutCubic(progressRatio) {
    return 1 - Math.pow(1 - progressRatio, 3);
  }

  /**
   * 단일 숫자 요소를 0에서 목표값까지 카운트업 애니메이션으로 표시한다.
   * @param {{ numberElement: HTMLElement, targetNumber: number }} params
   */
  function animateNumberCountingUp({ numberElement, targetNumber }) {
    const startTimestamp = performance.now();

    function updateDisplayedNumber(currentTimestamp) {
      const elapsedMs   = currentTimestamp - startTimestamp;
      const progressRatio = Math.min(elapsedMs / COUNT_UP_DURATION_MS, 1);
      const easedProgress = applyEaseOutCubic(progressRatio);
      const displayValue  = Math.round(easedProgress * targetNumber);

      numberElement.textContent = displayValue.toLocaleString("ko-KR");

      if (progressRatio < 1) {
        requestAnimationFrame(updateDisplayedNumber);
      }
    }

    requestAnimationFrame(updateDisplayedNumber);
  }

  /**
   * 통계 밴드 섹션의 숫자들을 IntersectionObserver로 뷰 진입 시 카운트업한다.
   * @param {{ statNumberElements: NodeListOf<Element> }} params
   */
  function initializeStatisticCountUpAnimations({ statNumberElements }) {
    const countUpTriggerObserver = new IntersectionObserver(
      function handleStatsSectionVisible(entries) {
        entries.forEach(function triggerCountUpIfVisible(entry) {
          if (!entry.isIntersecting) {
            return;
          }
          countUpTriggerObserver.unobserve(entry.target);

          const targetNumber = parseInt(entry.target.getAttribute("data-count-target") || "0", 10);
          animateNumberCountingUp({ numberElement: entry.target, targetNumber });
        });
      },
      { threshold: 0.5 }
    );

    statNumberElements.forEach(function observeStatNumber(numberElement) {
      countUpTriggerObserver.observe(numberElement);
    });
  }

  /**
   * 스크롤 위치에 따라 헤더에 시각적 상태 클래스를 부여한다.
   * @param {{ headerElement: HTMLElement }} params
   */
  function applyScrollStateToHeader({ headerElement }) {
    if (window.scrollY > SCROLL_THRESHOLD_PX) {
      headerElement.classList.add("is-scrolled");
    } else {
      headerElement.classList.remove("is-scrolled");
    }
  }

  /**
   * IntersectionObserver로 뷰포트 진입 요소에 페이드인 클래스를 적용한다.
   * @param {{ animatedElements: NodeListOf<Element> }} params
   */
  function initializeScrollRevealAnimations({ animatedElements }) {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      animatedElements.forEach(function revealImmediately(el) { el.classList.add("is-visible"); });
      return;
    }

    const revealObserver = new IntersectionObserver(
      function handleIntersection(entries) {
        entries.forEach(function revealIfIntersecting(entry) {
          if (!entry.isIntersecting) {
            return;
          }
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        });
      },
      { root: null, rootMargin: INTERSECTION_ROOT_MARGIN, threshold: 0.1 }
    );

    animatedElements.forEach(function observeSection(el) { revealObserver.observe(el); });
  }

  /**
   * 모바일 메뉴 열림/닫힘 상태와 접근성 속성을 동기화한다.
   * @param {{ navigationPanel: HTMLElement, toggleButton: HTMLButtonElement, isOpen: boolean }} params
   */
  function syncMobileMenuAccessibilityState({ navigationPanel, toggleButton, isOpen }) {
    navigationPanel.classList.toggle("is-open", isOpen);
    toggleButton.classList.toggle("is-open", isOpen);
    toggleButton.setAttribute("aria-expanded", String(isOpen));
    toggleButton.setAttribute("aria-label", isOpen ? "메뉴 닫기" : "메뉴 열기");
    document.body.style.overflow = isOpen ? "hidden" : "";
  }

  /**
   * 모바일 내비게이션 토글 및 링크 클릭 시 닫기를 설정한다.
   * @param {{ toggleButton: HTMLButtonElement, navigationPanel: HTMLElement, navigationLinks: NodeListOf<HTMLAnchorElement> }} params
   */
  function setupMobileNavigationInteractions({ toggleButton, navigationPanel, navigationLinks }) {
    let isMenuOpen = false;

    function closeMenu() {
      if (!isMenuOpen) return;
      isMenuOpen = false;
      syncMobileMenuAccessibilityState({ navigationPanel, toggleButton, isOpen: false });
    }

    toggleButton.addEventListener("click", function handleToggleClick() {
      isMenuOpen = !isMenuOpen;
      syncMobileMenuAccessibilityState({ navigationPanel, toggleButton, isOpen: isMenuOpen });
    });

    navigationLinks.forEach(function attachCloseOnNavigate(anchorEl) {
      anchorEl.addEventListener("click", closeMenu);
    });

    navigationPanel.addEventListener("click", function closeWhenBackdropClicked(event) {
      if (event.target === navigationPanel) { closeMenu(); }
    });

    window.addEventListener("resize", function closeOnDesktopResize() {
      if (window.innerWidth > 720) { closeMenu(); }
    }, { passive: true });
  }

  /**
   * 데모용 문의 폼: 유효성 검사 후 안내 메시지만 표시한다.
   * @param {{ formElement: HTMLFormElement, hintElement: HTMLElement }} params
   */
  function setupInquiryFormDemoBehavior({ formElement, hintElement }) {
    formElement.addEventListener("submit", function handleInquirySubmit(event) {
      event.preventDefault();

      const formData   = new FormData(formElement);
      const nameValue  = String(formData.get("name")  || "").trim();
      const emailValue = String(formData.get("email") || "").trim();

      if (!nameValue || !emailValue) {
        hintElement.textContent = "이름과 이메일을 입력해 주세요.";
        return;
      }

      hintElement.textContent = "🌸 문의가 접수되었습니다! (데모 — 실제 전송 없음)";
      formElement.reset();
    });
  }

  /**
   * 앵커 링크 클릭 시 헤더 높이만큼 스크롤 오프셋을 보정한다.
   * @param {{ headerElement: HTMLElement }} params
   */
  function setupAnchorScrollOffsetCompensation({ headerElement }) {
    document.querySelectorAll('a[href^="#"]').forEach(function attachAnchorHandler(anchorEl) {
      const targetId = anchorEl.getAttribute("href");
      if (!targetId || targetId === "#") return;

      anchorEl.addEventListener("click", function scrollWithHeaderOffset(event) {
        const targetElement = document.querySelector(targetId);
        if (!targetElement) return;
        event.preventDefault();

        const topPx = targetElement.getBoundingClientRect().top + window.scrollY - headerElement.offsetHeight - 8;
        window.scrollTo({ top: topPx, behavior: "smooth" });
      });
    });
  }

  /**
   * 모든 페이지 인터랙션을 초기화하는 진입점 함수.
   */
  function initializeLandingPageInteractions() {
    const colorThemeToggleButton = document.getElementById("colorThemeToggle");
    initializeColorThemeToggle({ toggleButton: colorThemeToggleButton });

    const headerElement          = document.getElementById("siteHeader");
    const mobileMenuToggleButton = document.getElementById("mobileMenuToggle");
    const primaryNavPanel        = document.getElementById("primaryNavigation");
    const petalShowerContainer   = document.getElementById("petalShower");
    const animatedSectionEls     = document.querySelectorAll("[data-animate]");
    const statNumberElements     = document.querySelectorAll("[data-count-target]");
    const inquiryFormElement     = document.getElementById("inquiryForm");
    const inquiryFormHintElement = document.getElementById("inquiryFormHint");

    if (!headerElement || !mobileMenuToggleButton || !primaryNavPanel) return;

    /* 벚꽃 낙화 파티클 */
    if (petalShowerContainer) {
      initializeCherryBlossomPetalShower({ containerElement: petalShowerContainer });
    }

    /* 헤더 스크롤 상태 */
    applyScrollStateToHeader({ headerElement });
    window.addEventListener("scroll", function () {
      applyScrollStateToHeader({ headerElement });
    }, { passive: true });

    /* 섹션 스크롤 페이드인 */
    initializeScrollRevealAnimations({ animatedElements: animatedSectionEls });

    /* 통계 카운트업 */
    if (statNumberElements.length > 0) {
      initializeStatisticCountUpAnimations({ statNumberElements });
    }

    /* 모바일 내비게이션 */
    setupMobileNavigationInteractions({
      toggleButton:    mobileMenuToggleButton,
      navigationPanel: primaryNavPanel,
      navigationLinks: primaryNavPanel.querySelectorAll("a[href^='#']"),
    });

    /* 앵커 스크롤 오프셋 보정 */
    setupAnchorScrollOffsetCompensation({ headerElement });

    /* 문의 폼 */
    if (inquiryFormElement && inquiryFormHintElement) {
      setupInquiryFormDemoBehavior({
        formElement:  inquiryFormElement,
        hintElement:  inquiryFormHintElement,
      });
    }
  }

  /* DOM 준비 후 실행 */
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeLandingPageInteractions);
  } else {
    initializeLandingPageInteractions();
  }
})();

/* =============================================================================
   AI 챗봇 모듈 — OpenAI API 연동
   ============================================================================= */
(() => {
  /* ── 시스템 프롬프트: 대구 전문 AI 상담사 페르소나 ── */
  const DAEGU_ASSISTANT_SYSTEM_PROMPT = `당신은 대구광역시 공식 AI 관광·투자 상담사입니다.
어떤 내용이던지 답변을 할 수 있습니다.

안내 지침:
- 항상 한국어로 친절하게 답변하세요.
- 벚꽃 시즌(3~4월), 팔공산, 동성로, 대구 근대골목, 수성못, 달성공원, 앞산 등 주요 명소를 잘 알고 있습니다.
- 대구의 특산품(사과, 섬유, 안경테, 한의약), 먹거리(납작만두, 막창, 동인동 찜갈비, 뭉티기)도 안내 가능합니다.
- KTX로 서울에서 1시간 40분, 부산에서 55분 거리라는 교통 편의성을 홍보하세요.
- 모르는 정보는 솔직하게 모른다고 말하고, 공식 홈페이지나 관광안내전화(1330)를 안내하세요.
- 답변은 간결하되 핵심 정보를 포함하세요. 이모지를 적절히 활용해 친근한 분위기를 만드세요.`;

  const OPENAI_API_ENDPOINT = "https://api.openai.com/v1/chat/completions";
  const OPENAI_MODEL_NAME   = "gpt-4.1-mini-2025-04-14";
  const STORAGE_KEY_API_KEY = "daeguChatbotOpenAIApiKey";
  const MAX_CONVERSATION_HISTORY_LENGTH = 20;

  /* ── DOM 요소 참조 ── */
  const chatbotLauncherButton   = document.getElementById("chatbotLauncher");
  const chatbotPanelElement     = document.getElementById("chatbotPanel");
  const chatbotClosePanelButton = document.getElementById("chatbotCloseBtn");
  const chatbotClearHistoryButton = document.getElementById("chatbotClearBtn");
  const chatbotSettingsButton   = document.getElementById("chatbotSettingsBtn");
  const chatbotMessagesContainer = document.getElementById("chatbotMessages");
  const chatbotTextInput        = document.getElementById("chatbotInput");
  const chatbotSendMessageButton = document.getElementById("chatbotSendBtn");
  const chatbotQuickQuestionsContainer = document.getElementById("chatbotQuickQuestions");
  const chatbotApiKeySetupPanel = document.getElementById("chatbotApiKeySetup");
  const chatbotApiKeyInputField = document.getElementById("chatbotApiKeyInput");
  const chatbotApiKeySaveButton = document.getElementById("chatbotApiKeySaveBtn");
  const chatbotApiKeyHintText   = document.getElementById("chatbotApiKeyHint");
  const chatbotUnreadBadge      = document.getElementById("chatbotUnreadBadge");

  if (!chatbotLauncherButton || !chatbotPanelElement) return;

  /* ── 상태 관리 ── */
  let conversationHistory = [];
  let isWaitingForAIResponse = false;
  let isPanelOpen = false;

  /* ── 저장된 API 키 불러오기 ── */
  function loadSavedApiKey() {
    return localStorage.getItem(STORAGE_KEY_API_KEY) || "";
  }

  function saveApiKeyToStorage({ apiKey }) {
    localStorage.setItem(STORAGE_KEY_API_KEY, apiKey.trim());
  }

  function hasValidApiKey() {
    const savedKey = loadSavedApiKey();
    return savedKey.startsWith("sk-") && savedKey.length > 20;
  }

  /* ── 패널 열기/닫기 ── */
  function openChatbotPanel() {
    chatbotPanelElement.hidden = false;
    chatbotLauncherButton.setAttribute("aria-expanded", "true");
    isPanelOpen = true;
    hideUnreadBadge();

    if (!hasValidApiKey()) {
      showApiKeySetupPanel();
    } else {
      hideApiKeySetupPanel();
      chatbotTextInput.focus();
    }
  }

  function closeChatbotPanel() {
    chatbotPanelElement.hidden = true;
    chatbotLauncherButton.setAttribute("aria-expanded", "false");
    isPanelOpen = false;
  }

  function toggleChatbotPanel() {
    if (isPanelOpen) {
      closeChatbotPanel();
    } else {
      openChatbotPanel();
    }
  }

  /* ── API 키 설정 패널 ── */
  function showApiKeySetupPanel() {
    chatbotApiKeySetupPanel.hidden = false;
    const savedKey = loadSavedApiKey();
    if (savedKey) chatbotApiKeyInputField.value = savedKey;
    chatbotApiKeyInputField.focus();
  }

  function hideApiKeySetupPanel() {
    chatbotApiKeySetupPanel.hidden = true;
  }

  function handleApiKeySave() {
    const enteredKey = chatbotApiKeyInputField.value.trim();

    if (!enteredKey) {
      showApiKeyHintMessage({ message: "API 키를 입력해 주세요.", isError: true });
      return;
    }

    if (!enteredKey.startsWith("sk-")) {
      showApiKeyHintMessage({ message: "'sk-'로 시작하는 유효한 API 키를 입력해 주세요.", isError: true });
      return;
    }

    saveApiKeyToStorage({ apiKey: enteredKey });
    showApiKeyHintMessage({ message: "✓ API 키가 저장되었습니다!", isError: false });

    setTimeout(() => {
      hideApiKeySetupPanel();
      chatbotTextInput.focus();
    }, 800);
  }

  function showApiKeyHintMessage({ message, isError }) {
    chatbotApiKeyHintText.textContent = message;
    chatbotApiKeyHintText.style.color = isError ? "#c04f6e" : "#4e8866";
  }

  /* ── 미열람 배지 ── */
  function showUnreadBadge() {
    if (!isPanelOpen) {
      chatbotUnreadBadge.hidden = false;
    }
  }

  function hideUnreadBadge() {
    chatbotUnreadBadge.hidden = true;
  }

  /* ── 현재 시각 표시 문자열 ── */
  function getCurrentTimeLabel() {
    const now = new Date();
    return `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`;
  }

  /* ── 메시지 DOM 요소 생성 ── */
  function createMessageElement({ role, htmlContent }) {
    const messageWrapper = document.createElement("div");
    messageWrapper.className = `chatbot-message chatbot-message--${role === "user" ? "user" : "assistant"}`;

    const bubbleElement = document.createElement("div");
    bubbleElement.className = "chatbot-message__bubble";
    bubbleElement.innerHTML = htmlContent;

    const timeElement = document.createElement("span");
    timeElement.className = "chatbot-message__time";
    timeElement.textContent = getCurrentTimeLabel();

    messageWrapper.appendChild(bubbleElement);
    messageWrapper.appendChild(timeElement);

    return messageWrapper;
  }

  /* ── 타이핑 인디케이터 생성/제거 ── */
  function appendTypingIndicator() {
    const typingWrapper = document.createElement("div");
    typingWrapper.className = "chatbot-message chatbot-message--assistant";
    typingWrapper.id = "chatbotTypingIndicator";

    const indicatorElement = document.createElement("div");
    indicatorElement.className = "chatbot-typing-indicator";
    indicatorElement.innerHTML = `
      <div class="chatbot-typing-indicator__dot"></div>
      <div class="chatbot-typing-indicator__dot"></div>
      <div class="chatbot-typing-indicator__dot"></div>
    `;

    typingWrapper.appendChild(indicatorElement);
    chatbotMessagesContainer.appendChild(typingWrapper);
    scrollToLatestMessage();
    return typingWrapper;
  }

  function removeTypingIndicator() {
    const existingIndicator = document.getElementById("chatbotTypingIndicator");
    if (existingIndicator) existingIndicator.remove();
  }

  /* ── 메시지 스크롤 ── */
  function scrollToLatestMessage() {
    requestAnimationFrame(() => {
      chatbotMessagesContainer.scrollTop = chatbotMessagesContainer.scrollHeight;
    });
  }

  /* ── 사용자 메시지 렌더링 ── */
  function renderUserMessage({ text }) {
    const escapedText = text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\n/g, "<br>");
    const messageElement = createMessageElement({ role: "user", htmlContent: escapedText });
    chatbotMessagesContainer.appendChild(messageElement);
    scrollToLatestMessage();
  }

  /* ── AI 응답 메시지 렌더링 ── */
  function renderAssistantMessage({ text }) {
    const formattedText = text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.*?)\*/g, "<em>$1</em>")
      .replace(/\n/g, "<br>");

    const messageElement = createMessageElement({ role: "assistant", htmlContent: formattedText });
    chatbotMessagesContainer.appendChild(messageElement);
    scrollToLatestMessage();

    if (!isPanelOpen) showUnreadBadge();
  }

  /* ── 에러 메시지 렌더링 ── */
  function renderErrorMessage({ errorText }) {
    const messageWrapper = document.createElement("div");
    messageWrapper.className = "chatbot-message chatbot-message--assistant chatbot-message--error";

    const bubbleElement = document.createElement("div");
    bubbleElement.className = "chatbot-message__bubble";
    bubbleElement.innerHTML = `⚠️ ${errorText}`;

    messageWrapper.appendChild(bubbleElement);
    chatbotMessagesContainer.appendChild(messageWrapper);
    scrollToLatestMessage();
  }

  /* ── 전송 버튼 활성화 상태 제어 ── */
  function updateSendButtonAvailability() {
    const hasText = chatbotTextInput.value.trim().length > 0;
    chatbotSendMessageButton.disabled = !hasText || isWaitingForAIResponse;
  }

  /* ── textarea 높이 자동 조절 ── */
  function adjustTextareaHeightToContent() {
    chatbotTextInput.style.height = "auto";
    chatbotTextInput.style.height = Math.min(chatbotTextInput.scrollHeight, 120) + "px";
  }

  /* ── 대화 내역 초기화 ── */
  function clearConversationHistory() {
    conversationHistory = [];
    chatbotMessagesContainer.innerHTML = "";

    const welcomeMessage = createMessageElement({
      role: "assistant",
      htmlContent: `안녕하세요! 저는 <strong>대구 AI 상담사</strong>입니다 🌸<br>대구의 관광 명소, 봄 축제, 맛집, 교통 정보 등 무엇이든 물어보세요!`,
    });
    chatbotMessagesContainer.appendChild(welcomeMessage);
  }

  /* ── 빠른 질문 버튼 표시/숨김 ── */
  function hideQuickQuestionsPanel() {
    chatbotQuickQuestionsContainer.style.display = "none";
  }

  /* ── OpenAI API 호출 ── */
  async function fetchAIResponseFromOpenAI({ userMessageText }) {
    const apiKey = loadSavedApiKey();

    if (!apiKey || !apiKey.startsWith("sk-")) {
      renderErrorMessage({ errorText: "API 키가 설정되지 않았습니다. 설정(⚙) 버튼을 눌러 API 키를 입력해 주세요." });
      return;
    }

    conversationHistory.push({ role: "user", content: userMessageText });

    const trimmedHistory = conversationHistory.slice(-MAX_CONVERSATION_HISTORY_LENGTH);

    const requestMessages = [
      { role: "system", content: DAEGU_ASSISTANT_SYSTEM_PROMPT },
      ...trimmedHistory,
    ];

    isWaitingForAIResponse = true;
    updateSendButtonAvailability();
    const typingIndicatorElement = appendTypingIndicator();

    try {
      const apiResponse = await fetch(OPENAI_API_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model:       OPENAI_MODEL_NAME,
          messages:    requestMessages,
          max_tokens:  800,
          temperature: 0.7,
        }),
      });

      removeTypingIndicator();

      if (!apiResponse.ok) {
        const errorData = await apiResponse.json().catch(() => ({}));
        const errorMessage = errorData?.error?.message || `API 오류 (${apiResponse.status})`;

        if (apiResponse.status === 401) {
          renderErrorMessage({ errorText: "API 키가 유효하지 않습니다. 설정(⚙)에서 키를 다시 확인해 주세요." });
        } else if (apiResponse.status === 429) {
          renderErrorMessage({ errorText: "요청 한도를 초과했습니다. 잠시 후 다시 시도해 주세요." });
        } else {
          renderErrorMessage({ errorText: errorMessage });
        }

        conversationHistory.pop();
        return;
      }

      const responseData = await apiResponse.json();
      const assistantReplyText = responseData.choices?.[0]?.message?.content || "";

      if (!assistantReplyText) {
        renderErrorMessage({ errorText: "응답을 받지 못했습니다. 다시 시도해 주세요." });
        conversationHistory.pop();
        return;
      }

      conversationHistory.push({ role: "assistant", content: assistantReplyText });
      renderAssistantMessage({ text: assistantReplyText });

    } catch (networkError) {
      removeTypingIndicator();
      renderErrorMessage({ errorText: "네트워크 오류가 발생했습니다. 인터넷 연결을 확인해 주세요." });
      conversationHistory.pop();
    } finally {
      isWaitingForAIResponse = false;
      updateSendButtonAvailability();
      chatbotTextInput.focus();
    }
  }

  /* ── 메시지 전송 처리 ── */
  function handleSendMessage() {
    const trimmedMessageText = chatbotTextInput.value.trim();
    if (!trimmedMessageText || isWaitingForAIResponse) return;

    if (!hasValidApiKey()) {
      showApiKeySetupPanel();
      return;
    }

    hideQuickQuestionsPanel();
    renderUserMessage({ text: trimmedMessageText });

    chatbotTextInput.value = "";
    adjustTextareaHeightToContent();
    updateSendButtonAvailability();

    fetchAIResponseFromOpenAI({ userMessageText: trimmedMessageText });
  }

  /* ── 이벤트 연결 ── */
  chatbotLauncherButton.addEventListener("click", toggleChatbotPanel);
  chatbotClosePanelButton.addEventListener("click", closeChatbotPanel);

  chatbotClearHistoryButton.addEventListener("click", clearConversationHistory);

  chatbotSettingsButton.addEventListener("click", () => {
    const isSetupVisible = !chatbotApiKeySetupPanel.hidden;
    if (isSetupVisible) {
      hideApiKeySetupPanel();
    } else {
      showApiKeySetupPanel();
    }
  });

  chatbotApiKeySaveButton.addEventListener("click", handleApiKeySave);

  chatbotApiKeyInputField.addEventListener("keydown", (keyboardEvent) => {
    if (keyboardEvent.key === "Enter") handleApiKeySave();
  });

  chatbotSendMessageButton.addEventListener("click", handleSendMessage);

  chatbotTextInput.addEventListener("keydown", (keyboardEvent) => {
    if (keyboardEvent.key === "Enter" && !keyboardEvent.shiftKey) {
      keyboardEvent.preventDefault();
      handleSendMessage();
    }
  });

  chatbotTextInput.addEventListener("input", () => {
    adjustTextareaHeightToContent();
    updateSendButtonAvailability();
  });

  chatbotQuickQuestionsContainer.addEventListener("click", (clickEvent) => {
    const quickButton = clickEvent.target.closest(".chatbot-quick-btn");
    if (!quickButton) return;

    const questionText = quickButton.dataset.question;
    if (!questionText) return;

    chatbotTextInput.value = questionText;
    adjustTextareaHeightToContent();
    updateSendButtonAvailability();
    handleSendMessage();
  });

  /* Escape 키로 패널 닫기 */
  document.addEventListener("keydown", (keyboardEvent) => {
    if (keyboardEvent.key === "Escape" && isPanelOpen) closeChatbotPanel();
  });
})();

/* =============================================================================
   AI 지브리 이미지 변환 모듈 — OpenAI gpt-image-1 API 연동
   ============================================================================= */
(() => {
  const OPENAI_IMAGE_EDIT_ENDPOINT = "https://api.openai.com/v1/images/edits";
  const GHIBLI_IMAGE_MODEL         = "gpt-image-1";
  const STORAGE_KEY_GHIBLI_API_KEY = "daeguChatbotOpenAIApiKey"; /* 챗봇과 API 키 공유 */

  const GHIBLI_TRANSFORM_PROMPT = `Transform this photograph into a beautiful Studio Ghibli animation style artwork.
Preserve the original composition, subjects, and spatial layout exactly.
Apply the iconic Ghibli aesthetic: soft watercolor-like backgrounds, gentle cel-shaded characters,
lush organic textures, warm pastel color palette with deep rich tones, detailed environmental
storytelling, and the signature hand-painted lighting of Hayao Miyazaki films such as
My Neighbor Totoro, Spirited Away, and Princess Mononoke.
The result should feel like a frame from an official Ghibli production.`;

  /* ── DOM 요소 참조 ── */
  const aiImageNavButton          = document.getElementById("aiImageNavBtn");
  const ghibliModalOverlay        = document.getElementById("ghibliModalOverlay");
  const ghibliModalCloseButton    = document.getElementById("ghibliModalCloseBtn");
  const ghibliDropzone            = document.getElementById("ghibliDropzone");
  const ghibliFileInput           = document.getElementById("ghibliFileInput");
  const ghibliSourcePreviewWrap   = document.getElementById("ghibliSourcePreviewWrap");
  const ghibliSourcePreviewImg    = document.getElementById("ghibliSourcePreviewImg");
  const ghibliRetakeButton        = document.getElementById("ghibliRetakeBtn");
  const ghibliResultPlaceholder   = document.getElementById("ghibliResultPlaceholder");
  const ghibliLoadingPanel        = document.getElementById("ghibliLoading");
  const ghibliLoadingText         = document.getElementById("ghibliLoadingText");
  const ghibliResultPreviewWrap   = document.getElementById("ghibliResultPreviewWrap");
  const ghibliResultPreviewImg    = document.getElementById("ghibliResultPreviewImg");
  const ghibliDownloadButton      = document.getElementById("ghibliDownloadBtn");
  const ghibliErrorPanel          = document.getElementById("ghibliError");
  const ghibliErrorText           = document.getElementById("ghibliErrorText");
  const ghibliRetryButton         = document.getElementById("ghibliRetryBtn");
  const ghibliApiKeyInput         = document.getElementById("ghibliApiKeyInput");
  const ghibliApiKeySaveButton    = document.getElementById("ghibliApiKeySaveBtn");
  const ghibliApiKeyHint          = document.getElementById("ghibliApiKeyHint");
  const ghibliApiKeyDetails       = document.getElementById("ghibliApiKeyDetails");

  if (!aiImageNavButton || !ghibliModalOverlay) return;

  /* ── 상태 ── */
  let currentUploadedFile  = null;
  let isTransformingImage  = false;

  /* ── API 키 관리 ── */
  function loadGhibliApiKey() {
    return localStorage.getItem(STORAGE_KEY_GHIBLI_API_KEY) || "";
  }

  function saveGhibliApiKey({ apiKey }) {
    localStorage.setItem(STORAGE_KEY_GHIBLI_API_KEY, apiKey.trim());
  }

  function hasValidGhibliApiKey() {
    const key = loadGhibliApiKey();
    return key.startsWith("sk-") && key.length > 20;
  }

  /* ── 모달 열기/닫기 ── */
  function openGhibliModal() {
    ghibliModalOverlay.hidden = false;
    document.body.style.overflow = "hidden";

    const savedKey = loadGhibliApiKey();
    if (savedKey) ghibliApiKeyInput.value = savedKey;

    if (!hasValidGhibliApiKey()) {
      ghibliApiKeyDetails.open = true;
    }
  }

  function closeGhibliModal() {
    ghibliModalOverlay.hidden = true;
    document.body.style.overflow = "";
  }

  /* ── 결과 패널 상태 전환 ── */
  function showResultState({ state }) {
    ghibliResultPlaceholder.hidden = state !== "placeholder";
    ghibliLoadingPanel.hidden      = state !== "loading";
    ghibliResultPreviewWrap.hidden = state !== "result";
    ghibliErrorPanel.hidden        = state !== "error";
  }

  /* ── 업로드 존 / 미리보기 전환 ── */
  function showDropzone() {
    ghibliDropzone.hidden          = false;
    ghibliSourcePreviewWrap.hidden = true;
    currentUploadedFile            = null;
    ghibliFileInput.value          = "";
    showResultState({ state: "placeholder" });
  }

  function showSourcePreview({ file }) {
    const objectUrl = URL.createObjectURL(file);
    ghibliSourcePreviewImg.src     = objectUrl;
    ghibliDropzone.hidden          = true;
    ghibliSourcePreviewWrap.hidden = false;
    currentUploadedFile            = file;
  }

  /* ── 업로드된 이미지를 PNG Blob으로 변환 (API 호환) ── */
  function convertImageFileToPngBlob({ imageFile }) {
    return new Promise((resolve, reject) => {
      const img        = new Image();
      const objectUrl  = URL.createObjectURL(imageFile);

      img.onload = () => {
        const MAX_DIMENSION = 1024;
        const scaleFactor   = Math.min(
          MAX_DIMENSION / img.naturalWidth,
          MAX_DIMENSION / img.naturalHeight,
          1
        );
        const canvasWidth   = Math.round(img.naturalWidth  * scaleFactor);
        const canvasHeight  = Math.round(img.naturalHeight * scaleFactor);

        const offscreenCanvas   = document.createElement("canvas");
        offscreenCanvas.width   = canvasWidth;
        offscreenCanvas.height  = canvasHeight;

        const renderingContext  = offscreenCanvas.getContext("2d");
        renderingContext.drawImage(img, 0, 0, canvasWidth, canvasHeight);

        offscreenCanvas.toBlob((pngBlob) => {
          URL.revokeObjectURL(objectUrl);
          if (pngBlob) resolve(pngBlob);
          else reject(new Error("이미지 변환에 실패했습니다."));
        }, "image/png");
      };

      img.onerror = () => {
        URL.revokeObjectURL(objectUrl);
        reject(new Error("이미지 파일을 읽을 수 없습니다."));
      };

      img.src = objectUrl;
    });
  }

  /* ── 로딩 메시지 순환 ── */
  const LOADING_MESSAGES = [
    "지브리 마법을 걸고 있어요... ✨",
    "미야자키 감독의 붓질을 흉내 내는 중... 🎨",
    "토토로와 함께 색칠 중... 🌿",
    "하울의 움직이는 성에서 제작 중... 🏰",
    "모노노케 공주의 숲을 담는 중... 🌲",
    "거의 다 됐어요! 조금만 더 기다려 주세요... 🌸",
  ];

  let loadingMessageIntervalId = null;

  function startLoadingMessageRotation() {
    let messageIndex = 0;
    ghibliLoadingText.textContent = LOADING_MESSAGES[0];
    loadingMessageIntervalId = setInterval(() => {
      messageIndex = (messageIndex + 1) % LOADING_MESSAGES.length;
      ghibliLoadingText.textContent = LOADING_MESSAGES[messageIndex];
    }, 4000);
  }

  function stopLoadingMessageRotation() {
    if (loadingMessageIntervalId) {
      clearInterval(loadingMessageIntervalId);
      loadingMessageIntervalId = null;
    }
  }

  /* ── OpenAI API 호출: 이미지 변환 ── */
  async function requestGhibliTransformation({ imageFile }) {
    const apiKey = loadGhibliApiKey();

    if (!apiKey || !apiKey.startsWith("sk-")) {
      ghibliApiKeyDetails.open = true;
      showResultState({ state: "error" });
      ghibliErrorText.textContent = "API 키가 설정되지 않았습니다. 하단 설정에서 OpenAI API 키를 입력해 주세요.";
      return;
    }

    isTransformingImage = true;
    showResultState({ state: "loading" });
    startLoadingMessageRotation();

    try {
      const pngImageBlob   = await convertImageFileToPngBlob({ imageFile });
      const requestPayload = new FormData();

      requestPayload.append("model",  GHIBLI_IMAGE_MODEL);
      requestPayload.append("image",  pngImageBlob, "source.png");
      requestPayload.append("prompt", GHIBLI_TRANSFORM_PROMPT);
      requestPayload.append("n",      "1");
      requestPayload.append("size",   "1024x1024");

      const apiResponse = await fetch(OPENAI_IMAGE_EDIT_ENDPOINT, {
        method: "POST",
        headers: { "Authorization": `Bearer ${apiKey}` },
        body: requestPayload,
      });

      stopLoadingMessageRotation();

      if (!apiResponse.ok) {
        const errorPayload  = await apiResponse.json().catch(() => ({}));
        const errorMessage  = errorPayload?.error?.message || `API 오류 (${apiResponse.status})`;

        let userFriendlyError = errorMessage;
        if (apiResponse.status === 401) userFriendlyError = "API 키가 유효하지 않습니다. 하단 설정에서 키를 다시 확인해 주세요.";
        if (apiResponse.status === 429) userFriendlyError = "요청 한도를 초과했습니다. 잠시 후 다시 시도해 주세요.";
        if (apiResponse.status === 400) userFriendlyError = "이미지 형식이 지원되지 않거나 파일 크기가 너무 큽니다. 다른 이미지를 시도해 주세요.";

        showResultState({ state: "error" });
        ghibliErrorText.textContent = userFriendlyError;
        return;
      }

      const responseData        = await apiResponse.json();
      const base64ImageData     = responseData?.data?.[0]?.b64_json;
      const imageUrlFromServer  = responseData?.data?.[0]?.url;

      if (!base64ImageData && !imageUrlFromServer) {
        showResultState({ state: "error" });
        ghibliErrorText.textContent = "결과 이미지를 받지 못했습니다. 다시 시도해 주세요.";
        return;
      }

      const resultImageSrc = base64ImageData
        ? `data:image/png;base64,${base64ImageData}`
        : imageUrlFromServer;

      ghibliResultPreviewImg.src    = resultImageSrc;
      ghibliDownloadButton.href     = resultImageSrc;
      showResultState({ state: "result" });

    } catch (networkError) {
      stopLoadingMessageRotation();
      showResultState({ state: "error" });
      ghibliErrorText.textContent = `네트워크 오류: ${networkError.message || "인터넷 연결을 확인해 주세요."}`;
    } finally {
      isTransformingImage = false;
    }
  }

  /* ── 파일 선택 처리 (드롭 / 파일 인풋 공통) ── */
  function handleImageFileSelection({ selectedFile }) {
    if (!selectedFile || !selectedFile.type.startsWith("image/")) return;

    const MAX_FILE_SIZE_BYTES = 20 * 1024 * 1024; // 20MB
    if (selectedFile.size > MAX_FILE_SIZE_BYTES) {
      alert("파일 크기가 20MB를 초과합니다. 더 작은 이미지를 선택해 주세요.");
      return;
    }

    showSourcePreview({ file: selectedFile });
    requestGhibliTransformation({ imageFile: selectedFile });
  }

  /* ── API 키 저장 ── */
  function handleGhibliApiKeySave() {
    const enteredKey = ghibliApiKeyInput.value.trim();

    if (!enteredKey || !enteredKey.startsWith("sk-")) {
      ghibliApiKeyHint.textContent  = "'sk-'로 시작하는 유효한 API 키를 입력해 주세요.";
      ghibliApiKeyHint.style.color  = "#c04f6e";
      return;
    }

    saveGhibliApiKey({ apiKey: enteredKey });
    ghibliApiKeyHint.textContent  = "✓ 저장되었습니다! 이제 이미지를 업로드하세요.";
    ghibliApiKeyHint.style.color  = "#4e8866";

    setTimeout(() => { ghibliApiKeyDetails.open = false; }, 1000);
  }

  /* ── 이벤트: 모달 열기/닫기 ── */
  aiImageNavButton.addEventListener("click", openGhibliModal);
  ghibliModalCloseButton.addEventListener("click", closeGhibliModal);

  ghibliModalOverlay.addEventListener("click", (clickEvent) => {
    if (clickEvent.target === ghibliModalOverlay) closeGhibliModal();
  });

  /* ── 이벤트: 드롭 존 클릭 ── */
  ghibliDropzone.addEventListener("click", () => {
    if (!isTransformingImage) ghibliFileInput.click();
  });

  ghibliDropzone.addEventListener("keydown", (keyboardEvent) => {
    if (keyboardEvent.key === "Enter" || keyboardEvent.key === " ") {
      keyboardEvent.preventDefault();
      ghibliFileInput.click();
    }
  });

  /* ── 이벤트: 파일 인풋 변경 ── */
  ghibliFileInput.addEventListener("change", (changeEvent) => {
    const selectedFile = changeEvent.target.files?.[0];
    if (selectedFile) handleImageFileSelection({ selectedFile });
  });

  /* ── 이벤트: 드래그 앤 드롭 ── */
  ghibliDropzone.addEventListener("dragover", (dragEvent) => {
    dragEvent.preventDefault();
    ghibliDropzone.classList.add("is-dragover");
  });

  ghibliDropzone.addEventListener("dragleave", () => {
    ghibliDropzone.classList.remove("is-dragover");
  });

  ghibliDropzone.addEventListener("drop", (dropEvent) => {
    dropEvent.preventDefault();
    ghibliDropzone.classList.remove("is-dragover");
    const droppedFile = dropEvent.dataTransfer?.files?.[0];
    if (droppedFile) handleImageFileSelection({ selectedFile: droppedFile });
  });

  /* ── 이벤트: 다시 선택 ── */
  ghibliRetakeButton.addEventListener("click", () => {
    if (!isTransformingImage) showDropzone();
  });

  /* ── 이벤트: 오류 재시도 ── */
  ghibliRetryButton.addEventListener("click", () => {
    if (currentUploadedFile && !isTransformingImage) {
      requestGhibliTransformation({ imageFile: currentUploadedFile });
    }
  });

  /* ── 이벤트: API 키 저장 ── */
  ghibliApiKeySaveButton.addEventListener("click", handleGhibliApiKeySave);
  ghibliApiKeyInput.addEventListener("keydown", (keyboardEvent) => {
    if (keyboardEvent.key === "Enter") handleGhibliApiKeySave();
  });

  /* ── 이벤트: Escape 키로 모달 닫기 ── */
  document.addEventListener("keydown", (keyboardEvent) => {
    if (keyboardEvent.key === "Escape" && !ghibliModalOverlay.hidden) {
      closeGhibliModal();
    }
  });
})();
