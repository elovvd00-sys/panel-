const tabs = document.querySelectorAll(".tab");
const panels = document.querySelectorAll(".tab-panel");
const status = document.querySelector("#status");

function showStatus(message) {
  status.textContent = message;
  window.setTimeout(() => {
    if (status.textContent === message) status.textContent = "";
  }, 2500);
}

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const targetId = tab.dataset.tab;

    tabs.forEach((item) => item.classList.toggle("active", item === tab));
    panels.forEach((panel) => {
      panel.classList.toggle("active", panel.id === targetId);
    });
  });
});

const settingIds = [
  "interval",
  "delay",
  "retries",
  "smartDelay",
  "inviterDelay",
  "remoteDelay"
];

function saveSettings() {
  const settings = {};

  settingIds.forEach((id) => {
    settings[id] = document.getElementById(id).value;
  });

  localStorage.setItem("interface-settings", JSON.stringify(settings));
}

function loadSettings() {
  try {
    const settings = JSON.parse(
      localStorage.getItem("interface-settings") || "{}"
    );

    settingIds.forEach((id) => {
      if (settings[id] !== undefined) {
        document.getElementById(id).value = settings[id];
      }
    });
  } catch {
    localStorage.removeItem("interface-settings");
  }
}

document.querySelector("#saveButton").addEventListener("click", () => {
  saveSettings();
  showStatus("Настройки сохранены");
});

document.querySelector("#resetButton").addEventListener("click", () => {
  localStorage.removeItem("interface-settings");

  settingIds.forEach((id) => {
    document.getElementById(id).value = id === "retries" ? "3" : "333";
  });

  showStatus("Настройки сброшены");
});

document.querySelectorAll(".stepper").forEach((button) => {
  button.addEventListener("click", () => {
    const input = document.getElementById(button.dataset.step);
    const currentValue = Number(input.value) || 0;
    input.value = currentValue + 1;
  });
});

document.querySelector("#playButton").addEventListener("click", () => {
  showStatus("Кнопка воспроизведения нажата");
});

document.querySelectorAll(".icon-button").forEach((button) => {
  button.addEventListener("click", () => {
    showStatus(`Нажата кнопка: ${button.title}`);
  });
});

document.querySelectorAll(".text-button").forEach((button) => {
  button.addEventListener("click", () => {
    if (button.dataset.action === "reload") {
      location.reload();
    } else {
      showStatus(`Открыт раздел «${button.textContent.trim()}»`);
    }
  });
});

const stopAt = document.querySelector("#stopAt");
const now = new Date();
now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
stopAt.value = now.toISOString().slice(0, 16);

loadSettings();
