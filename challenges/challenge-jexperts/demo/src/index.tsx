import { useEffect, useMemo, useState, type FormEvent } from "react";
import logo from "../../original/frontend/src/assets/logo.jpeg";
import {
  createUser,
  initialUsers,
  searchUsers,
  validateAddress,
  validateProfile,
  type Address,
  type ProfileDraft,
  type User,
} from "./logic";
import "./styles.css";

const STORAGE_KEY = "jexperts-demo-users";

const blankProfile = (): ProfileDraft => ({
  name: "",
  email: "",
  telephone: "",
  position: "",
  login: "",
  password: "",
  cpf: "",
  superior: "",
});

const blankAddress = (): Address => ({
  street: "",
  number: "",
  complement: "",
  district: "",
  city: "",
  state: "",
  cep: "",
});

function UserDetails({ user }: { user: User }) {
  const [showAddress, setShowAddress] = useState(false);

  return (
    <article className="jexperts-user">
      <p>
        <strong>Name:</strong> {user.name}
      </p>
      <p>
        <strong>E-mail:</strong> {user.email}
      </p>
      <p>
        <strong>Telephone:</strong> {user.telephone || "—"}
      </p>
      <p>
        <strong>Position:</strong> {user.position}
      </p>
      <p>
        <strong>Login:</strong> {user.login}
      </p>
      <p>
        <strong>CPF:</strong> {user.cpf}
      </p>
      <p>
        <strong>Superior:</strong> {user.superior || "—"}
      </p>
      <button type="button" onClick={() => setShowAddress((current) => !current)}>
        {showAddress ? "Hide address" : "View address"}
      </button>
      {showAddress && (
        <address>
          {user.address.street}, {user.address.number}
          {user.address.complement ? ` · ${user.address.complement}` : ""}
          <br />
          {user.address.district} · {user.address.city}/{user.address.state}
          <br />
          CEP {user.address.cep}
        </address>
      )}
    </article>
  );
}

