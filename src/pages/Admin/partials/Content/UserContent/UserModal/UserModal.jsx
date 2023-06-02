import React, { useState } from "react";
import { FaFolderOpen } from "react-icons/fa";
import { BsArrowLeft } from "react-icons/bs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import styles from "./styles.module.scss";
import axios from "axios";
import tippy from "tippy.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserModal = ({ selectedUser, handleCloseModal }) => {
  const [selectedMenuItem, setSelectedMenuItem] = useState("");
  const [showFormSidebar, setShowFormSidebar] = useState(false);

  const [nomeCompleto, setNomeCompleto] = useState(selectedUser.nome);
  const [cpf, setCpf] = useState(selectedUser.cpf);
  const [rg, setRg] = useState(selectedUser.rg);
  const [celular, setCelular] = useState(selectedUser.celular);
  const [telefoneFixo, setTelefoneFixo] = useState(selectedUser.telFixo);
  const [email, setEmail] = useState(selectedUser.email);
  const [usuario, setUsuario] = useState(selectedUser.username);
  const [senha, setSenha] = useState(selectedUser.password);
  const [dataNascimento, setDataNascimento] = useState(
    formatarData(selectedUser.dataNascimento)
  );
  const [profissao, setProfissao] = useState(selectedUser.profissao);
  const [estadoCivil, setEstadoCivil] = useState(selectedUser.estadoCivil);
  const [naturalidade, setNaturalidade] = useState(selectedUser.naturalidade);
  const [nacionalidade, setNacionalidade] = useState(
    selectedUser.nacionalidade
  );
  const [nomeCompletoModificado, setNomeCompletoModificado] = useState(false);
  const [cpfModificado, setCpfModificado] = useState(false);
  const [rgModificado, setRgModificado] = useState(false);
  const [celularModificado, setCelularModificado] = useState(false);
  const [telefoneFixoModificado, setTelefoneFixoModificado] = useState(false);
  const [emailModificado, setEmailModificado] = useState(false);
  const [usuarioModificado, setUsuarioModificado] = useState(false);
  const [senhaModificado, setSenhaModificado] = useState(false);
  const [dataNascimentoModificado, setDataNascimentoModificado] =
    useState(false);
  const [profissaoModificado, setProfissaoModificado] = useState(false);
  const [estadoCivilModificado, setEstadoCivilModificado] = useState(false);
  const [naturalidadeModificada, setNaturalidadeModificada] = useState(false);
  const [nacionalidadeModificada, setNacionalidadeModificada] = useState(false);
  const [ruaModificado, setRuaModificado] = useState(false);
  const [numeroModificado, setNumeroModificado] = useState(false);
  const [complementoModificado, setComplementoModificado] = useState(false);
  const [bairroModificado, setBairroModificado] = useState(false);
  const [cidadeModificado, setCidadeModificado] = useState(false);
  const [estadoModificado, setEstadoModificado] = useState(false);
  const [cepModificado, setCepModificado] = useState(false);
  const [referenciaModificada, setReferenciaModificada] = useState(false);
  const [rua, setRua] = useState(
    (selectedUser.enderecos[0] && selectedUser.enderecos[0].rua) || ""
  );
  const [numero, setNumero] = useState(
    (selectedUser.enderecos[0] && selectedUser.enderecos[0].numero) || ""
  );
  const [complemento, setComplemento] = useState(
    (selectedUser.enderecos[0] && selectedUser.enderecos[0].complemento) || ""
  );
  const [bairro, setBairro] = useState(
    (selectedUser.enderecos[0] && selectedUser.enderecos[0].bairro) || ""
  );
  const [cidade, setCidade] = useState(
    (selectedUser.enderecos[0] && selectedUser.enderecos[0].cidade) || ""
  );
  const [estado, setEstado] = useState(
    (selectedUser.enderecos[0] && selectedUser.enderecos[0].estado) || ""
  );
  const [cep, setCep] = useState(
    (selectedUser.enderecos[0] && selectedUser.enderecos[0].cep) || ""
  );
  const [referencia, setReferencia] = useState(
    (selectedUser.enderecos[0] && selectedUser.enderecos[0].referencia) || ""
  );

  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [telFixo, setTelFixo] = useState("");

  const [cadastroSucesso, setCadastroSucesso] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState(selectedUser.password);
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [nomeFile, setNomeFile] = useState("");
  const [arquivo, setArquivo] = useState(null);

  const [narrativa, setNarrativa] = useState("");
  const [parecerVoluntario, setParecerVoluntario] = useState("");
  const [homologacaoDocente, setHomologacaoDocente] = useState("");
  const [homologacaoComentario, setHomologacaoComentario] = useState("");
  const [narrativaModificada, setNarrativaModificada] = useState(false);
  const [parecerModificado, setParecerModificado] = useState(false);
  const [homologacaoDocenteModificada, setHomologacaoDocenteModificada] =
    useState(false);
  const [homologacaoComentarioModificada, setHomologacaoComentarioModificada] =
    useState(false);
  const [declaracaoSucesso, setDeclaracaoSucesso] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    birthplace: "",
    nationality: "",
    profession: "",
    rg: "",
    cpf: "",
    maritalStatus: "",
    address: "",
    phone: "",
    cellphone: "",
    email: "",
    appointmentDate: "",
    numDependents: 0,
    numUnemployed: 0,
    familyIncome: 0,
    perCapitaIncome: 0,
    fatherName: "",
    motherName: "",
    spouseProfession: "",
    rentExpenses: 0,
    schoolExpenses: 0,
    otherExpenses: 0,
    serviceType: "",
    entryPoint: "",
    observation: "",
  });

  const [descricao, setDescricao] = useState("");
  const [arquivosEnviados, setArquivosEnviados] = useState([
    {
      id: 1,
      nome: "Rgcpf4784648.pdf",
      descricao: "Cópia colorida do RG e CPF.",
    },
    {
      id: 2,
      nome: "Comp14545648.jpg",
      descricao: "Comprovante de Residência - Conta de Energia Maio/2023.",
    },
  ]);

  function formatarData(data) {
    const partes = data.split("-");
    const dia = partes[2];
    const mes = partes[1];
    const ano = partes[0];
    return `${dia}-${mes}-${ano}`;
  }

  const handleNarrativaChange = (e) => {
    setNarrativa(e.target.value);
    setNarrativaModificada(true);
  };

  const handleParecerChange = (e) => {
    setParecerVoluntario(e.target.value);
    setParecerModificado(true);
  };

  const handleHomologacaoDocenteChange = (e) => {
    setHomologacaoDocente(e.target.value);
    setHomologacaoDocenteModificada(true);
  };

  const handleHomologacaoComentarioChange = (e) => {
    setHomologacaoComentario(e.target.value);
    setHomologacaoComentarioModificada(true);
  };

  const formSidebarItems = [
    { label: "Análise Socioeconômica", icon: "chart-bar" },
    { label: "Declaração Inicial", icon: "file-alt" },
  ];

  const menuItems = [
    { label: "Formulários", icon: "dashboard", sidebarItems: formSidebarItems },
    { label: "Documentos", icon: "users" },
    { label: "Alterar cadastro", icon: "cog" },
  ];

  function handleSubmit(e) {
    e.preventDefault();
    const formattedDate = formatDate(dataNascimento);
    const updatedData = {};

    const fieldsToUpdate = {};

    if (parecerModificado) {
      fieldsToUpdate.parecerVoluntario = parecerVoluntario;
    }

    if (narrativaModificada) {
      fieldsToUpdate.narrativa = narrativa;
    }

    if (homologacaoDocenteModificada) {
      fieldsToUpdate.homologacaoDocente = homologacaoDocente;
    }

    if (homologacaoComentarioModificada) {
      fieldsToUpdate.homologacaoComentario = homologacaoComentario;
    }

    if (Object.keys(fieldsToUpdate).length > 0) {
      if (!selectedUser.declaracaoInicial) {
        // Requisição POST
        axios
          .post(
            `https://astepi-unicap.herokuapp.com/usuarios/${selectedUser.id}/declaracao`,
            fieldsToUpdate
          )
          .then(() => {
            setDeclaracaoSucesso(true);
            toast.success("Declaração Inicial gravada com sucesso!");
            setTimeout(() => {
              window.location.reload();
            }, 5000);
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
        // Requisição PUT
        axios
          .put(
            `https://astepi-unicap.herokuapp.com/declaracoes/${selectedUser.declaracaoInicial.id}`,
            fieldsToUpdate
          )
          .then(() => {
            console.log("Campos atualizados com sucesso!");
            setParecerModificado(false);
            setNarrativaModificada(false);
            setHomologacaoDocenteModificada(false);
            setHomologacaoComentarioModificada(false);

            setDeclaracaoSucesso(true);
            toast.success("Declaração Inicial atualizada com sucesso!");
            setTimeout(() => {
              window.location.reload();
            }, 5000);
          })
          .catch((error) => {
            console.error("Erro ao atualizar campos:", error);
          });
      }
    } else {
      console.log("Nenhum campo modificado");
    }
  }

  const handleNomeCompletoChange = (e) => {
    setNomeCompleto(e.target.value);
    setNomeCompletoModificado(true);
  };

  const handleCpfChange = (e) => {
    setCpf(e.target.value);
    setCpfModificado(true);
  };

  const handleRgChange = (e) => {
    setRg(e.target.value);
    setRgModificado(true);
  };

  const handleCelularChange = (e) => {
    setCelular(e.target.value);
    setCelularModificado(true);
  };

  const handleTelefoneFixoChange = (e) => {
    setTelefoneFixo(e.target.value);
    setTelefoneFixoModificado(true);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailModificado(true);
  };

  const handleUsuarioChange = (e) => {
    setUsuario(e.target.value);
    setUsuarioModificado(true);
  };

  const handleSenhaChange = (e) => {
    setSenha(e.target.value);
    setSenhaModificado(true);
  };

  const handleDataNascimentoChange = (e) => {
    setDataNascimento(e.target.value);
    setDataNascimentoModificado(true);
  };

  const handleProfissaoChange = (e) => {
    setProfissao(e.target.value);
    setProfissaoModificado(true);
  };

  const handleEstadoCivilChange = (e) => {
    setEstadoCivil(e.target.value);
    setEstadoCivilModificado(true);
  };

  const handleNaturalidadeChange = (e) => {
    setNaturalidade(e.target.value);
    setNaturalidadeModificada(true);
  };

  const handleNacionalidadeChange = (e) => {
    setNacionalidade(e.target.value);
    setNacionalidadeModificada(true);
  };

  const handleRuaChange = (e) => {
    setRua(e.target.value);
    setRuaModificado(true);
  };

  const handleNumeroChange = (e) => {
    setNumero(e.target.value);
    setNumeroModificado(true);
  };

  const handleComplementoChange = (e) => {
    setComplemento(e.target.value);
    setComplementoModificado(true);
  };

  const handleBairroChange = (e) => {
    setBairro(e.target.value);
    setBairroModificado(true);
  };

  const handleCidadeChange = (e) => {
    setCidade(e.target.value);
    setCidadeModificado(true);
  };

  const handleEstadoChange = (e) => {
    setEstado(e.target.value);
    setEstadoModificado(true);
  };

  const handleCepChange = (e) => {
    setCep(e.target.value);
    setCepModificado(true);
  };

  const handleReferenciaChange = (e) => {
    setReferencia(e.target.value);
    setReferenciaModificada(true);
  };

  const handleSubmitAlterarCadastro = (e) => {
    e.preventDefault();

    const fieldsToUpdate = {};
    const enderecoToUpdate = {};

    if (nomeCompletoModificado) {
      fieldsToUpdate.nome = nomeCompleto;
    }

    if (cpfModificado) {
      fieldsToUpdate.cpf = cpf;
    }

    if (rgModificado) {
      fieldsToUpdate.rg = rg;
    }

    if (celularModificado) {
      fieldsToUpdate.celular = celular;
    }

    if (telefoneFixoModificado) {
      fieldsToUpdate.telFixo = telefoneFixo;
    }

    if (emailModificado) {
      fieldsToUpdate.email = email;
    }

    if (usuarioModificado) {
      fieldsToUpdate.username = usuario;
    }

    if (senhaModificado) {
      fieldsToUpdate.password = senha;
    }

    {
      /*if (dataNascimentoModificado) {
      const novaData = formatarData(dataNascimento);
      fieldsToUpdate.dataNascimento = novaData;
      console.log(novaData)
    }*/
    }

    if (profissaoModificado) {
      fieldsToUpdate.profissao = profissao;
    }

    if (estadoCivilModificado) {
      fieldsToUpdate.estadoCivil = estadoCivil;
    }

    if (naturalidadeModificada) {
      fieldsToUpdate.naturalidade = naturalidade;
    }

    if (nacionalidadeModificada) {
      fieldsToUpdate.nacionalidade = nacionalidade;
    }

    {
      /*console.log(dataNascimento)
    const testando = formatarData(dataNascimento);
  console.log(testando)*/
    }

    if (ruaModificado) {
      enderecoToUpdate.rua = rua;
    }

    if (numeroModificado) {
      enderecoToUpdate.numero = numero;
    }

    if (complementoModificado) {
      enderecoToUpdate.complemento = complemento;
    }

    if (bairroModificado) {
      enderecoToUpdate.bairro = bairro;
    }

    if (cidadeModificado) {
      enderecoToUpdate.cidade = cidade;
    }

    if (estadoModificado) {
      enderecoToUpdate.estado = estado;
    }

    if (cepModificado) {
      enderecoToUpdate.cep = cep;
    }

    if (referenciaModificada) {
      enderecoToUpdate.referencia = referencia;
    }

    if (Object.keys(fieldsToUpdate).length > 0) {
      axios
        .put(
          `https://astepi-unicap.herokuapp.com/usuarios/${selectedUser.id}`,
          fieldsToUpdate
        )
        .then(() => {
          console.log("Campos de usuario atualizados com sucesso!");
          setNomeCompletoModificado(false);
          setCpfModificado(false);
          setRgModificado(false);
          setCelularModificado(false);
          setTelefoneFixoModificado(false);
          setEmailModificado(false);
          setUsuarioModificado(false);
          setSenhaModificado(false);
          setDataNascimentoModificado(false);
          setProfissaoModificado(false);
          setEstadoCivilModificado(false);
          setNaturalidadeModificada(false);
          setNacionalidadeModificada(false);

          setDeclaracaoSucesso(true);
          toast.success("Alteração de cadastro realizada com sucesso!");
          setTimeout(() => {
            window.location.reload();
          }, 5000);
        })
        .catch((error) => {
          console.error("Erro ao atualizar campos de usuario:", error);
        });
    } else {
      console.log("Nenhum campo de usuario modificado");
    }

    if (Object.keys(enderecoToUpdate).length > 0) {
      axios
        .put(
          `https://astepi-unicap.herokuapp.com/enderecos/${selectedUser.enderecos[0]?.id}`,
          enderecoToUpdate
        )
        .then(() => {
          console.log("Endereco atualizado com sucesso!");
          setRuaModificado(false);
          setNumeroModificado(false);
          setComplementoModificado(false);
          setBairroModificado(false);
          setCidadeModificado(false);
          setEstadoModificado(false);
          setCepModificado(false);
          setReferenciaModificada(false);

          setDeclaracaoSucesso(true);
          toast.success("Alteração de endereço realizada com sucesso!");
          setTimeout(() => {
            window.location.reload();
          }, 5000);
        })
        .catch((error) => {
          console.error("Erro ao atualizar campos de endereco:", error);
        });
    } else {
      console.log("Nenhum campo de endereco modificado");
    }
  };

  const handleMenuItemClick = (label) => {
    setSelectedMenuItem(label);

    if (label === "Formulários") {
      setShowFormSidebar(true);
    } else {
      setShowFormSidebar(false);
    }
  };

  const handleBackButtonClick = () => {
    setShowFormSidebar(false);
    setSelectedMenuItem("");
  };

  const handleCloseClick = () => {
    handleCloseModal();
  };

  const renderSidebarItems = () => {
    if (showFormSidebar) {
      return formSidebarItems.map((item) => (
        <div
          key={item.label}
          className={`${styles.sidebarItem} ${
            selectedMenuItem === item.label ? styles.selected : ""
          }`}
          onClick={() => setSelectedMenuItem(item.label)}
          style={{ cursor: "pointer" }}
        >
          <i className={`fas fa-${item.icon} ${styles.sidebarIcon}`}></i>
          {item.label}
        </div>
      ));
    }

    return menuItems.map((item) => (
      <div
        key={item.label}
        className={`${styles.sidebarItem} ${
          selectedMenuItem === item.label ? styles.selected : ""
        }`}
        onClick={() => handleMenuItemClick(item.label)}
        style={{ cursor: "pointer" }}
      >
        <i className={`fas fa-${item.icon} ${styles.sidebarIcon}`}></i>
        {item.label}
      </div>
    ));
  };

  tippy("[data-tippy-content]");

  function formatDate(dateStr) {
    const dateParts = dateStr.split("-");
    const day = dateParts[2];
    const month = dateParts[1];
    const year = dateParts[0];
    return `${day}-${month}-${year}`;
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleConfirmPasswordBlur = () => {
    if (password !== confirmPassword) {
      setPasswordMatch(false);
      window.alert("As senhas não coincidem.");
    } else {
      setPasswordMatch(true);
    }
  };

  const handleFileChange = (e) => {
    setArquivo(e.target.files[0]);
  };

  const handleDescricaoChange = (e) => {
    setDescricao(e.target.value);
  };

  const renderContent = () => {
    if (selectedMenuItem === "Declaração Inicial") {
      return (
        <div className={styles.declaracaoInicial}>
          <h2>Declaração Inicial</h2>
          <form onSubmit={handleSubmit}>
            {selectedUser.declaracaoInicial?.homologacaoDocente === "sim" && (
              <div style={{ color: "green", fontWeight: "bold" }}>
                -------- HOMOLOGADA PELO ADVOGADO PROFESSOR --------
              </div>
            )}

            {selectedUser.declaracaoInicial?.homologacaoDocente === "nao" && (
              <div style={{ color: "red", fontWeight: "bold" }}>
                -------- NÃO HOMOLOGADA PELO ADVOGADO PROFESSOR --------
              </div>
            )}

            {(selectedUser.declaracaoInicial?.parecerVoluntario === "" ||
              selectedUser.declaracaoInicial?.parecerVoluntario === undefined ||
              selectedUser.declaracaoInicial?.parecerVoluntario === null) &&
              selectedUser.declaracaoInicial !== null &&
              selectedUser.declaracaoInicial?.narrativa !== null && (
                <div style={{ color: "mediumpurple", fontWeight: "bold" }}>
                  ----------- AGUARDANDO PARECER DO ADVOGADO VOLUNTÁRIO
                  -----------
                </div>
              )}
            <br />

            {(selectedUser.declaracaoInicial?.homologacaoDocente === "" ||
              selectedUser.declaracaoInicial?.homologacaoDocente ===
                undefined ||
              selectedUser.declaracaoInicial?.homologacaoDocente === null) &&
              selectedUser.declaracaoInicial !== null &&
              selectedUser.declaracaoInicial?.narrativa !== null && (
                <div style={{ color: "mediumblue", fontWeight: "bold" }}>
                  -------- AGUARDANDO HOMOLOGAÇÃO DO ADVOGADO PROFESSOR --------
                </div>
              )}

            <br />
            <div className={styles.formGroup}>
              <label htmlFor="nomeCompleto">Nome Completo:</label>
              <input
                type="text"
                id="nomeCompleto"
                name="nomeCompleto"
                value={selectedUser.nome}
                readOnly
                disabled
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="naturalidade">Naturalidade:</label>
              <input
                type="text"
                id="naturalidade"
                name="naturalidade"
                value={selectedUser.naturalidade}
                readOnly
                disabled
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="nacionalidade">Nacionalidade:</label>
              <input
                type="text"
                id="nacionalidade"
                name="nacionalidade"
                value={selectedUser.nacionalidade}
                readOnly
                disabled
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="profissao">Profissão:</label>
              <input
                type="text"
                id="profissao"
                name="profissao"
                value={selectedUser.profissao}
                readOnly
                disabled
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="rg">RG:</label>
              <input
                type="text"
                id="rg"
                name="rg"
                value={selectedUser.rg}
                readOnly
                disabled
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="cpf">CPF:</label>
              <input
                type="text"
                id="cpf"
                name="cpf"
                value={selectedUser.cpf}
                readOnly
                disabled
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="estadoCivil">Estado Civil:</label>
              <input
                type="text"
                id="estadoCivil"
                name="estadoCivil"
                value={selectedUser.estadoCivil}
                readOnly
                disabled
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="enderecoCompleto">Endereço Completo:</label>
              {selectedUser &&
                selectedUser.enderecos &&
                selectedUser.enderecos.length > 0 && (
                  <textarea
                    id="enderecoCompleto"
                    name="enderecoCompleto"
                    value={`${selectedUser.enderecos[0]?.rua ?? ""} ${
                      selectedUser.enderecos[0]?.numero ?? ""
                    } ${selectedUser.enderecos[0]?.complemento ?? ""} ${
                      selectedUser.enderecos[0]?.bairro ?? ""
                    } ${selectedUser.enderecos[0]?.cidade ?? ""} ${
                      selectedUser.enderecos[0]?.estado ?? ""
                    } ${selectedUser.enderecos[0]?.cep ?? ""}`}
                    readOnly
                    disabled
                    rows="2"
                    cols="50"
                  ></textarea>
                )}
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="telefoneFixo">Telefone Fixo:</label>
              <input
                type="text"
                id="telefoneFixo"
                name="telefoneFixo"
                value={selectedUser.telFixo}
                readOnly
                disabled
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="celular">Celular:</label>
              <input
                type="text"
                id="celular"
                name="celular"
                value={selectedUser.celular}
                readOnly
                disabled
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="email">E-mail:</label>
              <input
                type="text"
                id="email"
                name="email"
                value={selectedUser.email}
                readOnly
                disabled
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="dataComparecimento">
                Data de Comparecimento:
              </label>
              <input
                type="date"
                id="dataComparecimento"
                name="dataComparecimento"
                value={selectedUser.dataComparecimento}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="narrativa">Narrativa:</label>
              {selectedUser.declaracaoInicial?.narrativa ? (
                <textarea
                  id="narrativa"
                  name="narrativa"
                  disabled
                  rows="6"
                  cols="55"
                  value={selectedUser.declaracaoInicial?.narrativa ?? ""}
                ></textarea>
              ) : (
                <textarea
                  id="narrativa"
                  name="narrativa"
                  value={narrativa}
                  onChange={handleNarrativaChange}
                  rows="6"
                  cols="55"
                ></textarea>
              )}
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="parecer">Parecer:</label>
              {selectedUser.declaracaoInicial?.parecerVoluntario ? (
                <textarea
                  id="parecer"
                  name="parecer"
                  disabled
                  onChange={(e) => setParecerVoluntario(e.target.value)}
                  rows="6"
                  cols="55"
                  value={
                    selectedUser.declaracaoInicial?.parecerVoluntario ?? ""
                  }
                ></textarea>
              ) : (
                <textarea
                  id="parecer"
                  name="parecer"
                  value={parecerVoluntario}
                  onChange={handleParecerChange}
                  rows="6"
                  cols="55"
                ></textarea>
              )}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="homologacaoDocente">Homologação Docente:</label>
              {selectedUser.declaracaoInicial?.homologacaoDocente != null ? (
                <>
                  <select
                    id="homologacaoDocente"
                    name="homologacaoDocente"
                    disabled
                    value={selectedUser.declaracaoInicial?.homologacaoDocente}
                  >
                    <option value="sim">Sim</option>
                    <option value="nao">Não</option>
                  </select>
                  {selectedUser.declaracaoInicial?.homologacaoDocente ===
                    "nao" && (
                    <>
                      <br />
                      <label htmlFor="homologacaoInput">
                        Novo Encaminhamento:
                      </label>
                      <textarea
                        id="homologacaoInput"
                        name="homologacaoInput"
                        rows="3"
                        cols="40"
                        disabled
                        value={
                          selectedUser.declaracaoInicial
                            ?.homologacaoComentario ?? ""
                        }
                      ></textarea>
                    </>
                  )}
                </>
              ) : (
                <>
                  <select
                    id="homologacaoDocente"
                    name="homologacaoDocente"
                    value={homologacaoDocente}
                    onChange={(e) => {
                      if (e.target.value === "") {
                        setHomologacaoDocente(null);
                      } else {
                        handleHomologacaoDocenteChange(e);
                      }
                    }}
                  >
                    <option value="">Selecionar</option>
                    <option value="sim">Sim</option>
                    <option value="nao">Não</option>
                  </select>
                  {homologacaoDocente === "nao" && (
                    <>
                      <br />
                      <label htmlFor="homologacaoInput">
                        Novo Encaminhamento:
                      </label>
                      <textarea
                        id="homologacaoInput"
                        name="homologacaoInput"
                        rows="3"
                        cols="40"
                        value={homologacaoComentario}
                        onChange={handleHomologacaoComentarioChange}
                      ></textarea>
                    </>
                  )}
                </>
              )}
            </div>

            <button type="submit">Enviar</button>
          </form>
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar
          />
        </div>
      );
    } else if (selectedMenuItem === "Documentos") {
      return (
        <>
          <form className={styles.cadastroForm}>
            <h2>Envio e Download de Documentos</h2>
            <br />
            <label>
              Descrição:
              <input type="text" value={descricao} required />
            </label>
            <br />
            <label>
              Arquivo:
              <input type="file" required />
            </label>
            <br />
            <button type="submit">Enviar</button>
          </form>
          <div>
            <h3>Arquivos enviados</h3>
            {arquivosEnviados.map((arquivo) => (
              <div key={arquivo.id}>
                <p>Nome: {arquivo.nome}</p>
                <p>Descrição: {arquivo.descricao}</p>
                <button
                  disabled={!arquivo.link} // Desabilita o botão se não houver link para download
                >
                  Baixar
                </button>
                <hr />
              </div>
            ))}
          </div>
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar
          />
        </>
      );
    } else if (selectedMenuItem === "Alterar cadastro") {
      return (
        <>
          <form
            className={styles.cadastroForm}
            onSubmit={handleSubmitAlterarCadastro}
          >
            <h2>Alteração de Cadastro</h2>
            <label>
              Nome completo:
              <input
                type="text"
                placeholder=""
                id="nomeCompleto"
                value={nomeCompleto}
                onChange={(e) => {
                  setNomeCompleto(e.target.value);
                  handleNomeCompletoChange(e);
                }}
              />
            </label>
            <br />
            <label>
              CPF:
              <input
                type="text"
                value={cpf}
                onChange={(e) => {
                  setCpf(e.target.value);
                  handleCpfChange(e);
                }}
              />
            </label>
            <br />
            <label>
              RG:
              <input
                type="text"
                value={rg}
                onChange={(e) => {
                  setRg(e.target.value);
                  handleRgChange(e);
                }}
              />
            </label>
            <br />
            <label>
              Celular:
              <input
                type="text"
                value={celular}
                onChange={(e) => {
                  setCelular(e.target.value);
                  handleCelularChange(e);
                }}
              />
            </label>
            <br />
            <label>
              Telefone Fixo:
              <input
                type="text"
                value={telefoneFixo}
                onChange={(e) => {
                  setTelefoneFixo(e.target.value);
                  handleTelefoneFixoChange(e);
                }}
              />
            </label>
            <br />
            <label>
              E-mail:
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  handleEmailChange(e);
                }}
              />
            </label>
            <br />
            <label>
              Login:
              <input
                type="text"
                value={usuario}
                onChange={(e) => {
                  setUsuario(e.target.value);
                  handleUsuarioChange(e);
                }}
              />
            </label>
            <br />
            <label>
              Senha:
              <input
                type="password"
                value={senha}
                onChange={(e) => {
                  setSenha(e.target.value);
                  handleSenhaChange(e);
                  handlePasswordChange(e);
                }}
              />
            </label>
            {/*<br />
          <label>
            Confirmar Senha:
            <input
              type="password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              onBlur={handleConfirmPasswordBlur}
            />
      </label>*/}
            <br />
            <label>
              Data de Nascimento:
              <input
                type="date"
                disabled
                value={dataNascimento}
                onChange={(e) => {
                  setDataNascimento(e.target.value);
                  handleDataNascimentoChange(e);
                }}
                placeholder="dd-mm-aaaa"
              />
            </label>
            <br />
            <label>
              Profissão:
              <input
                type="text"
                value={profissao}
                onChange={(e) => {
                  setProfissao(e.target.value);
                  handleProfissaoChange(e);
                }}
              />
            </label>
            <br />
            <label>
              Estado Civil:
              <select
                value={estadoCivil}
                onChange={(e) => {
                  setEstadoCivil(e.target.value);
                  handleEstadoCivilChange(e);
                }}
              >
                <option value="">Selecione</option>
                <option value="solteiro(a)">Solteiro(a)</option>
                <option value="casado(a)">Casado(a)</option>
                <option value="divorciado(a)">Divorciado(a)</option>
                <option value="viuvo(a)">Viúvo(a)</option>
              </select>
            </label>
            <br />
            <label>
              Naturalidade:
              <input
                type="text"
                value={naturalidade}
                onChange={(e) => {
                  setNaturalidade(e.target.value);
                  handleNaturalidadeChange(e);
                }}
              />
            </label>
            <br />
            <label>
              Nacionalidade:
              <input
                type="text"
                value={nacionalidade}
                onChange={(e) => {
                  setNacionalidade(e.target.value);
                  handleNacionalidadeChange(e);
                }}
              />
            </label>
            <br />
            <h3>Endereço</h3>
            <label>
              Rua:
              <input
                type="text"
                value={rua}
                onChange={(e) => {
                  setRua(e.target.value);
                  handleRuaChange(e);
                }}
              />
            </label>
            <br />
            <label>
              Número:
              <input
                type="text"
                value={numero}
                onChange={(e) => {
                  setNumero(e.target.value);
                  handleNumeroChange(e);
                }}
              />
            </label>
            <br />
            <label>
              Complemento:
              <input
                type="text"
                value={complemento}
                onChange={(e) => {
                  setComplemento(e.target.value);
                  handleComplementoChange(e);
                }}
              />
            </label>
            <br />
            <label>
              Bairro:
              <input
                type="text"
                value={bairro}
                onChange={(e) => {
                  setBairro(e.target.value);
                  handleBairroChange(e);
                }}
              />
            </label>
            <br />
            <label>
              Cidade:
              <input
                type="text"
                value={cidade}
                onChange={(e) => {
                  setCidade(e.target.value);
                  handleCidadeChange(e);
                }}
              />
            </label>
            <br />
            <label>
              Estado:
              <input
                type="text"
                value={estado}
                onChange={(e) => {
                  setEstado(e.target.value);
                  handleEstadoChange(e);
                }}
              />
            </label>
            <br />
            <label>
              CEP:
              <input
                type="text"
                value={cep}
                onChange={(e) => {
                  setCep(e.target.value);
                  handleCepChange(e);
                }}
              />
            </label>
            <br />
            <label>
              Referência:
              <input
                type="text"
                value={referencia}
                onChange={(e) => {
                  setReferencia(e.target.value);
                  handleReferenciaChange(e);
                }}
              />
            </label>

            <br />
            <button type="submit">Salvar</button>
          </form>
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={true}
          />{" "}
          {/* Container para exibir os alertas */}
        </>
      );
    } else if (selectedMenuItem === "Análise Socioeconômica") {
      return (
        <div className={styles.analiseSocioeconomica}>
          <h3>Análise Socioeconômica</h3>
          <form>
            <div className={styles.formGroup}>
              <label htmlFor="fullName">Nome completo:</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={selectedUser.nome}
                readOnly
                disabled
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="birthplace">Naturalidade:</label>
              <input
                type="text"
                id="birthplace"
                name="birthplace"
                value={selectedUser.naturalidade}
                readOnly
                disabled
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="nationality">Nacionalidade:</label>
              <input
                type="text"
                id="nationality"
                name="nationality"
                value={selectedUser.nacionalidade}
                readOnly
                disabled
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="profession">Profissão:</label>
              <input
                type="text"
                id="profession"
                name="profession"
                value={selectedUser.profissao}
                readOnly
                disabled
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="rg1">RG:</label>
              <input
                type="text"
                id="rg1"
                name="rg1"
                value={selectedUser.rg}
                readOnly
                disabled
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="cpf1">CPF:</label>
              <input
                type="text"
                id="cpf1"
                name="cpf1"
                value={selectedUser.cpf}
                readOnly
                disabled
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="maritalStatus">Estado Civil:</label>
              <input
                type="text"
                id="maritalStatus"
                name="maritalStatus"
                value={selectedUser.estadoCivil}
                readOnly
                disabled
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="address1">Endereço Completo:</label>
              {selectedUser &&
                selectedUser.enderecos &&
                selectedUser.enderecos.length > 0 && (
                  <textarea
                    id="address1"
                    name="address1"
                    value={`${selectedUser.enderecos[0]?.rua ?? ""} ${
                      selectedUser.enderecos[0]?.numero ?? ""
                    } ${selectedUser.enderecos[0]?.complemento ?? ""} ${
                      selectedUser.enderecos[0]?.bairro ?? ""
                    } ${selectedUser.enderecos[0]?.cidade ?? ""} ${
                      selectedUser.enderecos[0]?.estado ?? ""
                    } ${selectedUser.enderecos[0]?.cep ?? ""}`}
                    readOnly
                    disabled
                    rows="2"
                    cols="50"
                  ></textarea>
                )}
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="phone">Telefone Fixo:</label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={selectedUser.telFixo}
                readOnly
                disabled
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="cellphone">Celular:</label>
              <input
                type="text"
                id="cellphone"
                name="cellphone"
                value={selectedUser.celular}
                readOnly
                disabled
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="email1">E-mail:</label>
              <input
                type="text"
                id="email1"
                name="email1"
                value={selectedUser.email}
                readOnly
                disabled
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="appointmentDate">Data de Comparecimento:</label>
              <input type="date" id="appointmentDate" name="appointmentDate" />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="numDependents">Nº de dependentes:</label>
              <input
                type="number"
                id="numDependents"
                name="numDependents"
                defaultValue={
                  selectedUser.analiseSocioEconomica?.numeroDependentes ?? ""
                }
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="numUnemployed">
                Mora com quantas pessoas desempregadas:
              </label>
              <input
                type="number"
                id="numUnemployed"
                name="numUnemployed"
                defaultValue={
                  selectedUser.analiseSocioEconomica?.qtdDesempregados ?? ""
                }
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="familyIncome">Renda Familiar:</label>
              <input
                type="number"
                id="familyIncome"
                name="familyIncome"
                defaultValue={
                  selectedUser.analiseSocioEconomica?.rendaFamiliar ?? ""
                }
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="fatherName">Nome do Pai:</label>
              <input
                type="text"
                id="fatherName"
                name="fatherName"
                defaultValue={selectedUser.analiseSocioEconomica?.nomePai ?? ""}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="motherName">Nome da Mãe:</label>
              <input
                type="text"
                id="motherName"
                name="motherName"
                defaultValue={selectedUser.analiseSocioEconomica?.nomeMae ?? ""}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="spouseProfession">Profissão Companheiro:</label>
              <input
                type="text"
                id="spouseProfession"
                name="spouseProfession"
                defaultValue={
                  selectedUser.analiseSocioEconomica?.profissaoCompanheiro ?? ""
                }
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="rentExpenses">Despesas com Aluguel:</label>
              <input
                type="number"
                id="rentExpenses"
                name="rentExpenses"
                defaultValue={
                  selectedUser.analiseSocioEconomica?.despesaAluguel ?? ""
                }
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="schoolExpenses">Despesas com Colégio:</label>
              <input
                type="number"
                id="schoolExpenses"
                name="schoolExpenses"
                defaultValue={
                  selectedUser.analiseSocioEconomica?.despesaColegio ?? ""
                }
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="otherExpenses">Outras Despesas:</label>
              <input
                type="number"
                id="otherExpenses"
                name="otherExpenses"
                defaultValue={
                  selectedUser.analiseSocioEconomica?.outrasDespesas ?? ""
                }
              />
            </div>
            <div className={styles.formGroup}>
              <div>
                <label htmlFor="serviceType">Tipo de atendimento:</label>
                <select
                  id="serviceType"
                  name="serviceType"
                  defaultValue={
                    selectedUser.analiseSocioEconomica?.tipoAtendimento ?? ""
                  }
                >
                  <option value="">Selecione</option>
                  <option value="Consulta">Consulta</option>
                  <option value="MedidaJudicial">Medida judicial</option>
                  <option value="CamaraMediacao">Câmara de Mediação</option>
                  <option value="AcordoExtra">Acordo extrajudicial</option>
                </select>
              </div>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="entryPoint">Porta de entrada:</label>
              <input
                id="entryPoint"
                name="entryPoint"
                rows="6"
                cols="55"
                type="text"
                defaultValue={
                  selectedUser.analiseSocioEconomica?.portaDeEntrada ?? ""
                }
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="observation">Observação/parecer jurídico:</label>
              <textarea
                id="observation"
                name="observation"
                rows="6"
                cols="55"
                defaultValue={
                  selectedUser.analiseSocioEconomica?.observacao ?? ""
                }
              ></textarea>
            </div>

            {/*<div>
            <label htmlFor="perCapitaIncome">Renda per capita:</label>
            <input
              type="number"
              id="perCapitaIncome"
              name="perCapitaIncome"
              value={formData.perCapitaIncome}
              readOnly
            />
            </div>
          <div>
            <button type="button" onClick={calculatePerCapitaIncome}>
              Calcular Renda per capita
            </button>
          </div>*/}
            <div>
              <button type="submit" disabled>
                Enviar
              </button>
            </div>
          </form>
        </div>
      );
    } else {
      return (
        <div>
          <h3>Bem-vindo a tela privativa do Usuário selecionado!</h3>
          <p>
            Escolha uma opção no menu à esquerda para visualizar o conteúdo.
          </p>
        </div>
      );
    }
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <div className={styles.sidebarWrapper}>
          <div className={styles.userHeader}>
            <div style={{ display: "flex" }}>
              <FaFolderOpen
                style={{
                  color: "#c5882a",
                  fontSize: "30px",
                  transform: "translateY(-4px)",
                }}
              />
              <span style={{ letterSpacing: "0.12rem" }}>
                <span className={styles.selectedUserCPF}>
                  {selectedUser.cpf.replace(
                    /^(\d{3})(\d{3})(\d{3})(\d{2})$/,
                    "$1.$2.$3-$4"
                  )}
                </span>
              </span>
            </div>
            <div className={styles.selectedUserName}>{selectedUser.nome}</div>
          </div>

          <div className={styles.sidebar}>
            {renderSidebarItems()}
            {showFormSidebar && (
              <div
                className={`${styles.sidebarItem} ${styles.backButton}`}
                onClick={handleBackButtonClick}
                style={{ cursor: "pointer" }}
              >
                <BsArrowLeft
                  className={styles.sidebarIcon}
                  style={{ marginRight: "0.5rem" }}
                />
                Voltar
              </div>
            )}
          </div>
        </div>

        <div className={styles.content}>{renderContent()}</div>

        <div className={styles.closeButton} onClick={handleCloseClick}>
          <FontAwesomeIcon icon={faTimes} />
        </div>
      </div>
    </div>
  );
};

export default UserModal;
