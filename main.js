// main.js
// Lógica principal: cadastro, listagem, edição e exclusão de pacientes

import { supabase } from "./supabase.js";

const form        = document.getElementById("form-paciente");
const tabelaBody  = document.getElementById("tabela-body");
const btnCancelar = document.getElementById("btn-cancelar");
const inputId     = document.getElementById("paciente-id");
const inputNome   = document.getElementById("nome");
const inputCelular= document.getElementById("celular");
const inputEmail  = document.getElementById("email");
const mensagem    = document.getElementById("mensagem");

// ─── Utilitários ───────────────────────────────────────────────

// Exibe uma mensagem de feedback na tela
function exibirMensagem(texto, tipo = "sucesso") {
  mensagem.textContent = texto;
  mensagem.className = `mensagem ${tipo}`;
  mensagem.style.display = "block";
  setTimeout(() => (mensagem.style.display = "none"), 3500);
}

// Limpa o formulário e sai do modo de edição
function resetarFormulario() {
  form.reset();
  inputId.value = "";
  btnCancelar.style.display = "none";
  document.querySelector(".form-titulo").textContent = "Novo Paciente";
}

// ─── READ — Listar pacientes ────────────────────────────────────

async function listarPacientes() {
  const { data, error } = await supabase
    .from("pacientes")
    .select("*")
    .order("criado_em", { ascending: false });

  if (error) {
    exibirMensagem("Erro ao carregar pacientes.", "erro");
    return;
  }

  tabelaBody.innerHTML = "";

  if (data.length === 0) {
    tabelaBody.innerHTML = `
      <tr>
        <td colspan="4" style="text-align:center; color:#888;">
          Nenhum paciente cadastrado.
        </td>
      </tr>`;
    return;
  }

  data.forEach((p) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${p.nome}</td>
      <td>${p.celular}</td>
      <td>${p.email}</td>
      <td class="acoes">
        <button class="btn-editar" onclick="editarPaciente(${p.id})">Editar</button>
        <button class="btn-excluir" onclick="excluirPaciente(${p.id})">Excluir</button>
      </td>
    `;
    tabelaBody.appendChild(tr);
  });
}

// ─── CREATE / UPDATE — Salvar paciente ─────────────────────────

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const dados = {
    nome:    inputNome.value.trim(),
    celular: inputCelular.value.trim(),
    email:   inputEmail.value.trim(),
  };

  const id = inputId.value;

  if (id) {
    // UPDATE
    const { error } = await supabase
      .from("pacientes")
      .update(dados)
      .eq("id", id);

    if (error) {
      exibirMensagem("Erro ao atualizar paciente.", "erro");
      return;
    }
    exibirMensagem("Paciente atualizado com sucesso!");
  } else {
    // INSERT
    const { error } = await supabase
      .from("pacientes")
      .insert([dados]);

    if (error) {
      // Erro de email duplicado
      if (error.code === "23505") {
        exibirMensagem("Este e-mail já está cadastrado.", "erro");
      } else {
        exibirMensagem("Erro ao cadastrar paciente.", "erro");
      }
      return;
    }
    exibirMensagem("Paciente cadastrado com sucesso!");
  }

  resetarFormulario();
  listarPacientes();
});

// ─── READ ONE — Preencher formulário para edição ────────────────

window.editarPaciente = async (id) => {
  const { data, error } = await supabase
    .from("pacientes")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    exibirMensagem("Erro ao buscar paciente.", "erro");
    return;
  }

  inputId.value       = data.id;
  inputNome.value     = data.nome;
  inputCelular.value  = data.celular;
  inputEmail.value    = data.email;

  document.querySelector(".form-titulo").textContent = "Editar Paciente";
  btnCancelar.style.display = "inline-block";

  // Rola suavemente até o formulário
  form.scrollIntoView({ behavior: "smooth" });
};

// ─── DELETE — Excluir paciente ──────────────────────────────────

window.excluirPaciente = async (id) => {
  const confirmar = confirm("Deseja realmente excluir este paciente?");
  if (!confirmar) return;

  const { error } = await supabase
    .from("pacientes")
    .delete()
    .eq("id", id);

  if (error) {
    exibirMensagem("Erro ao excluir paciente.", "erro");
    return;
  }

  exibirMensagem("Paciente excluído.");
  listarPacientes();
};

// ─── Botão Cancelar edição ──────────────────────────────────────

btnCancelar.addEventListener("click", resetarFormulario);

// ─── Inicializa listando os pacientes ───────────────────────────

listarPacientes();