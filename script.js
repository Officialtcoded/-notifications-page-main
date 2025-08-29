function updateUnreadCount() {
  const unreadItems = document.querySelectorAll(".notification.unread");
  const badge = document.getElementById("unread-count");
  const count = unreadItems.length;
  if (badge) {
    badge.textContent = String(count);
    badge.setAttribute("aria-label", `${count} unread notifications`);
  }
}

function markAllAsRead() {
  document.querySelectorAll(".notification.unread").forEach((item) => {
    item.classList.remove("unread");
    item.dataset.unread = "false";
  });
  updateUnreadCount();
}

function toggleItemRead(itemElement) {
  const isUnread = itemElement.classList.contains("unread");
  if (isUnread) {
    itemElement.classList.remove("unread");
    itemElement.dataset.unread = "false";
  } else {
    itemElement.classList.add("unread");
    itemElement.dataset.unread = "true";
  }
  updateUnreadCount();
}

document.addEventListener("DOMContentLoaded", () => {
  updateUnreadCount();

  const markAllButton = document.getElementById("mark-all");
  if (markAllButton) {
    markAllButton.addEventListener("click", markAllAsRead);
  }

  document.querySelectorAll(".notification").forEach((item) => {
    const focusButton = item.querySelector(".notification__focus");
    if (!focusButton) return;

    focusButton.addEventListener("click", (event) => {
      event.preventDefault();
      toggleItemRead(item);
    });

    focusButton.setAttribute("tabindex", "0");
    focusButton.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        toggleItemRead(item);
      }
    });
  });
});
