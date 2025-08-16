function getUrlParameter(name) {
  const urlParams = new URLSearchParams(window.location.hash.substring(1));
  return urlParams.get(name);
}

function autocompleteAndSubmit() {
  const username = getUrlParameter("username");
  const email = getUrlParameter("email");
  const phone = getUrlParameter("phone");

  const usernameField = document.getElementById("register_username");
  if (usernameField && username) {
    usernameField.value = username;
    usernameField.dispatchEvent(new Event("input", { bubbles: true }));
    usernameField.dispatchEvent(new Event("change", { bubbles: true }));
  }

  const emailField = document.querySelector('input[name="email"]');
  if (emailField && email) {
    emailField.value = email;
    emailField.dispatchEvent(new Event("input", { bubbles: true }));
    emailField.dispatchEvent(new Event("change", { bubbles: true }));
  }

  const phoneField = document.querySelector('input[name="phone"]');
  if (phoneField && phone) {
    phoneField.value = phone;
    phoneField.dispatchEvent(new Event("input", { bubbles: true }));
    phoneField.dispatchEvent(new Event("change", { bubbles: true }));
  }

  const passwordField = document.getElementById("register_password");
  if (passwordField) {
    passwordField.value = "123456";
    passwordField.dispatchEvent(new Event("input", { bubbles: true }));
    passwordField.dispatchEvent(new Event("change", { bubbles: true }));
  }

  const passwordConfirmField = document.getElementById(
    "register_password_confirmation"
  );
  if (passwordConfirmField) {
    passwordConfirmField.value = "123456";
    passwordConfirmField.dispatchEvent(new Event("input", { bubbles: true }));
    passwordConfirmField.dispatchEvent(new Event("change", { bubbles: true }));
  }

  // Click real en el botón submit
  const submitBtn = document.querySelector(
    '#form_register button[type="submit"]'
  );
  if (
    submitBtn &&
    usernameField?.value &&
    emailField?.value &&
    phoneField?.value
  ) {
    console.log("Haciendo click en el botón de registro...");
    setTimeout(() => {
      submitBtn.click(); // Click real
      console.log("Redirigiendo a transactions en 1 segundo...");
      setTimeout(() => {
        window.location.href = "https://mooneymaker.co/account/deposit";
      }, 1500);
    }, 1500); // 1 segundo para validaciones antes de click
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () =>
    setTimeout(autocompleteAndSubmit, 500)
  );
} else {
  setTimeout(autocompleteAndSubmit, 500);
}