export default function JExpertsDemo() {
  const [users, setUsers] = useState(initialUsers);
  const [screen, setScreen] = useState<"directory" | "profile" | "address">(
    "directory",
  );
  const [query, setQuery] = useState("");
  const [showAll, setShowAll] = useState(false);
  const [profile, setProfile] = useState(blankProfile);
  const [address, setAddress] = useState(blankAddress);
  const [formError, setFormError] = useState("");
  const [notice, setNotice] = useState("");

  useEffect(() => {
    try {
      const cached = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "null");
      if (Array.isArray(cached)) setUsers(cached);
    } catch {
      setUsers(initialUsers);
    }
  }, []);

  const visibleUsers = useMemo(
    () => (showAll || query.trim() ? searchUsers(users, query) : []),
    [query, showAll, users],
  );

  function startRegistration() {
    setProfile(blankProfile());
    setAddress(blankAddress());
    setFormError("");
    setScreen("profile");
  }

  function continueToAddress(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const error = validateProfile(profile);
    if (error) {
      setFormError(error);
      return;
    }
    setFormError("");
    setScreen("address");
  }

  function finishRegistration(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const error = validateAddress(address);
    if (error) {
      setFormError(error);
      return;
    }

    const user = createUser(
      profile,
      address,
      Math.max(0, ...users.map(({ id }) => id)) + 1,
    );
    const nextUsers = [user, ...users];
    setUsers(nextUsers);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nextUsers));
    setQuery(user.name);
    setShowAll(false);
    setNotice(`${user.name} was created in this browser. Password was not stored.`);
    setScreen("directory");
  }

  if (screen !== "directory") {
    const isProfile = screen === "profile";

    return (
      <section className="jexperts-demo">
        <header className="jexperts-header">
          <button type="button" onClick={() => setScreen("directory")}>
            <img src={logo.src} alt="JExperts" />
          </button>
          <span>Local employee directory</span>
        </header>

        <main className="jexperts-register">
          <div className="jexperts-steps" aria-label="Registration progress">
            <span className={isProfile ? "active" : "done"}>1 · User</span>
            <i />
            <span className={!isProfile ? "active" : ""}>2 · Address</span>
          </div>

          <div className="jexperts-form-heading">
            <p>Local registration</p>
            <h2>{isProfile ? "Create user" : "Add address"}</h2>
            <span>
              {isProfile
                ? "Complete the fields from the preserved registration form."
                : "This completes the historical address route locally."}
            </span>
          </div>

          {isProfile ? (
            <form className="jexperts-form" onSubmit={continueToAddress}>
              <label>Name *<input required value={profile.name} onChange={(event) => setProfile({ ...profile, name: event.target.value })} /></label>
              <label>E-mail *<input required type="email" value={profile.email} onChange={(event) => setProfile({ ...profile, email: event.target.value })} /></label>
              <label>Telephone<input value={profile.telephone} onChange={(event) => setProfile({ ...profile, telephone: event.target.value })} /></label>
              <label>Position *<input required value={profile.position} onChange={(event) => setProfile({ ...profile, position: event.target.value })} /></label>
              <label>Login *<input required value={profile.login} onChange={(event) => setProfile({ ...profile, login: event.target.value })} /></label>
              <label>Password *<input required type="password" value={profile.password} onChange={(event) => setProfile({ ...profile, password: event.target.value })} /><small>Validated for the flow, never stored.</small></label>
              <label>CPF *<input required value={profile.cpf} onChange={(event) => setProfile({ ...profile, cpf: event.target.value })} /></label>
              <label>Superior<input value={profile.superior} onChange={(event) => setProfile({ ...profile, superior: event.target.value })} /></label>
              {formError && <p className="jexperts-error">{formError}</p>}
              <div className="jexperts-form-actions">
                <button type="button" className="jexperts-secondary" onClick={() => setScreen("directory")}>Cancel</button>
                <button type="submit">Continue</button>
              </div>
            </form>
          ) : (
            <form className="jexperts-form" onSubmit={finishRegistration}>
              <label>Street *<input required value={address.street} onChange={(event) => setAddress({ ...address, street: event.target.value })} /></label>
              <label>Number *<input required value={address.number} onChange={(event) => setAddress({ ...address, number: event.target.value })} /></label>
              <label>Complement<input value={address.complement} onChange={(event) => setAddress({ ...address, complement: event.target.value })} /></label>
              <label>District *<input required value={address.district} onChange={(event) => setAddress({ ...address, district: event.target.value })} /></label>
              <label>City *<input required value={address.city} onChange={(event) => setAddress({ ...address, city: event.target.value })} /></label>
              <label>State *<input required value={address.state} onChange={(event) => setAddress({ ...address, state: event.target.value })} /></label>
              <label>CEP *<input required value={address.cep} onChange={(event) => setAddress({ ...address, cep: event.target.value })} /></label>
              {formError && <p className="jexperts-error">{formError}</p>}
              <div className="jexperts-form-actions">
                <button type="button" className="jexperts-secondary" onClick={() => setScreen("profile")}>Back</button>
                <button type="submit">Create user</button>
              </div>
            </form>
          )}
        </main>
      </section>
    );
  }

  return (
    <section className="jexperts-demo">
      <header className="jexperts-hero">
        <img src={logo.src} alt="JExperts" />
        <button type="button" onClick={startRegistration}>
          Create User
        </button>
      </header>

      <main className="jexperts-directory">
        <button
          type="button"
          className="jexperts-see-all"
          onClick={() => {
            setShowAll(true);
            setQuery("");
          }}
        >
          See all Users
        </button>
        <label>
          <span className="sr-only">Search users by name</span>
          <input
            type="search"
            placeholder="Search users by name"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setShowAll(false);
            }}
          />
        </label>
        <small>Approximate name matching · try “Vincus”</small>
        {notice && <p className="jexperts-notice" aria-live="polite">{notice}</p>}

        <div className="jexperts-results" aria-live="polite">
          {visibleUsers.length ? (
            visibleUsers.map((user) => <UserDetails key={user.id} user={user} />)
          ) : (
            <p className="jexperts-empty">
              {query.trim() ? "No user found :(" : "Select “See all Users” or search by name."}
            </p>
          )}
        </div>
      </main>

      <footer>
        Fictional local records replace the historical Express and MongoDB services.
      </footer>
    </section>
  );
}
