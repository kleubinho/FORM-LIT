import { LitElement, css, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";

/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */

// const formData = {
//     name: ''
// }

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
      gap: 30px 10px;
      width: calc(50vw - 10rem);
    }

    #adress {
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

      grid-column: 1/3;
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
    }

    input {
      color: white;
      border: none;
      border-radius: 0.475rem;
      padding: 20px 15px;
      font-size: 16px;
    }

    input:hover,
    input:focus {
      outline: solid 1px white;
    }

    input::placeholder,
    textarea::placeholder {
      color: white;
    }

    input,
    textarea,
    button {
      font-family: "Montserrat", sans-serif;
      color: white;
    }

    .required {
      border: 1px solid #f5666a;
    }
  `;

  @state() formData: FormDateProps = {
    name: "",
    lastName: "",
    email: "",
    tel: "",
    address: "",
    message: "",
  };

  handleChange(event: Event) {
    const { name, value } = event.target as HTMLInputElement;
    this.formData = { ...this.formData, [name]: value };
  }

  private onSubmit(e: Event) {
    e.preventDefault();
    
    console.log(this.formData);
  }

  nameValidate() {
    let campos = document.getElementById('TESTE')
    
    if(campos?.value?.length < 3) {
      console.log('Nome deve ter pelo menos 3 caracteres')
    }
    console.log(campos);
  }

  render() {
    // console.log(this.formData);
    return html`
      <div>
        <h1>Contate-nos</h1>
        <form class="form">
          <input
          id="TESTE"
            class="required"
            name="name"
            placeholder="Nome"
            value=${String(this.formData.name)}
            @input=${this.nameValidate}
          />
          <input
            class="required"
            name="lastname"
            placeholder="Sobrenome"
            @input=${this.handleChange}
            value=${String(this.formData.lastName)}
          />
          <input
            class="required"
            name="email"
            placeholder="Email"
            @input=${this.handleChange}
            value=${String(this.formData.email)}
          />
          <input
            class="required"
            name="tel"
            placeholder="Telefone"
            @input=${this.handleChange}
            value=${String(this.formData.tel)}
          />
          <input
            class="required"
            name="address"
            id="adress"
            placeholder="Endereço"
            @input=${this.handleChange}
            value=${String(this.formData.address)}
          />
          <textarea
            class="required"
            name="message"
            placeholder="Digite sua mensagem aqui"
            @input=${this.handleChange}
            value=${String(this.formData.message)}
          ></textarea>

          <button @click=${this.onSubmit}>Enviar</button>
        </form>
      </div>
    `;
  }

  // private async getApi() {
  //   const url = "https://pokeapi.co/api/v2/pokemon/ditto";
  //   const response = await fetch(url);
  //   const data = await response.json();
  //   // this.result = data;

  //   console.log("Ué", data);
  // }

  // Api() {
  //   this.getApi();
  // }
}

declare global {
  interface HTMLElementTagNameMap {
    "my-element": MyElement;
  }
}
