import { useEffect, useMemo, useState, type FormEvent } from "react";
import { freshUsers } from "./fixtures";
import { pageCount, parseTheme, usersForPage, validPage, validatePasswordConfirmation, type Theme } from "./logic";
import {
  DEMO_EMAIL,
  DEMO_PASSWORD,
  clearSession,
  createUser,
  deleteUser,
  getCurrentUser,
  listUsers,
  loadSession,
  saveSession,
  signIn,
  signUp,
  updateUser,
} from "./services";
import type { Session, User, UserDraft } from "./types";
import "./styles.css";

const THEME_KEY = "user-management/theme";
const emptyDraft: UserDraft = { firstName: "", lastName: "", email: "" };

function initials(user: User) {
  return `${user.firstName[0]}${user.lastName[0]}`;
}

export default function UserManagementDemo() {
  const [session, setSession] = useState<Session | null>(null);
  const [sessionChecked, setSessionChecked] = useState(false);
  const [authView, setAuthView] = useState<"signup" | "signin">("signup");
  const [theme, setTheme] = useState<Theme>("light");
  const [users, setUsers] = useState<User[]>(freshUsers);
  const [page, setPage] = useState(1);
  const [mode, setMode] = useState<"list" | "create" | "edit">("list");
  const [draft, setDraft] = useState<UserDraft>(emptyDraft);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [deleting, setDeleting] = useState<User | null>(null);
  const [feedback, setFeedback] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const systemDark = window.matchMedia?.("(prefers-color-scheme: dark)").matches ?? false;
    setTheme(parseTheme(localStorage.getItem(THEME_KEY), systemDark));
    const stored = loadSession(sessionStorage);
    if (stored) {
      getCurrentUser(stored.token, stored)
        .then(() => listUsers(stored.token, freshUsers()))
        .then((records) => {
          setUsers(records);
          setSession(stored);
        })
        .catch(() => clearSession(sessionStorage))
        .finally(() => setSessionChecked(true));
    } else {
      setSessionChecked(true);
    }
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") return;
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  const visibleUsers = useMemo(() => usersForPage(users, page), [users, page]);
  const pages = pageCount(users);

  async function authenticate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError("");
    const form = new FormData(event.currentTarget);
    const email = String(form.get("email") ?? "");
    const password = String(form.get("password") ?? "");
    try {
      if (authView === "signup") {
        const mismatch = validatePasswordConfirmation(password, String(form.get("confirmPassword") ?? ""));
        if (mismatch) throw new Error(mismatch);
      }
      const nextSession = authView === "signup" ? await signUp(email, password) : await signIn(email, password);
      saveSession(sessionStorage, nextSession);
      setUsers(await listUsers(nextSession.token, freshUsers()));
      setSession(nextSession);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Authentication failed.");
    } finally {
      setBusy(false);
    }
  }

  function toggleTheme() {
    setTheme((current) => current === "light" ? "dark" : "light");
  }

  function logout() {
    clearSession(sessionStorage);
    setSession(null);
    setAuthView("signin");
    setUsers(freshUsers());
    setFeedback("");
  }

  function openCreate() {
    setDraft(emptyDraft);
    setEditingId(null);
    setMode("create");
    setError("");
  }

  function openEdit(user: User) {
    setDraft({ firstName: user.firstName, lastName: user.lastName, email: user.email });
    setEditingId(user.id);
    setMode("edit");
    setError("");
  }

  async function submitUser(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!session) return;
    setBusy(true);
    setError("");
    try {
      const next = mode === "edit" && editingId !== null
        ? await updateUser(session.token, users, editingId, draft)
        : await createUser(session.token, users, draft);
      setUsers(next);
      setPage(mode === "create" ? pageCount(next) : validPage(page, next));
      setFeedback(mode === "create" ? `${draft.firstName} was created.` : `${draft.firstName} was updated.`);
      setMode("list");
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "The user could not be saved.");
    } finally {
      setBusy(false);
    }
  }

  async function confirmDelete() {
    if (!session || !deleting) return;
    setBusy(true);
    try {
      const next = await deleteUser(session.token, users, deleting.id);
      setUsers(next);
      setPage(validPage(page, next));
      setFeedback(`${deleting.firstName} was deleted.`);
      setDeleting(null);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "The user could not be deleted.");
    } finally {
      setBusy(false);
    }
  }

  if (!sessionChecked) {
    return <section className="um-demo" data-theme={theme}><p className="um-loading">Loading user management…</p></section>;
  }

  if (!session) {
    return (
      <section className="um-demo um-auth" data-theme={theme}>
        <div className="um-auth-copy">
          <div className="um-brand"><span aria-hidden="true">U</span> Userbase</div>
          <p className="um-eyebrow">Deterministic portfolio demo</p>
          <h1>People operations,<br />without the noise.</h1>
          <p>Authenticate, manage a fictional team, and keep every protected operation behind a local session token.</p>
          <div className="um-stat"><strong>14</strong><span>fictional team members<br />ready to explore</span></div>
        </div>
        <div className="um-auth-panel">
          <button className="um-theme" type="button" onClick={toggleTheme} aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}>
            {theme === "light" ? "☾" : "☀"}
          </button>
          <div className="um-auth-card">
            <p className="um-eyebrow">Welcome</p>
            <h2>{authView === "signup" ? "Create your account" : "Sign in to Userbase"}</h2>
            <p>{authView === "signup" ? "Start with a secure local demo session." : "Use the independent seeded administrator account."}</p>
            <div className="um-tabs" role="tablist" aria-label="Authentication">
              <button role="tab" aria-selected={authView === "signup"} type="button" onClick={() => { setAuthView("signup"); setError(""); }}>Sign Up</button>
              <button role="tab" aria-selected={authView === "signin"} type="button" onClick={() => { setAuthView("signin"); setError(""); }}>Sign In</button>
            </div>
            <form key={authView} onSubmit={authenticate} className="um-form">
              <label>Email address<input required type="email" name="email" defaultValue={authView === "signin" ? DEMO_EMAIL : ""} autoComplete="email" /></label>
              <label>Password<input required minLength={8} type="password" name="password" defaultValue={authView === "signin" ? DEMO_PASSWORD : ""} autoComplete={authView === "signin" ? "current-password" : "new-password"} /></label>
              {authView === "signup" && <label>Confirm password<input required minLength={8} type="password" name="confirmPassword" autoComplete="new-password" /></label>}
              {error && <p className="um-error" role="alert">{error}</p>}
              <button className="um-primary" disabled={busy}>{busy ? "Please wait…" : authView === "signup" ? "Create account" : "Sign in"}</button>
            </form>
            {authView === "signin" && <div className="um-credentials"><strong>Demo credentials</strong><span>{DEMO_EMAIL}</span><span>{DEMO_PASSWORD}</span></div>}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="um-demo um-app" data-theme={theme}>
      <aside className="um-sidebar">
        <div className="um-brand"><span aria-hidden="true">U</span> Userbase</div>
        <nav aria-label="Dashboard navigation">
          <a className="active" href="#users"><span aria-hidden="true">⌘</span> Users</a>
          <span><span aria-hidden="true">◇</span> Teams</span>
          <span><span aria-hidden="true">⚙</span> Settings</span>
        </nav>
        <p>Local demo<br /><small>Runtime data only</small></p>
      </aside>
      <main className="um-main" id="users">
        <header className="um-topbar">
          <div><p className="um-eyebrow">User management</p><h1>Hello {session.user.firstName}</h1></div>
          <div className="um-top-actions">
            <button className="um-theme" type="button" onClick={toggleTheme} aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}>{theme === "light" ? "☾" : "☀"}</button>
            <button className="um-avatar" type="button" title={session.user.email}>{initials(session.user)}</button>
            <button className="um-quiet" type="button" onClick={logout}>Sign out</button>
          </div>
        </header>

        {mode === "list" ? (
          <>
            <div className="um-heading">
              <div><h2>Team directory</h2><p>{users.length} people · changes reset on refresh</p></div>
              <button className="um-primary" type="button" onClick={openCreate}>+ Add user</button>
            </div>
            {feedback && <p className="um-success" role="status">✓ {feedback}</p>}
            {users.length ? (
              <div className="um-grid">
                {visibleUsers.map((user, index) => (
                  <article className="um-user-card" data-testid="user-card" key={user.id}>
                    <div className={`um-user-avatar tone-${index % 4}`} aria-hidden="true">{initials(user)}</div>
                    <div className="um-user-copy"><h3>{user.firstName} {user.lastName}</h3><p>{user.email}</p><span>{user.role}</span></div>
                    <div className="um-card-actions">
                      <button type="button" onClick={() => openEdit(user)} aria-label={`Edit ${user.firstName} ${user.lastName}`}>Edit</button>
                      <button type="button" onClick={() => setDeleting(user)} aria-label={`Delete ${user.firstName} ${user.lastName}`}>Delete</button>
                    </div>
                  </article>
                ))}
              </div>
            ) : <p className="um-empty">No users remain. Add someone to restart the directory.</p>}
            <div className="um-pagination" aria-label="Pagination">
              <button type="button" disabled={page === 1} onClick={() => setPage((current) => current - 1)}>← Previous</button>
              <span>Page {page} of {pages}</span>
              <button type="button" disabled={page === pages} onClick={() => setPage((current) => current + 1)}>Next →</button>
            </div>
          </>
        ) : (
          <div className="um-editor">
            <button className="um-back" type="button" onClick={() => setMode("list")}>← Back to directory</button>
            <p className="um-eyebrow">{mode === "create" ? "New team member" : "Edit profile"}</p>
            <h2>{mode === "create" ? "Add a user" : "Update user"}</h2>
            <form className="um-form" onSubmit={submitUser}>
              <div className="um-form-row">
                <label>First name<input required value={draft.firstName} onChange={(event) => setDraft({ ...draft, firstName: event.target.value })} /></label>
                <label>Last name<input required value={draft.lastName} onChange={(event) => setDraft({ ...draft, lastName: event.target.value })} /></label>
              </div>
              <label>Email address<input required type="email" value={draft.email} onChange={(event) => setDraft({ ...draft, email: event.target.value })} /></label>
              {error && <p className="um-error" role="alert">{error}</p>}
              <div className="um-editor-actions"><button type="button" className="um-quiet" onClick={() => setMode("list")}>Cancel</button><button className="um-primary" disabled={busy}>{busy ? "Saving…" : "Save user"}</button></div>
            </form>
          </div>
        )}

        {deleting && (
          <div className="um-modal-backdrop" role="presentation">
            <div className="um-modal" role="alertdialog" aria-modal="true" aria-labelledby="delete-title">
              <span className="um-warning" aria-hidden="true">!</span>
              <h2 id="delete-title">Delete {deleting.firstName}?</h2>
              <p>This removes the user from the runtime-only directory. The original fixture returns on refresh.</p>
              <div><button className="um-quiet" type="button" onClick={() => setDeleting(null)}>Cancel</button><button className="um-danger" type="button" disabled={busy} onClick={confirmDelete}>Delete user</button></div>
            </div>
          </div>
        )}
      </main>
    </section>
  );
}
