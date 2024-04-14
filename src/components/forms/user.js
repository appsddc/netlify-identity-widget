import { h, Component } from "preact";
import Message from "./message";
import Button from "./button";

export default class UserForm extends Component {
  constructor(props) {
    super(props);
    this.state = { name: "", email: "", password: "", confirmPassword: "" };
  }

  handleInput = (e) => {
    this.setState({ [e.target.name]: e.target.value });
    // if (this.checkPassowrd(e)) {
    // } else {
    //   this.setState({ [this.state.password]: "" });
    //   // <Message type="password_does_not_match" t={this.props.t} />; // this is not working
    // }
  };

  handleLogin = (e) => {
    e.preventDefault();
    this.props.onSubmit(this.state);
  };

  checkPassowrd = (e) => {
    // this.setState({ [e.target.name]: e.target.value });
    if (this.state.password !== this.state.confirmPassword) {
      this.setState({ confirmPassword: "" });
    }
  };

  render() {
    const { page, message, saving, namePlaceholder, t } = this.props;
    const { name, email, password, confirmPassword } = this.state;

    return (
      <form
        onsubmit={this.handleLogin}
        className={`form ${saving ? "disabled" : ""}`}
      >
        {message && <Message type={message} t={t} />}
        {page.name && (
          <div className="formGroup">
            <label>
              <span className="visuallyHidden">
                {t("form_name_placeholder")}
              </span>
              <input
                className="formControl"
                type="name"
                name="name"
                value={name}
                placeholder={
                  namePlaceholder ? namePlaceholder : t("form_name_label")
                }
                autocapitalize="off"
                required
                oninput={this.handleInput}
              />
              <div className="inputFieldIcon inputFieldName" />
            </label>
          </div>
        )}
        {page.email && (
          <div className="formGroup">
            <label>
              <span className="visuallyHidden">{t("form_name_label")}</span>
              <input
                className="formControl"
                type="email"
                name="email"
                value={email}
                placeholder={t("form_email_placeholder")}
                autocapitalize="off"
                required
                oninput={this.handleInput}
              />
              <div className="inputFieldIcon inputFieldEmail" />
            </label>
          </div>
        )}
        {page.password && (
          <div className="formGroup">
            <label>
              <span className="visuallyHidden">{t("form_password_label")}</span>
              <input
                className="formControl"
                type="password"
                name="password"
                value={password}
                placeholder={t("form_password_placeholder")}
                autocomplete={page.password}
                required
                oninput={this.handleInput}
              />
              {/* <div className="inputFieldIcon inputFieldPassword" /> */}
            </label>
            <label>
              <span className="visuallyHidden">{t("form_password_label")}</span>
              <input
                className="formControl"
                type="password"
                name="confirmPassword"
                value={confirmPassword}
                placeholder={t("Confirm Password")}
                autocomplete={page.password}
                required
                oninput={this.handleInput}
              />
              {/* <div className="inputFieldIcon inputFieldPassword" /> */}
            </label>
          </div>
        )}
        <Button
          saving={saving}
          text={t(page.button)}
          saving_text={t(page.button_saving)}
        />
      </form>
    );
  }
}
