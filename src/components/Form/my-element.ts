import { LitElement, css, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";

/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */

interface FormDateProps {
  name: String;
  lastName: String;
  email: String;
  tel: String;
  address: String;
  message: String;
}

@customElement("my-element")
export class MyElement extends LitElement {
  static styles = css`
    form {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 40px 20px;
      width: calc(50vw - 10rem);
    }

    #adress {
      grid-column: 1/3;
    }

    #area {
      grid-column: 1/3;
    }

    textarea {
      color: white;
      border: none;
      border-radius: 0.475rem;
      padding: 10px;
      font-size: 16px;
      resize: none;
      height: 5rem;
    }

    button {
      color: white;
      border: none;
      border-radius: 0.475rem;
      padding: 20px 15px;
      font-size: 18px;
      cursor: pointer;
    }

    h1 {
      font-weight: bold;
      line-height: 0;
      text-align: center;
      margin-bottom: 50px;
    }

    input {
      color: white;
      border: none;
      border-radius: 0.475rem;
      padding: 20px 15px;
      font-size: 16px;
    }

    input::placeholder,
    textarea::placeholder {
      color: #ccc;
    }

    input,
    textarea,
    button {
      font-family: "Montserrat", sans-serif;
      color: white;
    }

    .inputValidation {
      display: flex;
      flex-direction: column;
      position: relative;
    }

    /* .inputvalidation: {
    } */

    .spanRequired {
      color: #f5666a;
      position: absolute;
      bottom: -30px;
      display: flex;
    }

    .none {
      display: none;
    }

    .required {
      border: 1px solid #f5666a;
    }
  `;

  @state() errorRequired: Record<string, boolean> = {};

  @state() formData: FormDateProps | any = {
    name: "",
    lastName: "",
    email: "",
    tel: "",
    address: "",
    message: "",
  };

  @state() spanRequired: any = "Campo Obrigatório";

  handleChange(event: Event) {
    const { name, value } = event.target as HTMLInputElement;
    this.formData = { ...this.formData, [name]: value };

    console.log(this.formData);
  }

  private onSubmit(e: Event) {
    e.preventDefault();
    const fieldsWithErrors: Record<string, boolean> = {};

    for (const [key, value] of Object.entries(this.formData)) {
      console.log(value === "");
      if (value === "") {
        fieldsWithErrors[key] = true;
      }
    }

    for (const [key, value] of Object.entries(this.formData)) {
      console.log(value === "");
      if (value !== "") {
        fieldsWithErrors[key] = false;
      }
    }

    this.errorRequired = fieldsWithErrors;

    console.log(this.errorRequired.name);

    if (Object.keys(fieldsWithErrors).length === 0) {
      return;
      // Lógica para lidar com o envio do formulário
    }
  }

  render() {
    return html`
      <div>
        <h1>Contate-nos</h1>
        <form class="form">
          <div class="inputValidation">
            <input
              class=${this.errorRequired.name ? "required" : ""}
              name="name"
              placeholder="Nome"
              value=${String(this.formData.name)}
              @input=${this.handleChange}
            />
            <span
              id="span"
              class=${this.errorRequired.name ? "spanRequired" : "none"}
              >${this.spanRequired}</span
            >
          </div>

          <div class="inputValidation">
            <input
              class=${this.errorRequired.lastName ? "required" : ""}
              name="lastName"
              placeholder="Sobrenome"
              @input=${this.handleChange}
              value=${String(this.formData.lastName)}
            />
            <span
              id="span"
              class=${this.errorRequired.lastName ? "spanRequired" : "none"}
              >${this.spanRequired}</span
            >
          </div>

          <div class="inputValidation">
            <input
              class=${this.errorRequired.email ? "required" : ""}
              name="email"
              placeholder="Email"
              @input=${this.handleChange}
              value=${String(this.formData.email)}
            />
            <span
              id="span"
              class=${this.errorRequired.email ? "spanRequired" : "none"}
              >${this.spanRequired}</span
            >
          </div>

          <div class="inputValidation">
            <input
              class=${this.errorRequired.tel ? "required" : ""}
              name="tel"
              placeholder="Telefone"
              @input=${this.handleChange}
              value=${String(this.formData.tel)}
            />
            <span
              id="span"
              class=${this.errorRequired.tel ? "spanRequired" : "none"}
              >${this.spanRequired}</span
            >
          </div>

          <div id="adress" class="inputValidation">
            <input
              class=${this.errorRequired.address ? "required" : ""}
              name="address"
              placeholder="Endereço"
              @input=${this.handleChange}
              value=${String(this.formData.address)}
            />
            <span
              id="span"
              class=${this.errorRequired.address ? "spanRequired" : "none"}
              >${this.spanRequired}</span
            >
          </div>

          <div id="area" class="inputValidation">
            <textarea
              class=${this.errorRequired.message ? "required" : ""}
              name="message"
              placeholder="Digite sua mensagem aqui"
              @input=${this.handleChange}
              value=${String(this.formData.message)}
            ></textarea>
            <span
              id="span"
              class=${this.errorRequired.message ? "spanRequired" : "none"}
              >${this.spanRequired}</span
            >
          </div>

          <button @click=${this.onSubmit}>Enviar</button>
        </form>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "my-element": MyElement;
  }
}
