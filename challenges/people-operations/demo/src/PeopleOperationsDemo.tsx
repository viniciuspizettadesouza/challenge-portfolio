import { useEffect, useMemo, useState, type FormEvent } from "react";
import { freshUsers } from "./fixtures";
import {
  filterBySuperior,
  pageCount,
  parseTheme,
  searchUsers,
  usersForPage,
  validPage,
  validSuperiorPositions,
  validatePasswordConfirmation,
  type Theme,
} from "./logic";
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
import type { Address, Position, Session, User, UserDraft } from "./types";
import "./styles.css";

const THEME_KEY = "user-management/theme";
const emptyAddress = (): Address => ({
  street: "",
  number: "",
  complement: "",
  district: "",
  city: "",
  state: "",
  postalCode: "",
});
const emptyDraft = (): UserDraft => ({
  firstName: "",
  lastName: "",
  email: "",
  telephone: "",
  position: "Consultant",
  department: "",
  login: "",
  cpf: "",
  superiorId: null,
  address: null,
  password: "",
});

function initials(user: User): string {
  return `${user.firstName[0] ?? ""}${user.lastName[0] ?? ""}`;
}

function fullName(user: User): string {
  return `${user.firstName} ${user.lastName}`;
}

export default function PeopleOperationsDemo() {
  const [session, setSession] = useState<Session | null>(null);
  const [sessionChecked, setSessionChecked] = useState(false);
  const [authView, setAuthView] = useState<"signup" | "signin">("signup");
  const [theme, setTheme] = useState<Theme>("light");
  const [users, setUsers] = useState<User[]>(freshUsers);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [superiorFilter, setSuperiorFilter] = useState<number | "all">("all");
  const [mode, setMode] = useState<"list" | "create" | "edit">("list");
  const [draft, setDraft] = useState<UserDraft>(emptyDraft);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [selected, setSelected] = useState<User | null>(null);
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
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  const filteredUsers = useMemo(
    () => filterBySuperior(searchUsers(users, query), superiorFilter),
    [query, superiorFilter, users],
  );
  const visibleUsers = useMemo(
    () => usersForPage(filteredUsers, page),
    [filteredUsers, page],
  );
  const pages = pageCount(filteredUsers);

  useEffect(() => {
    setPage((current) => validPage(current, filteredUsers));
  }, [filteredUsers]);

  async function authenticate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError("");
    const form = new FormData(event.currentTarget);
    const email = String(form.get("email") ?? "");
    const password = String(form.get("password") ?? "");
    try {
      if (authView === "signup") {
        const mismatch = validatePasswordConfirmation(
          password,
          String(form.get("confirmPassword") ?? ""),
        );
        if (mismatch) throw new Error(mismatch);
      }
      const nextSession = authView === "signup"
        ? await signUp(email, password)
        : await signIn(email, password);
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
    setDraft(emptyDraft());
    setEditingId(null);
    setMode("create");
    setError("");
  }

  function openEdit(user: User) {
    setDraft({ ...user, address: user.address ? { ...user.address } : null, password: "" });
    setEditingId(user.id);
    setSelected(null);
    setMode("edit");
    setError("");
  }

  function updateAddress(field: keyof Address, value: string) {
    setDraft((current) => ({
      ...current,
      address: { ...(current.address ?? emptyAddress()), [field]: value },
    }));
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
      setQuery("");
      setSuperiorFilter("all");
      setPage(mode === "create" ? pageCount(next) : validPage(page, next));
      setFeedback(
        mode === "create"
          ? `${draft.firstName} was created.`
          : `${draft.firstName} was updated.`,
      );
      setMode("list");
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "The person could not be saved.");
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
      setError(caught instanceof Error ? caught.message : "The person could not be deleted.");
    } finally {
      setBusy(false);
    }
  }

  if (!sessionChecked) {
    return <section className="um-demo" data-theme={theme}><p className="um-loading">Loading people operations…</p></section>;
  }

  if (!session) {
    return (
      <section className="um-demo um-auth" data-theme={theme}>
        <div className="um-auth-copy">
          <div className="um-brand"><span aria-hidden="true">P</span> PeopleOps</div>
          <p className="um-eyebrow">Two challenges · one workspace</p>
          <h1>People operations,<br />without the noise.</h1>
          <p>Authenticate, manage a fictional reporting hierarchy, and keep every protected operation behind a local session token.</p>
          <div className="um-stat"><strong>17</strong><span>fictional team members<br />from both source demos</span></div>
        </div>
        <div className="um-auth-panel">
          <button className="um-theme" type="button" onClick={toggleTheme} aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}>
            {theme === "light" ? "☾" : "☀"}
          </button>
          <div className="um-auth-card">
            <p className="um-eyebrow">Welcome</p>
            <h2>{authView === "signup" ? "Create your account" : "Sign in to PeopleOps"}</h2>
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

  const superiorOptions = users.filter(
    (user) =>
      user.id !== editingId &&
      validSuperiorPositions(draft.position).includes(user.position),
  );

  return (
    <section className="um-demo um-app" data-theme={theme}>
      <aside className="um-sidebar">
        <div className="um-brand"><span aria-hidden="true">P</span> PeopleOps</div>
        <nav aria-label="Dashboard navigation">
          <a className="active" href="#people"><span aria-hidden="true">⌘</span> People</a>
          <span><span aria-hidden="true">◇</span> Hierarchy</span>
          <span><span aria-hidden="true">⚙</span> Settings</span>
        </nav>
        <p>Local demo<br /><small>Runtime data only</small></p>
      </aside>
      <main className="um-main" id="people">
        <header className="um-topbar">
          <div><p className="um-eyebrow">People operations</p><h1>Hello {session.user.firstName}</h1></div>
          <div className="um-top-actions">
            <button className="um-theme" type="button" onClick={toggleTheme} aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}>{theme === "light" ? "☾" : "☀"}</button>
            <button className="um-avatar" type="button" title={session.user.email}>{initials(session.user)}</button>
            <button className="um-quiet" type="button" onClick={logout}>Sign out</button>
          </div>
        </header>

        {mode === "list" ? (
          <>
            <div className="um-heading">
              <div><h2>Team directory</h2><p>{filteredUsers.length} of {users.length} people · changes reset on refresh</p></div>
              <button className="um-primary" type="button" onClick={openCreate}>+ Add user</button>
            </div>
            <div className="um-filters">
              <label>Search people<input type="search" placeholder="Name, email or department" value={query} onChange={(event) => { setQuery(event.target.value); setPage(1); }} /></label>
              <label>Reports to<select value={superiorFilter} onChange={(event) => { setSuperiorFilter(event.target.value === "all" ? "all" : Number(event.target.value)); setPage(1); }}><option value="all">Everyone</option>{users.map((user) => <option key={user.id} value={user.id}>{fullName(user)}</option>)}</select></label>
            </div>
            {feedback && <p className="um-success" role="status">✓ {feedback}</p>}
            {visibleUsers.length ? (
              <div className="um-grid">
                {visibleUsers.map((user, index) => (
                  <article className="um-user-card" data-testid="user-card" key={user.id}>
                    <div className={`um-user-avatar tone-${index % 4}`} aria-hidden="true">{initials(user)}</div>
                    <div className="um-user-copy"><h3>{fullName(user)}</h3><p>{user.email}</p><span>{user.position} · {user.department}</span></div>
                    <div className="um-card-actions">
                      <button type="button" onClick={() => setSelected(user)} aria-label={`View ${fullName(user)}`}>View</button>
                      <button type="button" onClick={() => openEdit(user)} aria-label={`Edit ${fullName(user)}`}>Edit</button>
                      <button type="button" onClick={() => setDeleting(user)} aria-label={`Delete ${fullName(user)}`}>Delete</button>
                    </div>
                  </article>
                ))}
              </div>
            ) : <p className="um-empty">No people match these directory filters.</p>}
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
              <div className="um-form-row">
                <label>Email address<input required type="email" value={draft.email} onChange={(event) => setDraft({ ...draft, email: event.target.value })} /></label>
                <label>Telephone<input value={draft.telephone} onChange={(event) => setDraft({ ...draft, telephone: event.target.value })} /></label>
              </div>
              <div className="um-form-row">
                <label>Position<select value={draft.position} onChange={(event) => setDraft({ ...draft, position: event.target.value as Position, superiorId: null })}><option>Director</option><option>Manager</option><option>Consultant</option></select></label>
                <label>Department<input value={draft.department} onChange={(event) => setDraft({ ...draft, department: event.target.value })} /></label>
              </div>
              <div className="um-form-row">
                <label>Login<input required value={draft.login} onChange={(event) => setDraft({ ...draft, login: event.target.value })} /></label>
                <label>CPF<input value={draft.cpf} onChange={(event) => setDraft({ ...draft, cpf: event.target.value })} /></label>
              </div>
              <label>Superior<select value={draft.superiorId ?? ""} onChange={(event) => setDraft({ ...draft, superiorId: event.target.value ? Number(event.target.value) : null })}><option value="">No superior</option>{superiorOptions.map((user) => <option key={user.id} value={user.id}>{fullName(user)} · {user.position}</option>)}</select></label>
              {mode === "create" && <label>Password<input required minLength={8} type="password" value={draft.password} onChange={(event) => setDraft({ ...draft, password: event.target.value })} /><small>Validated for registration and never stored.</small></label>}
              <fieldset className="um-address"><legend>Optional address</legend><div className="um-form-row"><label>Street<input value={draft.address?.street ?? ""} onChange={(event) => updateAddress("street", event.target.value)} /></label><label>Number<input value={draft.address?.number ?? ""} onChange={(event) => updateAddress("number", event.target.value)} /></label></div><div className="um-form-row"><label>Complement<input value={draft.address?.complement ?? ""} onChange={(event) => updateAddress("complement", event.target.value)} /></label><label>District<input value={draft.address?.district ?? ""} onChange={(event) => updateAddress("district", event.target.value)} /></label></div><div className="um-form-row"><label>City<input value={draft.address?.city ?? ""} onChange={(event) => updateAddress("city", event.target.value)} /></label><label>State<input value={draft.address?.state ?? ""} onChange={(event) => updateAddress("state", event.target.value)} /></label></div><label>Postal code<input value={draft.address?.postalCode ?? ""} onChange={(event) => updateAddress("postalCode", event.target.value)} /></label></fieldset>
              {error && <p className="um-error" role="alert">{error}</p>}
              <div className="um-editor-actions"><button type="button" className="um-quiet" onClick={() => setMode("list")}>Cancel</button><button className="um-primary" disabled={busy}>{busy ? "Saving…" : "Save user"}</button></div>
            </form>
          </div>
        )}

        {selected && (
          <div className="um-modal-backdrop" role="presentation">
            <article className="um-modal um-profile" role="dialog" aria-modal="true" aria-labelledby="profile-title">
              <button className="um-modal-close" type="button" onClick={() => setSelected(null)} aria-label="Close profile">×</button>
              <div className="um-user-avatar" aria-hidden="true">{initials(selected)}</div>
              <p className="um-eyebrow">{selected.position} · {selected.department}</p>
              <h2 id="profile-title">{fullName(selected)}</h2>
              <dl><div><dt>Email</dt><dd>{selected.email}</dd></div><div><dt>Telephone</dt><dd>{selected.telephone || "—"}</dd></div><div><dt>Login</dt><dd>{selected.login}</dd></div><div><dt>CPF</dt><dd>{selected.cpf || "—"}</dd></div><div><dt>Superior</dt><dd>{users.find(({ id }) => id === selected.superiorId)?.firstName ?? "—"}</dd></div><div><dt>Direct reports</dt><dd>{users.filter(({ superiorId }) => superiorId === selected.id).length}</dd></div></dl>
              {selected.address && <address>{selected.address.street}, {selected.address.number}{selected.address.complement ? ` · ${selected.address.complement}` : ""}<br />{selected.address.district} · {selected.address.city}/{selected.address.state}<br />{selected.address.postalCode}</address>}
              <div><button className="um-quiet" type="button" onClick={() => setSelected(null)}>Close</button><button className="um-primary" type="button" onClick={() => openEdit(selected)}>Edit profile</button></div>
            </article>
          </div>
        )}

        {deleting && (
          <div className="um-modal-backdrop" role="presentation">
            <div className="um-modal" role="alertdialog" aria-modal="true" aria-labelledby="delete-title">
              <span className="um-warning" aria-hidden="true">!</span>
              <h2 id="delete-title">Delete {deleting.firstName}?</h2>
              <p>This removes the person from the runtime-only directory. Direct reports move to their former superior, and the original fixture returns on refresh.</p>
              <div><button className="um-quiet" type="button" onClick={() => setDeleting(null)}>Cancel</button><button className="um-danger" type="button" disabled={busy} onClick={confirmDelete}>Delete user</button></div>
            </div>
          </div>
        )}
      </main>
    </section>
  );
}
